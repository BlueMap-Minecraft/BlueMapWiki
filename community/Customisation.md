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

## Custom Styles (Theme and Look)
BlueMap allows you to write custom CSS snippets, with which you can style the BlueMap interface exactly to your liking.

Custom styles are not limited to any specific platform; they work on all platforms that BlueMap supports.

> **Info:**  
> If you don't know how to write CSS yet, here is a good guide: [developer.mozilla.org/en-US/docs/Learn/CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS)
{: .info }

To get started with BlueMap CSS, you should create a `.css` file in your webroot (usually `/bluemap/web/`).  
Then you need to register that stylesheet with BlueMap, so it'll actually load it.  
You do this in `webapp.conf`, by putting the file name in the `styles: [ ]` list.  
After adding it to the list, you'll want to reload BlueMap, so BlueMap applies the changes you've made to the configs.
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

You can also find some pre-made styles for BlueMap in the [3rd Party Addons section of this wiki]({{site.baseurl}}/3rdPartySupport.html?platform=script),
under the "style" platform filter. Feel free to take inspiration from these! Styling is tricky.

## Custom Scripts (Behaviour)
Aside from custom CSS snippets, BlueMap also supports custom JavaScript snippets to customise the behaviour of the webapp.

Custom scripts are not limited to any specific platform; they work on all platforms that BlueMap supports.

> **Info:**  
> If you don't know how to write JavaScript yet, here is a good guide: [developer.mozilla.org/en-US/docs/Learn/JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)
{: .info }

To get started with BlueMap JavaScript, you should create a `.js` file in your webroot (usually `/bluemap/web/`).  
Then you need to register that script with BlueMap, so it'll actually load it.  
You do this in `webapp.conf`, by putting the file name in the `scripts: [ ]` list.  
After adding it to the list, you'll want to reload BlueMap, so BlueMap applies the changes you've made to the configs.
You can do so with the `/bluemap reload light` command.

To test if it works, you can use this simple script:

`/bluemap/web/my-custom-script.js`:
```js
console.log("Hello world!");
```
`plugins/BlueMap/webapp.conf`:
```hocon
scripts: [
    "my-custom-script.js"
]
```
This should log a message to the browser console.
From here on, you can program any additional behaviour you want!

You can find some pre-made scripts in the [3rd Party Addons section of this wiki]({{site.baseurl}}/3rdPartySupport.html?platform=script),
under the "script" platform filter. Feel free to take inspiration from these! Scripting is hard.

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

## (Sub)Domain
To use a custom (sub)domain for your BlueMap, instead of a numerical IP, it works like any other website.

> Putting a web server on a (sub)domain is quite different than a game server!  
> For example, it is not possible to do remove the port with an SRV Record, like you probably did for your Minecraft Server! Browsers do not support SRV Records.
{: .info .important }

Putting BlueMap onto a (sub)domain is best done in multiple steps:
1. Make sure you have a server running on a numeric IP (`123.45.67.890`) and that BlueMap is accessible there (`http://123.45.67.890:8100`)
2. You should start with creating an A record in your domain's DNS settings that points to your numeric IP.
   BlueMap should now be accessible through `http://yourdomain.com:8100`.  
   **This is generally as far as you can get with normal Minecraft server hosts...**
   Maybe with some nicer hosting providers, you can talk to them and discuss possibilities, though :)
3. If you have more control over your server (for example, if you host at home or rent a VPS), you can install an external webserver and make it run on your domain.
   We generally recommend nginx. Here is a nice Getting Started guide for it: [nginx.org/en/docs/beginners_guide](https://nginx.org/en/docs/beginners_guide.html)
4. Once you have your external webserver set up, you need to reverse-proxy BlueMap with it.
   Here is a guide on how to do that with nginx: [NginxProxy]({{site.baseurl}}/wiki/webserver/NginxProxy.html)
5. Once you have that, you can even set up SLL (HTTPS)

## Advanced Webapp Customisation
If you feel like you need more control over the look and behaviour of the webapp
than JavaScript and CSS snippets allow you, you can modify the original source code
of the BlueMap WebApp, and recompile it manually.

> This should not be attempted by people who don't already have experience with common
> web-development tools and frameworks like Node, Vue.js, Vite, and three.js.
{: .info .important }

To get started, you should clone the BlueMap repo using git.
([link](https://github.com/BlueMap-Minecraft/BlueMap?tab=readme-ov-file#development))

Then, inside [`common/webapp/`](https://github.com/BlueMap-Minecraft/BlueMap/tree/master/common/webapp),
you will find the source code for the webapp.

You can now edit that however you'd like. The important commands for running and compiling are described in the
[readme](https://github.com/BlueMap-Minecraft/BlueMap/tree/master/common/webapp#readme).

Once you've made your changes and recompiled it, you can copy the `common/webapp/dist/` folder to your server,
and replace the default webapp with your custom one.

Good luck!
