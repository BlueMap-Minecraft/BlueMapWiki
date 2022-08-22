---
layout: page
title: Reverse-Proxy with NGINX
parent: Webserver
grand_parent: Wiki
nav_order: 1
---

# Reverse proxy BlueMap with NGINX

Here are some examples how you can use NGINX to reverse-proxy your BlueMap.

This is useful if you want to integrate your map in your website, or want to add SSL-capabilities.

## Assumptions / Prerequisites
- You have access to your servers shell (not only the minecraft-console).
- You have NGINX already 
  [installed](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/).
- NGINX is running on the same machine as BlueMaps integrated webserver. *(If that is not the case you'll need to 
  replace `localhost` with the correct ip in the examples below)*
- BlueMaps integrated webserver is running on port `8100`. *(Again, just replace `8100` with the actual port below)*

> **Info:**<br>
> If you want, you can tell the internal-webserver to only connect to one specific address like e.g. `127.0.0.1`,
> so it is no longer accessible from the outside (by default it just connects to all available interfaces):  
> To do this, just open the `webserver.conf` and add the `ip: "127.0.0.1"` setting somewhere.
{: .info }

## BlueMap on a subdirectory of your website
If you have a normal website hosted with NGINX and want your map on `/map` (e.g `https://mydomain.com/map`) then 
you can just add this to your NGINX configuration:
```nginx
server {
  
  ...

  location /map/ {
    proxy_pass http://127.0.0.1:8100/;
  }
}
```

## BlueMap on a subdomain
If you want BlueMap on a subdomain e.g. `https://map.mydomain.com/` then you'd add something like this to 
your nginx config:
```nginx
server {
  listen 80;
  listen 443 ssl;

  server_name map.mydomain.com;

  location / {
    proxy_pass http://127.0.0.1:8100;
  }
}
```
