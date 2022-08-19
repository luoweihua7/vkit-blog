# vKit
vKit 的 Hexo 博客

https://vkit.fun/
https://vkit.run/

# 博客


通过默认的布局 `post` 创建页面

```sh
npx hexo new "Page Title"
```

也可以指定布局创建页面，使用方法参考 [Hexo写作文档](https://hexo.io/zh-cn/docs/writing.html) 说明。

`layout` 布局参考 `scaffolds` 目录下的md文件。

```sh
# 根据布局创建文章，文件存储到 source 目录
npx hexo new page "Page Title"

# 根据布局创建文章，文件存储到 source/_posts 目录
npx hexo new post "Post Title"

# 创建草稿，文件存储到 source/_drafts 目录，generate时不会自动发布
npx hexo new draft "Draft Title"
# 草稿文章完成修改后，进行发布。默认以 post 布局发布，也可以指定布局。发布后会移动到对应布局的目录
npx hexo publish [layout] "Draft Title"
```


# 构建

```
npm install
npx hexo generate
```

更多请访问 [Hexo指令](https://hexo.io/zh-cn/docs/commands) 文档


# Github Actions

通过使用 Github Actions 的自动化能力，通过 `Tencent Cloud COS Action` 实现自动化的部署到腾讯云存储桶。可以在腾讯云存储桶中开启静态网站功能实现静态网站的部署。


首先在 `Settings` > `Secrets` > `Actions` 页面中，点击 **New repository secret** 按钮，分别添加以下配置


|Name|Value|
|:---|:---|
|TENCENT_CLOUD_SECRET_ID|`填写腾讯云的 secretId`|
|TENCENT_CLOUD_SECRET_KEY|`填写腾讯云的 secretKey`|
|TENCENT_CLOUD_COS_BUCKET|`填写腾讯云的 COS 存储桶名称`|
|TENCENT_CLOUD_COS_REGION|`填写腾讯云的 COS 存储桶的地域`|




