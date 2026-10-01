# FakeBilibiliLink

一个静态网页工具：输入“显示视频链接”和“实际跳转链接”，生成 b23 假链接。

## 功能

- 支持输入 bilibili 链接或 b23 链接
- 自动转换并输出 `https://b23.tv/{显示段}/../{实际段}` 格式的假链接
- 一键复制结果

## 本地使用

直接用浏览器打开 `/home/runner/work/FakeBilibiliLink/FakeBilibiliLink/index.html` 即可。

## 部署到 Vercel

该项目是纯静态站点，直接导入仓库到 Vercel 即可部署，无需额外构建配置。
