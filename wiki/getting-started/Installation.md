---
layout: page
title: Installation
parent: Getting Started
grand_parent: Wiki
nav_order: 1
---

# Installation
{: .no_toc }

1. TOC
{:toc}

## General Prerequisites
To run bluemap you need:
- Java 11 or newer
- Minecraft Java-Edition

BlueMap only works with Java-Edition worlds, Bedrock-Edition worlds are not supported!

## Where do i find...
### ...the "config-files"? 
They are located in your server-root folder at `./plugins/BlueMap/` (Spigot/Paper) or `./config/bluemap/` (Forge/Fabric/Sponge) 
or directly next to the `BlueMap.jar` if you are using the CLI-Version of BlueMap.

### ...the "webroot"?
The webroot is the folder that contains all the files that will be hosted by the webserver and that can be accessed by the browser.
By default, it is located in your server-root folder at `./bluemap/web/`. 

### ... the map-files?
The webapp expects the map-files **inside the web-root** at `./maps/`. This is also the place where maps are stored by default.

## Installing BlueMap (basic setup)
This is the basic setup for BlueMap. BlueMap will run as a plugin/mod on your server, render/update the maps as your world changes
and host a small webserver to serve the map-files and the webapp where you can view the maps.

### Prerequisites
- A Spigot/Paper, Sponge, Fabric or Forge server
- Any **second port** that you can use, besides the one that is used by the minecraft-server
  *(Ask your hosting service if & how you can open a second port)*

### Steps
- First you want to download the bluemap-jar. You can choose and download a version 
  from [here](https://github.com/BlueMap-Minecraft/BlueMap/releases).
  Make sure it fits to the version of your server!
- Put the downloaded jar in the `plugins` or `mods`-folder of your server and restart the server.
- BlueMap will now generate the default config-files and pre-configure one map for each world it finds on your server.
- Open the `core.conf` config-file, read through the comments and agree to downloading some extra resources from Mojang
  by changing `accept-download` to `true`.
- Open the `webserver.conf` config-file and change the `port` to the **second port** that you got from your hosting-provider to use.
- Now you can go through the rest of the config-files and change the settings to your liking. 
  *(More info for configuring BlueMap can be found [here]({{site.baseurl}}/wiki/getting-started/Configuration))*
- After you have edited the configs, use the command `/bluemap reload` on your server or restart the server.

If everything is set up correctly, BlueMap should start to render your maps. Check the console/logs for any errors or warnings.

You can use `/bluemap` to see the progress and go to `http://<your-server-ip>:<port>/` to view the maps.

## Installing BlueMap with an SQL-Server
This setup extends the basic setup by using an SQL-Server to store your maps. 

### Prerequisites
- All the prerequisites from the basic setup
- An SQL-Server that can be accessed from your server

### Steps
- Use the basic setup above to install BlueMap like normal
- In your config-files, open the `storages/sql.conf`-file and configure the connection to your SQL-Server.
  *(See [this page]({{site.baseurl}}/wiki/getting-started/Configuration#configuring-the-map-storages-store-maps-in-a-database-or-a-different-directory) 
  for more info about this config-file)*
- Now open each of your map-config-files and set `storage` to `"sql"`.
- Reload BlueMap with `/bluemap reload`.

If everything is set up correctly, BlueMap should start to render your maps and store them on the SQL-Server.
Check the console/logs for any errors or warnings.

## Using BlueMap on the CLI / standalone
You can use BlueMap as a standalone app on the [CLI](https://en.wikipedia.org/wiki/Command-line_interface). 
This is useful if you want to render a map of a minecraft-world, but don't want to set up an entire minecraft-server.

### Prerequisites
- A minecraft-world that you want to render
- Any **port** that you can use to host the webserver on
  *(Ask your hosting service if & how you can open a port)*

### Steps
- First you want to download the bluemap-jar. You can choose and download a version from 
  [here](https://github.com/BlueMap-Minecraft/BlueMap/releases).
  Make sure it targets CLI and is compatible with the minecraft-version of the world you want to render.
- Choose/create a directory where you want BlueMap to run and generate its config-files and store your 
  downloaded jar in this folder.
- Open the CLI and change your [cwd](https://en.wikipedia.org/wiki/Working_directory) to the folder containing 
  your jar. *(usually using the command `cd <path-to-your-folder>`)*
- Run `java -jar BlueMap-cli.jar` so BlueMap generates the configuration-files next to the jar in your cwd.
- Open the `core.conf` config-file, read through the comments and agree to downloading some extra resources from Mojang
  by changing `accept-download` to `true`.
- Set up your map-configs for the world(s) you want to render.
- Now you can go through the rest of the config-files and change the settings to your liking.
  *(More info for configuring BlueMap can be found [here]({{site.baseurl}}/wiki/getting-started/Configuration))*
- After you have edited the configs run `java -jar BlueMap-cli.jar -r` to start the render.
- With `java -jar BlueMap-cli.jar -w` you can also start the builtin web-server to be able to view your map. 
  Or you can read [this]({{site.baseurl}}/wiki/webserver/ExternalWebservers) to learn how to setup NGINX or 
  Apache for BlueMap.
