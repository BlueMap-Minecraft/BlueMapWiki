---
layout: page
title: File
parent: Storage Configs
grand_parent: Configs
nav_order: 1
---

# File-Config

> **Info:**  
> When a "default" is mentioned for any option, it is meant that if the option is commented out, that is what BlueMap will use.  
> This may not be the same as the option that is pre-filled-in.
{: .info }

## `storage-type`
The storage-type of this storage.

Depending on this setting, different config-entries are allowed/expected in this config file.

**Don't change this value! (If you want a different storage-type, check out [the other example-configs](.))**

## `root`
The path to the folder on your file-system where bluemap will save the rendered map

_Default is_ `"bluemap/web/maps"`

## `compression`
The compression-type that bluemap will use to compress generated map-data.

Available compression-types are:
- `gzip`
- `zstd`
- `deflate`
- `none`

_Default is_ `gzip`
