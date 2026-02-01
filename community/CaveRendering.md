---
layout: page
title: Explaining cave rendering
parent: Community Guides
nav_order: 3
---

# Explaining cave rendering
{: .no_toc }

1. TOC
{:toc}

## By default

By default, BlueMap defines a cave as a place where the sunlight is zero.
To avoid removing important places which are just... dark,
BlueMap also relies on the height information of blocks.
By default, in an overworld, BlueMap will only consider such blocks as "cave"
if they are below the y-level of 55 AND 5 blocks below the ocean-floor heightmap
(highest block which blocks motion).

## Options

All of these can be affected by changing options in the map's config files.

### Block light

By changing `cave-detection-uses-block-light` to `true`,
caves will also need to be void of any block caused light.
This for example means that a torched up cave will be rendered.  
The downside of this is that it will also render caves that are lit by just lava or glow lichen,
which is usually unwanted.

### Remove caves

The `remove-caves-below-y` is a rather simple one.
A hard y-level boundary above which everything is rendered and below could be considered a cave.

### Ocean floor

When enabled, `cave-detection-ocean-floor` is an additional boundary in addition to `remove-caves-below-y`.
It is never more restrictive but instead more permissive,
allowing the map to render in dark spots with water such as the ocean floor.

## Simple choices

The simple options are to render everything or not render much at all.
These can be achieved by setting `remove-caves-below-y` to extreme values such as `-10000` or `10000`.

## Harsh reality

But in reality the sweet spot is some combination of these settings
fine-tuned to your world generation and how much you want to show.
You probably need to experiment a bit, purge, rerender and repeat.

There are down-sides to showing too much and not showing enough.
Showing too much can lead to uncovered secrets and cheaty situations
if your playerbase can't be trusted enough.
And not showing enough might lead to a horribly rendered maps with missing spots,
literally just holes in some dark corners.

## Anti-cheating purposes

Please note that simply disabling free-flight won't be enough of an anti-cheat.  
You will need to mingle with the cave settings.  
Using a no-ore texture pack is also a great addition because as caves often contain ores, you will want to hide them as well.
