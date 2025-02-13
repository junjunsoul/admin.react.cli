## 使用

### 使用命令行
```bash
$ npm install
$ npm start
```

### 部署

#### 构建起始目录
- 根目录 `/` (构建前需要进入到此目录)

#### 环境要求
- node >=14.18.0
- cnpm 安装命令：
```bash
npm install cnpm@7.1.1 -g --registry=https://registry.npmmirror.com
```

#### 构建步骤
```bash
cnpm i
npm run build
```

#### 构建完成后处理
- 构建成功后部署目录: `/dist`
- 注意：域名不能直接指向项目的`/dist`，需要复制dist目录另外部署

#### 服务器配置(仅供参考)
##### 入口配置
```nginx
location / {
    root /xxxx/xxx;
    index index.html index.htm;
    
    #不缓存html
    if ($request_filename ~* .*\.(?:htm|html)$){
        add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
    }
}
```

##### 接口代理配置
```nginx
location /api {
    proxy_pass http://xxxxx.com;
}
```

### 参考资料
[React项目部署与配置说明](https://www.jianshu.com/p/90c04ceff2da)
