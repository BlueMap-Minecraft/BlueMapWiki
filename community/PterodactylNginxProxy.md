---
layout: page
title: Reverse-Proxy setup with Pterodactyl & Nginx
parent: Community Guides
nav_order: 6
---

# Reverse-Proxy setup with Pterodactyl & Nginx

Extended guide for setting up a reverse proxy for BlueMap with Pterodactyl and Nginx.

## Assumptions / Prerequisites
- You have access to your servers shell (not only the minecraft-console).
- You have pterodactyl already installed and running.
- You are expected to have a basic understanding of how to use pterodactyl and nginx.
- You have NGINX already 
  [installed](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/).
- NGINX is running on the same machine as BlueMaps integrated webserver. *(If that is not the case you'll need to 
  replace `localhost` with the correct ip in the examples below)*
- BlueMaps integrated webserver is running on port `8100`. *(Again, just replace `8100` with the actual port below)* 

> **Info:**<br>
> We advise you to read the [Reverse Proxy BlueMap with NGINX](https://bluemap.bluecolored.de/wiki/webserver/NginxProxy.html) guide first.
> And also the [Pterodactyl Minecraft community guide](https://pterodactyl.io/community/games/minecraft.html) it contains usefull info about the allocations.
{: .info }

## Setting up the server allocations in pterodactyl
We need to create local Pterodactyl allocations for the BlueMap webserver to use. This is done by creating a new allocation in the Pterodactyl panel.

1. Head over to the Pterodactyl admin area.
2. Create a new allocation on the desired node for the server you want to create the proxy for.
> Set the `IP Address` to `172.18.0.1` along with your desired port
3. Add the newly created allocation to the server you want to create the proxy for.
> If you changed the port make sure to edit it in the `webserver.conf` file as well.

## Usage in NGINX config blocks
You need to use the Pterodactyl pass-through IP (`172.18.0.1`) in the config blocks for the reverse proxy to work.
You can usually locate the config file to be edited in `/etc/nginx/sites-available/`.

### BlueMap on a subdirectory of your website
Same as in [Reverse Proxy BlueMap with NGINX](https://bluemap.bluecolored.de/wiki/webserver/NginxProxy.html) except you need to use the Pterodactyl pass-through IP (`172.18.0.1`).
If you have a normal website hosted with NGINX and want your map on `/map` (e.g `https://mydomain.com/map`) then 
you can just add this to your NGINX configuration:
```nginx
server {
  
  ...

  location /map/ {
    proxy_pass http://172.18.0.1:<your desired port>;
  }
}
```

### BlueMap on a subdomain of your website
Same as in [Reverse Proxy BlueMap with NGINX](https://bluemap.bluecolored.de/wiki/webserver/NginxProxy.html) except you need to use the Pterodactyl pass-through IP (`172.18.0.1`).
If you want BlueMap on a subdomain e.g. `https://map.mydomain.com/` then you'd add something like this to 
your nginx config:
```nginx
server {
  listen 80;
  listen 443 ssl;

  server_name map.mydomain.com;

  location / {
    proxy_pass http://172.18.0.1:<your desired port>;
  }
}
```


