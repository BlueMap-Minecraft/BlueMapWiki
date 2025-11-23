---
layout: page
title: Maps
parent: Configs
grand_parent: Wiki
nav_order: 5
---

# Map-Config

In your `maps` directory, there is one `.conf` file per map.  
Usually, that will be three: `world.conf`, `world_nether.conf`, and `world_the_end.conf`,
but may be more or less depending on the amount of loaded worlds when BlueMap was first installed.

You can copy another map config to create a new map.
You will probably want to change at least the [`world`](#world) and [`name`](#name) options,
but you don't actually have to! By keeping them the same, you can have multiple maps of the same world.

> **Info:**  
> When a "default" is mentioned for any option, it is meant that if the option is commented out, that is what BlueMap will use.  
> This may not be the same as the option that is pre-filled-in.
{: .info }

## `world`
The path to the save-folder of the world to render.

(If this is not defined (commented out or removed), the map will be only registered to the web-server and the web-app, but not rendered or loaded by BlueMap. This can be used to display a map that has been rendered somewhere else.)

## `dimension`
The dimension of the world. Can be `"minecraft:overworld"`, `"minecraft:the_nether"`, `"minecraft:the_end"` or any dimension-key introduced by a mod or datapack.

## `name`
The display-name of this map -> how this map will be named on the webapp.

You can change this at any time.

_Default is the id of this map_

## `sorting`
A lower value makes the map sorted first (in lists and menus), a higher value makes it sorted later.  
The value needs to be an integer, but it can be negative.

You can change this at any time.

_Default is_ `0`

## `start-pos`
The position on the world where the map will be centered if you open it.

You can change this at any time.

_This defaults to the world-spawn if you don't set it._

## `sky-color`
The color of the sky as a hex-color

You can change this at any time.

_Default is_ `"#7dabff"`

## `void-color`
The color of the void as a hex-color

You can change this at any time.

_Default is_ `"#000000"`

## `sky-light`
Defines the initial sky-light-strength the map will be set to when it is opened.

`0` is no sky-light, `1` is fully lighted.

You can change this at any time.

_Default is_ `1`

## `ambient-light`
Defines the ambient light-strength that every block is receiving, regardless of the sunlight/blocklight.

`0` is no ambient light, `1` is fully lighted.

You can change this at any time.

_Default is_ `0`

## `remove-caves-below-y`
BlueMap tries to omit all blocks that are below this Y-level and are not visible from above-ground.  
More specifically: Block-Faces that have a sunlight/skylight value of 0 are removed.

This improves the performance of the map on slower devices by a lot, but might cause some blocks to disappear that should normally be visible.

**Changing this value requires a re-render of the map.**

Set to a very high value to remove caves everywhere (e.g. `10000`)  
Set to a very low value to remove nothing and render all caves (e.g. `-10000`)  

_Default is_ `55` _(slightly below water-level)_

## `cave-detection-ocean-floor`
This is the amount of blocks relative to the "ocean-floor" heightmap that the cave-detection will start at.  
Everything above that (heightmap-relative) y-level will not be removed.

Comment or set to a very high value to disable using the ocean-floor heightmap for cave-detection.

**Changing this value requires a re-render of the map.**

_Defaults to_ `10000` _(disabled)_

## `cave-detection-uses-block-light`
With this value set to `true`, BlueMap also uses the block-light value (additionally to the sky-light) to "detect caves".  
(See: [`remove-caves-below-y`](#remove-caves-below-y))

**Changing this value requires a re-render of the map.**

_Default is_ `false`

## `min-inhabited-time`
The minimum "inhabitedTime" value that a chunk must have to be rendered.  
The "inhabitedTime" value of a chunk refers to the cumulative number of ticks players have been near this chunk.

If you set this to a value greater than `0`, BlueMap will only render chunks that players have visited already.

_Default is_ `0`

## `render-mask`
With the render-mask you can limit the map-render.

This can be used to render only a certain part of a world, or ignore the Nether's ceiling.

If you change the render-mask, BlueMap automatically tries to update the map,
including deleting map-tiles which are outside the new limits.

You can use `/bluemap fix-edges <map>` to fix any remaining issues.

Please check out [this wiki page](/wiki/customization/Masks.md) for more detailed information on how to configure this.

_Default is no mask; BlueMap will render everything that exists._

## `render-edges`
Using this, BlueMap pretends that every Block outside of the defined render-mask is AIR,
this means you can see the blocks where the world is cut (instead of having a see-through/xray view).  
This has only an effect if you set some [`render-mask`](#render-mask) above.

**Changing this value requires a re-render of the map.**

_Default is_ `true`

## `edge-light-strength`
The sun-light strength that blocks at map-edges will recieve if render-edges is enabled.

Should be a value between `0` and `15`

_Default is_ `15`

## `enable-perspective-view`
Whether the perspective view will be enabled for this map.

**Changing this to `true` requires a re-render of the map, only if the hires-layer is enabled and free-flight view is disabled.**

_Default is_ `true`

## `enable-flat-view`
Whether the flat (isometric, top-down) view will be enabled for this map.

Having only flat-view enabled while disabling free-flight and perspective will speed up the render and reduce the maps storage-size.

_Default is_ `true`

## `enable-free-flight-view`
Whether the free-flight view will be enabled for this map.

**Changing this to `true` requires a re-render of the map, only if the hires-layer is enabled and perspective view is disabled.**

_Default is_ `true`

## `enable-hires`
Whether the hires-layer will be enabled.

Disabling this will speed up rendering and reduce the size of the map-files a lot.
But you will not be able to see the full 3d-models if you zoom in on the map.

Changing this to `false` will not remove any existing tiles; existing tiles just won't get updated anymore.

**Changing this to `true` will require a re-render of the map.**

_Default is_ `true`

## `storage`
This defines the [storage-config](storages/) that will be used to save this map.

You can find your storage configs next to this config file in the 'storages'-folder.

**Changing this value requires a re-render of the map. The map in the old storage will not be deleted.**

_Default is_ `"file"`

## `ignore-missing-light-data`
Normally BlueMap detects if a chunk has not yet generated it's light-data and omits rendering those chunks.

If this is set to `true`, BlueMap will render Chunks even if there is no light-data!

This can be useful for example if some mod prevents light-data from being saved correctly.  
However, this also has a few drawbacks:
- For those chunks, every block will always be fully lit
- Night-mode might not work correctly
- Caves will always be rendered (ignoring the [`remove-caves-below-y`](#remove-caves-below-y) setting)

_Default is_ `false`

## `marker-sets`
Here you can define any static marker-sets with markers that should be displayed on the map.

You can change this at any time.

If you need dynamic markers, you can use any plugin that integrates with BlueMap's API.  
[Here is a list.](/community/3rdPartySupport.md)

Please check out [this wiki page](/wiki/customization/Markers.md) for information on how to configure this.
