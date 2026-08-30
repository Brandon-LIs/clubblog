# 宜昌一中科创社团官网

基于 Hexo 7 的社团官方网站 · 政务权威风 · 响应式 · 支持 Vercel 一键部署。

## 本地开发

```bash
npm install        # 安装依赖
npm run build      # 构建静态站点到 public/
npm run serve      # 本地预览（http://localhost:4000）
```

## 内容编辑指南

所有内容均为 Markdown，位于 `source/` 目录：

| 内容 | 文件位置 |
|------|----------|
| 社团动态（博文） | `source/_posts/YYYY-MM-DD-标题.md` |
| 社团简介 | `source/about/intro.md` |
| 指导教师 | `source/about/teacher.md` |
| 社团荣誉 | `source/about/honors.md` |
| 招贤纳士 | `source/join/index.md` |
| 联系我们 | `source/contact/index.md` |
| 导航菜单 / 统计数据 / 联系方式 | `themes/yckc/_config.yml` |

### 新增动态博文

在 `source/_posts/` 新建文件（文件名须带日期前缀）：

```markdown
---
title: 文章标题
date: 2026-08-30
tags: [标签1, 标签2]
link: 原文链接（可选）
---

正文内容，图片放 source/images/posts/ 下并在正文中引用：

![说明](/images/posts/图片文件名.jpg)
```

保存后运行 `npm run build` 即可发布。

## 部署到 Vercel

1. 将项目推送到 GitHub 仓库
2. 在 [vercel.com](https://vercel.com) 导入该仓库
3. 无需额外配置——`vercel.json` 已声明构建命令（`node build.js`）与输出目录（`public/`）
4. 部署完成后即可访问

## 可用内容组件（Markdown 中直接写 HTML）

- 通知框：`<div class="gov-callout">...</div>`
- 卡片墙：`<div class="honor-grid"><div class="honor-card">...</div></div>`
- 数据条：`<div class="about-facts"><div class="fact-item"><strong>数字</strong><span>说明</span></div></div>`
- 方向卡：`<div class="direction-grid"><div class="direction-card">...</div></div>`
- 联系卡：`<div class="contact-grid"><div class="contact-card">...</div></div>`

## 技术说明

- Hexo 7.3 + 自研 `yckc` 主题（政务红金配色、宋体标题）
- 构建入口为 `build.js`（修复了 Hexo 7 API 需手动 `env.init` 的问题，并将 `.html` 目录化保证任意静态服务器可访问）
