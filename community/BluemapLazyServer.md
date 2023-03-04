---
layout: page
title: Hosting BlueMap with a Lazy Server
parent: Community Guides
nav_order: 2
---

# What will this guide cover? (and what is a lazy server?)
{: .no_toc }

We're using "lazy server" here to describe a Minecraft server that's only running when players are
actively using it. This is a great way to conserve resources on a server that doesn't have players
on it 24/7. However, hosting BlueMap on these types of servers presents a problem because when the
server is offline, the BlueMap integrated webserver is offline as well.

This guide will go over setting up a lazy Minecraft server with BlueMap enabled and detail a setup
that allows for 24/7 viewing of the map (and map markers), even when the server is offline.

1. TOC
{:toc}


## Setting up a lazy server

The [lazymc] project can be used to set up a lazy Minecraft server. Essentially it acts just enough
like a normal Minecraft server to accept an incoming connection request, start the Minecraft server
(if not already running) and transparently proxy the connection through to it.

Once the server is running, it monitors the number of current players and shuts it down once it's
empty. It can also be configured to pause the Minecraft server instead of shutting it down so it can
be instantly resumed when the next player connects.

Detailed instructions on how to set up and configure lazymc are available in the project's README.


## Configuring BlueMap

Install and configure BlueMap as desired (see [Getting Started]).

For this guide, we're going to assume BlueMap is storing all data using the `FILE`-type storage with
`GZIP` compression enabled as this is the default configuration. It's definitely possible to make
this work for `SQL`-type storage and uncompressed map data as well, but it will require some
extra work not covered by this guide.

Since we're going to be using an external webserver there's no need to expose the BlueMap integrated
webserver to the world. To make the server local-only, in `webserver.conf`, add `ip: "127.0.0.1"`
just above the existing `port: <some port>` setting. Make a note of what `<some port>` is in your
config since you'll need it later.


## Configuring an external webserver to serve the map

Because the Minecraft server (and therefore the integrated BlueMap webserver) is not always going to
be online, we need to use something else to host the BlueMap webapp and resources. This guide will
provide a configuration example for [Nginx], but the same general idea can be applied to any other
webserver as well.

Most of this configuration is going to be the exact same as is detailed on the [External Webservers
(FILE-Storage)] page so to understand the basics, it might be worth it to give that page a quick
skim first. The difference in this case is that we're *expecting* that the integrated webserver will
be down when the server is offline and the proxy should therefore return some placeholder data to
keep the frontend happy.

Note that if [lazymc] is configured to pause the server instead of shutting it down, Nginx will need
to be configured with a short `proxy_read_timeout` to avoid hanging while waiting for a response
from the integrated webserver. This is because the paused server will accept the connection but not
be able to respond in any way to the request.


## Faking "live" data while server is offline

The endpoints of the live resources the frontend is looking for are:
 - `/maps/<world>/live/markers.json`
 - `/maps/<world>/live/players.json`

For `markers.json`, BlueMap will automatically write out the current set of markers to a file on
disk in `<webroot>/maps/<world>/live/markers.json` when it shuts down. This is conveniently exactly
the same path as the request is asking for so we can just service the request normally from the
webroot.

For `players.json`, we don't want to send any legitimate data back because if the server is off,
there can't be any players. In this guide we opt to send back the contents of
`/assets/emptyTile.json` (`{}`) since it's convenient. It also keeps the frontend polling for
players so if the server is started, it will automatically pick up the legitimate player data.


## Example Nginx config

```nginx
server {
  listen 80;
  server_name yourdomain.com;

  # path to bluemap-webroot, bluemap can also be used in a sub-folder .. just adapt the paths accordingly
  root /var/www;

  location ~* ^/maps/[^/]*/tiles/ {
    # High-res tiles are stored as precompressed JSON with a fallback to returning an empty tile.
    # Low-res tiles are stored as pngs with a fallback to returning 204 (No Content).
    location ~* \.json$  {
      error_page 404 =200 /assets/emptyTile.json;
      gzip_static always;
    }
    location ~* \.png$ {
      try_files $uri =204;
    }
  }

  # Proxy all requests for live data to the integrated webserver.
  # Fall back to @server-offline if it can't be contacted.
  location ~* ^/maps/[^/]*/live/ {
    proxy_read_timeout 2s;  # required if lazymc pauses the server instead of shutting it down
    error_page 502 504 = @server-offline;
    proxy_pass http://127.0.0.1:8100;  # the default port for the integrated webserver, adapt to your setup
  }

  # Handles serving "live" data when the integrated webserver can't be reached
  location @server-offline {
    internal;
    # Serve markers.json from disk, fall back to sending the data for an empty tile for players.json
    try_files $uri /assets/emptyTile.json;
  }
}
```
> **Important:**<br>
> The above config is **just an example** and not a complete config you can just copy&paste. You
> **will** need to adapt it to your setup!
{: .info .important }


  [lazymc]:https://github.com/timvisee/lazymc
  [Nginx]: https://nginx.org/
  [External Webservers (FILE-Storage)]: {% link wiki/webserver/ExternalWebserversFile.md %}
  [Getting Started]: {% link wiki/getting-started/index.md %}
