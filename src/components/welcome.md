# 欢迎来到 HPDell 的博客空间

这是我自己做的基于 `TypeScript` `Quasar` `Express` 的动态博客。博客代码放在 GitHub 上，目前是私有库状态。

- 后端仓库： [GitHub](https://github.com/HPDell/blog-zone)
- 前端仓库： [GitHub](https://github.com/HPDell/blog-zone-views)

## 依赖库

前端主要用到的依赖库有：

- Quasar 、 Webpack 和 Vue 系全家桶
- SimpleMDE ：Markdown 编辑器（由于需要做必要的改造，因此将源代码复制下来放到了本地）
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

## 主要配置选项

后端的数据库是可选的，参考 [Typorm 的配置](http://typeorm.io/#/connection-options) 。
默认采用的是 SQLite 数据库，数据库文件是根目录的 `database.db` 文件。

前端主要有以下几个配置：

- `package.json` 文件
  - `meta` 属性
    - `owner` : 博客显示的名称（即显示 `${owenr} 的博客` ，`${owner} 的博文` 等）
    - `description` : 博客显示的简介
- `/src/components/welcome.md` 文件：这个文件记录了主页显示的内容。将来可能移动到专门的地方，或者放在服务器中。

## 支持的内容

博客支持以下内容

- 微文：一般用于撰写小段独立文字，配图最多 9 张，而且也是独立于文字显示的。
- 博文：一般用于长文写作，需要提供标题。

微文和博文都支持 Markdown 语法。本博客对 Markdown 的支持进行了扩展，拥有以下功能

- 代码：语法高亮、行号、显示语言
- 乐谱：支持 [ABC](http://abcnotation.com/) 格式书写的乐谱，同时显示乐谱和 MIDI 音频。

> **注意**：微文支持 Markdown 语法，表明微文中可以插入图片。单一般不建议在微文文字中插入图片。
这样插入的图片不支持点击查看大图。

--------------

如果你喜欢本项目，欢迎去 GitHub 点赞。