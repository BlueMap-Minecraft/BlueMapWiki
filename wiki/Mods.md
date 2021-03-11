---
layout: page
title: Configuring Mods
parent: Wiki
nav_order: 6
---

# Configuring Mods
{: .no_toc }

If you render a world with custom blocks added by mods, BlueMap does not know how to render those blocks so they will 
look like this:

![Unknown block render example](https://pbs.twimg.com/media/ENeQqrbX0AElXmJ?format=jpg&name=large)

If you don't want that, you can try to add and configure the resources of those mods to tell BlueMap how to render 
those blocks. **Unfortunately for 1.12.x this is not easy and very tedious.** Here is how it works:

1. TOC
{:toc}

## General

> **Info:**<br>
> Read the chapter [Installing-resource-packs]({{site.baseurl}}/wiki/ResourcePacks.html) before reading this chapter.
{: .info }

The first and most important thing to do this, is to take the **client**-version of the mod.jar and put it into the 
`resourcepacks`-folder.<br>
E.g. if you want to add support for biomes-o-plenty you take the `biomesoplenty.jar` from your client and upload it 
on your server into bluemaps `resourcepack`-folder *(next to bluemaps configuration-files)*!<br>

BlueMap will then load that mod like a resource-pack: Try to parse the block-states and models and load the textures.

> **Info:**<br>
> Some mods might use resource-formats that are not supported. 
> *([Forge's blockstate.json](https://mcforge.readthedocs.io/en/1.14.x/models/blockstates/forgeBlockstates/) just has 
> very limited support)* For this blocks to be rendered you will have to override the resources with alternative 
> resources using the normal format.
{: .info }

After that it could already work! But especially on 1.12.x you might need to do some more configuration. 
Go through the chapters below and prepare the config files.

## Configs

### Block-id config (1.12.2 only)
**File:** `blockIds.json`<br>
**Example:**
```json
{
  "extragrassmod:grass:0": "extragrassmod:grass[variant=mossy,snowy=false]",
  "extragrassmod:grass:1": "extragrassmod:grass[variant=dry,snowy=false]",
  "extragrassmod:grass:2": "extragrassmod:grass[variant=sandy,snowy=false]",
  "extragrassmod:grass:3": "extragrassmod:grass[variant=flowered,snowy=true]"
}
```

This is the most annoying part, but it is only needed with worlds (chunks) stored in the 1.12.x format! 
**So if you have a minecraft world with only 1.13.x and above, you don't need to do this.**

Before 1.13 and [the flattening](https://minecraft.gamepedia.com/Java_Edition_1.13/Flattening), blocks are stored by 
their numeric-id and a meta-value. So the andesite block for example has id `1` and a meta value of `5`, this is 
usually written like so: `1:5`.<br>
If a mod now adds a new block, this new block is being assigned to such an id. Forge then stores a mapping of the 
numeric-id and the literal-id of this block in a table in the world-files *(`level.dat`)*. Now BlueMap needs to know 
for each id:meta combination what block-state to render.

So, we have 3 id-types:
- The `numeric-id` (e.g. `169`) is some integer standing for some block. The mapped block can be different 
  for each world.
- The `literal-id` (e.g. `minecraft:sea_lantern`) is the (namespaced) unique name of the block.
- The `resource-id` (e.g. `minecraft:sea_lantern`) declares the namespace and the name of the block-state file in 
  resources (and resource-packs). So BlueMap would search in the loaded resources for the file 
  `assets/<namespace>/blockstates/<id>.json` (`assets/minecraft/blockstates/sea_lantern.json`). 
  This is usually the same as the `literal-id` but there are some rare cases where they are different.

To configure a block, you need to find all possible meta-values and their belonging literal-id + properties.
Then we format them like this: `"namespace:literal-id:meta": "namespace:resource-id[property1=value1,property2=value2]"`
and add them to the config *(see example above)*. You can also use the numeric-id instead of the literal-id,
but since this id can change across worlds this is not recommended.

Currently, there is no general way how to find this info, but here are some things that might help:
- Has the mod a wiki? Maybe there is some info.
- The literal-id and the properties of a block are usually displayed in-game if you press F3 and look at the block.
- The BlueMap plugin has a command `/bluemap debug` that shows you all the information BlueMap has about the block at 
  your feet and the one you are standing on. For 1.12.x this also includes the numeric-id and the meta-value.
- The mod/plugin [WorldEdit](https://www.curseforge.com/minecraft/mc-mods/worldedit) can create blocks based on 
  numeric-id:meta for you
- BlueMap generates a folder `missing-configs` that contains files with all blocks BlueMap did not find any
  configuration for. Those generated configs contain the default values BlueMap "guessed" for the blocks.


### Block-properties config
> **Info:**<br>
> If there are no properties defined for a block, BlueMap looks at the model and "guesses" its properties. This is
> usually accurate and you can ignore this config.
{: .info }

**File:** `blockProperties.json`<br>
**Example:**
```json
{
  "morenaturemod:special_log": {
    "culling": true,
    "occluding": true,
    "flammable": true
  },
  "morenaturemod:special_leaves": {
    "culling": false,
    "occluding": true,
    "flammable": true
  },
  "morenaturemod:cool_flower": {
    "culling": false,
    "occluding": false,
    "flammable": true
  }
}
```

To render blocks correctly, BlueMap needs to know if a block is:
- `culling` it's neighbor block-faces: If the neighbors block-face that is facing this block 
  [can be removed](https://en.wikipedia.org/wiki/Hidden-surface_determination#Occlusion_culling) because it is not
  visible.
- `occluding` near blocks: This is basically used to determine if the block is "occluding" light when calculating 
  the [ambient occlusion](https://en.wikipedia.org/wiki/Ambient_occlusion) on neighbor blocks.
- is `flammable`. This is currently only used in 1.12.x to calculate the appearance of fire.

### Block-colors config
**File:** `blockColors.json`<br>
**Example:**
```json
{
  "minecraft:water": "@water",
  "minecraft:grass": "@grass",
  "minecraft:redstone_wire": "#ff0000",
  "minecraft:birch_leaves": "#86a863"
}
```

Some blocks like grass, leaves, water or redstone are dynamically colored. Those colors change by biome, 
properties or are just static.

Possible values are `@foliage`, `@grass`, `@water` to use the foliage-, grass- or water-color of the biome to color 
the block, or a static color using a [css-style color-hex](https://htmlcolorcodes.com/color-picker/) like `#86a863`.

### Biomes config
This is still a todo, currently unknown biomes are treated as "ocean"-biomes.

## Installing those configs
Now you have some config files, but where do they go?

There are 2 places where you can put those configs:
1. in the config-folder next to the `core.conf` and `render.conf` etc...
2. in this folder inside a resource-pack: `assets/<mod-id>/bluemap`

The resource-pack is very useful if you want to create a mod-integration that is easy to share with others. :)

## Infos for mod-developers
If you want your mod to be compatible with BlueMap you can simply add all needed resources and configs to your jar-file.

All configs can be put in `assets/<namespace>/bluemap`.<br>
If you need to override your own resources exclusively for bluemap, you can do this by adding them inside the 
`assets/<namespace>/bluemap` folder.<br>
*(E.g. `assets/yourmod/bluemap/blockstates/someblock.json` will override `assets/yourmod/blockstates/someblock.json`)*