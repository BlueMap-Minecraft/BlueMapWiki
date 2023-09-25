---
layout: page
title: Render screenshots from Python
parent: Community Guides
nav_order: 11
---

# Render screenshots from Python
## What and why ?
I needed to export images of worlds from python, for a big project. First i tried to make my own renderer, and when you don't have any experience with OpenGL, or any other such frameworks, it is nearly impossible. So I looked at other projects that already renders `nbt` files or maps, such as [deepslate](https://github.com/misode/deepslate) or [prismarine-viewer](https://github.com/PrismarineJS/prismarine-viewer), but, unfortunately, I'm a python guy, so I'm lazy and want easy stuff.

Then I remembered that when I had a server on [minestrator](https://minestrator.com), I had the LiveMap option activated, and that it was awesome. So I looked at the program used for this, and I found BlueMap. But now, how would I automate screenshoting a world ?
## Tutorial
### Setup
- Follow the [installation instructions for **BlueMap-CLI**](https://bluemap.bluecolored.de/wiki/getting-started/Installation.html#using-bluemap-on-the-cli--standalone). It even worked on my Mac, how amazing is that.
- Install Python. For this example, I am using **Python 3.11**, but it should work on other versions as long as the dependancies are supported.
  - `aiofiles`, used to **write and read files asynchronously**.
    Install it with: `pip install aiofiles`.
  - `playwright`, used to **open headless browsers that executes JS**, and interract with them.
    Install it with: `pip install playwright`.
    Then execute: `playwright install chromium`.
    
### Program
*The whole program is at the bottom of this section.*
First import all the depencies:
```py
from playwright.async_api import async_playwright, Download
# To work with the headless browser.

from base64 import b64decode
# To decoded base64-encoded images.

from pathlib import Path
# To work with path more easily than with os.path.

import aiofiles
# To work with files asynchronously.

import asyncio
# To build asynchronous environment.
```
This **function will work asynchronously**, since I need to get a ton of screenshots and want it to be finished before I'm dead. In this example we only export one image, but it's better if it's already adapted for many. For this, we use:
```py
async def main() -> None:
    ""

if __name__ == "__main__":
    asyncio.run(main())
    # Calls the `main` function asynchronously so we can then execute async operations in `main`.
```
Then, I put the path of export I want for my image:
```py
async def main() -> None:
    output_path = Path('image.png')
    # Can be whatever you want, `"image.png"` for the example.
```
Then, I create a new browser, a new context, and open a page.
```py
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        context = await browser.new_context()

        page = await context.new_page()
```
On the page, I am going to load the url of a world, with a specified viewpoint. I am using `wait_until='networkidle'` to **make sure the page has well loaded the JS and that it is ready to be worked on**. `'networkidle'` as value is discouraged by the library, but it is the only one that loads correctly the page, so I don't care.
```py
        await page.goto(
            'http://localhost:8100/#plots:10:-47:11:16:-0.54:0.83:0:0:perspective',
            wait_until='networkidle'
        )
```
Then I will define (outside of `main`) a function to be called back when a download happens on the page. The function will get the url (which is something that looks like `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACgAA` ...), split it at the `,` and get the end part, which is **the base64-encoded image**, and will then write it into the wanted file.
```py
async def on_download(output_path: Path, download: Download) -> None:
    content = download.url.split(",", 1)[1]
    content = b64decode(content.encode())
    async with aiofiles.open(output_path, 'wb') as write:
        await write.write(content)
```
Now, back inside the `main` function, I will set the callback. *I am using lambda so it calls the `on_download` function with the `output_path`, otherwise I would've to make a class that stores it and call one of its function, annoying and slow.*
```py
page.on('download', lambda download: on_download(output_path, download))
```
And now, I have to interract with the page to **click on the "Take screenshot" button** in the menu. For this, I am using the following lines, that opens the menu, and then takes the screenshot using the button.
```py
        await page.get_by_title('Menu').click()
        # Gets and click on the element that has the attribute `title="Menu"`.

        await page.get_by_text('Take Screenshot').locator('xpath=..').click()
        # Gets and click on the parent ('xpath=..') of the element that has text 'Take Screenshot'.
```
Here is what it does (in a non-headless browser).
![](https://github.com/BlueMap-Minecraft/BlueMapWiki/assets/85891169/c1063109-1eda-421c-9c73-6a1ccaa8822b)

Then I am waiting `.5` seconds to make sure the downloading is done. It takes approximately `.11` seconds to do it, but we never know. Then I close the page.
```py
        await asyncio.sleep(.5)
        await page.close()
```
*If you want to export many images, you probably don't want to close the page and open the `playwright` object after each screenshots, so I suggest you to make a loop before the page is created, and to close all after you are done with all the screenshots.*

And here is my screenshot, **generated all automatically**:
![](https://github.com/BlueMap-Minecraft/BlueMapWiki/assets/85891169/c62739a7-1b19-494b-a457-491a199208af)

Of course, **make sure to have BlueMap launched when executing this program**. I run it using `java -jar BlueMap-3.16-cli.jar -rw`.

Here is the full code:
```py
from playwright.async_api import async_playwright, Download
from pathlib import Path
from base64 import b64decode
import aiofiles
import asyncio

async def on_download(output_path: Path, download: Download) -> None:
    print(download.url[:50])
    content = download.url.split(",", 1)[1]
    content = b64decode(content.encode())
    async with aiofiles.open(output_path, 'wb') as write:
        await write.write(content)

async def main() -> None:
    output_path = Path('image.png')

    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=False)
        context = await browser.new_context()

        page = await context.new_page()
        await page.goto(
            'http://localhost:8100/#plots:10:-47:11:16:-0.54:0.83:0:0:perspective',
            wait_until='networkidle'
        )

        page.on('download', lambda download: on_download(output_path, download))

        await page.get_by_title('Menu').click()
        await page.get_by_text('Take Screenshot').locator('xpath=..').click()
        await asyncio.sleep(.5)
        await page.close()

if __name__ == "__main__":
    asyncio.run(main())
```
By [аэт](https://github.com/novitae)
