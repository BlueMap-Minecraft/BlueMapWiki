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
          "map": "world",
          "position": { "x": 105.5, "y": 62.5, "z": 50.5 },
          "label": "<b>Spawnpoint</b>",
          "icon": "data/icons/LogoCircle32.png",
          "anchor": { "x": 16, "y": 16 },
          "minDistance": 10.0,
          "maxDistance": 10000000.0
        },

        {
          "id": "mthoru",
          "type": "html",
          "map": "world",
          "position": { "x": -596, "y": 100, "z": 26 },
          "label": "Mt. Horu",
          "html": "<div style='line-height: 2em; font-size: 2em; color: white; transform: translate(-50%, -50%);'>Mt. Horu</div>",
          "anchor": { "x": 0, "y": 0 },
          "minDistance": 250.0,
          "maxDistance": 4000.0
        },

        {
          "id": "a-tree",
          "type": "extrude",
          "map": "world",
          "position": { "x": 186, "y": 80, "z": -319 },
          "label": "A tree",
          "detail": "This is a tree.",
          "shape": [
            { "x": -8, "z": 201},
            { "x": -8, "z": 185},
            { "x": 10, "z": 185},
            { "x": 10, "z": 201}
          ],
          "shapeMinY": 75,
          "shapeMaxY": 95,
          "depthTest": true,
          "lineWidth": 3,
          "lineColor": { "r": 0, "g": 255, "b": 0, "a": 1 },
          "fillColor": { "r": 0, "g": 200, "b": 0, "a": 0.2 },
          "minDistance": 10.0,
          "maxDistance": 1000.0
        },

        {
          "id": "river",
          "type": "line",
          "map": "world",
          "position": { "x": 165.0, "y": 65, "z": -276.0 },
          "label": "River",
          "detail": "A river ... <br><br><i>honestly i just needed a reason to use the line marker ;D</i>",
          "line": [
            { "x": 84, "y": 64, "z": 59 },
            { "x": 15, "y": 67, "z": 12 },
            { "x": -101, "y": 65, "z": -20 },
            { "x": -130, "y": 64, "z": -66 },
            { "x": -113, "y": 64, "z": -293 },
            { "x": -154, "y": 64, "z": -427 }
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
          "map": "world",
          "position": { "x": 255.0, "y": 63.0, "z": 1797.0 },
          "label": "Island",
          "detail": "A cool Island you should visit!",
          "shape": [
            { "x": 623.0, "z": -117.0 },
            { "x": 817.0, "z": -187.0 },
            { "x": 1013.0, "z": 321.0 },
            { "x": 878.0, "z": 406.0 },
            { "x": 789.0, "z": 369.0 },
            { "x": 626.0, "z": 200.0 }
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
