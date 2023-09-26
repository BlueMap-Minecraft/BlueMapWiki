---
layout: page
title: Custom domains with Cloudlflare Tunnels
parent: Community Guides
nav_order: 5
---

# How to add custom domains to Bluemap webserver with Cloudflare Tunnels?

{: .no_toc }

1. TOC
{:toc}

## What do you need for this?

- Cloudflare account,
- Domain you own,
- Server you can install Cloudlare Tunnels,
- Credit card/prepaid card you have.

## Adding a domain to Cloudflare

(You can skip this part and go to Setting Zero Trust Dashboard part)

Go to Websites, click on "Add a site" then write your domain name.

1. "Select your plan"
    - You can choose Free plan at the bottom.
    
2. "Review DNS records"
    - You can skip it because we don't need to set a dns for this method.
    
3. "Change your nameservers"
    - Go to the site you bought your domain and change nameservers to Cloudflare's nameservers.

After doing these parts go to Traffic, Cloudflare Tunnel and click on Launch Zero Trust Dashboard.

## Setting Zero Trust Dashboard 

Go to Access, Tunnels and click on Complete Setup then follow these steps.

1. Choose your team name
    - Name it anything you want.
  
2. Choose a plan
   - You can pick the Free plan.

3. Proceed to payment
   - Just add a payment method and click on purchase.
   - If you've picked the Free plan, a credit/prepaid card is required for security reasons, but you won't be spending any money for it.

4. Go back to Tunnels again
   - Name it anything you want and save the tunnel.
    
5. Install Connector
   - Choose your operating system (you can choose Docker if you couldn't find yours), install and run the Connector.

6. Edit public hostname
   - Subdomain: You can name it anything you want.
   - Domain: Pick the domain you want to use for Bluemap.
   - Path: Leave it empty.
   - Type: Select HTTP (it will set itself back to https).
   - URL: You can use your ipv4 address (not public but local, for example 192.168.1.xx). Put ":" at the end of it and type the port you're using for Bluemap (it's 8100 by default).
     - It should be look something like "192.168.1.xx:8100"

After that it should be working without a problem at the subdomain you set.
