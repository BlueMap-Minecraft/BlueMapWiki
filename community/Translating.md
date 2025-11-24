---
layout: page
title: Translating BlueMap
parent: Community Guides
nav_order: 15
---

# Translating BlueMap

*Everyone can help to translate BlueMap to their language.*

This guide is for doing everything from the GitHub web interface, but you can do them locally via git if you know how to.

Here are the steps:

1. You need to create a GitHub account at <https://github.com/>
2. Then go to <https://github.com/BlueMap-Minecraft/BlueMap> and press the fork button in the top-right corner
3. After it has finished forking go inside the folder `BlueMapCommon/webapp/public/lang` and create a new file from the top right of the file selector, name this file with code of your language (`fi.conf`, `ru.conf`, etc) and copy the contents of the `en.conf` to it.
4. Translate the english strings inside `""`'s to your language
5. Scroll down and press "commit changes"
6. Open the `settings.conf` file in the same folder and press the pen symbol on top right of the file. Copy another languages settings and give it the right name and filename. Keep these in alphabetical order. Don't forget to commit the changes.
7. Go back to the project main page. Above the files you should see a contribute button. Press open pull request.
8. Fill in any necessary details and give it a good title such as "Added X language"
9. Wait
10. To use your changes locally without waiting for a BlueMap release you can copy the language file and settings file to your BlueMap webroot lang folder.
