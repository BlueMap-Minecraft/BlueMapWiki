如果你想优化你的地图加载、显示速度，您可以直接使用web服务器（例如Apache或者NGINX）托管BlueMap，为此，您需要进行一些配置。
### 目标
BlueMap渲染并把地图保存为许多称为“平铺”的小部分。这些小的块数据以单个文件的形式保存在树状文件夹结构中：`<webroot>/data/<map-id>/`。文件数据为json格式。但是文件也可以使用GZip进行压缩。现在的问题是：Web应用程序（浏览器）有可能会请求请求未压缩的.json文件，但是普通的Web服务器只能找到压缩后的gzip文件。


例如： Web应用程序正在要求地图块数据：`/data/world/hires/x9/z-8.json`。您的Web服务器现将会搜索该文件，它将找不到这个块数据，因为它所需的文件实际上是`/data/world/hires/x9/z-8.json.gz`文件！而同样重要的是，它被压缩了。


因此，我们需要做两件事：


- 在服务器内部将请求重定向到文件的.gz文件格式
- 告诉浏览器我们发送的文件实际上是GZip压缩的，浏览器必须先将其解压缩，然后再将其提供给用户。（我们可以通过使用http-header 实现Content-Encoding: gzip解决这个问题）


### 实时数据界面
如果您使用的是插件/模组，则通常会在地图上实时更新玩家标记。对于那些使用外部Web服务器的用户，您还需要将对`/ live / `文件夹的所有请求反向代理到内置的Web服务器。


### NGINX的配置文件
使用NGINX时，实际上一个配置行可以同时完成这两项工作：`gzip_static always`；


因此，在某些情况下，您的网站配置需要更改为如下所示：


```conf
server {
listen 80;
server_name yourdomain.com;


# path to bluemap-webroot, bluemap can also be used in a sub-folder .. just adapt the paths accordingly
# bluemap-webroot的路径，bluemap也可以在子文件夹中使用..只需相应地调整路径
root /var/www; 
location / {
try_files $uri $uri/ =404 ;
}
# We only want the map-tiles, so only files in the data/ folder should use this setting
# 我们只需要地图的块数据，因此只有data /文件夹中的文件才应使用此设置
location /data/ {
gzip_static always;
}


# Proxy requests to the live data interface to bluemaps integrated webserver
# 实时数据接口被反代理到Bluemaps的内置Web服务器
location /live/ {
proxy_pass http://127.0.0.1:8100;
}
}
```
### Apache
作者没有使用Apache，也没有亲自测试过，下面是@kencinder提供的解决方案作为示例配置：


```conf
DocumentRoot /var/www/
<Directory /var/www/>
allow from all
Options FollowSymLinks
Require all granted
SetEnv no-gzip


RewriteEngine on


# Make sure the browser supports gzip encoding before we send it
# without it, Content-Type will be "application/x-gzip"
# 在发送之前，请确保浏览器支持gzip编码
＃ 如果不支持，Content-Type将为“ application / x-gzip”
RewriteCond %{HTTP:Accept-Encoding} \b(x-)?gzip\b
RewriteCond %{REQUEST_FILENAME}.gz -s
RewriteRule ^(.+) $1.gz [L]


# Also add a content-encoding header to tell the browser to decompress
＃还添加一个内容编码标头，以告知浏览器解压缩gzip文件
<FilesMatch .gz$>
ForceType application/json
Header set Content-Encoding gzip
</FilesMatch>
</Directory>
```
### Caddy
如果您使用的是Caddy，这是@mbround18的解决方案：


```conf
http://your-domain {
root * /usr/share/caddy/
file_server


reverse_proxy /live/* http://127.0.0.1:8100


@JSONgz {
path *.json
file {
try_files {path}.gz
}
}


route @JSONgz {
rewrite {http.matchers.file.relative}
header Content-Type application/json
header Content-Encoding gzip
}


}
```

