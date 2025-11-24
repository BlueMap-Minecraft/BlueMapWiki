---
layout: page
title: Core
parent: Configs
grand_parent: Wiki
nav_order: 1
---

# Core-Config

> **Info:**  
> When a "default" is mentioned for any option, it is meant that if the option is commented out or removed, that is what BlueMap will use as a fallback.  
> This may not be the same as the option that is pre-filled-in.
{: .info }

## `accept-download`
By changing this setting to `true` you are indicating that you have accepted [Mojang's EULA](https://account.mojang.com/documents/minecraft_eula),
you confirm that you own a license to Minecraft (Java Edition)
and you agree that BlueMap will download and use a minecraft-client file (depending on the minecraft-version)
from [Mojang's servers](https://piston-meta.mojang.com/mc/game/version_manifest.json) for you.  
This file contains resources that belong to Mojang and you must not redistribute it or do anything else that is not compliant with mojang's EULA.

BlueMap uses resources in this file to generate the 3D-models used for the map and texture them. (BlueMap will not work without those resources.)

## `data`
The folder where BlueMap saves data-files it needs during runtime, or to save e.g. the render-progress to resume it later.

_Default is_ `"bluemap"`

## `render-thread-count`
This changes the amount of threads that BlueMap will use to render the maps.  
A higher value can improve render-speed, but could impact performance on the host machine.  
This should be always below or equal to the number of available processor-cores.

Zero or a negative value means the amount of available processor-cores subtracted by the value.  
(So a value of -2 with 6 cores results in 4 render-processes)

_Default varies per machine_

## `scan-for-mod-resources`
Controls whether BlueMap should try to find and load mod-resources and datapacks from the server/world-directories.

_Default is_ `true`

## `metrics`
If this is `true`, BlueMap might send really basic metrics reports containing only the implementation-type and the version that is being used to [metrics.bluecolored.de/bluemap](https://metrics.bluecolored.de/)

This allows me to track the basic usage of BlueMap and helps me stay motivated to further develop this tool!  
Please leave it on :)

An example report looks like this: `{"implementation":"bukkit","version":"5.13","mcVersion":"?"}`

_Default is_ `true`

## `log`
Config-section for debug-logging

<section markdown="1" class="config-indent">

### `file`
The file where the debug-log will be written to.  
Comment out to disable debug-logging completely.

[Java String formatting syntax](https://docs.oracle.com/javase/8/docs/api/java/util/Formatter.html) can be used to add time.

_Default is no logging_

### `append`
Whether the logger should append to an existing file, or overwrite it

_Default is_ `false`

</section>
