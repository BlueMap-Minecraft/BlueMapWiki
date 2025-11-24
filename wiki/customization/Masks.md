---
layout: page
title: Render-Masks
parent: Advanced Customization
grand_parent: Wiki
nav_order: 1
---

# Render-Masks
{: .no_toc }

BlueMap supports **render masks** that allow you to control which parts of your Minecraft world are rendered to the map.  
By default, BlueMap renders the entire (generated) world. With masks, you can define custom mask shapes to **include** or **exclude** specific areas.

This can be useful to make sure the map only renders **inside** your world-border, or if you want to hide a specific area from the map.  
In the nether the default config uses masks to remove the nethers ceiling so you can see below the top bedrock-layer.

Render masks are configured in the [map config file](../configs/Maps.md#render-mask):

```hocon
render-mask: [
  // mask definitions go here
]
```

## How Render Masks Work

* The `render-mask` setting is a **list** of one or more **mask objects**.
* Each mask defines a shape in the world that will either be:
  * **Included** in the rendered map (default).
  * **Excluded** using the `subtract: true` property.
* Masks are applied in **top-to-bottom order**.  
  This means masks that come later will **overrule** (take priority over) previous masks.

BlueMap automatically updates the rendered map when masks are changed, and deletes tiles outside the defined area.  
To fix any potential issues after changing masks, you can use: `/bluemap fix-edges <map>`

## Available Mask Types

### Box Mask

Defines a rectangular 3D area (Axis-Aligned Bounding Box).  
You can **omit** properties like `min-x`, `max-y`, etc., to make masks **unbounded** in that axis.

```hocon
{
  type: box
  subtract: false
  
  # Optional:
  min-x: -4000
  max-x: 4000
  min-z: -4000
  max-z: 4000
  min-y: 50
  max-y: 100
}
```

### Circle Mask

Defines a **circular** area in the XZ plane. Optionally limited in height with `min-y` and `max-y`.

```hocon
{
  type: circle
  subtract: false
  center-x: 0
  center-z: 0
  radius: 4000
  
  # Optional:
  min-y: 50
  max-y: 100
}
```

### Ellipse Mask

Like the circle mask, but allows different radii for X and Z axes.

```hocon
{
  type: ellipse
  subtract: false
  center-x: 0
  center-z: 0
  radius-x: 4000
  radius-z: 2000
  
  # Optional:
  min-y: 50
  max-y: 100
}
```

### Polygon Mask

Defines a custom polygon shape with 3 or more points. Optionally limited in height with `min-y` and `max-y`.

```hocon
{
  type: polygon
  subtract: false
  shape: [
    { x: 1, z: -23 },
    { x: 1, z: -24 },
    { x: 1, z: -25 },
    { x: 2, z: -25 },
    { x: 3, z: -25 }
  ]

  # Optional:
  min-y: 50
  max-y: 100
}
```

## Combining Multiple Masks

You can combine multiple masks together by adding more mask objects in the `render-mask` list.  
Each mask can be **additive** (default) or **subtractive** by setting `subtract: true`.

Example: Render everything inside a box, except a smaller circle in the center.

```hocon
render-mask: [
  {
    type: box
    subtract: false
    min-x: -1000
    max-x: 1000
    min-z: -1000
    max-z: 1000
  }
  {
    type: circle
    subtract: true
    center-x: 0
    center-z: 0
    radius: 200
  }
]
```

## More Examples

### Excluding a Secret Building

If you start with a mask that has `subtract: true`, bluemap will render everything except the defined mask-area.  
Like this you can for example exclude a secret building or area from the map:

```hocon
render-mask: [
  {
    type: box
    subtract: true
    min-x: 100
    max-x: 200
    min-z: 100
    max-z: 200
  }
]
```

If you **additionally** have a world-border and want to limit your render as well, you can combine it like this:
```hocon
render-mask: [
  { # first define the world-border as the main area that should be rendered 
    type: box
    subtract: false
    min-x: -10000
    max-x: 10000
    min-z: -10000
    max-z: 10000
  }
  { # then subtract your secret location that you don't want to render
    type: box
    subtract: true
    min-x: 100
    max-x: 200
    min-z: 100
    max-z: 200
  }
]
```

### A See-Through Nether Ceiling

Here is an alternative way how you can handle the nethers ceiling:
```hocon
render-mask: [
  {
    type: box
    subtract: true
    min-y: 127
    max-y: 127
  }
]

render-edges: false
```

### Remove the Nether Ceiling entirely

If you want to remove the nether-ceiling entirely, including everything that has been build on top of the nether, 
you can use either this config:

```hocon
render-mask: [
  {
    max-y: 90
  }
]
```

or this config:

```hocon
render-mask: [
  {
    subtract: true
    min-y: 91
  }
]
```

Both configs simply remove everything that is at `y: 91` or higher and render everything else.

Notice how `type: box` and `subtract: false` are omitted in these examples. 
We can do that since those are the default values of these mask properties.
