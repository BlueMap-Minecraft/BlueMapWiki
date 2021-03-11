---
layout: page
title: Configuring External Webservers
parent: Wiki
nav_order: 9
---

# Directly hosting BlueMap with external webservers
{: .no_toc }

If you want to optimize the speed of your map, you can also host BlueMap directly with external webservers like 
[NGINX](https://www.nginx.com/) or [Apache](https://httpd.apache.org/). For this to work you need to do 
some configuration:

1. TOC 
{:toc}

## The goal
BlueMap renders and saves the map in a lot of small parts called "tiles". Those tiles are saved in individual files 
in a tree-like folder-structure here: `<webroot>/data/<map-id>/`. The file-data is in 
[json](https://www.json.org/json-de.html)-format. But the files are also compressed with 
[GZip](https://en.wikipedia.org/wiki/Gzip). The problem now is, that the web-app (browser) is asking for the 
uncompressed .json files, but a normal webserver only finds the compressed ones.

**For example:** the web-app is asking for a tile: `/data/world/hires/x9/z-8.json`. If your webserver is now searching 
for that file, it will not find it, because the file it needs is actually this one: `/data/world/hires/x9/z-8.json.gz`!
And on top of that it is compressed.

**So we need to do two things:**
- Internally redirect the request to the .gz variant of the file
- Tell the browser that the file we send is actually GZip compressed and the browser has to decompress it before giving
  it to the web-app. *(We can do this with the [http-header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
  `Content-Encoding: gzip`)*

## Live data interface
If you are using a plugin/mod you usually have live-updating player-markers on your map. For those to work with an 
external web-server you will also need to reverse-proxy all requests to `/live/*` to the builtin web-server.

## NGINX
With NGINX it is actually only one config-line that does both things: `gzip_static always;`

So with some context your website-config could look like this:
```nginx
server {
  listen 80;
  server_name yourdomain.com;

  # path to bluemap-webroot, bluemap can also be used in a sub-folder .. just adapt the paths accordingly
  root /var/www; 
  
  location / {
    try_files $uri $uri/ =404 ;
  }
  
  # We only want the map-tiles, so only files in the data/ folder should use this setting
  location /data/ {
    gzip_static always;
  }

  # Proxy requests to the live data interface to bluemaps integrated webserver
  location /live/ {
    proxy_pass http://127.0.0.1:8100;
  }
}
```

## Apache
I am not using Apache and i have not tested this myself, but here is a solution from 
[@kencinder](https://github.com/kencinder) as an example configuration:
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
  RewriteRule ^(.+) $1.gz [L]

  # Also add a content-encoding header to tell the browser to decompress
  <FilesMatch .gz$>
    ForceType application/json
    Header set Content-Encoding gzip
  </FilesMatch>
  
</Directory>
```
*(this needs the HEADERS and REWRITE mods for Apache enabled, and the reverse proxy for live data is missing)*

## Caddy
Here is a solution from [@mbround18](https://github.com/mbround18) if you are using [Caddy](https://caddyserver.com/):
```
http://your-domain {
  root * /usr/share/caddy/
  file_server

  reverse_proxy /live/*  http://127.0.0.1:8100

  @JSONgz {
    path *.json
    file {
      try_files {path}.gz
    }
  }

  route @JSONgz {
    rewrite {http.matchers.file.relative}
    header Content-Type application/json
    header Content-Encoding gzip
  }

}
```