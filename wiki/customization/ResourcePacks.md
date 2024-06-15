---
layout: page
title: Resource/Data-packs
parent: Advanced Customization
grand_parent: Wiki
nav_order: 3
---

# Installing Resourcepacks or Datapacks

BlueMap supports the use of minecraft resourcepacks and datapacks. If you want to change the appearance of your map, 
use high resolution textures or fancy block-models or customize biomes.

> **Important:**  
> If you change your resource/data-pack setup you need to delete your previous renders! 
> Purge your maps with `/bluemap purge <map>`.
> Otherwise, you might get broken models and/or weird texture-mixups.
{: .info .important }

To install a resource/data-pack you just need to put the pack-folder or zip into the folder `packs` next to 
your configuration files and reload BlueMap. BlueMap will scan the folder and try to load every resource it finds.

> Sponge, Forge, Fabric: `./config/bluemap/packs/`<br>
> Spigot/Paper: `./plugins/BlueMap/packs/`
> CLI: `./config/packs/`
{: .info }

You can use more than one resource/data-pack. Like in minecraft, they will override each other. They are loaded in 
alphabetical order, so a pack called `zzzresources.zip` will override `aaaresources.zip`.  
This means you can reorder them by renaming them e.g. `01_some_pack.zip`, `02_some_extension_pack.zip`...

Make sure the resource/data-pack is for the correct minecraft-version. Otherwise, it might not be loaded correctly.  
You can check the `./bluemap/logs/debug.log` (`./data/logs/debug.log` on cli) to find warnings that might occur when 
loading resource/data-packs.
