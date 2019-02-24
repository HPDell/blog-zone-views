# 欢迎来到 HPDell 的博客空间

这是我自己做的基于 `TypeScript` `Quasar` `Express` 的动态博客。博客代码放在 GitHub 上，目前是私有库状态。

- 后端仓库： [GitHub](https://github.com/HPDell/blog-zone)
- 前端仓库： [GitHub](https://github.com/HPDell/blog-zone-views)

## 依赖库

前端主要用到的依赖库有：

- Quasar 、 Webpack 和 Vue 系全家桶
- SimpleMDE ：Markdown 编辑器
- marked ：渲染 Markdown
- Prism.js ：代码高亮
- abcjs ：渲染乐谱
- MathJax ：渲染数学公式
- 除此之外还有 jquery 、 md5 、 moment 、 markdown-loader 、 html-loader 等

后端主要用到的依赖库有：

- Express
- Typeorm
- Moment.js
- Sqlite3
- JsonWebToken
- uuid

## 部署方法

后端的安装比较简单。克隆仓库后，使用如下流程进行部署

```bash
yarn global add typescript  # 如果没有 TypeScript 环境
yarn
tsc

# 直接启动 Node 进程
node app.js
# 或推荐使用 PM2 管理进程
pm2 start app.js --name blog-zone
```

前端的安装也比较简单。克隆仓库后，按如下流程部署

```bash
yarn global add quasar-cli
yarn
quasar build
```

将 `dist` 文件夹生成的文件用服务器（如 Nginx）进行代理，即可访问。

剩下的就是使用 Nginx 对后台进行反向代理了。配置脚本如下

```conf
server {
    listen 80;

    server_name $domain;

    location /api/ {
            proxy_pass http://localhost:3000/api/;
    }

    location /login/ {
            proxy_pass http://localhost:3000/login/;
    }

    location / {
            root $pathToDist;
    }
}
```