---
layout: page
title: Installing Resource-Packs
parent: Advanced Customization
grand_parent: Wiki
nav_order: 3
---

# Installing Resource-Packs

BlueMap supports the use of minecraft resource-packs. If you want to change the appearance of your map, 
use high resolution textures or fancy block-models.

> **Important:**  
> If you change your resource-pack setup you need to delete your previous renders! 
> Purge your maps with `/bluemap purge <map>`.
> Otherwise, you will get broken models with really weird textures.
{: .info .important }

To install a resource-pack you just need to put the resource-pack folder or zip in the folder `resourcepacks` next to 
your configuration files and reload BlueMap. BlueMap will scan the folder and try to load every resource it finds.

> Sponge, Forge, Fabric: `./config/bluemap/resourcepacks/`<br>
> Spigot/Paper: `./plugins/BlueMap/resourcepacks/`
{: .info }

You can use more than one resource-pack. Like in minecraft, they will override each other. They are loaded in 
alphabetical order, so a resource-pack called `zzzresources.zip` will override `aaaresources.zip`.<br>
This means you can reorder them by renaming them e.g. `01_some_pack.zip`, `02_some_extension_pack.zip`...

Make sure the resource-pack is for the correct minecraft-version. Otherwise, it might not be loaded correctly.<br>
There might be warnings in the console if you are using resource-packs that have some unexpected formatting. A warning
mostly results in a single (block-)model not loaded correctly, so all the other resources from that resource-pack are 
still being loaded.