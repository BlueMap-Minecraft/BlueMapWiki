---
layout: page
title: Fixing lighting issues with Chunky
parent: Community Guides
nav_order: 10
---

Earth maps are usually created using third party tools such as WorldPainter, which create minimal chunk data, often missing important components such as lighting information.
Normally, you won't notice this, because the server will automatically fix lighting data when players load the chunks.
However, BlueMap directly reads chunk data from disk. This is much more efficient and allows BlueMap to easily support many platforms, but also means the chunk data needs to be complete before BlueMap can read it properly.
This is why it can be useful to run a tool to fix the data in these chunks first before we start rendering the map. We recommend using Chunky since it is supported on most platforms that BlueMap runs on, but for Bukkit-based servers Light Cleaner is also an option.

So, firstly, make sure you have Chunky installed. You can download it here: [modrinth.com/chunky](https://modrinth.com/plugin/chunky)

Now, to fix the lighting issues in your world:
1. Shut down your server
2. Open Chunky's config file: `Chunky/config.yml`
3. Set `force-load-existing-chunks:` to `true`, and save and close the file
4. Start your server back up again
5. Run this command: `/chunky radius 1000k`
    - Or use an even bigger number. Just make sure that your whole world is enveloped by this.
    - This sets Chunky to (re)generate a million radius (But don't worry! It won't _actually_ do that, due to the next step!)
6. Run this command: `/chunky pattern world`
   - This sets Chunky to only go over and fix the chunks that have already been generated. This prevents it from going all the way out to the 1000k blocks!
7. Run this command: `/chunky start`
    - This starts the cleanup process. This may take a while, so be patient!
8. Once it is done, **restart your server!**
    - This is very important, to force Minecraft to acknowledge the fixed chunks.
9. And finally run `/bluemap purge <map-id>` to rerender your world! This time with all cleaned-up lighting :D

If you want a border around your map and if you got your Earth map from [earth.motfe.net](https://earth.motfe.net/), then you can install ChunkyBorder: [modrinth.com/chunkyborder](https://modrinth.com/plugin/chunkyborder).  
You can then find the exact commands and coordinates to add your border at, on this website: [docs.apocmc.us/minecraft-earth-map/map-borders](https://docs.apocmc.us/minecraft-earth-map/map-borders#id-1-500-scale-map)  
Please note that you do _not_ have to run `/chunky start`, though, like this website suggests!
