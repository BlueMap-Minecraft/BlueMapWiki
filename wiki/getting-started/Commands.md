---
layout: page
title: Commands and Permissions
parent: Getting Started
grand_parent: Wiki
nav_order: 3
---

# Commands and Permissions

Here is a table with all commands and their permissions that you can use if you use BlueMap as a plugin/mod:

> Arguments that look like `<this>` are **required**!<br>
> Arguments that look like `[this]` are **optional**!
{: .info }

### Command you might need

command | permission | description
--- | --- | ---
`/bluemap` | bluemap.status | displays BlueMaps render status
`/bluemap version` | bluemap.version | displays BlueMaps version and some more useful system-information
`/bluemap help` | bluemap.help | displays a list of all possible BlueMap-commands
`/bluemap reload` | bluemap.reload | reloads all resources, configuration-files and the web-server
`/bluemap maps` | bluemap.status | shows all maps loaded by BlueMap
`/bluemap worlds` | bluemap.status | shows all worlds loaded by BlueMap
`/bluemap stop` | bluemap.stop | pauses all rendering *(persists over a server-restart)*
`/bluemap start` | bluemap.start | resumes all paused rendering *(persists over a server-restart)*
`/bluemap freeze <map-id>` | bluemap.freeze | pauses all updates on a specific map *(persists over a server-restart)*
`/bluemap unfreeze <map-id>` | bluemap.freeze | resumes all updates on a previously frozen map *(persists over a server-restart)*
`/bluemap purge <map-id>` | bluemap.purge | purges (deletes) all data of a rendered map *(the map will be re-rendered afterwards, as long as it is configured in the `render.conf`)*
`/bluemap marker create <id> <map-id> [x y z] <label>` | bluemap.marker | creates a basic POI-Marker at the player-/provided position
`/bluemap marker remove <id>` | bluemap.marker | removes the marker with that id
`/bluemap marker list` | bluemap.marker | lists all markers

### Commands you usually don't need

command | permission | description
--- | --- | ---
`/bluemap update [world|map] [x z] [block-radius]` | bluemap.update | updates the whole world or optionally a defined radius around the player *(only renders changed chunks)*<br><br>BlueMap detects and updates your map automatically, usually you should not need this command :)
`/bluemap force-update [world|map] [x z] [block-radius]` | bluemap.update.force | renders **(even if nothing has changed)** the whole world or optionally a defined radius around the player<br><br>BlueMap has a really reliable way of detecting changes in your world and only rendering those. You should only need this command for testing!
`/bluemap cancel [task-ref]` | bluemap.cancel | cancels the last (or the referenced) render-task in the queue<br><br>You usually should not need this command. Consider using `/bluemap freeze` instead :)
`/bluemap debug block` | bluemap.debug | prints some debug info about the blocks at the players
`/bluemap debug flush <world>` | bluemap.debug | saves the world and flushes scheduled tile-updates
`/bluemap debug cache` | bluemap.debug | clears bluemap's world-caches
`/bluemap debug dump` | bluemap.debug | creates a file `./bluemap/dump.json` containing lots of info about bluemaps current state
