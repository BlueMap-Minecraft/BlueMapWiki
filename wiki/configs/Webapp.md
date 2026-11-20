---
layout: page
title: Webapp
parent: Configs
grand_parent: Wiki
nav_order: 3
---

# Webapp-Config

> **Info:**  
> When a "default" is mentioned for any option, it is meant that if the option is commented out or removed, that is what BlueMap will use as a fallback.  
> This may not be the same as the option that is pre-filled-in.
{: .info }

## `enabled`
With this setting you can disable the creation and updating of all web-app related files

_Default is_ `true`

## `webroot`
The webroot where the web-application files will be created.  
Usually this should be set to the same directory like in the [`webserver.conf`](Webserver.md#webroot)!

_Default is_ `"bluemap/web"`

## `update-settings-file`
Whether the `settings.json` of the webapp should be updated/synchronized with the current BlueMap settings.

If this is set to `false`, BlueMap will only add maps to the `settings.json`, but never remove unknown ones or update other settings.

Disabling this is for example useful if you are running multiple BlueMap instances on the same webroot and don't want them to overwrite each others' maps.

_Default is_ `true`

## `use-cookies`
If the web-application should use cookies to save the configurations of a user.

_Default is_ `true`

## `default-to-flat-view`
If the webapp will default to flat-view instead of perspective-view.

_Default is_ `false`

## `start-location`
The default map and camera-location where a user will start after opening the webapp.

This is in form of the "url-anchor": Open your map in a browser and look at the url;
everything after the `#` is the value for this setting.

_Default is "no anchor" → The camera will start with the topmost map and at that map's starting point._

## `min-zoom-distance` and `max-zoom-distance`
The minimum (closest) and maximum (furthest) distance (in blocks) that the camera can be from the ground

## `zoom-to-cursor`
If zooming with the mouse-wheel or a pinch-gesture should zoom towards the cursor (or the center of the pinch), instead of the center of the screen.

The zoom-buttons, keyboard-zoom, zooming while following a player and zooming while rotating the camera with the mouse always zoom towards the center of the screen.

_Default is_ `true`

## `resolution-default`
The default value of the resolution (settings-menu)

Possible values are: `0.5`, `1`, `2`

_Default is_ `1`

## `hires-slider-max`, `hires-slider-default`, and `hires-slider-min`
The min, max and default values of the **hires** render-distance slider (settings-menu)

The values are in blocks.

_Default is_ max:`500`_,_ default:`100`_, and_ min:`0`

## `lowres-slider-max`, `lowres-slider-default`, and `lowres-slider-min`
The min, max and default values of the **lowres** render-distance slider (settings-menu)

The values are in blocks.

_Default is_ max:`7000`_,_ default:`2000`_, and_ min:`500`

## `map-data-root`
Here you can specify an alternative base url from where all **map data** is loaded.

_Default is_ `"maps"`

## `live-data-root`
Here you can specify an alternative base url from where all **live data** is loaded.

_Default is_ `"maps"`

## `client-decompression`
This will configure the webapp to request the map-tiles compressed and decompress them manually.

Enable this only if you intend to host the webapp statically, with an external webserver without additional configuration.

_Default is_ `false`

## `scripts`
Here you can add URLs to custom **scripts** (**js**) so they will be loaded by the webapp

You can place them somewhere in BlueMap's webroot and add the (relative) link here

## `styles`
Here you can add URLs to custom **styles** (**css**) so they will be loaded by the webapp

You can place them somewhere in BlueMap's webroot and add the (relative) link here
