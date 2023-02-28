class AddonBrowser extends HTMLElement {
    // noinspection JSUnusedGlobalSymbols
    connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <div class="menu">
            <input id="search" type="text" placeholder="Search...">
            <div class="select">
                <label for="api-version">API-Version</label>
                <select id="api-version" name="api-version">
                    <option value="any">any</option>
                </select>
            </div>
            <div class="select">
                <label for="platform">Platform</label>
                <select id="platform" name="platform">
                    <option value="any">any</option>
                </select>
            </div>
        </div>
        <div id="search-results" class="results"></div>
        `;

        let styleElement = document.createElement("style");
        styleElement.textContent = `
        *, *::before, *::after {
          box-sizing: border-box;
        }
        
        input, select, option {
            background-color: transparent;
            border: none;
            padding: 0;
            margin: 0;
            width: 100%;
            font-family: inherit;
            font-size: inherit;
            cursor: inherit;
            line-height: 1em;
            outline: none;
        }
        
        option {
            background-color: #333;
        }
        
        .menu {
            display: flex;
            background-color: #333;
            border-radius: 4px;
        }
        
        input {
            padding: 1em;
            min-width: 10em;
        }
        
        ::placeholder, label {
            color: #888; 
        }
        
        .select {
            position: relative;
            width: 10em;
            margin: 0 0.5em;
        }
        
        .select label {
            position: absolute;
            top: 0.25em;
            left: 0;
            font-size: 0.7em;
            
        }
        
        .select select {
            padding: 0.5em 0;
            margin: 0.5em 0;
        }
        
        .addon {
            display: flex;
            background-color: #222;
            margin: 0.5em 0;    
            padding: 0.5em;
            border-radius: 4px;
        }
        
        .addon .title {
            display: flex;
        }
        
        .addon .desc {
            flex-grow: 1;
            margin-right: 0.5em;
        }
        
        .addon .links {
            flex-grow: 0;
        }
        
        .addon .platforms img {
            display: inline-block;
            width: 1em;
            height: 1em;   
            margin-left: 0.5em;
        }
        
        .addon .name {
            font-weight: bold;
        }
        
        .addon .author {
            margin-left: 0.5em;
            font-style: italic;
            color: #666;
        }
        
        .addon .links {
            flex-grow: 0;
            flex-shrink: 0;
        }
        
        .addon .links a {
            text-decoration: none;
            width: 3em;
            height: 3em;
            margin: 0.2em;
            padding: 0;
            display: inline-block;
        }
        
        .addon .links img {
            width: 100%;
            height: 100%;
            display: inline-block;
        }
        
        `;
        this.shadowRoot.prepend(styleElement);

        this.shadowRoot.querySelectorAll("input, select").forEach((element) => {
            //element.addEventListener("change", () => this.update());
            element.addEventListener("input", () => this.update());
        });

        this.fetchHocon(`/assets/addon_browser/addons.conf`).then((addons) => {
            this.addons = addons;
            this.addons.sort((a, b) => {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            });

            this.apiVersions = [];
            this.platforms = [];
            this.addons.forEach((addon) => {
                if (addon.apiVersion) {
                    const subversions = addon.apiVersion.split(".");
                    for (let i = 0; i < subversions.length; i++) {
                        const version = subversions.slice(0, i + 1).join(".");
                        if (!this.apiVersions.includes(version)) this.apiVersions.push(version);
                    }
                }

                addon.platforms.forEach((platform) => {
                    if (!this.platforms.includes(platform)) this.platforms.push(platform);
                });
            });
            this.apiVersions.sort(this.compareVersions);

            let apiVersionSelectElement = this.shadowRoot.getElementById("api-version");
            this.apiVersions.forEach((version) => {
                let option = document.createElement("option");
                option.value = version;
                option.innerHTML = version;
                apiVersionSelectElement.append(option);
            });
            this.shadowRoot.getElementById("api-version").value = Math.max(
                ...this.apiVersions.map((v) => v.split(".")[0])
            );

            let apiPlatformSelectElement = this.shadowRoot.getElementById("platform");
            this.platforms.forEach((platform) => {
                let option = document.createElement("option");
                option.value = platform;
                option.innerHTML = platform;
                apiPlatformSelectElement.append(option);
            });

            let resultElement = this.shadowRoot.getElementById("search-results");
            this.addons.forEach((addon, id) => {
                let element = document.createElement("div");
                element.id = "addon-" + id;
                element.classList.add("addon");
                element.addon = addon;
                element.innerHTML = `
                <div class="desc">
                    <div class="title">
                        <div class="name">${addon.name}</div>
                        <div class="platforms"></div>
                        <div class="author">by ${addon.author}</div>
                    </div>
                    <div class="description">${addon.description
                        .trim()
                        .replaceAll("<", "&lt;")
                        .replaceAll(">", "&gt;")
                        .replaceAll("\n", "<br>")}</div>
                </div>
                <div class="links"></div>
                `;

                let platformsElement = element.getElementsByClassName("platforms").item(0);
                addon.platforms.forEach((platform) => {
                    let element = document.createElement("img");
                    element.src = `/assets/addon_browser/platforms/${platform}.webp`;
                    element.alt = platform;
                    platformsElement.append(element);
                });

                let linksElement = element.getElementsByClassName("links").item(0);
                for (id in addon.links) {
                    let link = addon.links[id];
                    let element = document.createElement("a");
                    element.href = link;
                    element.target = "_blank";
                    element.innerHTML = `
                    <img alt="${id}" src="/assets/addon_browser/links/${id}.svg">
                    `;
                    linksElement.append(element);
                }

                resultElement.append(element);
            });

            this.update();
        });
    }

    update() {
        let search = this.shadowRoot.getElementById("search").value;
        let platform = this.shadowRoot.getElementById("platform").value;
        let apiVersion = this.shadowRoot.getElementById("api-version").value.split(".");

        this.addons.forEach((addon, id) => {
            let element = this.shadowRoot.getElementById("addon-" + id);

            let match = true;
            if (search) {
                if (
                    (!addon.name || !addon.name.toLowerCase().includes(search.toLowerCase())) &&
                    (!addon.description || !addon.description.toLowerCase().includes(search.toLowerCase()))
                )
                    match = false;
            }

            if (apiVersion[0] !== "any" && addon.apiVersion) {
                let addonVersion = addon.apiVersion.split(".");
                if (Number.parseInt(apiVersion[0]) !== Number.parseInt(addonVersion[0])) {
                    match = false;
                } else {
                    for (let i = 1; i < Math.min(apiVersion.length, addonVersion.length); i++) {
                        let a = Number.parseInt(apiVersion[i]);
                        let b = Number.parseInt(addonVersion[i]);

                        if (a < b) {
                            match = false;
                            break;
                        }
                    }
                }
            }

            if (addon.platforms && platform && platform !== "any") {
                if (!addon.platforms.includes(platform)) match = false;
            }

            if (match) {
                element.style.display = null;
            } else {
                element.style.display = "none";
            }
        });
    }

    async fetchHocon(url) {
        return fetch(url)
            .then((res) => res.text())
            .then((value) => parseHocon(value));
    }

    compareVersions(version1, version2) {
        if (!(version1 && version2)) return 0;

        version1 = version1.split(".");
        version2 = version2.split(".");

        for (let i = 1; i < Math.max(version1.length, version2.length); i++) {
            let a = i < version1.length ? Number.parseInt(version1[i]) : 0;
            let b = i < version2.length ? Number.parseInt(version2[i]) : 0;

            if (a > b) return 1;
            if (a < b) return -1;
        }

        return 0;
    }
}

customElements.define("addon-browser", AddonBrowser);
