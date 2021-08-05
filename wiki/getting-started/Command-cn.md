这是一个表格，其中包含所有命令及其权限，如果您将BlueMap用作插件 / mod，则可以使用该表：

| 命令                                                   | 权限            | 描述                                             |
| ------------------------------------------------------ | --------------- | ------------------------------------------------ |
| `/bluemap`                                             | bluemap.status  | 显示BlueMaps渲染状态                             |
| `/bluemap version`                                     | bluemap.version | 显示BlueMaps版本和一些更有用的系统信息           |
| `/bluemap help`                                        | bluemap.help    | 显示所有可能的BlueMap命令的列表                  |
| `/bluemap reload`                                      | bluemap.reload  | 重新加载所有资源，配置文件和Web服务器            |
| `/bluemap maps`                                        | bluemap.status  | 显示BlueMap加载的所有地图                        |
| `/bluemap worlds`                                      | bluemap.status  | 显示BlueMap加载的所有世界                        |
| `/bluemap pause`                                       | bluemap.pause   | 暂停所有渲染                                     |
| `/bluemap resume`                                      | bluemap.resume  | 恢复所有暂停的渲染                               |
| `/bluemap render [world|map] [x z] [block-radius]`     | bluemap.render  | 渲染整个世界（控制台）或玩家（玩家）周围可选半径 |
| `/bluemap render cancel`                               | bluemap.render  | 取消队列中的最后一个渲染任务                     |
| `/bluemap purge <map-id>`                              | bluemap.render  | 清除（删除）已经渲染的地图的所有数据             |
| `/bluemap marker create <id> <map-id> [x y z] <label>` | bluemap.marker  | 在玩家/提供的位置创建一个基本的POI标记           |
| `/bluemap marker remove <id>`                          | bluemap.marker  | 删除具有该ID的标记                               |
| `/bluemap debug block`                                 | bluemap.debug   | 打印玩家位置有关块的一些调试信息               |
| `/bluemap debug cache`                                 | bluemap.debug   | 清除bluemap的世界缓存                            |
| `/bluemap debug flush <world>`                         | bluemap.debug   | 保存世界并刷新计划的方块更新                     |
