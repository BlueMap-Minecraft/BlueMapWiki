---
layout: page
title: Webserver
parent: Configs
grand_parent: Wiki
nav_order: 4
---

# Webserver-Config

> **Info:**  
> When a "default" is mentioned for any option, it is meant that if the option is commented out or removed, that is what BlueMap will use as a fallback.  
> This may not be the same as the option that is pre-filled-in.
{: .info }

## `enabled`
With this setting you can disable the integrated web-server.

This is useful if you want to only render the map-data for later use, or if you have set up your own webserver.

_Default is_ `true`

## `webroot`
The webroot that the server will host to the web.

Usually this should be set to the same directory like in the [`webapp.conf`](Webapp.md#webroot)!

_Default is_ `"bluemap/web"`

## `port`
The port that the webserver listens on.

_Default is_ `8100`

## `sse-enabled`
Whether to use Server-Sent Events (SSE) for pushing tile and marker-updates to the connected clients.

_Default is_ `true`

## `additional-headers`
Additional headers the webserver should include in the responses it sends.

_Default is_ no headers.

### Example:
```hocon
additional-headers: {
  "Cache-Control": "public, max-age=86400"
  "Cloudflare-CDN-Cache-Control": "max-age=60, stale-if-error=604800"
}
```

## `log`
Config-section for webserver-activity logging

<section markdown="1" class="config-indent">

### `file`
The file where the webserver-activity will be written to.  
Comment out to disable the logging completely.

[Java String formatting syntax](https://docs.oracle.com/javase/8/docs/api/java/util/Formatter.html) can be used to add time.

_Default is no logging_

### `append`
Whether the logger should append to an existing file, or overwrite it

_Default is_ `false`

### `format`
The format of the webserver-activity logs.

The syntax is the [Java String formatting](https://docs.oracle.com/javase/8/docs/api/java/util/Formatter.html).

Possible Arguments:  
`1` - the source address (ignoring any xff headers)  
`2` - the source address (using the (leftmost) xff header if provided)  
`3` - the http-method of the request  
`4` - the full request-address  
`5` - the protocol version of the request  
`6` - the status-code of the response  
`7` - the status-message of the response

_Default is_ `"%1$s \"%3$s %4$s %5$s\" %6$s %7$s"`

</section>

## Hidden Configs

> **Info:**  
> These config options are not included in bluemaps default configuration template.  
> This is done to discourage users from changing them, as they rarely need to be changed and are for advanced users only.  
> Change them at your own risk!
{: .info }

## `ip`
The IP address that the webserver will bind to.

Usually bluemap binds to all available network-interfaces, but you can use this setting to restrict bluemaps webserver
to bind to only one ip. For example if you want to only bind it to localhost and disallow external access you can set this to
```hocon
ip: "127.0.0.1"
```

_Default is_ `0.0.0.0` (all available interfaces)
