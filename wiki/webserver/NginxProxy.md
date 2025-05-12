---
layout: page
title: Reverse-Proxy with NGINX or Caddy
parent: Webserver
grand_parent: Wiki
nav_order: 3
---

# Reverse proxy BlueMap with NGINX or Caddy

Here are some examples how you can use NGINX or Caddy to reverse-proxy your BlueMap.

This is useful if you want to integrate your map in your website, or want to add SSL-capabilities.

## Assumptions / Prerequisites
- You have access to your servers shell (not only the minecraft-console).
- You have [NGINX](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/) or [Caddy](https://caddyserver.com/docs/install) already
  installed.
- NGINX or Caddy is running on the same machine as BlueMaps integrated webserver. *(If that is not the case you'll need to
  replace `localhost` with the correct ip in the examples below)*
- BlueMaps integrated webserver is running on port `8100`. *(Again, just replace `8100` with the actual port below)*

> **Info:**<br>
> If you want, you can tell the internal-webserver to only connect to one specific address like e.g. `127.0.0.1`,
> so it is no longer accessible from the outside (by default it just connects to all available interfaces):
> To do this, just open the `webserver.conf` and add the `ip: "127.0.0.1"` setting somewhere.
{: .info }

## BlueMap on a subdirectory of your website
If you have a normal website hosted with NGINX or Caddy and want your map on `/map` (e.g `https://mydomain.com/map`)

### NGINX
You can add the following to your NGINX config.
```nginx
server {

  ...

  location /map/ {
    proxy_pass http://127.0.0.1:8100/;
  }
}
```

### Caddy

You can add the following to your Caddyfile.

```caddy
mydomain.com {
        handle_path /map/* {
        reverse_proxy  127.0.0.1:8100
        }
}
```

## BlueMap on a subdomain
If you want BlueMap on a subdomain e.g. `https://map.mydomain.com/`

### NGINX
On NGINX you can add this to your config.

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
You can add the following to your Caddyfile.

```caddy
map.mydomain.com {
        reverse_proxy 127.0.0.1:8100
}
```
