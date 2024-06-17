---
layout: page
title: Commands and Permissions
parent: Getting Started
grand_parent: Wiki
nav_order: 3
---

# Commands and Permissions

> **Usually you don't need to use ANY command for BlueMap to render and update the maps properly.**
> Even if you delete your world and create a new one, BlueMap should automatically detect this and delete the old map
> and render the new world, as long as the map is configured correctly.  
> Only if you changed some map-settings or other configuration that requires a re-render of the map, then you might need
> to manually purge the map.
{: .info }

Here is a table with all commands and their permissions that you can use if you use BlueMap as a plugin/mod:

> Arguments that look like `<this>` are **required**!  
> Arguments that look like `[this]` are **optional**!
{: .info }

| command                                                    | permission           | description                                                                                                                                                                                                                                                     |
|------------------------------------------------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/bluemap`                                                 | bluemap.status       | displays BlueMaps render status                                                                                                                                                                                                                                 |
| `/bluemap version`                                         | bluemap.version      | displays BlueMaps version and some more useful system-information                                                                                                                                                                                               |
| `/bluemap help`                                            | bluemap.help         | displays a list of all possible BlueMap-commands                                                                                                                                                                                                                |
| `/bluemap reload [light]`                                  | bluemap.reload       | reloads all resources, configuration-files and the web-server *(`light` => re-loads everything other than resources (resourcepacks/mods) which is faster)*                                                                                                      |
| `/bluemap maps`                                            | bluemap.status       | shows all maps loaded by BlueMap                                                                                                                                                                                                                                |
| `/bluemap worlds`                                          | bluemap.status       | shows all worlds loaded by BlueMap                                                                                                                                                                                                                              |
| `/bluemap storages`                                        | bluemap.status       | shows all storages configured/available                                                                                                                                                                                                                         |
| `/bluemap storages <storage>`                              | bluemap.status       | shows a list of all maps that are on this storage                                                                                                                                                                                                               |
| `/bluemap storages <storage> delete <map>`                 | bluemap.delete       | deletes the (unloaded) map from that storage *(for deleting loaded maps, use the `/bluemap purge <map>` command)*                                                                                                                                               |
| `/bluemap stop`                                            | bluemap.stop         | pauses all rendering *(persists over a server-restart)*                                                                                                                                                                                                         |
| `/bluemap start`                                           | bluemap.start        | resumes all paused rendering *(persists over a server-restart)*                                                                                                                                                                                                 |
| `/bluemap freeze <map-id>`                                 | bluemap.freeze       | pauses all updates on a specific map *(persists over a server-restart)*                                                                                                                                                                                         |
| `/bluemap unfreeze <map-id>`                               | bluemap.freeze       | resumes all updates on a previously frozen map *(persists over a server-restart)*                                                                                                                                                                               |
| `/bluemap purge <map-id>`                                  | bluemap.purge        | purges (deletes) all data of a rendered map *(the map will be re-rendered afterwards, as long as it is not frozen)*                                                                                                                                             |
| `/bluemap update [world / map] [x z] [block-radius]`       | bluemap.update       | updates the whole world or optionally a defined radius around the player *(only renders changed chunks)*<br><br>BlueMap detects and updates your map automatically, usually you should not need this command :)                                                 |
| `/bluemap fix-edges [world / map] [x z] [block-radius]`    | bluemap.update.force | renders **(even if nothing has changed)** the edges of a map again *(usually not needed, but can help if there is an issue after changing the map-limits)*                                                                                                      |
| `/bluemap force-update [world / map] [x z] [block-radius]` | bluemap.update.force | renders **(even if nothing has changed)** the whole world or optionally a defined radius around the player<br><br>BlueMap has a really reliable way of detecting changes in your world and only rendering those. You should only need this command for testing! |
| `/bluemap cancel [task-ref]`                               | bluemap.cancel       | cancels the last (or the referenced) render-task in the queue<br><br>You usually should not need this command. Consider using `/bluemap freeze` instead :)                                                                                                      |
| `/bluemap debug block [world x y z]`                       | bluemap.debug        | prints some debug info about the blocks at the players (or defined) position                                                                                                                                                                                    |
| `/bluemap debug map [map x z]`                             | bluemap.debug        | prints some debug info about the map-tile at the players (or defined) position                                                                                                                                                                                  |
| `/bluemap debug flush <world>`                             | bluemap.debug        | saves the world and flushes scheduled tile-updates                                                                                                                                                                                                              |
| `/bluemap debug cache`                                     | bluemap.debug        | clears bluemap's world-caches                                                                                                                                                                                                                                   |
| `/bluemap debug dump`                                      | bluemap.debug        | creates a file `./bluemap/dump.json` containing lots of info about bluemaps current state                                                                                                                                                                       |
