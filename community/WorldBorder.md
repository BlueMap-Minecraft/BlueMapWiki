---
layout: page
title: Adding a World Border
parent: Community Guides
nav_order: 13
---

# Adding a World Border
{: .no_toc }

There are many ways to display your world border on your map.  
All of them work by adding a marker to the map, but some ways are simpler than others, at the cost of control or supported platforms.  
This guide will list a few of the most common ways to add a world border to your BlueMap!

{:toc}

## Manual in the config
This is the most supported method. This will work on every platform (Paper/Fabric/Forge/etc).
Go to your BlueMap config directory, and open the `maps` folder.
In there, you will find a `.conf` file for each of your maps.  
Open the file that corresponds to the world that you want to add a world border to, and scroll to the bottom, until the `marker-sets` section.  
Copy this snippet into there, and adapt it to your liking:
```hocon
marker-sets: {
    world-borders: {
        label: "World Borders"
        toggleable: true
        default-hidden: false
        sorting: 0
        markers: {
            world-border: {
                type: "shape"
                label: "World Border"
                position: { x: 0, y: 64, z: 0 } # Center of your world
                shape-y: 64
                shape: [
                    { x: -1000, z: -1000 }  # Top-Left (North-West)
                    { x:  1000, z: -1000 }  # Top-Right (North-East)
                    { x:  1000, z:  1000 }  # Bottom-Right (South-East)
                    { x: -1000, z:  1000 }  # Bottom-Left (South-West)
                ]
                line-color: { r: 255, g: 0, b: 0, a: 1.0 }  # red
                fill-color: { r:   0, g: 0, b: 0, a: 0.0 }  # fully see-through
            }
        }
    }
}
```
For more information on how to create markers, please refer to the [official Markers Guide]({{site.baseurl}}/wiki/customization/Markers.html).

## Manual with commands
You can manually also create markers with the popular 3rd-party addon, [BlueMap Marker Manager](https://modrinth.com/plugin/bmarker). (Available as a Paper plugin and as a Fabric mod.)  
This addon allows you to create BlueMap markers via in-game commands, instead of via the config.

Create the marker set:
```
/bmarker set-create
/bmarker-setup-set id worldborders
/bmarker-setup-set map "world.(overworld)"
/bmarker-setup-set label World Borders
/bmarker-setup-set build
```

Create the world border marker:
```
/bmarker create shape
/bmarker-setup id worldborder
/bmarker-setup label World Border
/bmarker-setup marker_set "worldborders_world.(overworld)"
/bmarker-setup add_edge -1000 1000
/bmarker-setup add_edge -1000 -1000
/bmarker-setup add_edge 1000 -1000
/bmarker-setup add_edge 1000 1000
/bmarker-setup height 64
/bmarker-setup line_color 255 0 0 1
/bmarker-setup fill_color 0 0 0 0
/bmarker-setup build
```

## Automatic with BlueBorder
There is a much simpler way to add a world border, if you're using the vanilla world border: you can install the [BlueBorder](https://github.com/pop4959/BlueBorder) plugin!  
It automatically adds a world border marker at the position of your world border, without any commands or configuration necessary!  
You can choose the colour for your border in the config file.

## Automatic with BlueBridge
[BlueBridge](https://github.com/Mark-225/BlueBridge) is another plugin that can add a marker where your vanilla world border is.
Download `BlueBridgeCore.jar` and `BlueBridgeWB.jar`, and place them in your plugins folder.  
For more information on how to use this plugin, please visit [its wiki](https://github.com/Mark-225/BlueBridge/wiki/Usage).

## Automatic with ChunkyBorder
If you're not using the vanilla world border, you can also use [Chunky](https://modrinth.com/plugin/chunky) and its extension [ChunkyBorder](https://modrinth.com/plugin/chunkyborder) to add a world border.  
You can then create a world border like this:
```
/chunky radius 1000
/chunky border add
```
or like this:
```
/chunky world the_nether
/chunky shape circle
/chunky radius 1000
/chunky border add
```
For more information on how to use Chunky and ChunkyBorder, please visit their respective wiki's: [Chunky Wiki](https://github.com/pop4959/Chunky/wiki) and [ChunkyBorder Wiki](https://github.com/pop4959/ChunkyBorder/wiki)  
You can choose the colour for your border in the config file.

If this is an Earth map that you got from from [earth.motfe.net](https://earth.motfe.net/), then you can find the exact commands and coordinates to add your border on this website: [docs.apocmc.us/minecraft-earth-map/map-borders](https://docs.apocmc.us/minecraft-earth-map/map-borders#id-1-500-scale-map)  
Please note that you do _not_ have to run `/chunky start`, though, like this website suggests!
