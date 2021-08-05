您可以使用NGINX等Web服务器反向代理BlueMap，下面是一些示例
如果您想给网页地图添加HTTPS或者集成到网站中，浙江很有用
### 必要条件
- 您可以访问您服务器的shell（不只是服务端控制台）
- 您已经安装其配置好了NGINX软件
- NGINX和BlueMap在同一台主机上，如果不是则需要将IP替换掉下文的localhost
- BlueMap内置Web服务器访问端口为8100，如果不是则需要替换掉下文的port
### 使用子目录访问
如果您已经有一个由NGINX托管的普通网站，并且希望在`/map/`（例如`https://mydomain.com/map/`）上展示地图，则可以将以下配置其添加到NGINX配置中：
```conf
server {
  
  ...

  location ~/map(.*)$ {
    proxy_pass http://127.0.0.1:8100$1;
  }
}
```
### 使用子域名访问
如果您想在子域名上使用BlueMap，例如`https://map.mydomain.com/`，那么您可以在nginx配置中添加以下内容：
```conf
server {
  listen 80;
  listen 443 ssl;

  server_name map.mydomain.com;

  location / {
    proxy_pass http://127.0.0.1:8100;
  }
}
```
