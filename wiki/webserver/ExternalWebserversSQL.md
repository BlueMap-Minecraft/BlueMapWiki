---
layout: page
title: External Webservers (SQL-Storage)
parent: Webserver
grand_parent: Wiki
nav_order: 2
---

# Directly hosting BlueMap with external webservers from a SQL storage
{: .no_toc }

BlueMap's internal webserver is very lightweight and quite fast, but it might get overwhelmed by a larger number of
concurrent users.

If you want to optimize the speed of your web-app for a larger audience, you can also host BlueMap directly with 
external webservers like [NGINX](https://www.nginx.com/) or [Apache](https://httpd.apache.org/). 
For this to work you need to do some configuration.

1. TOC 
{:toc}

## The goal
BlueMap renders and saves the map on your SQL-Server. But the webapp requests them like they would be in a normal file-storage
inside the webroot. So we need some script that is translating those requests and fetching and providing the correct files 
from the SQL-Server.

## General Setup

Luckily BlueMap provides such a script. A PHP-Script to be exact. This means the first thing you need to do is to make sure
that you have PHP (>= 7.4) installed on your webserver.  
Then you go into the webroot and open the `sql.php`, and set your SQL-Connection settings there.

> **Important:**  
> Make sure that your php-setup is working, otherwise you might accidentally leak those SQL-Connection-Settings to the world!
{: .info .important }

> **Info:**  
> Since all your maps are on the database, make sure to delete the (old) `maps` folder from your **webroot** if it is still there. So the files in there don't
> override data that should actually come from the database.
{: .info }

Now you need to configure your webserver, so that it rewrites all requests for which no static file exists to the `sql.php`.

## NGINX
On nginx this can be achieved with e.g. `try_files $uri /sql.php;`.

With some context your website-config could look something like this:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    # path to bluemap-webroot, BlueMap can also be used in a sub-folder .. just adapt the paths accordingly
    root /var/www;
    
    location / {
        try_files $uri /sql.php;
    }
    
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php7.4-fpm.sock;
    }

    # OPTIONAL:
    # Proxy requests to the live data interface of each map to bluemaps integrated webserver
    # If you have multiple servers you will need to proxy each map-id to the correct server
    location ~* /(maps/[^/\s]*/live/.*) {
        proxy_pass http://127.0.0.1:8100/$1;
    }
}
```
> **Important:**<br>
> The above config is **just an example** and not a complete config you can just copy&paste. You **will** need to adapt it to your setup!
{: .info .important }

## Apache

Here is an example for how it could look like on Apache:
```apache
DocumentRoot /var/www/
<Directory /var/www/>
    allow from all
    Options FollowSymLinks
    Require all granted
  
    RewriteEngine On
    
    RewriteCond %{REQUEST_FILENAME} !-s
    RewriteCond %{REQUEST_FILENAME} !-l
    RewriteCond %{REQUEST_FILENAME} !-d
    # Rewrite request to the sql.php
    RewriteRule ^.*$ /sql.php [L]  
</Directory>

# OPTIONAL:
# Proxy requests to the live data interface to bluemaps integrated webserver  
ProxyPreserveHost On
ProxyPassMatch ^/(maps/[^/]*/live/.*) http://127.0.0.1:8100/$1
```
> **Important:**<br>
> The above config is **just an example** and not a complete config you can just copy&paste. You **will** need to adapt it to your setup!
{: .info .important }

## Caddy with php-fpm

Here is an example for how it could look like on Caddy with php-fpm:
```caddy
yourdomain.com {
    # The root for the webserver.
    root /var/www
    file_server

    # https://caddyserver.com/docs/caddyfile/patterns#php-fpm
    # You may need to modify this path.
    php_fastcgi unix//run/php/php7.4-fpm.sock


    # Use the sql.php script, which handles requests with data from the sql-server.
    handle {
        try_files {path} /sql.php
    }

    # OPTIONAL:
    # Proxy requests for live data to the bluemaps integrated webserver.
    # If you have multiple servers you will need to proxy each map-id to the correct server.
    handle /maps/*/live/* {
        reverse_proxy 127.0.0.1:8100
    }
}
```
> **Important:**<br>
> The above config is **just an example** and not a complete config you can just copy&paste. You **will** need to adapt it to your setup!
{: .info .important }

## FrankenPHP

Here is an example for how it could look like on FrankenPHP:
```caddy
{
    # https://frankenphp.dev/docs/config/#caddyfile-config
    # Enable FrankenPHP.
    frankenphp
}

yourdomain.com {
    # The root for the webserver.
    root /var/www

    # https://frankenphp.dev/docs/config/
    # Execute PHP files in the root directory and serve assets.
    php_server

    # Use the sql.php script, which handles requests with data from the sql-server.
    handle {
        try_files {path} /sql.php
    }

    # OPTIONAL:
    # Proxy requests for live data to the bluemaps integrated webserver.
    # If you have multiple servers you will need to proxy each map-id to the correct server.
    handle /maps/*/live/* {
        reverse_proxy 127.0.0.1:8100
    }
}
```
> **Important:**<br>
> The above config is **just an example** and not a complete config you can just copy&paste. You **will** need to adapt it to your setup!
{: .info .important }
