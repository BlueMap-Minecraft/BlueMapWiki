---
layout: page
title: Configuring Mods
parent: Advanced Customization
grand_parent: Wiki
nav_order: 5
---

# Configuring Mods
{: .no_toc }

1. TOC
{:toc}

## General
BlueMap is automatically looking for mods and datapacks in your server-files. If it finds them it will try to load them
and parse its resources to be able to render any additional blocks.  
If you don't want this, you can turn this auto-discovery off in the `core.conf` -> `scan-for-mod-resources`.

BlueMap might not be able to parse all blocks and resources for a mod. For example, if a mod generates its resources/block-models at
runtime, BlueMap won't be able to find them in the `mod.jar` and will not be able to render them correctly!
If you have experience with creating resource-packs with custom models, then you can easily make a resource-pack with static
resources for such a mod. BlueMap can then load your resource-pack instead and render the blocks based on that.

## Configs
Some mods add special blocks that have properties that BlueMap can't easily read from the mod's resources.
For this, you can add some configs to tell BlueMap how to render them.  
**You need to put these config files in a .zip file or folder, and then put that into BlueMap's `packs` folder.**  
*(You are basically creating a special resource-pack for BlueMap here)*

### Custom block models
Use the standard [resourcepack format](https://minecraft.wiki/w/Resource_pack) to define custom block-states and block-models.

### Custom biomes
Use the standard [datapack format](https://minecraft.wiki/w/Biome_definition) to define custom biomes.

### Block-properties config
**File:** `assets/modid/blockProperties.json`<br>
**Example:**
```json
{
  "minecraft:bubble_column": { "alwaysWaterlogged": true },
  "minecraft:grass": { "randomOffset": true },
  "minecraft:glass": { "occluding": false, "cullingIdentical": true },
  "minecraft:ice": { "cullingIdentical": true }
}
```

Usually BlueMap tries to guess those properties based on the block's model. But if that guess is not correct, you can
change the render-behaviour of a block with this config.

Possible properties for blocks are:
- `alwaysWaterlogged` are blocks that are waterlogged by default. So they don't need the "waterlogged" property to 
  be rendered as a waterlogged block
- `randomOffset` are blocks that have a small random offset to break the grid-like pattern. In vanilla minecraft this is
  done for grass-blocks and flowers
- `occluding` is used to determine if the block is "occluding" light when calculating 
  the [ambient occlusion](https://en.wikipedia.org/wiki/Ambient_occlusion) on neighbor blocks.
- `cullingIdentical` means that if the block is directly next to another block of the same type, then the side facing 
  that block will be culled (removed)

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
the block, `@redstone` to use the power-level of the block *(used for redstone)*,
or a static color using a [css-style color-hex](https://htmlcolorcodes.com/color-picker/) like `#86a863`.
