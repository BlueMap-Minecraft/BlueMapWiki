---
layout: page
title: Markers
parent: Advanced Customization
grand_parent: Wiki
nav_order: 1
---

# Markers
{: .no_toc }

BlueMap allows you to add various markers to your map. You can do this either by manually configuring them in your
map-config or by having a 3rd-party plugin that uses BlueMap's [API](https://github.com/BlueMap-Minecraft/BlueMapAPI)
to manage markers.

A list of known 3rd-party plugins that use BlueMap's API is available [here]({{site.baseurl}}/wiki/customization/3rdPartySupport).

1. TOC
{:toc}

## Marker Sets
All markers are grouped into marker-sets. A marker set will be visible in the menu, and all markers in that set can be
enabled or disabled at once.

Here is an example config for a marker-set:
```yaml
example-marker-set: {
  label: "Example Marker Set"
  toggleable: true
  default-hidden: false
  markers: {
    # markers go here ...
  }
}
```

**Properties:**
- `label`: The label of the marker-set. Will be used as the name of the menu entry
- `toggleable`: If this is `true`, the marker-set can be enabled or disabled in the menu
- `default-hidden`: If this is `true`, the marker-set will be hidden by default and can be enabled by the user
- `markers` is the list of all markers in this marker-set

## Types of Markers

There are different types of markers that you can use, depending on what you need.

**Every marker has:**
- a `type` property that defines what kind of marker it is
- a `position`, which is the x y and z coordinates of where the marker (or the marker-center) is placed on the map
- a `label` defining the name of the marker. Used e.g. in the marker-list
- a `min-distance` and a `max-distance` which default to "unlimited" but can be used to limit the distance to the camera 
  at which the marker is shown

### POI Markers
The POI Marker is the most basic marker. It's a simple icon-image that can be placed anywhere on the map. When clicked,
it shows its label.

Here is an example config for a POI marker:
```yaml
example-poi-marker: {
    type: "poi"
    position: { x: 1, y: 64, z: -23 }
    label: "Example POI Marker"
    
    # Optional:
    icon: "assets/poi.svg"
    anchor: { x: 25, y: 45 }
    min-distance: 10
    max-distance: 10000000
}
```

**Specific POI-Marker properties are:**
- `icon`, which is any url to an image that will be used as the marker's icon. Can be a local file or a remote url.
  The image is not resized, so the image should be exactly as big as you want the icon to be on the map. All image-formats
  that can be used in a html-img-tag are supported
- `anchor`. Could also be called "offset". It's basically the pixel on the marker-image, that is placed (anchored) at the marker's
  position. Often you want this to be the middle of the marker-image. But e.g. if you have a needle as your marker, you'd want
  this to be the tip of the needle

### HTML Markers
HTML Markers are used to add any HTML-Element to the map. This gives you full freedom if you want to add just a simple text,
any image, a button or even ... embed a video ;D. 

Here is an example config for a HTML Marker:
```yaml
example-html-marker: {
    type: "html"
    position: { x: 1, y: 64, z: -23 }
    label: "Example HTML Marker"
    html: "<div style='line-height: 2em; font-size: 2em; color: white; transform: translate(-50%, -50%);'>Example HTML Marker</div>"
    
    # Optional:
    anchor: { x: 0, y: 0 }
    min-distance: 10
    max-distance: 10000000
}
```

**Specific HTML-Marker properties are:**
- `html` .. obvious .. is the html-code for the html-element that you want to show
- `anchor`. Could also be called "offset". It's basically the pixel on the html-element, that is placed (anchored) at the marker's
  position. *(works the same as on the POI-Marker, just with html-elements)*

### Line Markers
Line Markers do what their name suggests. They are used to draw a line on the map. If you click on that line, it shows the
marker's `detail`.

Here is an example config for a Line Marker:
```yaml
example-line-marker: {
    type: "line"
    position: { x: 1, y: 64, z: -25 }
    label: "Example Line Marker"
    line: [
        { x: 1, y: 64, z: -23 }
        { x: 1, y: 64, z: -24 }
        { x: 1, y: 64, z: -25 }
        { x: 2, y: 64, z: -25 }
        { x: 3, y: 64, z: -25 }
    ]
    
    # Optional:
    detail: "This is a <b>line</b> marker"
    link: null
    new-tab: false
    depth-test: true
    line-width: 5
    line-color: { r: 255, g: 0, b: 0, a: 1.0 }
    min-distance: 10
    max-distance: 10000000
}
```

**Specific Line-Marker properties are:**
- `line` is an Array of positions that define the line. The line will be drawn between the positions, in their order
- `detail` is the text that is shown when you click on the line. This property allows using any html-tags
- `link` is an optional url that is opened when you click on the line (or `null` if you don't want a link)
- `new-tab` defines whether the above link should be opened in a new tab or not
- `depth-test` if this is `false` the marker will always render above all other (hires) terrain. If it's `true`, 
  hires tiles will be able to cover the marker if they are in front of it
- `line-width` is the width of the line in pixels
- `line-color` is the color of the line

The `position` property of the line marker doesn't change the actual position of the line, but it is used to calculate
things like render-order. Make sure this is always roughly in the middle of the line to have the best results :)

### Shape Markers
A shape marker is any flat shape (polygon) placed somewhere on the map. You can use it to mark areas, for example.
If you click on the shape, it shows the marker's `detail`.

Here is an example config for a Shape Marker:
```yaml
example-shape-marker: {
    type: "shape"
    position: { x: 1, y: 64, z: -23 }
    label: "Example Shape Marker"
    shape: [
        { x: 1, z: -23 }
        { x: 1, z: -24 }
        { x: 1, z: -25 }
        { x: 2, z: -25 }
        { x: 3, z: -25 }
    ]
    shape-y: 64
    
    # Optional:
    detail: "This is a <b>shape</b> marker"
    link: null
    new-tab: false
    depth-test: true
    line-width: 5
    line-color: { r: 255, g: 0, b: 0, a: 1.0 }
    fill-color: { r: 200, g: 0, b: 0, a: 0.3 }
    min-distance: 10
    max-distance: 10000000
}
```

**Specific Shape-Marker properties are:**
- `shape` is an Array of x,z positions (without y) that define the shape. The shape will be drawn between the positions,
  in their order, the last position is automatically connected to the first position
- `shape-y` is the y-position of the shape
- `detail` is the text that is shown when you click on the shape. This property allows using any html-tags
- `link` is an optional url that is opened when you click on the line (or `null` if you don't want a link)
- `new-tab` defines whether the above link should be opened in a new tab or not
- `depth-test` if this is `false` the marker will always render above all other (hires) terrain. If it's `true`,
  hires tiles will be able to cover the marker if they are in front of it
- `line-width` is the width of the line in pixels
- `line-color` is the color of the line
- `fill-color` is the color of the fill

### Extrude Markers
Extrude Markers are the same as a shape-marker, but the shape is extruded between two heights. With this you can mark
areas that are limited to specific y-positions.

Here is an example config for a Extrude Marker:
```yaml
example-extrude-marker: {
    type: "extrude"
    position: { x: 1, y: 64, z: -23 }
    label: "Example Extrude Marker"
    shape: [
        { x: 1, z: -23 }
        { x: 1, z: -24 }
        { x: 1, z: -25 }
        { x: 2, z: -25 }
        { x: 3, z: -25 }
    ]
    shape-min-y: 47
    shape-max-y: 72
    
    # Optional:
    detail: "This is a <b>extrude</b> marker"
    link: null
    new-tab: false
    depth-test: true
    line-width: 5
    line-color: { r: 255, g: 0, b: 0, a: 1.0 }
    fill-color: { r: 200, g: 0, b: 0, a: 0.3 }
    min-distance: 10
    max-distance: 10000000
}
```

**Specific Extrude-Marker properties are:**
- `shape` is an Array of x,z positions (without y) that define the shape. The shape will be drawn between the positions, 
  in their order, the last position is automatically connected to the first position
- `shape-min-y` is the lower y-position of the shape
- `shape-max-y` is the upper y-position of the shape
- `detail` is the text that is shown when you click on the shape. This property allows using any html-tags
- `link` is an optional url that is opened when you click on the line (or `null` if you don't want a link)
- `new-tab` defines whether the above link should be opened in a new tab or not
- `depth-test` if this is `false` the marker will always render above all other (hires) terrain. If it's `true`,
  hires tiles will be able to cover the marker if they are in front of it
- `line-width` is the width of the line in pixels
- `line-color` is the color of the line
- `fill-color` is the color of the fill
