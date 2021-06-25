---
layout: page
title: Advanced Markers
parent: Advanced Customization
grand_parent: Wiki
nav_order: 4
---

*(This page is unfinished and is missing lots of information)*

To create (advanced) markers, you create a `markers.json` in the `bluemap/web/data` folder and configure them like this as an example:

```json
{
  "markerSets": [
    {
      "id": "pois",
      "label": "POIs",
      "toggleable": true,
      "defaultHide": false,
      "marker": [

        {
          "id": "spawn",
          "type": "poi",
          "map": "acrana",
          "position": { "x": 192.5, "y": 71.5, "z": -207.5 },
          "label": "Spawn",
          "icon": "data/icons/LogoCircle32.png",
          "anchor": { "x": 16, "y": 16 },
          "minDistance": 10.0,
          "maxDistance": 10000000.0
        },

        {
          "id": "holy-command-block",
          "type": "poi",
          "map": "acrana",
          "position": { "x": 188.5, "y": 72.5, "z": -214.5 },
          "label": "The shrine of the commandblock",
          "icon": "assets/poi.svg",
          "anchor": { "x": 25, "y": 50 },
          "minDistance": 0.0,
          "maxDistance": 250.0
        },

        {
          "id": "swamp",
          "type": "html",
          "map": "acrana",
          "position": { "x": -60, "y": 100, "z": 3400 },
          "label": "Swamp",
          "html": "<div style='line-height: 2em; font-size: 2em; color: white; transform: translate(-50%, -50%);'>Swamp</div>",
          "anchor": { "x": 0, "y": 0 },
          "minDistance": 250.0,
          "maxDistance": 4000.0
        },

        {
          "id": "a-tree",
          "type": "extrude",
          "map": "acrana",
          "position": { "x": 186, "y": 80, "z": -319 },
          "label": "A tree",
          "detail": "This is a tree.",
          "shape": [
            { "x": 177, "z": -326},
            { "x": 193, "z": -326},
            { "x": 193, "z": -310},
            { "x": 177, "z": -310}
          ],
          "shapeMinY": 66,
          "shapeMaxY": 88,
          "depthTest": true,
          "lineWidth": 3,
          "lineColor": { "r": 0, "g": 255, "b": 0, "a": 1 },
          "fillColor": { "r": 0, "g": 200, "b": 0, "a": 0.2 },
          "minDistance": 10.0,
          "maxDistance": 500.0
        },

        {
          "id": "river",
          "type": "line",
          "map": "acrana",
          "position": { "x": 165.0, "y": 65, "z": -276.0 },
          "label": "River",
          "detail": "A river ... <br><br><i>honestly i just needed a reason to use the line marker ;D</i>",
          "line": [
            { "x": 122.5, "y": 64, "z": -205.5 },
            { "x": 181, "y": 67, "z": -259 },
            { "x": 108, "y": 65, "z": -321 },
            { "x": 104, "y": 64, "z": -336 },
            { "x": 53, "y": 64, "z": -336 },
            { "x": 49, "y": 64, "z": -419 }
          ],
          "depthTest": true,
          "lineWidth": 5,
          "lineColor": { "r": 70, "g": 100, "b": 255, "a": 1 },
          "minDistance": 0.0,
          "maxDistance": 5000.0
        },

        {
          "id": "town",
          "type": "shape",
          "map": "acrana",
          "position": { "x": 255.0, "y": 63.0, "z": 1797.0 },
          "label": "Town",
          "detail": "The main <b>Town</b> of this world!",
          "shape": [
            { "x": 157.0, "z": 1968.0 },
            { "x": 24.0, "z": 1848.0 },
            { "x": 34.0, "z": 1658.0 },
            { "x": 226.0, "z": 1519.0 },
            { "x": 375.0, "z": 1517.0 },
            { "x": 488.0, "z": 1691.0 },
            { "x": 325.0, "z": 1966.0 }
          ],
          "shapeY": 64.0,
          "depthTest": false,
          "lineWidth": 2,
          "lineColor": { "r": 255, "g": 0, "b": 0, "a": 1 },
          "fillColor": { "r": 200, "g": 0, "b": 0, "a": 0.3 },
          "minDistance": 100.0,
          "maxDistance": 10000000.0
        }

      ]
    }
  ]
}
```