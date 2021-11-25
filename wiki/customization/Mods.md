---
layout: page
title: Configuring Mods
parent: Advanced Customization
grand_parent: Wiki
nav_order: 2
---

# Configuring Mods
{: .no_toc }

If you render a world with custom blocks added by mods, BlueMap does not know how to render those blocks so they will 
look like this:

![Unknown block render example](https://pbs.twimg.com/media/ENeQqrbX0AElXmJ?format=jpg&name=large)

If you don't want that, you can try to add and configure the resources of those mods to tell BlueMap how to render 
those blocks.<br>
Here is how it works:

1. TOC
{:toc}

## General

> **Info:**<br>
> Read the chapter [Installing-resource-packs]({{site.baseurl}}/wiki/customization/ResourcePacks.html) before reading this chapter.
{: .info }

Usually, the only thing you need to do, is to take the **client**-version of the mod.jar and put it into the 
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

## Configs (optional)
**Optionally** you can add some configs to tell bluemap how to render special blocks.<br>
**You need to put these config files in a .zip file, and that .zip file into bluemaps resourcepacks folder.** 

### Block-properties config
**File:** `assets/modid/blockProperties.json`<br>
**Example:**
```json
{
  "minecraft:bubble_column": { "alwaysWaterlogged": true },
  "minecraft:grass": { "randomOffset": true },
  "minecraft:glass": { "occluding": false }
}
```

Usually bluemap tries to guess those properties based on the block's model. But if that guess is not correct, you can
change the render-behaviour of a block with this config.

Possible properties for blocks are:
- `alwaysWaterlogged` are blocks that are waterlogged by default. So they don't need the "waaterlogged" property to 
  be rendered as a waterlogged block
- `randomOffset` are blocks that have a small random offset to break the grid-like pattern. In vanilla minecraft this is
  done for grass-blocks and flowers
- `occluding` is used to determine if the block is "occluding" light when calculating 
  the [ambient occlusion](https://en.wikipedia.org/wiki/Ambient_occlusion) on neighbor blocks.

### Block-colors config
**File:** `assets/modid/blockColors.json`<br>
**Example:**
```json
{
  "minecraft:water": "@water",
  "minecraft:grass": "@grass",
  "minecraft:redstone_wire": "#ff0000",
  "minecraft:birch_leaves": "#86a863",
  "minecraft:redstone_wire": "@redstone"
}
```

Some blocks like grass, leaves, water or redstone are dynamically colored. Those colors change by biome, 
properties or are just static.

Possible values are `@foliage`, `@grass`, `@water` to use the foliage-, grass- or water-color of the biome to color 
the block, `redstone` to use the power-level of the block *(used for redstone)*,
or a static color using a [css-style color-hex](https://htmlcolorcodes.com/color-picker/) like `#86a863`.

### Biomes config
**File:** `assets/modid/biomes.json`<br>
**Example:**
```json
{
    "minecraft:flower_forest": {
        "humidity": 0.8,
        "temp": 0.7,
        "watercolor": 4159204
    },
    "minecraft:birch_forest": {
        "humidity": 0.6,
        "temp": 0.6,
        "watercolor": 4159204
    },
    "minecraft:dark_forest": {
        "humidity": 0.8,
        "temp": 0.7,
        "watercolor": 4159204,
        "foliagecolor": "#5528340a",
        "grasscolor": "#8828340a"
    }
}
```

If a mod adds a new biome, bluemap needs to know some properties of that biome to calculate things like grass and 
foliage-color. You can define these using this config. Undefined biomes will be treated as an ocean-biome.

*(The biomes-config works only for Minecraft 1.18+ worlds)*

## Infos for mod-developers
If you want your mod to be compatible with BlueMap you can simply add all needed resources and configs to your jar-file.

If you need to override your own resources exclusively for bluemap, you can do this by adding them inside the 
`assets/<namespace>/bluemap` folder.<br>
*(E.g. `assets/yourmod/bluemap/blockstates/someblock.json` will override `assets/yourmod/blockstates/someblock.json`)*
