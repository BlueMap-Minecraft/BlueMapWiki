---
layout: page
title: Storages
parent: Advanced Customization
grand_parent: Wiki
nav_order: 3
---

# Storages
{: .no_toc }

1. TOC
{:toc}

## General
With BlueMap you can define one or more **Storages** where you want your maps to be stored.
Theoretically you could store each map in a different storage.

To configure your storages, you can use the [`storages`](../configs/storages/) folder in your config folder.
In the same way as with the maps, the name of these config-file (without the `.conf`-extension) determines the
identifier of the storage. Which means you can also add and remove storages. In your map-configs you can
then use the [`storage` setting](../configs/Maps.md#storage) to select the storage this map should be stored in.  

**For example:** If you have a config file `storages/mystorage.conf` then in your map configs you can
set `storage: "mystorage"` to make that map use it.

## File Storage
The file-storage is the default storage. It is simply a folder where BlueMap will store the map-tiles as separate files.
Exactly like the webapp expects them.
Usually that folder is in your webapp's webroot: `./bluemap/web/maps`. But you can change this folder however you like
using the [`root`](../configs/storages/File.md#root) setting.

## MySQL, MariaDB & Postgres
To use a MySQL, MariaDB or Postgres database, you can use the `sql.conf` template and enter your database information there.  

### Connection-URL
The `connection-url` setting is where you define most things like e.g. the host *(url/address/ip)* of your database and the port.
This is done in form of a JDBC-string. The exact syntax of this string depends on the database-driver that you are using.
But usually it looks something like this: `jdbc:[driver]://[host]:[port]/[database][?properties]`

Here are some Examples:  
`jdbc:mysql://localhost:3306/bluemap?permitMysqlScheme`  
`jdbc:mariadb://db.myhost.com/my-database`  
`jdbc:postgres://127.0.0.1:3306/bluemap`  

And here is some more documentation for [MySQL](https://dev.mysql.com/doc/connector-j/en/connector-j-reference-jdbc-url-format.html),
[MariaDB](https://mariadb.com/kb/en/about-mariadb-connector-j/#connection-strings) and [Postgres](https://jdbc.postgresql.org/documentation/use/#connecting-to-the-database).

### Connection-Properties
The `connection-properties` config is just a map of custom properties that you can pass to your db-driver when creating a
new connection. Usually this is used to authenticate yourself with the `user` and `password` properties like this:
```hocon
connection-properties: {
    user: "root",
    password: "pA55w0rd"
}
```

### Custom JDBC-Driver
BlueMap does **not** include any database-driver, this means you will need to provide your own driver to the Java Runtime
somehow:

**Paper** already includes a MySQL driver, so you don't have to do anything if you are on a Paper server and want to use MySQL/MariaDB.  

For **Spigot, Fabric and Forge** there are a couple of [mods/plugins](https://modrinth.com/mods?q=jdbc) which add such a driver.

Alternatively you can also **manually** download the JDBC-Driver of your choice and configure BlueMap to load it:  
Download the driver-jar (e.g. [mariadb-java-client.jar](https://mariadb.com/downloads/connectors/connectors-data-access/java8-connector/))
and place it in the `./bluemap` folder. Then set `driver-jar: "bluemap/mariadb-java-client.jar"` and `driver-class: "org.mariadb.jdbc.Driver"`
to tell BlueMap where to find the jar and which class to load from it. *(Don't forget to remove the `#` to uncomment the settings)*

## Sqlite
Configuring Sqlite is basically the same as in [MySQL, MariaDB & Postgres](#mysql-mariadb--postgres), just use a JDBC-driver for sqlite
and configure the correct `connection-url` like this: `jdbc:sqlite:[path-to-database-file]`. If the database-file doesn't exist,
it will be created.

> **Info:**  
> It is recommended to set the `max-connections` to `1` when using sqlite, to avoid database-locking issues!
{: .info }

Here is a simple way to set up your sqlite-storage:
- Install this [plugin/mod](https://modrinth.com/plugin/sqlite-jdbc)
- Set the `connection-url` in your `sql.conf` to `connection-url: "jdbc:sqlite:bluemap/sqlite.db"`
- Set the `max-connections` to `1`
- Change the `storage` in each of your **map** config files (`./maps/xxx.conf`) to `storage: "sql"`

Done :)

## Compression
All the storage-types have a `compression` setting. It defines how each hires-tile is compressed before it is stored.  
The default and recommended compression is `GZIP`, since browsers can receive the files compressed and decompress them on the fly.  
The supported compression settings are:

| setting                | description                                                                                                                                                                                                                      |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `compression: NONE`    | No compression, map tiles will be stored in plain json format.<br/>*Uncompressed files will be about 20x as big!*                                                                                                                |
| `compression: GZIP`    | [GZip](https://en.wikipedia.org/wiki/Gzip) compression.<br/>*Recommended.*                                                                                                                                                       |
| `compression: DEFLATE` | [Deflate](https://en.wikipedia.org/wiki/Deflate) compression.                                                                                                                                                                    |
| `compression: ZSTD`    | [Zstandard](https://en.wikipedia.org/wiki/Zstd) compression.<br/>*This compression is not supported by some browsers. BlueMap might need to recompress the file to gzip each time before sending it to the client! (Very slow!)* |
