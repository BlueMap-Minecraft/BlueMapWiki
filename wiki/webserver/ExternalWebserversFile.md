---
layout: page
title: External Webservers (FILE-Storage)
parent: Webserver
grand_parent: Wiki
nav_order: 1
---

# Directly hosting BlueMap with external webservers from a FILE storage
{: .no_toc }

BlueMap's internal webserver is very lightweight and quite fast, but it might get overwhelmed by a larger number of
concurrent users.

If you want to optimize the speed of your web-app for a larger audience, you can also host BlueMap directly with 
external webservers like [NGINX](https://www.nginx.com/) or [Apache](https://httpd.apache.org/). 
For this to work you need to do some configuration.

1. TOC 
{:toc}

## The goal
BlueMap renders and saves the map in a lot of small parts called "tiles". Those tiles are saved in individual files 
in a tree-like folder-structure here: `<webroot>/maps/<map-id>/tiles/`. The low-res data is saved in
[PNG](https://en.wikipedia.org/wiki/PNG) files that can just be served normally. The high-res tile data is saved in 
[GZip](https://en.wikipedia.org/wiki/Gzip)-compressed PRBM (modified [PRWM](https://github.com/kchapelier/PRWM)) files. The problem now is
that the web-app (browser) is asking for the uncompressed `.prbm` files, but a normal webserver only finds the
compressed `.prbm.gz` ones.

**For example:** the web-app is asking for a tile: `/maps/world/tiles/0/x9/z-8.prbm`. If your webserver is now searching 
for that file, it will not find it, because the file it needs is actually this one: `/maps/world/tiles/0/x9/z-8.prbm.gz`!
And on top of that it is compressed.

> Next to the map-tiles there might be more map-files that are only available in their compressed form.
> For example the `<webroot>/maps/<map-id>/textures.json.gz`.
{: .info }

**So we need to do two things:**
- Internally redirect the request to the .gz variant of the file if one is available
- Tell the browser that the file we send is actually GZip compressed and the browser has to decompress it before giving
  it to the web-app. *(We can do this with the [http-header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
  `Content-Encoding: gzip`)*

Optionally:
- If any map tile does not exist, instead of returning a 404 and showing errors in the browser console, we
  return a 204 (No Content).
- If you are using a plugin/mod you usually have live-updating player-markers on your map. For those to work with an 
  external web-server you will also need to reverse-proxy all requests to `/maps/*/live/*` to the builtin web-server.

## NGINX
With NGINX it is actually only one config-line that does both things *(finding gz-files and setting the header)*:
`gzip_static always;`

So with some context your website-config could look like this:
```nginx
server {
  listen 80;
  server_name yourdomain.com;
  
  # path to bluemap-webroot, BlueMap can also be used in a sub-folder .. just adapt the paths accordingly
  root /var/www;
  
  location /maps/ {
    # find gz-files and set the "Content-Encoding: gzip" header
    gzip_static always;

    # convert 404 into 204 for map-tiles
    location ~* ^/maps/[^/]*/tiles/ {
      error_page 404 = @empty;
    }
  }
  
  location @empty {
    return 204;
  }

  # OPTIONAL:
  # Proxy requests for live data to the bluemaps integrated webserver.
  # If you have multiple servers you will need to proxy each map-id to the correct server.
  location ~* ^/maps/[^/]*/live/ {
    proxy_pass http://127.0.0.1:8100;
  }
}
```
> **Important:**<br>
> The above config is **just an example** and not a complete config you can just copy&paste. You **will** need to adapt it to your setup!
{: .info .important }

## Apache2
### Apache2 Modules
This needs the HEADERS, REWRITE and all PROXY (PROXY and PROXY_HTTP) modules for Apache to be enabled.  
*(You can check your enabled modules via `apache2ctl -M` and check whether the modules are enabled. 
Don't forget to restart apache2 after installing any missing module via `a2enmod MODULENAME`)*

### Apache2 configuration
```apache
DocumentRoot /var/www/
<Directory /var/www/>
  Options FollowSymLinks
  Require all granted
  SetEnv no-gzip

  RewriteEngine on

  # if a .gz file exists rewrite to that 
  RewriteCond %{REQUEST_FILENAME}.gz -s
  RewriteRule ^(.+) $1.gz

  # add a content-encoding header to tell the browser to decompress
  <FilesMatch .gz$>
    Header set Content-Encoding gzip
  </FilesMatch>
  
  # if a map-tile doesnt exist, send a 204
  RewriteCond %{REQUEST_URI} "^/maps/[^/]*/tiles/"
  RewriteCond %{REQUEST_FILENAME} !-s
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^.*$ - [R=204,L]
</Directory>

# OPTIONAL:
# Proxy requests for live data to the bluemaps integrated webserver.
# If you have multiple servers you will need to proxy each map-id to the correct server.
ProxyPreserveHost On
ProxyPassMatch ^/(maps/[^/]*/live/.*) http://127.0.0.1:8100/$1
```
> **Important:**<br>
> The above config is **just an example** and not a complete config you can just copy&paste. You **will** need to adapt it to your setup!
{: .info .important }

## Caddy configuration
```
yourdomain.com {
  # path to bluemap-webroot, BlueMap can also be used in a sub-folder .. just adapt the paths accordingly
  root * /var/www
  file_server

  # Match the textures.json file & .prbm files
  @gz path /maps/*/textures.json *.prbm
  # Find .gz files (if not found respond with 204) for the above matcher, and set the "Content-Encoding gzip" header
  handle @gz {
    try_files {path}.gz =204
    header Content-Encoding gzip
  }

  # Respond with 204 for non-existant map-tiles
  @204 path */tiles/*
  handle @204 {
    try_files {path} =204
  }

  # OPTIONAL:
  # Proxy requests for live data to the bluemaps integrated webserver.
  # If you have multiple servers you will need to proxy each map-id to the correct server.
  handle /maps/*/live/* {
    reverse_proxy 127.0.0.1:8100
  }
}
```
> **Important:**<br>
> The above config is **just an example** and not a complete config you can just copy&paste. You **will** need to adapt it to your setup!
{: .info .important }
