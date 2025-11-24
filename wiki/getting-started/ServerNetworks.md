---
layout: page
title: Server-Networks (BungeeCord/Velocity)
parent: Getting Started
grand_parent: Wiki
nav_order: 4
---

# Using BlueMap on Server-Networks (BungeeCord/Velocity)
You can use BlueMap on Server-Networks (BungeeCord/Velocity) and show all your maps from multiple server on a single webapp.
There are multiple ways to achieve this.

## General Setup
For all setups you will need to install BlueMap [like normally](./Installation.md) 
on every game-server in your network that you want to render maps on.  

**Make sure that the map-configs are NAMED DIFFERENTLY across the entire network!**  
Since the map's identifier is derived from the config-file's name, you need to make sure that each map has a unique
identifier!

*(You can't install BlueMap on the Proxy-Server directly, so don't try that)*

## Using a combined storage
Either you have an SQL-Server to which you can connect from all your game-servers, or you have some way to access the
same folder from them all (e.g. mounting a shared drive/folder). Either of them can be used to combine all the map-data from different servers.

### Steps
- configure either the [`storages/sql.conf`](../configs/storages/SQL.md) on all servers to the same sql-server,
  or the [`storages/file.conf`](../configs/storages/File.md) on all servers to the same (shared) folder
- configure all maps on all servers to use that storage
- choose one of those servers to be the server that will host the web-app.  
  **On this server:** create an extra map-config like [here: "Hosting static maps"](./Configuration.md#hosting-static-maps) for each 
  map that is on the **other** servers. *(example below)*

Now the maps from the other servers should be visible on the web-app of this one server.

> #### Example
> Assuming your servers/maps look like this:
> ```
> server1/...
>   s1_map1.conf
>   s1_map2.conf
> 
> server2/...
>   s2_map1.conf
>   s2_map2.conf
> ```
> the maps are all stored on the same database ...
> now if you want to see the maps from `server2` also on the webapp from `server1`, then you need to add these files:
> ```
> server1/...
>   s1_map1.conf
>   s1_map2.conf
>   s2_map1.conf <<-
>   s2_map2.conf <<-
> 
> server2/...
>   s2_map1.conf
>   s2_map2.conf
> ``` 
> to your `server1` and the content of those two extra files should look like this:
> ```hocon
> storage: "sql"
> ```
> nothing else.

### Live updates
If you want to have live updating markers and player-markers on all maps, turn on the
[`write-markers-interval` and `write-players-interval`](../configs/Plugin.md#write-markers-interval-and-write-players-interval)
options in each [`plugin.conf`](../configs/Plugin.md) on the other servers.  
**Or** if you plan on hosting the entire map with an external-webserver you can reverse-proxy each maps live-interface to the correct
game-server. See: [External Webserver (File-Storage)](../webserver/ExternalWebserversFile.md) and
[External Webserver (SQL-Storage)](../webserver/ExternalWebserversSQL.md).

## Using an external-webserver and different storages
If you can't store all maps on the same storage, you can also use an external-webserver to host the webapp, and just
reverse-proxy all maps to the webserver on each of the game-servers.

### Steps
- copy the webapp from one of the game-servers to the webroot of the external-webserver => Copy everything in
  `./bluemap/web` **except** the `./bluemap/web/maps` folder
- open the `settings.json` file that you just copied and add all map-identifiers to the `maps` array 
  *(the name of the map-config-files on all game-servers without the `.conf` ending, and special-characters are to be replaced with a `_`)*
- configure your webserver so that it reverse-proxies all requests going to `/maps/<map-identifier>` to the webserver of
  the correct game-server

If that is all done correctly, you should now see the web-app with all your maps on the external-webserver.
