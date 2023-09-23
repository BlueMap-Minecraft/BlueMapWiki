---
layout: page
title: Pre-Configuration for Minecraft Earth maps
parent: Community Guides
nav_order: 10
---

Before using Bluemap (or any map plugin) with Minecraft Earth maps, you need to do some pre-configuration. This is due to lighting and rendering issues with WorldPainter as a whole due to it depending on chunks being loaded.

You'll need some plugins: [Chunky](https://www.spigotmc.org/resources/chunky.81534/), [ChunkyBorder](https://www.spigotmc.org/resources/chunkyborder.84278/), and [Light Cleaner](https://www.spigotmc.org/resources/light-cleaner.42469/).

Make sure you've purged the map first (`/bluemap freeze <Map name>` to freeze any automatic rendering [and clean up old chunks], and `/bluemap purge <Map name>`)

First off, **set the world border.** This will ensure that players cannot escape the earth map and helps with Chunky and Light Cleaner later. Open this link and follow the steps for your worldmap size: https://docs.apocmc.us/minecraft-earth-map/map-borders  
This will also prerender the map to remove some extra issues. Wait for it to finish before proceeding.

Next, do `/cleanlight world <Map name>`. This will clean up the bugged lighting on these maps, letting Bluemap properly render the map. Wait for it to finish (you can check with `/cleanlight status`, it's going to take a while).

Now that preconfiguration is done, do `/bluemap render <Map name>` to start rendering the world again! Make sure you unfreeze the world too with `/bluemap unfreeze <Map name>`.
