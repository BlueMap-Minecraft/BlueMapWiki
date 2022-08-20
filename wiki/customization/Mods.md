---
layout: page
title: Configuring Mods
parent: Advanced Customization
grand_parent: Wiki
nav_order: 4
---

# Configuring Mods
{: .no_toc }

1. TOC
{:toc}

## General
BlueMap is automatically looking for mods and datapacks in your server-files. If it finds them it will try to load them
and parse its resources to be able to render any additional blocks.  
If you don't want this, you can turn this auto-discovery off in the `core.conf` -> `scan-for-mod-resources`.

BlueMap might not be able to parse all blocks and resources for a mod. For example, if a mod generates it's resources/block-models at
runtime, bluemap won't be able to find them in the `mod.jar` and will not be able to render them correctly!
If you have experience with creating resource-packs with custom models, then you can easily make a resource-pack with static
resources for such a mod. BlueMap can then load your resource-pack instead and render the blocks based on that.

## Configs
Some mods add special blocks or biomes that bluemap can't easily read from the mod's resources.
For this, you can add some configs to tell bluemap how to render those special blocks and biomes.  
**You need to put these config files in a .zip file or folder, and then put that into bluemaps resourcepacks folder.**  
*(You are basically creating a special resource-pack for bluemap here)*

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
- `alwaysWaterlogged` are blocks that are waterlogged by default. So they don't need the "waterlogged" property to 
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
        "temperature": 0.7,
        "watercolor": 4159204
    },
    "minecraft:birch_forest": {
        "humidity": 0.6,
        "temperature": 0.6,
        "watercolor": "#3f76e4"
    },
    "minecraft:dark_forest": {
        "humidity": 0.8,
        "temperature": 0.7,
        "watercolor": 4159204,
        "foliagecolor": "#28340a55",
        "grasscolor": "#28340a88"
    }
}
```

If a mod adds a new biome, bluemap needs to know some properties of that biome to calculate things like grass and 
foliage-color. You can define these using this config. Undefined biomes will be treated as an ocean-biome.

*(The biomes-config works only for Minecraft 1.18+ worlds)*
