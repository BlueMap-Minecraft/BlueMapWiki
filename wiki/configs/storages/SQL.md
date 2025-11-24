---
layout: page
title: SQL
parent: Storage Configs
grand_parent: Configs
nav_order: 1
---

# SQL-Config

> **Info:**  
> When a "default" is mentioned for any option, it is meant that if the option is commented out, that is what BlueMap will use.  
> This may not be the same as the option that is pre-filled-in.
{: .info }

## `storage-type`
The storage-type of this storage.

Depending on this setting, different config-entries are allowed/expected in this config file.

**Don't change this value! (If you want a different storage-type, check out [the other example-configs](.))**

## `connection-url`
The JDBC-Connection URL that is used to connect to the database.

The _exact_ format of the url is determined by the JDBC-Driver you are using.  
But the format for this url is _usually_ something like: `jdbc:[driver]://[host]:[port]/[database]`

## `connection-properties`
You can set any additional (JDBC-Driver-specific) properties here  
Usually that's your db-user and password

## `max-connections`
The maximum number of connections to the database that are allowed to be open at the same time.
A negative number means unlimited.

_Default is_ `-1`

## `driver-jar`
This can be used to load a custom jdbc-driver from a .jar file.

E.g. if your runtime-environment is not already providing the sql-driver you need, you could
[download the MariaDB JDBC-Connector](https://mariadb.com/downloads/connectors/connectors-data-access/java8-connector/).  
And place it in the `./bluemap` folder and use it like this:
```hocon
driver-jar: "bluemap/mariadb-java-client-3.0.7.jar"
```

## `driver-class`
This is the driver-class that BlueMap will try to load and use.  
Check the documentation of the driver you are using if you don't know this.

Leaving this commented means that BlueMap automatically tries to find a suitable driver in your classpath.  
(If you added a custom [`driver-jar`](#driver-jar) above, you HAVE TO set the correct class name here)

## `compression`
The compression-type that bluemap will use to compress generated map-data.
Available compression-types are:
- `gzip`
- `zstd`
- `deflate`
- `none`
_Default is_ `gzip`
