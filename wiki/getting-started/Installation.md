---
layout: page
title: Installation
parent: Getting Started
grand_parent: Wiki
nav_order: 1
---

# Installation
{: .no_toc }

1. TOC
{:toc}

## General Prerequisites
To run BlueMap you need:
- Java 21 or newer
- Minecraft Java-Edition

BlueMap only works with Java-Edition worlds, Bedrock-Edition worlds are not supported!

## Where do I find...
### ...the "config-files"? 
They are located relative to your server-root/working-directory here:

| Platform            | Directory            |
|---------------------|----------------------|
| Spigot/Paper        | `./plugins/BlueMap/` |
| Forge/Fabric/Sponge | `./config/bluemap/`  |
| CLI                 | `./config/`          |

### ...the "webroot"?
The webroot is the folder that contains all the files that will be hosted by the webserver and that can be accessed by the browser.
By default, it is located in your server-root folder at `./bluemap/web/`. 

### ... the map-data?
The webapp expects the map-data **inside the web-root** at `./maps/`. This is also the place where maps are stored by default.

## Installing BlueMap (basic setup)
This is the basic setup for BlueMap. BlueMap will run as a plugin/mod on your server, render/update the maps as your world changes
and host a small webserver to serve the map-files and the webapp where you can view the maps.

### Prerequisites
- A Spigot/Paper, Sponge, Fabric or Forge server
- Any **second port** that you can use, besides the one that is used by the minecraft-server
  *(Ask your hosting service if & how you can open a second port)*

### Steps
- First you want to download the bluemap-jar. You can choose and download a version 
  from [here](https://github.com/BlueMap-Minecraft/BlueMap/releases).
  Make sure it fits to the version of your server!
- Put the downloaded jar in the `plugins` or `mods`-folder of your server and restart the server.
- BlueMap will now generate the default config-files and pre-configure one map for each world it finds on your server.
- Open the `core.conf` config-file, read through the comments and agree to downloading some extra resources from Mojang
  by changing `accept-download` to `true`.
- Open the `webserver.conf` config-file and change the `port` to the **second port** that you got from your hosting-provider to use.
- Now you can go through the rest of the config-files and change the settings to your liking. 
  *(More info for configuring BlueMap can be found [here]({{site.baseurl}}/wiki/getting-started/Configuration))*
- After you have edited the configs, use the command `/bluemap reload` on your server or restart the server.

If everything is set up correctly, BlueMap should start to render your maps. Check the console/logs for any errors or warnings.

You can use `/bluemap` to see the progress and go to `http://<your-server-ip>:<port>/` to view the maps.

## Installing BlueMap with an SQL-Server
This setup extends the basic setup by using an SQL-Server to store your maps. 

### Prerequisites
- All the prerequisites from the basic setup
- An SQL-Server that can be accessed from your server

### Steps
- Use the basic setup above to install BlueMap like normal
- In your config-files, open the `storages/sql.conf`-file and configure the connection to your SQL-Server.
  *(See [this page]({{site.baseurl}}/wiki/customization/Storages.html#mysql-mariadb--postgres) 
  for more info about this config-file)*
- Now open each of your map-config-files and set `storage` to `"sql"`.
- Reload BlueMap with `/bluemap reload`.
- Now that your maps are stored on your database, you should delete the old map data from your filesystem, to prevent it from interfering.  
  You can do this by running the command `/bluemap storages file delete <map>` for each of the maps you have just switched to SQL.
  Or just manually delete the old map-data folder on your filesystem, which usually is at `./bluemap/web/maps`.

If everything is set up correctly, BlueMap should start to render your maps and store them on the SQL-Server.
Check the console/logs for any errors or warnings.

## Using BlueMap on the CLI / standalone
You can use BlueMap as a standalone app on the [CLI](https://en.wikipedia.org/wiki/Command-line_interface). 
This is useful if you want to render a map of a minecraft-world, but don't want to set up an entire minecraft-server.

### Prerequisites
- Java 21 or newer
- A minecraft-world that you want to render
- Any **port** that you can use to host the webserver on
  *(Ask your hosting service if & how you can open a port)*

### Steps
- First you want to download the bluemap-jar. You can choose and download a version from 
  [here](https://github.com/BlueMap-Minecraft/BlueMap/releases).
  Make sure it targets CLI and is compatible with the minecraft-version of the world you want to render.
- Choose/create a directory where you want BlueMap to run and generate its config-files and store your 
  downloaded jar in this folder.
- Open the CLI and change your [cwd](https://en.wikipedia.org/wiki/Working_directory) to the folder containing 
  your jar. *(usually using the command `cd <path-to-your-folder>`)*
- Run `java -jar BlueMap-cli.jar` so BlueMap generates the configuration-files next to the jar in your cwd.
- Open the `core.conf` config-file, read through the comments and agree to downloading some extra resources from Mojang
  by changing `accept-download` to `true`.
- Set up your map-configs for the world(s) you want to render.
- Now you can go through the rest of the config-files and change the settings to your liking.
  *(More info for configuring BlueMap can be found [here]({{site.baseurl}}/wiki/getting-started/Configuration))*
- After you have edited the configs run `java -jar BlueMap-cli.jar -r` to start the render.
- With `java -jar BlueMap-cli.jar -w` you can also start the builtin web-server to be able to view your map. 
  Or you can read [this]({{site.baseurl}}/wiki/webserver) to learn how to setup NGINX or 
  Apache for BlueMap.
- Use `java -jar BlueMap-cli.jar -h` to get a list and explanation for all available flags.

## Using BlueMap Docker image
You can use [BlueMap CLI](#using-bluemap-on-the-cli--standalone) in a Docker container. This is perfect for container loving sysadmins.
The image is available on GitHub container registry as `ghcr.io/bluemap-minecraft/bluemap`.
For latest and greatest the `latest` tag is the latest release (which can be a pre-release) and `master` the latest git commit.
You can also choose a latest minor of a major with tags such as `v3` or a specific version tag such as `v3.14`.  
For production usage you should **always** pin the version to the minor version as even the latest minor might still be a pre-release.
You can see the list of available Docker tags on [GitHub](https://github.com/BlueMap-Minecraft/BlueMap/pkgs/container/bluemap).
The documentation will from now on substitute the version with `<version>`.

### Prerequisites
- A minecraft-world that you want to render
- Working Docker installation
- Reading the [CLI](#using-bluemap-on-the-cli--standalone) instructions

### Volumes

| Path          | Purpose                                     |
| ------------- | ------------------------------------------- |
| /app/config   | Default config folder                       |
| /app/web      | Default web application                     |
| /app/web/maps | Default render data (included in web mount) |
| /app/data     | Other persistant data                       |
| /app/world    | Your world (you can also mount others)      |

You can also change these paths to be whatever you want in the configs.
To change the used config folder use the `-c /path/to/config` flag.

### Steps
- Somehow obtain the configuration folder.
  Easiest is to run `docker run --rm -it -v "$(pwd)/config:/app/config" ghcr.io/bluemap-minecraft/bluemap:<version>`.
  Which creates a config folder in your current working directory with the default configs.
- Configure the application however you like.
- Start a container to render and host a webserver.
  ```sh
  docker run --rm -it \
    --name bluemap \
    -p 8100:8100 \
    -v "$(pwd)/config:/app/config" \
    -v "$(pwd)/world:/app/world" \
    -v "$(pwd)/data:/app/data" \
    -v "$(pwd)/web:/app/web" \
    ghcr.io/bluemap-minecraft/bluemap:<version> \
    -r -u -w
  ```
  Change the `$(pwd)/world` to an actual path to your world.  
  The final two flags `-r` is for rendering, `-u` enables auto-updating the map, `-w` is for the webserver.  
  See CLI usage and `--help` for more.  
  If you changed the default paths in the config to something else, make sure to account for that in the volume mounts.  
  If you want it running on the background remove the `--rm -it` and replace with `-d --restart always`.

Here's a Docker Compose example for running in the background.
Just start with `docker compose up -d`.
```yml
services:
  bluemap:
    image: ghcr.io/bluemap-minecraft/bluemap:<version>
    restart: always
    command: -r -u -w
    ports:
      - '8100:8100'
    volumes:
      - './config:/app/config'
      - './world:/app/world'
      - './world_nether:/app/world_nether'
      - './world_the_end:/app/world_the_end'
      - './data:/app/data'
      - './web:/app/web'
```

### Notes

Relative paths in the config are relative to the `/app` folder.
If you find this confusing, use absolute paths to your mounts.

If you want you can precreate the volume folders with specific user ownership
and then start BlueMap as a non-root user using the Docker `--user uid:gid` flag or compose `user` field.

To change the webserver's port or ip binding, you don't need to change BlueMap's config.
Instead, just change where Docker publishes the port by changing the `-p 8100:8100` flag.

To change Java flags, just overwrite the entire default `java -jar cli.jar` entrypoint.
