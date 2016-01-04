# pic_server
一个使用 meteor 的图片拖拽上传、外链、下载服务器

## supervisor 配置
```
[program:pic-server]
command=/bin/su -l -c "cd /home/www/pic_server; meteor" www
```

## nginx 配置
```nginx
server {
  listen 80;
  server_name pic.example.com;

  access_log /var/log/nginx/pic.log;

	root /usr/share/nginx/html;
	index index.html index.htm;

  location / {
    proxy_pass http://localhost:3000;
  }
}
```
