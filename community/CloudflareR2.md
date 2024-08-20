---
layout: page
title: Hosting BlueMap on Cloudflare R2
parent: Community Guides
nav_order: 15
---

# How to host BlueMap on Cloudflare R2
{: .no_toc }

1. TOC
{:toc}

## For whom is this guide?

This guide is for people who want a static map, which they rarely if ever want to update. It is not intended for a live map of a server.

## What is Cloudflare R2?

Cloudflare R2 is a service that allows you to host files on Cloudflare's network. With a couple of tweaks, you can host static websites such as BlueMap on Cloudflare R2. Please bear in mind that Cloudflare R2 costs money.

## What do you need for this?

- a Cloudflare account
- a Domain you own & is connected with Cloudflare
- a Credit card/prepaid card you have
- a rendered BlueMap, which uses FILE storage, not SQL storage
- rclone installed on the system you've rendered the map on

## Adding a domain to Cloudflare

(You can skip this part and go to Setting Zero Trust Dashboard part)

Go to Websites, click on “Add a site” then write your domain name.

1. “Select your plan”
    - You can choose Free plan at the bottom.

2. “Review DNS records”
    - You can skip it because we don't need to set a DNS for this method.

3. “Change your nameservers”
    - Go to the site where you bought your domain and change nameservers to Cloudflare's nameservers.


## Creating a bucket & uploading files with rclone

1. Go to R2, click on “Create bucket” then write your bucket name, e.g. `bluemap`.

2. In your new bucket, go to settings.

3. Scroll to Public Access / Custom Domains and click on “Connect Domain”. Enter the domain you want to use for BlueMap and confirm the changes.

4. (optional) Scroll down and edit the “Default Multipart Abort Rule” by clicking on the three dots and then “Edit”. Set the “Multipart Abort Rule” to 1 day. This will cause multipart uploads to be aborted after 1 day if they are not completed. This is useful if a larger file upload is interrupted. It will remove the incomplete file after 1 day.

5. Go back to the R2 overview page and click on “Manage R2 API Tokens”. Click on “Create API Token” and give it a name. Give it “Admin Read & Write” permissions & create the token.  Keep this page open for the rclone configuration.

## Uploading files with rclone

1. Open a terminal and run `rclone config` to configure rclone.
   1. Choose “n” for new remote.
   2. Choose a name for the remote, e.g. `R2`.
   3. Choose `Amazon S3 Compliant Storage Providers` as the storage provider. (As of the time of writing, option `4`.)
   4. Choose `Cloudflare R2 Storage` as the provider. (As of the time of writing, option `6`.)
   5. Choose `Enter AWS credentials in the next step.`
   6. Copy the `Access Key ID` and `Secret Access Key` from the R2 API Token page to the terminal.
   7. Choose the only possible region.
   8. Copy the endpoint from the R2 API token page to the terminal.
   9. Do not edit the advanced config.
   10. Check if the configuration is correct & confirm.

2. Navigate in the terminal to the directory where your BlueMap *web* files are located. You should be in the directory that contains the file `index.html`.

3. Run the following command to upload the files to your R2 bucket:
   ```bash
   rclone sync . R2:bluemap/ --transfers=60 --checkers=120 -P
   ```
   - `rclone` — the program you are calling
   - `sync` — the command to synchronize files — files which are not present in the destination will be copied there and files which are not present in the source will be deleted in the destination
   - `.` — the current directory
   - `R2:bluemap/` — the remote you configured in the rclone configuration plus the name of your bucket
   - `--transfers=60` — the number of parallel transfers — BlueMap consists of numerous small files, so a high number of transfers is beneficial
   - `--checkers=120` — the number of parallel checks — BlueMap consists of numerous small files, so a high number of checks is beneficial. Checkers compare your local files to those remote.
   - `-P` — shows you the progress

4. While the files are uploading, you can continue with the next step.

## Making necessary configurations

1. Go to your domain inside the Cloudflare dashboard. Click on “Rules” and then “Transform Rules” — make sure you are in the Rewrite URL tab. Click on “Create Rule”.

2. Give the Rule a name, e.g. `BlueMap: Index`. This rule will allow you to open the BlueMap domain without the need to enter `index.html` at the end of the URL.
   1. Select `Custom filter expression`
      1. In the first field, select `Hostname`. In the Operator field, select `equals`. In the value field, enter the domain you are using for BlueMap, e.g. `map.example.com`.
      2. Click on `And` to add another rule.
      3. In the first field select `URI Path` and in the Operator field select `ends with`. In the value field, enter `/`.
   2. Further down under Path, select `Rewrite to...`.
      1. In the first field select `Dynamic` and in the second field enter `concat(http.request.uri.path, "index.html")`.
   3. It should look similar to this: ![Screenshot of the index rule in Cloudflare]({{site.baseurl}}/assets/r2/index_rule.png)
   4. Save the rule.

3. Create another Transform rule here and give it a name, e.g. `BlueMap: gzip`. This rule allows Cloudflare to serve the compressed files when the textures or the .prbm files are requested.
   1. Select `Custom filter expression`
      1. In the first field, select `Hostname`. In the Operator field, select `equals`. In the value field, enter the domain you are using for BlueMap, e.g. `map.example.com`.
      2. Click on `And` to add another rule.
      3. In the first field select `URI Path` and in the Operator field select `ends with`. In the value field, enter `textures.json`.
      4. Click on `Or` to add another rule.
      5. In the first field, select `Hostname`. In the Operator field, select `equals`. In the value field, enter the domain you are using for BlueMap, e.g. `map.example.com`.
      6. Click on `And` to add another rule.
      7. In the first field select `URI Path` and in the Operator field select `ends with`. In the value field, enter `.prbm`.
   2. Further down under Path, select `Rewrite to...`.
      1. In the first field select `Dynamic` and in the second field enter `concat(http.request.uri.path, ".gz")`.
   3. It should look similar to this: ![Screenshot of the gzip rule in Cloudflare]({{site.baseurl}}/assets/r2/gzip_rule.png)
   4. Save the rule.

4. Now click on the `Modify Response Header` tab and create a new rule.
   1. Give the rule a name, e.g. `BlueMap: Content-Encoding`. This rule marks the compressed files as compressed, so your browser knows how to handle them when it requests them.
   2. Select `Custom filter expression`
      1. In the first field, select `URI Path`. In the Operator field, select `ends with`. In the value field, enter `.gz`.
      2. Click on `Or` to add another rule.
      3. In the first field, select `URI Path`. In the Operator field, select `ends with`. In the value field, enter `textures.json`.
      4. Click on `Or` to add another rule.
      5.  In the first field, select `URI Path`. In the Operator field, select `ends with`. In the value field, enter `.prbm`.
   3. Further down under `Modify response header`.
      1. In the first field, select `Set static`. In the Header name field, enter `Content-Encoding`. In the Header value field, enter `gzip`.
   4. It should look similar to this: ![Screenshot of the Content-Encoding rule in Cloudflare]({{site.baseurl}}/assets/r2/encoding_rule.png)
   5. Save the rule.


## Making optional configurations

Every time a file is requested from your bucket, that counts as an operation. Every operation above the free limit induces a cost. To reduce the number of requests to your bucket, you can set up a cache policy. This will cache the files on Cloudflare's edge servers and serve them from there. This will reduce the number of requests to your bucket and thus reduce the costs.

1. Go to your domain inside the Cloudflare dashboard. Click on “Rules” and then “Cache Rules”. Click on “Create Rule”.
   1. Give the Rule a name, e.g. `BlueMap: Cache`.
   2. Select `Custom filter expression`
      1. In the first field, select `Hostname`. In the Operator field, select `equals`. In the value field, enter the domain you are using for BlueMap, e.g. `map.example.com`.
   3. Further down under `Cache eligibility` select `Eligible for cache`.
   4. Further down under `Edge TTL` click on `Add Setting`.
      1. Now select `Ignore cache-control header and use this TTL` and set `Input time-to-live (TTL)` to a value you are comfortable with. I set it to 1 year.
      2. This rule will cache all files for up to 1 year on Cloudflare's edge servers and serve them from there instead of requesting them from your bucket. This will reduce the number of requests to your bucket and thus reduce the costs.
   5. Further down under `Browser TTL` click on `Add Setting`.
      1. Now select `Override origin and use this TTL` and set `Input time-to-live (TTL)` to a value you are comfortable with. I set it to 1 year.
      2. This rule will cache all files for up to 1 year in your browser. This can be beneficial if you have many visitors who visit the map multiple times. They can load the map faster because the files are already in their browser cache. If they want to see the latest version of the map, they can do a hard refresh (Ctrl + F5) to force the browser to load the static files from the server AND click on the "Update Map" button in the menu to reload the map tiles.
   6. It should look similar to this: ![Screenshot of the Cache rule in Cloudflare]({{site.baseurl}}/assets/r2/cache_rule.png)
   7. Save the rule.
2. If you have a paid plan, you can potentially use “Custom error responses” to change 404 errors to 204 errors as suggested by the [External Web server documentation]({{site.baseurl}}/wiki/webserver/ExternalWebserversFile). This is however, not necessary for BlueMap to work. Since this documentation is about Cloudflare R2 and the free domain plan, I will not go into detail about this.