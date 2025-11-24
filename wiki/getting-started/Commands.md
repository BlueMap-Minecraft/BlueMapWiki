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

| command                                               | permission                           | description                                                                                                                                                                                                                                                     |
|-------------------------------------------------------|--------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/bluemap`                                            | bluemap.status                       | displays BlueMaps render status                                                                                                                                                                                                                                 |
| `/bluemap version`                                    | bluemap.version                      | displays BlueMaps version and some more useful system-information                                                                                                                                                                                               |
| `/bluemap help`                                       | bluemap.help                         | displays links to this wiki and the support-discord                                                                                                                                                                                                             |
| `/bluemap reload [light]`                             | bluemap.reload, bluemap.reload.light | reloads all resources, configuration-files and the web-server *(`light` => re-loads everything other than resources (resourcepacks/mods) which is faster)*                                                                                                      |
| `/bluemap maps`                                       | bluemap.maps                         | shows all maps loaded by BlueMap                                                                                                                                                                                                                                |
| `/bluemap storages`                                   | bluemap.storages                     | shows all storages configured/available                                                                                                                                                                                                                         |
| `/bluemap storages <storage>`                         | bluemap.storages                     | shows a list of all maps that are on this storage                                                                                                                                                                                                               |
| `/bluemap storages <storage> delete <map>`            | bluemap.storages.delete              | deletes the (unloaded) map from that storage *(for deleting loaded maps, use the `/bluemap purge <map>` command)*                                                                                                                                               |
| `/bluemap stop`                                       | bluemap.stop                         | pauses all rendering *(persists over a server-restart)*                                                                                                                                                                                                         |
| `/bluemap start`                                      | bluemap.start                        | resumes all paused rendering *(persists over a server-restart)*                                                                                                                                                                                                 |
| `/bluemap freeze <map-id>`                            | bluemap.freeze                       | pauses all updates on a specific map *(persists over a server-restart)*                                                                                                                                                                                         |
| `/bluemap unfreeze <map-id>`                          | bluemap.unfreeze                     | resumes all updates on a previously frozen map *(persists over a server-restart)*                                                                                                                                                                               |
| `/bluemap purge <map-id>`                             | bluemap.purge                        | purges (deletes) all data of a rendered map *(the map will be re-rendered afterwards, as long as it is not frozen)*                                                                                                                                             |
| `/bluemap update [map-id] [x z] [block-radius]`       | bluemap.update                       | updates the whole world or optionally a defined radius around the player *(only renders changed chunks)*<br><br>BlueMap detects and updates your map automatically, usually you should not need this command :)                                                 |
| `/bluemap fix-edges [map-id] [x z] [block-radius]`    | bluemap.update                       | renders **(even if nothing has changed)** the edges of a map again *(usually not needed, but can help if there is an issue after changing the map-limits)*                                                                                                      |
| `/bluemap force-update [map-id] [x z] [block-radius]` | bluemap.update                       | renders **(even if nothing has changed)** the whole world or optionally a defined radius around the player<br><br>BlueMap has a really reliable way of detecting changes in your world and only rendering those. You should only need this command for testing! |
| `/bluemap tasks`                                      | bluemap.tasks                        | shows the current task-queue that is being processed by the render-threads                                                                                                                                                                                      |
| `/bluemap tasks cancel <task-ref>`                    | bluemap.tasks.cancel                 | cancels the referenced render-task in the queue<br><br>You usually should not need this command. Consider using `/bluemap freeze` instead :)                                                                                                                    |
| `/bluemap troubleshoot [map] [x z]`                   | bluemap.troubleshoot                 | tries to find potential issues with the map or world at the players (or defined) position and gives suggestions on how to fix them                                                                                                                              |
| `/bluemap debug world [map] [x y z]`                  | bluemap.debug.world                  | prints some debug info about the world at the players (or defined) position                                                                                                                                                                                     |
| `/bluemap debug map [map] [x z]`                      | bluemap.debug.map                    | prints some debug info about the map-tile at the players (or defined) position                                                                                                                                                                                  |
| `/bluemap debug dump`                                 | bluemap.debug.dump                   | creates a file `./bluemap/dump.json` containing lots of info about BlueMap's current state                                                                                                                                                                      |
