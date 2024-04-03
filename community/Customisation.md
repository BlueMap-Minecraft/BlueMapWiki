---
layout: page
title: Customisation Guide
parent: Community Guides
nav_order: 7
---

# Customisation Guide
{: .no_toc }

How to edit the BlueMap website, for example to make it fit more with your server's brand.

Keep in mind that some BlueMap updates require you to delete the `index.html` file to update the webapp,
so make sure to remember any edits you do to it and any of BlueMap's other source files, because you will need to apply them again.

> **Info:**  
> Throughout this guide, `/bluemap/web/` shall be assumed as the default webroot. If you're using a custom, different webroot, please make sure to use that instead.
{: .info }

1. TOC 
{:toc}

## Theme and look
BlueMap allows you to write custom CSS snippets, with which you can style the BlueMap interface exactly to your liking.

> **Info:**  
> If you don't know how to write CSS yet, here is a good guide: [developer.mozilla.org/en-US/docs/Learn/CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS)
{: .info }

To get started with BlueMap CSS, you should create a `.css` file in your webroot (usually `/bluemap/web/`).  
Then you need to register that stylesheet with BlueMap, so it'll actually load it.  
You do this in `webapp.conf`, by putting the file name in the `styles: [ ]` list.  
After adding it to the list, you'll probably want to reload BlueMap, so BlueMap applies the changes you've made to the configs.
You can do so with the `/bluemap reload light` command.

To test if it works, you can use this simple style:

`/bluemap/web/my-custom-style.css`:
```css
:root {
    --theme-bg: red;
}
```
`plugins/BlueMap/webapp.conf`:
```hocon
styles: [
    "my-custom-style.css"
]
```
This should make all BlueMap's buttons fully red.  
From here on, you can customise any BlueMap class you want.

## WebApp Script Addons
Aside from custom CSS snippets, BlueMap also supports custom JavaScript snippets to customise the behaviour of the webapp.  
You can find those in the [3rd Party Addons section of this wiki]({{site.baseurl}}3rdPartySupport.html), under the "script" platform filter.

The installation process for these is basically the same as for a CSS snippet:  
Download, copy, or create a `.js` file in your webroot (usually `/bluemap/web/`).  
Then you need to register that script with BlueMap, so it'll actually load it.  
You do this in `webapp.conf`, by putting the file name in the `scripts: [ ]` list.  
After adding it to the list, you'll probably want to reload BlueMap, so BlueMap applies the changes you've made to the configs.
You can do so with the `/bluemap reload light` command.

## Embed
In some places, when you share a link to your map, it'll embed a bit of extra info. In Discord it looks like this:

![Screenshot of the default BlueMap embed in Discord]({{site.baseurl}}/assets/BlueMapDiscordEmbed.png)

You can change how this looks by editing the `bluemap/web/index.html` file.  
The options you can safely change are the `description`, `theme-color`, `og:site_name`, `og:title`, `og:description`, and `og:image`.

> The `og:image` attribute should be a full URL link, not a relative path.
{: .info }

## Website favicon
A favicon is the icon you'll see on the tab in your browser, and in the favourites bar if you've favourited the website.  
There are two ways to change BlueMap's favicon:
1. Replace the favicon image `/bluemap/web/assets/favicon-8768b872.png`
2. Copy a new image file to the BlueMap webroot (or `assets` directory) and edit the `<link rel="icon" href="./assets/favicon-8768b872.png">` in `index.html` to refer to your new image instead.

## Website title
The title is the text that is on the tab in your browser.  
Changing the `<title>` tag in the `index.html` will not work!  
You need to change it in each language file, which are at `/bluemap/web/lang/`.  
The option `pageTitle` in the `.conf` files in this directory are what you need to change.

## Default language
You can change the default language for your map, which will apply for all new visitors.
It will not change the language for people who have already visited your site once already.  
In `/bluemap/web/lang/settings.conf` is the setting `default`, which you can change to any of the locales listed below it.

## Info menu
BlueMap has an *Info* menu in the sidebar, which is also completely customisable.  
You can edit it in the each language file, which are at `/bluemap/web/lang/`.  
The option `info: { content:` is the one you need to edit for this.  
It accepts any normal HTML.

## Screenshot file name
BlueMap has a screenshot feature, which downloads a screenshot to your device.  
You can change the filename of that by opening the `/bluemap/web/assets/index-123456.js` file, and then doing a `Ctrl`+`F` for "`bluemap-screenshot.png`".  
By changing that piece of text, you can choose any other filename you wish.

## Domain
To use a custom domain for your BlueMap, instead of a numerical IP, it works like any other website.  
In your domain's DNS settings, you should point an A Record to the IP of the server your BlueMap is hosted on.  
Keep in mind that _this will not_ remove the need to type the port afterwards!  
To fix that, you need an external webserver. Here is a guide on how to do that with NGINX: [NginxProxy]({{site.baseurl}}/wiki/webserver/NginxProxy.html)

> It is not possible to do remove the port with an SRV Record, like you probably did for your Minecraft Server. Browsers do not support SRV Records.
{: .info .important }
