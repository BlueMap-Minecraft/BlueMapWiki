---
layout: page
title: Fixing lighting issues with Chunky
parent: Community Guides
nav_order: 10
---

Earth maps are usually made with the program WorldPainter, which exports worlds with somewhat broken lighting data.  
Normally, you don't notice this, because the server automatically fixes the lighting data whenever it needs to load the chunks, due to a player coming near them.  
However, BlueMap does not use ask server to load the chunks, but instead it reads the chunk files on your actual disk itself. This is much more reliable, and also what allows BlueMap to support so many platforms!  
But due to this, the server doesn't fix a chunk's lighting data before BlueMap renders it. This is why we need to use a tool like Chunky to fix them!

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
