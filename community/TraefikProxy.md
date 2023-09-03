---
layout: page
title: Reverse-Proxy with Traefik
parent: Community Guides
nav_order: 8
---

# Reverse proxy BlueMap with Traefik

Here are some examples how you can use Traefik to reverse-proxy your BlueMap.

This is useful if you want to integrate your map in your website, or want to add SSL-capabilities.

## Assumptions / Prerequisites
- You have access to your servers shell (not only the minecraft-console).
- You have Traefik already running
  [installed](https://doc.traefik.io/traefik/getting-started/install-traefik/).
- Traefik [File directory](https://doc.traefik.io/traefik/providers/file/#directory) is configured.
- Traefik can reach BlueMaps integrated webserver. *(In this example we use the IP `127.0.0.1`)*
- BlueMaps integrated webserver is running on port `8100`. *(If that is not the case you'll need to replace `8100` with the actual port below)*

> **Info:**<br>
> If you want, you can tell the internal-webserver to only connect to one specific address like e.g. `127.0.0.1`,
> so it is no longer accessible from the outside (by default it just connects to all available interfaces):  
> To do this, just open the `webserver.conf` and add the `ip: "127.0.0.1"` setting somewhere.
{: .info }

## BlueMap on a subdomain
If you want BlueMap on a subdomain e.g. `https://bluemap.example.com` then like this:
```yaml
http:
  routers:
    bluemap:
      entryPoints:
        - "websecure"
      rule: "Host(`www.example.com`) && PathPrefix(`/bluemap/`)"
      service: "bluemap"
      tls:
        certResolver: letsencrypt
  services:
    bluemap:
      loadBalancer:
        servers:
          - url: "http://127.0.0.1:8100"
```

## BlueMap on a subdirectory of your website
If you want BlueMap on a subdirectory e.g `https://www.example.com/bluemap` then like this:
```yaml
http:
  routers:
    bluemap:
      entryPoints:
        - "websecure"
      rule: "Host(`www.example.com`) && PathPrefix(`/bluemap/`)"
      service: "bluemap"
      tls:
        certResolver: letsencrypt
      middlewares:
        - "bluemapprefix"
  services:
    bluemap:
      loadBalancer:
        servers:
          - url: "http://127.0.0.1:8100"
  middlewares:
    bluemapprefix:
        stripprefix:
        prefixes: "/bluemap/"
```
