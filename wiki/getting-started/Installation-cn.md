要运行BlueMap插件，您需要
-  Java 8 或者更高版本
-  Minecraft Java-Edition 
-  （通常）需要开放其他的端口

TIPS：BuleMap仅支持在JE版本我的世界工作，BE版本并未支持！

### 作为Sponge插件
如果您有海绵服务器，则可以将bluemap用作服务器插件。然后，插件会渲染以及在发生某些更改时主动更新您的地图。如果服务器关闭/重新启动，则渲染任务将暂停并恢复。
- 首先，您要下载bluemap-jar。您可以从[此处](https://github.com/BlueMap-Minecraft/BlueMap/releases)或从[海绵插件存储库](https://ore.spongepowered.org/Blue/BlueMap)中选择并下载相应版本。确保它和服务器的SpongeAPI版本相同！
- 将下载的jar放在服务器的mods文件夹中，然后重新启动服务器。
- BlueMap现在将在`./config/bluemap/`生成配置文件，使用您喜欢的编辑器打开这些配置，并阅读配置一章以了解如何配置bluemap。
- 编辑配置后，请使用`/bluemap reload`重新启动插件。
- `/bluemap render <world>`命令以启动整个世界的初始渲染。

### 作为Spigot/Paper插件
如果您有Spigot或paper服务器，则可以将bluemap用作服务器插件。然后，插件会渲染以及在发生某些更改时主动更新您的地图。如果服务器关闭/重新启动，则渲染任务将暂停并恢复。
- 首先，您要下载bluemap-jar。您可以从[此处](https://github.com/BlueMap-Minecraft/BlueMap/releases)选择并下载版本。确保它和服务器的SpigotAPI版本相同！
- 将下载的jar放在服务器的plugins文件夹中，然后重新启动服务器。
- BlueMap现在将在`./plugins/BlueMap/`生成配置文件，使用您喜欢的编辑器打开这些配置，并阅读配置一章以了解如何配置bluemap。
- 编辑配置后，请使用`/bluemap reload`重新启动插件。
- `/bluemap render <world>`命令以启动整个世界的初始渲染。

### 作为Forge/Fabric模组
如果您有Forge服务器或Fabric服务器，则可以将bluemap用作服务器上的mod。然后，插件会渲染以及在发生某些更改时主动更新您的地图。如果服务器关闭/重新启动，则渲染任务将暂停并恢复。

- 首先，您要下载bluemap-jar。您可以从[此处](https://github.com/BlueMap-Minecraft/BlueMap/releases)选择并下载版本。确保它和服务器的forge/fabric版本相同！
- 如果您有fabric-server，则还需要安装fabricAPI mod。
- 将下载的bluemap-jar放在服务器的mods文件夹中，然后重新启动服务器。
- BlueMap现在将在`./config/bluemap/`生成配置文件，使用您喜欢的编辑器打开该配置，并阅读配置一章以了解如何配置bluemap。
- 编辑配置后，请使用`/bluemap reload`重新启动插件。
- `/bluemap render <world>`命令以启动整个世界的初始渲染。

### 作为原版独立程序
您可以使用CLI（命令行界面）将BlueMap作为独立的应用程序来渲染地图，如果您拥有原版我的世界服务器或者想渲染本地的地图但又不想设置服务器，这一程序将会很有用！
- 首先，您要下载bluemap-jar。您可以从[此处](https://github.com/BlueMap-Minecraft/BlueMap/releases)选择并下载版本。确保它以CLI为目标并且与您要渲染的世界的Minecraft版本兼容。
- 选择/创建一个要在文件夹作为运行程序并生成其配置和文件的目录，并将下载的jar保存在此文件夹中。
- 运行CLI，并定位在包含程序jar的文件夹（译者注：Windows可以使用shift+右键选择在此打开pawershell窗口）（使用cd命令）
- 使用`java -jar BlueMap-cli.jar`以运行该程序并在目录中生成配置文件
- 现在，使用您喜欢的编辑器打开配置文件，并阅读配置一章，学习如何配置程序。
- 编辑完后，使用`java -jar BlueMap-cli.jar -r`命令以启动渲染。
- 使用`java -jar BlueMap-cli.jar -w`您还可以启动内置的web服务器，以便能够查看您的地图
