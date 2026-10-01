# FakeBilibiliLink

一个静态网页工具：输入“显示视频链接”和“实际跳转链接”，生成 b23 假链接。

## 功能

- 支持输入 bilibili 链接或 b23 链接
- 自动转换并输出 `https://b23.tv/{显示段}/../{实际段}` 格式的假链接
- 一键复制结果

## 本地使用

本项目包含一个本地 API 路由用于 b23 转换（避免浏览器跨域导致的 `Failed to fetch`）。

建议使用 Vercel 本地开发服务器运行：

```bash
npm i -g vercel
vercel dev
```

然后访问 `http://localhost:3000`。

## 部署到 Vercel

该项目前端是静态页面，b23 转换通过 `/api/b23-convert` Vercel Serverless Function 代理调用 bilibili 接口。  
直接导入仓库到 Vercel 即可部署，无需额外构建配置。
