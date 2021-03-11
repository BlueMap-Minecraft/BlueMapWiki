---
layout: page
title: Commands and Permissions
parent: Wiki
nav_order: 4
---

# Commands and Permissions

Here is a table with all commands and their permissions that you can use if you use BlueMap as a plugin/mod:

command | permission | description
--- | --- | ---
`/bluemap` | bluemap.status | displays BlueMaps render status
`/bluemap version` | bluemap.version | displays BlueMaps version and some more useful system-information
`/bluemap help` | bluemap.help | displays a list of all possible BlueMap-commands
`/bluemap reload` | bluemap.reload | reloads all resources, configuration-files and the web-server
`/bluemap maps` | bluemap.status | shows all maps loaded by BlueMap
`/bluemap worlds` | bluemap.status | shows all worlds loaded by BlueMap
`/bluemap pause` | bluemap.pause | pauses all rendering
`/bluemap resume` | bluemap.resume | resumes all paused rendering
`/bluemap render [world|map] [x z] [block-radius]` | bluemap.render | renders the whole world or optionally a defined radius around the player
`/bluemap render cancel` | bluemap.render | cancels the last render-task in the queue
`/bluemap purge <map-id>` | bluemap.render | purges (deletes) all data of a rendered map
`/bluemap marker create <id> <map-id> [x y z] <label>` | bluemap.marker | creates a basic POI-Marker at the player-/provided position
`/bluemap marker remove <id>` | bluemap.marker | removes the marker with that id
`/bluemap debug block` | bluemap.debug | prints some debug info about the blocks at the players position
`/bluemap debug cache` | bluemap.debug | clears bluemap's world-caches
`/bluemap debug flush <world>` | bluemap.debug | saves the world and flushes scheduled tile-updates