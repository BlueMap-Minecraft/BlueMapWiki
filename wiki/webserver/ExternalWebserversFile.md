---
layout: page
title: External Webservers (FILE-Storage)
parent: Webserver
grand_parent: Wiki
nav_order: 1
---

# Directly hosting BlueMap with external webservers from a FILE storage
{: .no_toc }

BlueMap's internal webserver is very lightweight and quite fast, but it is quickly overwhelmed by a larger number of
concurrent requests.

If you want to optimize the speed of your web-app for a larger audience, you can also host BlueMap directly with 
external webservers like [NGINX](https://www.nginx.com/) or [Apache](https://httpd.apache.org/). 
For this to work you need to do some configuration.

1. TOC 
{:toc}

## The goal
BlueMap renders and saves the map in a lot of small parts called "tiles". Those tiles are saved in individual files 
in a tree-like folder-structure here: `<webroot>/maps/<map-id>/tiles/`. The low-res data is saved in
[PNG](https://en.wikipedia.org/wiki/PNG) files that can just be served normally. The high-res tile data is saved in 
[GZip](https://en.wikipedia.org/wiki/Gzip)-compressed [JSON](https://www.json.org/) files. The problem now is,
that the web-app (browser) is asking for the uncompressed `.json` files, but a normal webserver only finds the
compressed `.json.gz` ones.

**For example:** the web-app is asking for a tile: `/maps/world/tiles/0/x9/z-8.json`. If your webserver is now searching 
for that file, it will not find it, because the file it needs is actually this one: `/maps/world/tiles/0/x9/z-8.json.gz`!
And on top of that it is compressed.

**So we need to do two things:**
- Internally redirect the request to the .gz variant of the file
- Tell the browser that the file we send is actually GZip compressed and the browser has to decompress it before giving
  it to the web-app. *(We can do this with the [http-header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
  `Content-Encoding: gzip`)*

Optionally:
- If a high-res map tile does not exist, instead of returning a 404 we want to respond with 
  200 and this file: `/assets/emptyTile.json` *(This removes harmless but annoying 404 errors in the browsers console)*
- If a low-res map tile does not exist, instead of returning a 404 and showing errors in the browser console, we
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
  
  # path to bluemap-webroot, bluemap can also be used in a sub-folder .. just adapt the paths accordingly
  root /var/www;
  
  location ~* ^/maps/[^/]*/tiles/ {
    # High-res tiles are stored as precompressed JSON with a fallback to returning an empty tile.
    # Low-res tiles are stored as pngs with a fallback to returning 204 (No Content).
    location ~* \.prbm$  {
      error_page 404 =200 /assets/emptyTile.json;
      gzip_static always;
    }
    location ~* \.png$ {
      try_files $uri =204;
    }
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
This needs the HEADERS, REWRITE and all PROXY (PROXY and PROXY_HTTP) modules for Apache to be enabled!  
*(You can check your enabled modules via `# apache2ctl -M` and check whether the modules are enabled. 
Don't forget to restart apache2 after installing any missing module via `# a2enmod MODULENAME`)*

### Apache2 configuration
```apache
DocumentRoot /var/www/
<Directory /var/www/>
  allow from all
  Options FollowSymLinks
  Require all granted
  SetEnv no-gzip

  RewriteEngine on

  # Make sure the browser supports gzip encoding before we send it
  # without it, Content-Type will be "application/x-gzip"
  RewriteCond %{HTTP:Accept-Encoding} \b(x-)?gzip\b
  RewriteCond %{REQUEST_FILENAME}.gz -s
  RewriteRule ^(.+) $1.gz
  
  # Check if file doesn't exists and is a map file
  RewriteCond %{REQUEST_URI} "^/maps"
  RewriteCond %{REQUEST_FILENAME} !-s
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteCond %{REQUEST_FILENAME} !-d
  # Rewrite request to emptyTile
  RewriteRule ^.*$ /assets/emptyTile.json [L]

  # Also add a content-encoding header to tell the browser to decompress
  <FilesMatch .json.gz$>
    ForceType application/json
    Header set Content-Encoding gzip
  </FilesMatch>
  
</Directory>

# OPTIONAL:
# Proxy requests to the live data interface to bluemaps integrated webserver  
ProxyPreserveHost On
ProxyPassMatch ^/(maps/[^/]*/live/.*) http://127.0.0.1:8100/$1
```
> **Important:**<br>
> The above config is **just an example** and not a complete config you can just copy&paste. You **will** need to adapt it to your setup!
{: .info .important }

## Caddy
Newer versions of [Caddy](https://caddyserver.com/) have a `precompressed` option that's similar to Nginx's `gzip_static`. Unfortunately this [requires the "base" file](https://github.com/caddyserver/caddy/issues/5116) `.json` to also exist, but Bluemap only creates the "precompressed" files `.json.gz`.

Here is the required config to serve the high-res `.json.gz` files correctly:
```
http://your-domain {
  root * /usr/share/caddy/
  file_server

  reverse_proxy /maps/*/live/* http://127.0.0.1:8100

  @JSONgz {
    path *.json
    file {
        try_files {path}.gz
    }
  }
  handle @JSONgz {
    rewrite {http.matchers.file.relative}
    header Content-Type application/json
    header Content-Encoding gzip
  }
}
```

The optional config to avoid 404s in the logs is left as an exercise for the reader.

> **Important:**<br>
> The above config is **just an example** and not a complete config you can just copy&paste. You **will** need to adapt it to your setup!
{: .info .important }
