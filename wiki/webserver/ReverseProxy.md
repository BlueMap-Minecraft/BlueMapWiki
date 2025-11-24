---
layout: page
title: Reverse-Proxy
parent: Webserver
grand_parent: Wiki
nav_order: 3
---

# Reverse proxy BlueMap

Here are some examples how you can use an external webserver to reverse-proxy your BlueMap.

This is useful if you want to integrate your map in your website, or want to add SSL-capabilities.

## Assumptions / Prerequisites
- You have access to your servers shell (not only the minecraft-console).
- You have your external webserver like [NGINX](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/) or [Caddy](https://caddyserver.com/docs/install) already
  installed.
- The external webserver is running on the same machine as BlueMaps integrated webserver. *(If that is not the case you'll need to
  replace `localhost` with the correct ip in the examples below)*
- BlueMaps integrated webserver is running on port `8100`. *(Again, just replace `8100` with the actual port below)*

> **Info:**<br>
> If you want, you can tell the internal-webserver to only connect to one specific address like e.g. `127.0.0.1`,
> so it is no longer accessible from the outside (by default it just connects to all available interfaces):
> To do this, just open the [`webserver.conf`](../configs/Webserver.md) and add the `ip: "127.0.0.1"` setting somewhere.
{: .info }

## BlueMap on a subdirectory of your website
You have a normal website hosted on your webserver and want your map on `/map` (e.g `https://mydomain.com/map`)...

### NGINX
```nginx
server {

  ...

  location /map/ {
    proxy_pass http://127.0.0.1:8100/;
  }
}
```

### Caddy
```
mydomain.com {
   handle_path /map/* {
     reverse_proxy  127.0.0.1:8100
   }
}
```

## BlueMap on a subdomain
You want BlueMap on a subdomain e.g. `https://map.mydomain.com/`...

### NGINX
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

### Caddy
```
map.mydomain.com {
  reverse_proxy 127.0.0.1:8100
}
```
