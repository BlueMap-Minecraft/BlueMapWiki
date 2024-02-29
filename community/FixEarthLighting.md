---
layout: page
title: Fixing lighting issues with Earth maps
parent: Community Guides
nav_order: 10
---

# Fixing lighting issues with Earth maps

Earth maps are usually created using third party tools such as WorldPainter, which create minimal chunk data, often missing important components such as lighting information.
Normally, you won't notice this, because the server will automatically fix lighting data when players load the chunks.
However, BlueMap directly reads chunk data from disk. This is much more efficient and allows BlueMap to easily support many platforms, but also means the chunk data needs to be complete before BlueMap can read it properly.
This is why it can be useful to run a tool to fix the data in these chunks first before we start rendering the map. We recommend using Chunky since it is supported on most platforms that BlueMap runs on, but for Bukkit-based servers Light Cleaner is also an option.


## Chunky Instructions

First make sure you have Chunky installed. You can download it at [https://modrinth.com/plugin/chunky](https://modrinth.com/plugin/chunky).

Now to fix lighting issues in the world, we will want to force re-loading of all of the chunks in the world. This can be done using the steps outlined below.

1. Open the config file for Chunky: `Chunky/config.yml`
2. Set the option `force-load-existing-chunks` to `true`, and save the file
3. Restart the server, or run `chunky reload` to reload the configuration file on the server
4. Set the world using `/chunky world earth` (or the name of the world if not named "earth")
5. Set the radius using `/chunky radius 100000` (or large enough to cover the entire world)
6. Set the world pattern using `/chunky pattern world` which will specify re-loading only existing chunks in the world
7. Run `/chunky start` to start the loading process. This may take a long time so patience is required.
8. Restart the server when this completes. This is important to make sure all fixed chunks have been saved properly.
9. Run `/bluemap purge <map-id>` to re-render your world, this time hopefully with fixed lighting!

## Light Cleaner Instructions

First make sure you have Light Cleaner installed. You can download it at [https://www.spigotmc.org/resources/light-cleaner.42469/](https://www.spigotmc.org/resources/light-cleaner.42469/).

Now to fix lighting issues in the world, we will want to run the light cleaner.

1. Run `/cleanlight world earth` (or the name of the world if not named "earth")
2. Check `/cleanlight status` for progress. This may take a long time so patience is required.
3. Restart the server when this completes. This is important to make sure all fixed chunks have been saved properly.
4. Run `/bluemap purge <map-id>` to re-render your world, this time hopefully with fixed lighting!
