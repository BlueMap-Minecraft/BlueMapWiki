---
layout: page
title: Configuration
parent: Getting Started
grand_parent: Wiki
nav_order: 2
---

# Configuration
{: .no_toc }

1. TOC
{:toc}

## General
The configuration files of bluemap are formatted using [HOCON](https://github.com/lightbend/config/blob/master/HOCON.md). 
Please make sure you have a basic understanding of how to use HOCON.

If you have no configuration files, bluemap generates example configurations for you when it is starting.
In those generated config files every field has a comment above it with what it does, and it's default value 
*(if it has one)*. Read those! They'll explain a lot! :)

## Configuring your maps *(adding & removing maps)*
In your config-folder you can find a folder called `maps`. This folder contains a `.conf` file for each map that you want
bluemap to render, update and/or show on the web-app.

The name of those config-files (without the `.conf`-extension) will be the identifier of your map. E.g. you will use that
identifier in your commands to select the map. If you rename a config-file, it will be like creating a new map, since bluemap
also stores all map-information based on that identifier.

If you want to remove a map, you can just delete it's `.conf` file.
If you want to add a map, you can create a new `.conf` file in this folder and fill it with the correct information.
The easiest way is probably to just copy the `.conf` file from the one of the default config-files and edit it to your liking.

Inside each map-config you can change all sorts of map-settings like e.g. the display-name of the map or the order in which the map
is shown on the web-app. Just view the comments in the default config-file that bluemap generated for you.
Everything is explained there.

## Configuring the map-storages *(store maps in a database or a different directory)*
In your config-folder you can find a folder called `storages` with some config-files in it.
In the same way as with the maps, the name of these config-file (without the `.conf`-extension) determines the identifier of the storage.
Which means you can also add and remove storages.
In your map-configs you then can use the `storage`-setting to select the storage this map should be stored in.

By default, the `storages` folder contains a `file.conf` and a `sql.conf` file.
The `file.conf` is the one that is used by default for all maps. It stores the map in a tree-like structure in some folder.
If you open the file you can e.g. change the path to that folder.
The `sql.conf` is used to store maps in a database. In it, you can set up the database-connection and optionally provide
an SQL-Driver. You will only need to provide a Driver if there is no driver already available. On Spigot/Paper for example there is
usually already a MySQL-Driver provided.

For the `connection-url` you can use any valid JDBC-URL. Consult the documentation of your database-driver for more information.
You can use the `connection-properties` to set your username and password without having to encode them into your `connection-url`.

## Performance tweaking
BlueMap is rendering asynchronously to your server-thread. This means at no time it will block your server-thread directly.
So as long as your CPU is not fully utilized, your server should not be slowed down while BlueMap is rendering.
You can control how many CPU-Cores BlueMap is (roughly) using by changing the `render-thread-count` in BlueMap's `core.conf`.
The more threads you give it, the more CPU-Cores it will use, but also the faster it will render. 

Minecraft itself can utilize not too many CPU-Cores. The main server-thread will always only use one CPU-Core, and then there might be
some additional usage for world-generation or Network-Threads. But altogether it can't usually utilize more than about 3 cores.
This means you can give the rest of those cores to BlueMap if you want to optimize the render-speed.

If you have 4 or fewer cores on your Server-CPU you probably want to set the `render-thread-count` to 1. 
If you still have issues with lag and think it is caused by BlueMap, then you can tell BlueMap to not render at all if 
there is a certain number of players online: 
The `player-render-limit` setting in BlueMap's `plugin.conf` controls this.

## Hosting static maps
If you have an old map of a world that doesn't exist anymore or a map that was rendered on a different server, you can still display it
on the web-app. All bluemap needs is to know the identifier 
(see ["Configuring the map-storages"](#configuring-the-map-storages-store-maps-in-a-database-or-a-different-directory)) 
of the map and the storage that it is stored in.
So we can just add a new map-config named like the identifier of the map with the only setting being the `storage`-setting.

E.g. if you have a map with the identifier `mymap` and it is stored in the `storages/sql.conf` storage, you can add a new map-config
`maps/mymap.conf` with the following content:
```hocon
storage: "sql"
```
And then that map should show up on the webapp.
