---
layout: page
title: Reverse-Proxy on Coolify with Traefik
parent: Community Guides
nav_order: 9
---

# Reverse proxy BlueMap on Coolify with Traefik

Here are some examples of how you can use Coolify + Traefik (Installed by default on Coolify) to reverse-proxy your BlueMap.

This is useful if you want to integrate your map in your website and you're using Coolify, or want to add SSL-capabilities.

## Assumptions / Prerequisites
- You have already added an `A record` to your domain pointing to your `public IP`.
- If you're planning on using a `subdomain`, you have already added an `A record` with your subdomain e.g. `bluemap` to your domain pointing to your `public IP`.
- You have access to Coolify's dashboard (`public_address:8000`).
- You already have a daemon server installed on Coolify (`public_address:8000/servers`).
- BlueMaps integrated webserver is running on port `8100` and accessible on `public_address:8100` e.g. **if** your public_address is `200.121.121.100` then BlueMaps should be accessible from `200.121.121.100:8100`. *(If that is not the case you'll need to replace `8100` with the actual port below)*

> **Warning:**<br>
> Telling the internal-webserver to connect to one specific address like e.g. `127.0.0.1`,
> <br>from `webserver.conf` by adding `ip: "127.0.0.1"` WILL GIVE A **BAD GATEWAY** ERROR.
{: .info }

## BlueMap on a subdomain
- Go to `Coolify's Dashboard -> Servers -> YourServer -> Proxy -> Dynamic Configurations`
- Press `+ Add`, give it a name like e.g. `bluemap.yaml` and make something like this:

BlueMap on a subdomain e.g. `https://bluemap.example.com` (replace `public_address` with your `public IP`):
```yaml
http:
  routers:
    map-router:
      rule: Host(`bluemap.example.com`)
      entryPoints:
        - https
      service: bluemap
      tls:
        certResolver: letsencrypt
  services:
    bluemap:
      loadBalancer:
        servers:
          - url: 'http://public_address:8100'
```
Press `Save` and `Reload`.

## BlueMap on a subdirectory of your website
- Go to `Coolify's Dashboard -> Servers -> YourServer -> Proxy -> Dynamic Configurations`.
- Press `+ Add`, give it a name like e.g. `bluemap.yaml` and make something like this:

BlueMap on a subdirectory e.g `https://www.example.com/bluemap` (replace `public_address` with your `public IP`):
```yaml
http:
  routers:
    bluemap:
      entryPoints:
        - https
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
          - url: "http://public_address:8100"
  middlewares:
    bluemapprefix:
        stripprefix:
        prefixes: "/bluemap/"
```
Press `Save` and `Reload`.

> **Warning:**<br>
> If you're using CloudFlare, make sure to add to your DNS an A record with your subdomain e.g. `bluemap` pointing to your public IP.
{: .info }
