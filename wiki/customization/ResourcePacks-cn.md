BlueMap支持使用Minecraft资源包。如果要更改地图的外观，请使用支持高分辨率纹理或精美的方块模型的材质包。

>**重要说明**：
>如果更改资源包设置，则需要删除以前的渲染！删除完整的web/data文件夹！否则，您将获得具有奇怪纹理的网页地图模型。

要安装资源包，只需将资源包文件夹或zip放在配置文件旁边的`resourcepacks`文件夹中，然后重新加载BlueMap。BlueMap将扫描该文件夹并尝试加载找到的所有资源包。

>Sponge, Forge, Fabric: `./config/bluemap/resourcepacks/`
>Spigot/Paper:` ./plugins/BlueMap/resourcepacks/`

当然您也可以使用多个资源包。就像在《我的世界》中一样，它们会相互覆盖。由于它们按字母顺序加载，因此称为的资源包`zzzresources.zip`将覆盖`aaaresources.zip`。这意味着您可以通过重命名来重新排序它们，例如`01_some_pack.zip`，`02_some_extension_pack.zip`等等等...

确保资源包适用于您所运行的Minecraft版本。否则可能无法正确加载。如果您正在使用具有某些其他格式的资源包，则控制台中可能会有警告。警告通常会导致单个（方块）模型无法正确加载，所以该资源包中的所有其他资源仍在加载中。
