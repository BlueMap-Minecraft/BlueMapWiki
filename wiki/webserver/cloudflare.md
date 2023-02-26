---
layout: page
title: Creating subdomains for Bluemap with Cloudflare Tunnels
parent: Webserver
grand_parent: Wiki
nav_order: 2
---
# Creating subdomains for Bluemap with Cloudflare Tunnels

If you want to make map.example.com like subdomains for Bluemap without nginx you can use Cloudflare Tunnel.

# What do you need to make it?
- A domain you own.
- A Cloudflare account. (Free also works)
- Docker installed.
- A credit/prepaid card, paypal etc. (Don't worry you dont have to pay anything.)

# Add your domain to Cloudflare nameservers.
1- Go to your Cloudflare account, click on "Add a Site", write your domain, select your plan (Free plan works) Cloudflare will scan your all dns records existed, you can add all of them, this wont gonna affect anything. After clicking "Continue" copy 2 name servers Cloudflair gave you and click "Done, check nameservers".

2- Go to the site where you bought your domain from, for this example i used Google Domains. Click on "My domains" then select the domain you want to set. 

3- Click "Manage", then go to "DNS", "Custom name servers", "Switch to these settings" and paste your 2 name servers Cloudflare gave you. After a few minutes on Cloudflare you should see "Great news! Cloudflare is now protecting your site" message.

# Creating the Cloudflare Tunnel.
4- On Cloudflare, go to Traffic -> Cloudflare Tunnel -> Launch Zero Trust Dashboard. 

5- Click "Next", choose a team name, choose a plan (free works), proceed to payment, add your payment methods (again, it's free you just need any credit/prepaid card or paypal account), purchase.

6- Go to Zero Trust Dashboard -> Access -> Tunnels -> Create a tunnel. Set your Tunnel name, save the tunnel, then install Docker now if you didn't installed already (if you have windows, you can download cloudflared.msi file) and select "Docker" and copy the command Cloudflare gave you, paste it in your terminal. BUT if it gives you "docker: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?" simply type "systemctl start docker" command on your terminal then try it with sudo again (ignore "Unable to find image 'cloudflare/cloudflared:latest' locally" message). YOU SHOULD KEEP OPEN YOUR TERMINAL AND OYUR COMPUTER OR IT WILL NOT WORK

7- Wait a few minutes and you should see your connector in "Connectors". Click "Next" then write "map" or anything you want, select your domain, leave the path empty (unless if you want something like example.com/maps, leave subdomain part empty and write map it path part.), then click "Select..." under Type and select "HTTPS" and for the URL, write "ip a" command on your terminal (on windows write ipconfig on cmd) copy your ip address (for linux: inet -> 192.168.1.xx) (for windows: IPv4 Addess -> 192.168.1.xx) and paste it, then put ":" next to it and type your bluemap port you set (8100 by default). It should look something like 192.168.1.xx:yyyy. Click on "Save hostname"

8- Now it should be saved as map.example.com or example.com/map. 
