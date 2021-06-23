---
layout: page
title: Configuration
parent: Getting Started
grand_parent: Wiki
nav_order: 2
---

# Configuration
{: .no_toc }

1. TOC
{:toc}

## General
The configuration files of bluemap are formatted using [HOCON](https://github.com/lightbend/config/blob/master/HOCON.md). 
Please make sure you have a basic understanding of how to use HOCON and what "field", "key" and "value" mean in this 
context.

If you have no configuration files, bluemap generates example configurations for you when it is starting.
In those generated config files every field has a comment above it with what it does and it's default value 
*(if it has one)*.

## The core configuration: `core.conf`
This config file contains core-settings that are needed for the basic functionalities if BlueMap.

```yaml
accept-download: false
renderThreadCount: -2
metrics: true
data: "bluemap"
```

- The `accept-download` field defaults to `false` but you **need to set this to `true` if you want to use bluemap!**<br>
  Before doing that, please read the following carefully:
  
> By changing the setting `accept-download` to `true` you are indicating that you have accepted mojang's 
> [EULA](https://account.mojang.com/documents/minecraft_eula),<br>
> you confirm that you own a license to Minecraft (Java Edition)<br>
> and you agree that BlueMap will download and use a minecraft-client-jar from mojang's servers 
> *(https://launcher.mojang.com/...)*<br>
> The downloaded file contains resources that belong to mojang and you must not redistribute it or do anything else 
> that is not compliant with mojang's EULA.<br>
> BlueMap uses resources in this file to generate the 3D-Models used for the map and texture them. 
> *(BlueMap will not work without those resources.)*

- `renderThreadCount` defines how many render threads (processes) bluemap will create. Set this to 0 to maximize the 
  utilization of your CPU *(bluemap will create as many threads as available CPU-cores)*.<br>
  If you set it to a negative value, bluemap will take the number of available cores and add the (negative) 
  defined number to it. So with 8 cores and `renderThreadCount: -2` its `8 + (-2) = 6` threads.<br>
  If you have concerns or problems with your servers performance, try setting this to `1`.
- The `metrics` field defaults to `true` and controls if bluemap is sending some really small metrics reports. The
  report only contains the used implementation type *(e.g., 'cli' or 'sponge')* and the version. This allows me to 
  track the basic usage of BlueMap and helps me stay motivated to further develop this tool! Please leave it on :)<br>
  *(Since sponge has its own metrics control, this setting will be ignored if you use bluemap as sponge-plugin)*
- With the `data` field you can change the folder where bluemap saves files it needs during run-time or to save 
  other data.<br>
  *(E.g., the downloaded minecraft-client file, other default resources, and the state of your render-tasks if they 
  got paused.)*

## The render configuration: `render.conf`
In the render configuration you define exactly what and how BlueMap should render.

```yaml
webroot: "bluemap/web"
useCookies: true
enableFreeFlight: true
maps: [
  {
    id: "world"
    name: "World"
    world: "world"

    # Optional advanced config fields:
    startPos: [500, -820]
    skyColor: "#7dabff"
    ambientLight: 0
    renderCaves: false
    minX: -4000
    maxX: 4000
    minZ: -4000
    maxZ: 4000
    minY: 50
    maxY: 126
    renderEdges: true
    useCompression: true
    ignoreMissingLightData: false
  },
  {
    # ... more maps
  }
]
```

- The `webroot` field in the `render.conf` defines the folder where your rendered maps will be saved and the web-app 
  files will be generated.
- With `useCookies` you can disable the usage of cookies on the web-app. Cookies are only used to save users settings, 
  so they don't need to set them again each time they revisit the map.
- `enableFreeFlight` allows you to enable/disable the free-flight-mode in the web-app. 
- Using the list `maps` you can define as many maps as you want. Each configured map will appear in a drop-down on the 
  web-app where you can switch between them.<br>
  The generated config has 3 maps pre-configured as an example. **Remember to remove the pre-generated maps if you 
  don't use them!**
  The `maps` field is a list (`[]`) of one or more objects (`{}`). Every object represents one map that bluemap will 
  render. You can render multiple maps of multiple worlds, or even multiple maps of the same world if you want. 
  Each map-object should have the following fields:
    - The `id` field to define the id of the map, this id can only contain normal letters (a-z) numbers and 
      underscores and has to be unique. It is used for example as folder-name where the rendered map-models will be saved.
    - The `name` field to define the display-name of the map. This will be how the map is called in the web-app.
    - The `world` field to define the folder of the world you want to render

  If you want, you can change your map's even further:
    - With `startPos` you can control the xz-position on the map that the camera will be centered on when you open 
      the map.
    - The `skyColor` field controls the color of the sky using a css-style hex format. This is usefull for other 
      dimensions like nether and end where the sky is darkred or purple.
    - `ambientLight` defines the ambient light-strength that every block is recieving, regardless of the 
      sunlight/blocklight. Useful if a world does not have any sunlight, like nether and end.
    - If `renderCaves` is `false`, bluemap does not render any face that has a sun-light/sky-light value of 0.
      This removes unnecessary geometry and improves render-speed and most importantly the web-client performance 
      by **a lot**! It might however sometimes remove faces you would see from above, e.g. the bottom of oceans or 
      the wall below a big overhang. If you have a dimension that has no sunlight like the nether and the end you have 
      to enable this setting.
    - The fields `minX`, `minY`, `minZ`, `maxX`, `maxY` and `maxZ` define the "bounds" of the rendered world. 
      So, if you only want to render a specific area of your world, you can do this here. With the y-fields you can 
      also render only blocks in certain heights. You can use that to - for example - remove the ceiling of the nether 
      to be able to see the lower areas in the render.
    - If you limited the bounds of your map with the fields above, you can use the field `renderEdges` to define 
      how those "edges" of your map will be rendered. Is that value `true`, blocks at the edge will be rendered, 
      otherwise the edges will be see-through.
    - `useCompression`can be used to turn off the tile-compression. (Usually tiles are compressed using gZip). 
      Compression reduces the file-size by >80%, so turning this off is really not recommended.
    - Normally BlueMap detects if a chunk has not yet generated it's light-data and omits rendering those chunks.
      If `ignoreMissingLightData` is set to true BlueMap will render Chunks even if there is no light-data!
      This can be useful for example if some mod prevents light-data from being saved correctly.
      However, this also has a few drawbacks:
        - For those chunks, every block will always be fully lit
        - Night-mode might not work correctly
        - Caves will always be rendered (ignoring the 'renderCaves' setting)

## Webserver configuration: `webserver.conf`
The integrated web-server is the easiest way to host your map to the web, so you can view it in your browser. 
If enabled, it will host *(using `http`)* all files in the folder defined by the field `webroot` in this config on the 
defined `ip` and `port`.

```yaml
enabled: true
webroot: "bluemap/web"
ip: "123.45.6.78"
port: 8100
maxConnectionCount: 100
```

- With the `enabled` field you can enable (`true`) and disable (`false`) the integrated web-server.
- The `webroot` field in the `webserver.conf` defines the folder that the webserver will host to the web. 
  This normally should be set to the same value as the `webroot` field in the `render.conf`.
- The field `ip` defines the IP-address the web-server will bind to. If you omit this field, bluemap binds to all 
  network-interfaces (`0.0.0.0`). If you only want to access your app on the machine that is hosting the map, 
  use `localhost`.
- With `port` you can change the port that the web-server binds to. The default port is `8100`.
- The `maxConnectionCount` field limits the max number of active connections that the web-server accepts simultaneously.

## Plugin configuration: `plugin.conf`
This section is about server-interaction.
It currently mainly controls how player-markers are handled.
```yml
liveUpdates: true
skinDownload: true
hiddenGameModes: [
  "spectator"
]
hideInvisible: true
hideSneaking: false
fullUpdateInterval: 1440
```
- If you don't want any live data being used, set `liveUpdates` to `false`. This disables the full live-updates module.
- If `skinDownload` is set to true, BlueMap will download and update the current skin of each player to make it 
  available for the web-app.
- With `hiddenGameModes` you can control what gamemodes are visible on the map. By default, everyone is visible, 
  except players in spectator-mode.
- When `hideInvisible` is `true`, players that have the invisibility effect will not be displayed on the map.
- `hideSneaking` controls if a player that is sneaking should be visible on the map.
- The `fullUpdateInterval` is the interval in minutes in which a full map-update will be triggered.
  This is **additionally** to the normal map-update process (in case that fails to detect any file-changes).