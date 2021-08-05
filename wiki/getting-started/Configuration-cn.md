### 前言
BlueMap的配置文件都是使用[HOCON](https://github.com/lightbend/config/blob/master/HOCON.md)（译者注：一种基于json的文档格式，采用键值对）格式化，请确保您对如何使用此语法格式化有一定的基础，可以参阅它的GitHub自述文件！
如果在启动时插件没有检索到配置文件，则会为您生成示例配置文档，在这些配置文档中，每个键值对上面都会有一个注释项来解释它的功能以及它的默认值（如果有的话）。

### 核心配置：`core.conf`
这个配置文件包含了插件的基本功能和核心设置
```yaml
accept-download: false
renderThreadCount: -2
metrics: true
data: "bluemap"
```
- `accept-download`默认为false，需要使用BlueMap插件的相关功能则需要设置为true，但是在此之前，您需要仔细阅读以下内容：

  > 更改此选项，意味着已接受mojang的[EULA]，且确认您拥有Minecraft（Java版）的许可证。这样BlueMap将从mojang的服务器下载并使用minecraft-client-jar，由于下载的文件包含属于mojang的资源，所以您不得重新分发该文件或执行与mojang的EULA不兼容的其他事情。BlueMap使用此文件中的资源来生成用于地图的3D模型并对其进行纹理处理。 *（如果没有这些资源，BlueMap将无法使用。）*

- `renderThreadCount` 定义了BlueMap将使用多少个线程来进行渲染，将此值设置为0则可以最大程度的利用您的CPU进行渲染（BlueMap将使用和您的CPU内核一样多的线程）。如果将其设置为负值，则bluemap将获取可用核心数减去定义的数字。因此具有8个核心且设置`renderThreadCount: -2`则其可利用`8 + (-2) = 6`线程。

- `metrics` 默认为true，此项决定了是否发送一些非常小的错误报告，该错误报告仅包含使用的插件类型和版本，这样可以使作者跟踪BlueMap的基本用法，并帮助作者保持动力，进一步开发该工具，请确保此项为打开状态：）*（由于sponge拥有自己的指标控件，所以此选项不可用）*

- `data` 选项可以设置您希望插件在运行时用于保存其所需文件或保存其他数据的文件夹，例如下载的minecraft-client-jar文件、其他默认资源以及渲染任务的状态等等

### 渲染配置： `render.conf`

在渲染配置中，您可以确切的定义BlueMap应该使用什么方式渲染以及怎么渲染
```yaml
webroot: "bluemap/web"
useCookies: true
maps: [
  {
    id: "world"
    name: "World"
    world: "world"

    # Advanced map optional config fields:
    # 高级地图可以选则配置的选项
    startPos: [500, -820]
    skyColor: "#7dabff"
    ambientLight: 0
    renderCaves: false
    minX: -4000
    maxX: 4000
    minZ: -4000
    maxZ: 4000
    minY: 50
    maxY: 126
    renderEdges: true
    useCompression: true
    ignoreMissingLightData: false
  },
  {
    # ... more maps
    # ... 更多地图
  }
]
```
- `webroot`字段定义了保存渲染地图数据并且生成Web项目结构的文件夹。（译者注：反代理路径需要设置为这个文件目录，位于服务器根文件夹）
- `useCookies`决定是否在网页上使用Cookie，cookie仅用于保存访问者的设置，以便他们无需重新访问时再次进行设置
- 在`maps`中，您可以自定义任意数量的地图，已经在此声明并且配置的地图将会显示在网站的下拉菜单中，可以在菜单中进行切换；作为示例，生成的默认配置中具有三个预配置的映射，如果您不想使用它们，请务必将其删除！`maps`字段是拥有一个[]和多个{}的列表，每个{}所包含的对象将代表一个世界的地图，您可以渲染多个地图，每个地图应该拥有以下选项：
    - `id`：定义了地图的ID，此ID只能包含字母a-z、数字和下划线，并且必须唯一；它将作为地图的文件夹名称保存渲染的地图数据
    - `name`：定义地图的显示名称，亦是在网页中更换世界所显示的名称
    - `world`：定义地图的游戏内名称，即地图所在的文件夹名称  
    **如果有需要，您可以进一步更改地图的渲染方式**
    - `startPos`选项可以控制默认显示地图的未xz坐标，默认会居中显示
    - `skyColor`选项使用CSS样式的十六进制颜色码控制天空的颜色
    - `ambientLight`定义每个方块接收的环境光强度，与阳光/自发光无关。如果世界上没有任何阳光，例如下界和末地，这将很有用。
    - `renderCaves`字段控制渲染范围，如果为false则不会渲染任何自然光为0的区块范围，这样就会消除了很多不必要的几何形状，并且提高渲染速度，最重要的是，Web客户端的性能提高了很多！但是，有时候他可能会去除您从上帝视角看到的外观，例如，海底或大型天空建筑下面的区块，如果您的区块不像下界或者末地那样没有自然光，则必须启用此选项。
    - 字段`minX`，`minY`，`minZ`；`maxX`，`maxY`和`maxZ`定义了所呈现的世界的“界限”。因此，如果您只想渲染世界的特定区域，则可以在此处进行设置。通过使用y字段数值，您还可以仅渲染某些高度的块。例如，您可以使用它来移除地狱的上层基岩，以便能够看到渲染中的下部区域。
    - 如果使用上面的选项限制地图的边界，则可以使用该选项`renderEdges`定义如何渲染地图的“边缘”。如果是该值true，则将渲染边缘的块，否则边缘块将透明。
    - `useCompression`选项可用于控制数据压缩（通常使用gZip压缩图块）；压缩通常会将文件大小减少到80%及以上，因此不推荐关闭此选项
    - 通常，BlueMap会检测某个区块是否生成光照数据，并忽略渲染没有生成的块。如果选项`ignoreMissingLightData`设置为`true`，即使没有光照数据，BlueMap也会渲染方块！例如，如果某些mod阻止正确保存光照数据，则此功能很有用。但是，这也有一些缺点：
>对于那些方块，每个方块将始终被完全照亮
夜间模式可能无法正常工作
洞穴将始终被渲染（即忽略“ `renderCaves`”设置）

### Web服务器配置：`webserver.conf`
插件集成的Web服务器是将地图托管到Web界面的最简单的方法，这样你就可以在浏览器中查看它了。如果启用此项功能，它将使用http协议在`ip:port`上托管位于`webroot`文件夹定义里面的所有文件。
```yaml
enabled: true
webroot: "bluemap/web"
ip: "123.45.6.78"
port: 8100
maxConnectionCount: 100
```
- `enabled`字段负责控制内置Web服务器的启停（true/false）
- `webroot`字段定义了Web服务器将代理的Web界面文件夹，通常这个文件夹应该设置为和`render.conf`中的`webroot`字段相同的值
- `ip`字段定义了允许访问的IP地址，如果您忽略此字段，则插件将允许所有网络接口`0.0.0.0`访问；当然，如果您只想本地访问，则可以设置为localhost或者127.0.0.1。
- `port`设置了服务器的监听端口，默认监听端口为8100
- `maxConnectionCount`字段定义了最大活动连接数量，默认为100

### 插件配置：`plugin.conf`

这一节是关于玩家和服务器交互的，但是当前，它主要控制如何处理如何显示玩家。
```yml
liveUpdates: true
skinDownload: true
hiddenGameModes: [
  "spectator"
]
hideInvisible: true
hideSneaking: false
```

- 如果您不想使用任何实时数据，请设置`liveUpdates`为`false`。这将禁用完整的实时更新模块。
- 如果`skinDownload`设置为true，BlueMap将下载并更新每个玩家的皮肤，并在Web界面中加载。
- `hiddenGameModes`可以控制哪些游戏模式是在地图上是不可见的。默认情况下，除了观察者模式的玩家之外每个人都是可见的。
- 如果`hideInvisible`为`true`，则具有隐形效果的玩家将不会显示在地图上。
- `hideSneaking` 控制处于潜行状态的玩家是否在地图上可见。
