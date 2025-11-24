---
layout: page
title: Plugin
parent: Configs
grand_parent: Wiki
nav_order: 2
---

# Plugin-Config

> **Info:**  
> When a "default" is mentioned for any option, it is meant that if the option is commented out or removed, that is what BlueMap will use as a fallback.  
> This may not be the same as the option that is pre-filled-in.
{: .info }

## `live-player-markers`
If the server should send player-positions to the webapp.  
This only works if the integrated webserver is enabled.

_Default is_ `true`

## `hidden-game-modes`
A **list** of gamemodes that will prevent a player from appearing on the map.

Possible values are: `survival`, `creative`, `spectator`, `adventure`

## `hide-vanished`
If this is `true`, players that have an invisibility (potion-)effect will be hidden on the map.

_Default is_ `true`

## `hide-sneaking`
If this is `true`, players that are sneaking will be hidden on the map.

_Default is_ `false`

## `hide-below-sky-light` and `hide-below-block-light`
Hides the player if they are in a sky or block-light level below the given number.

BOTH values have to be below the threshold for the player to be hidden!  
E.g. if you set both to 1, then the player will be hidden on the map if they are in absolute darkness.  
Or, if you want players only be visible on the surface you set the `sky-threshold` to
something between 1 and 15 and the `block-threshold` to 16.

_Default is_ `0` _(don't hide the player)_

## `hide-different-world`
If this is `true`, players that are on a different world than the viewed map will not appear on the player-list.

_Default is_ `false`

## `write-markers-interval` and `write-players-interval`
The interval in seconds that the (player) markers will be written to the map-storage.  
This is useful if you can't create a live-connection between the server and the webapp
and the (player) markers can only be updated via the map-storage.

`0` or lower means that the (player) markers will never be written to the map-storage.

_Default is_ `0`

## `skin-download`
Download the skin from Mojang's servers when a player joins your server, so it can be used for the player-markers.

_Default is_ `true`

## `player-render-limit`
The amount of players that is needed to pause BlueMap's render-threads.

If this amount of players or more is online, BlueMap will stop rendering map-updates until enough players have logged off again.

Setting this to `0` or `-1` will disable this feature -> BlueMap will not pause rendering

_Default is_ `-1`

## `full-update-interval`
The interval in minutes in which a full map-update will be triggered.

This is ADDITIONALLY to the normal map-update process (in case that fails to detect any file-changes).

**This DOESN'T re-render the entire map each time**, it _only checks_ if there are some changes that have not been rendered yet!

_Default is_ `1440` _(24 hours)_
