---
layout: page
title: Adding a login
parent: Community Guides
nav_order: 4
---

# Adding a login

{: .no_toc }

1. TOC
{:toc}

## What and why

Almost always your map is fully open for everyone to view.
But sometimes you just don't feel like sharing it.
Reasons for this might include:

- whitelisted friend only smp
- staff only map
- map is a paid rank perk

There are multiple ways of adding a login page.
The ways range from a simple shared password to a minecraft command and a full-on SSO solution.

## Prerequisites

Authentication is a very advanced topic and you will need more stuff than just a Minecraft server.
You should have a proper server where you can run these services.
Before you even begin, your map should already be running behind an external webserver
or a proxy for HTTP**S** so that credentials aren't sent plaintext over the internet.
You should also have basic understanding of hosting web applications (webservers, dns, ssl/tls).

## Basic auth (easy, a bit inconvient and ugly)

Basic auth is the most... basic... form of authentication.
It simply asks for a username and password which are configured in a file.
It is often handled by an external webserver such as Nginx or Apache.

You can create the config file with the `htpasswd` utility by Apache.
On Debian based distros it is in the `apache2-utils` package.
To create a new file and the first user use `htpasswd -c /path/to/file/.htpasswd user`.
To create a new user use use `htpasswd /path/to/file/.htpasswd another_user`.

### [Nginx](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/)

Add these lines inside a `server` or `location` directive in your BlueMap's Nginx config:

```nginx
auth_basic "BlueMap";
auth_basic_user_file /path/to/file/.htpasswd; 
```

### [Apache](https://httpd.apache.org/docs/2.4/mod/mod_auth_basic.html)

Apache authentication happens at Directory level so if you have `DocumentRoot /var/www/bluemap`
you will need this inside your BlueMap's Apache config:

```apache
<Directory "/var/www/bluemap">
    AuthType Basic
    AuthName "BlueMap"
    AuthUserFile /path/to/file/.htpasswd
    Require valid-user
</Directory>
```

## Minecraft login with permissions (medium, convenient for users)

If you want to restrict users to your BlueMap based on their Minecraft permissions
such as one given by a permission group/rank you should read about
[`Chicken/Auth`](https://github.com/Chicken/Auth) which is an amazing project
made by a community member of ours.

## Advanced software (hardest, most flexible)

There are also many more projects out there that could be used for authentication and authorization.
Battle-tested large SSO and identity provider applications such as
[Authentik](https://goauthentik.io/) or [Authelia](https://www.authelia.com/).
Even though these applications are large and complicated,
the benefit is that they can handle many different kinds of logins and more complex setups.
Explaining the setup of them would go way beyond this wiki
so you will be better off reading their official instructions.
Please note that setting these up is not an easy task and you will need some experience.
