---
layout: page
title: Render full map as a png image
parent: Community Guides
nav_order: 13
---

# Render full map as a png image

If you want to render and export your full map as a png image with a top-view, use the free tool [bluemap-full-render](https://github.com/VityaSchel/bluemap-full-render) written in JavaScript running locally.

## Install

1. Clone repository
2. Install [nvm.sh](https://nvm.sh) for Node.js (you can find Windows installation instructions in the NVM repository)
3. Go to the cloned repository and execute `nvm use` to switch to Node.js v20.13.1
4. Execute `npm install` to install dependencies (check requirements for your PC here: headless-gl)
5. Execute `npm run build`
6. Download `/bluemap/web/maps/overworld/tiles/1` from remote machine (minecraft server) to your local machine (where you're rendering) and rename to bluemap-[date]
7. Execute `node out/index.js ./path/to/bluemap-[date] ./my-output-directory` where first argument is path to the folder you downloaded in step 6 and second argument is path to the output directory

This will output map parts with resolution 1:1 block and size of 16384х16384 pixels that you can stitch together to get a final ultra big map.

You can find more details about bluemap APi and how this tool was made in the repository: https://github.com/VityaSchel/bluemap-full-render

By [hloth.dev](https://hloth.dev)
