---
layout: page
title: Installation
parent: Wiki
nav_order: 2
---

# Installation
{: .no_toc }

1. TOC
{:toc}

## Prerequisites
To run bluemap you need:
- Java 8 or newer
- Minecraft Java-Edition

## As a sponge-plugin
If you have a [sponge](https://www.spongepowered.org/)-server, you can use bluemap as a plugin on your server. 
The plugin then renders and actively updates your map when something changes. 
Render-tasks are paused and resumed if the server shuts down / restarts.

- First you want to download the bluemap-jar. You can choose and download a version 
  from [here](https://github.com/BlueMap-Minecraft/BlueMap/releases) or from 
  [sponges plugin-repository](https://ore.spongepowered.org/Blue/BlueMap). 
  Make sure it targets the SpongeAPI-Version of your server!
- Put the downloaded jar in the `mods`-folder of your server and restart the server.
- BlueMap will now generate the configuration files here `./config/bluemap/`, open those configs with your 
  favorite editor and read the chapter [Configuration]({{site.baseurl}}/wiki/Configuration) to learn how to configure 
  bluemap.
- After you have edited the configs use the command `/bluemap reload` on your server or restart the server.
- Run the command `/bluemap render <world>` on the server to start an initial render of the whole world.

## As a spigot/paper-plugin
If you have a [spigot](https://www.spigotmc.org/) or [paper](https://papermc.io/)-server, 
you can use bluemap as a plugin on your server. The plugin then renders and actively updates your map when something 
changes. Render-tasks are paused and resumed if the server shuts down / restarts.

- First you want to download the bluemap-jar. You can choose and download a version from 
  [here](https://github.com/BlueMap-Minecraft/BlueMap/releases) or
  [spigotmc.org](https://www.spigotmc.org/resources/bluemap.83557/).
  Make sure it targets the SpigotAPI-Version of your server!
- Put the downloaded jar in the `plugins`-folder of your server and restart the server.
- BlueMap will now generate the configuration files here `./plugins/BlueMap/`, open those configs with your favorite 
  editor and read the chapter [Configuration]({{site.baseurl}}/wiki/Configuration) to learn how to configure bluemap.
- After you have edited the configs use the command `/bluemap reload` on your server or restart the server.
- Run the command `/bluemap render <world>` on the server to start an initial render of the whole world.

## As a forge/fabric-mod
If you have a [forge](https://minecraftforge.net/) or [fabric](https://fabricmc.net/)-server, you can use bluemap as a 
mod on your server. The mod then renders and actively updates your map when something changes. 
Render-tasks are paused and resumed if the server shuts down / restarts.

- First you want to download the bluemap-jar. You can choose and download a version from 
  [here](https://github.com/BlueMap-Minecraft/BlueMap/releases). 
  Make sure it targets the forge/fabric-Version of your server!
- If you have a fabric-server you will also need to install the 
  [fabricAPI](https://www.curseforge.com/minecraft/mc-mods/fabric-api) mod.
- Put the downloaded bluemap-jar in the `mods`-folder of your server and restart the server.
- BlueMap will now generate the configuration files here `./config/bluemap/`, open that config with your 
  favorite editor and read the chapter [Configuration]({{site.baseurl}}/wiki/Configuration) to learn how to 
  configure bluemap.
- After you have edited the configs use the command `/bluemap reload` on your server or restart the server.
- Run the command `/bluemap render <world>` on the server to start an initial render of the whole world.

## On the CLI / standalone
You can use bluemap as a standalone app using the [CLI](https://en.wikipedia.org/wiki/Command-line_interface). 
This is useful if you want to render a map of a minecraft-world you have, but don't want to setup a server.

- First you want to download the bluemap-jar. You can choose and download a version from 
  [here](https://github.com/BlueMap-Minecraft/BlueMap/releases). Make sure it targets CLI and is compatible with the 
  minecraft-version of the world you want to render.
- Choose/create a directory where you want bluemap to run and generate it's config and files and store your 
  downloaded jar in this folder.
- Open the CLI and change your [cwd](https://en.wikipedia.org/wiki/Working_directory) to the folder containing 
  your jar. *(using `cd <path-to-your-folder>`)*
- Run `java -jar BlueMap-cli.jar` so bluemap generates the configuration-files next to the jar in your cwd.
- Now open the configs using your favorite editor and read the chapter 
  [Configuration]({{site.baseurl}}/wiki/Configuration) to learn how to configure bluemap.
- After you have edited the configs run `java -jar BlueMap-cli.jar -r` to start the render.
- With `java -jar BlueMap-cli.jar -w` you can also start the builtin web-server to be able to view your map. 
  Or you can read [this]({{site.baseurl}}/wiki/Configuring-external-web-servers) to learn how to setup NGINX or 
  Apache for BlueMap.