# 项目部署与发布指南

这是一份关于本项目如何部署、发布的说明，涵盖「免服务器静态托管」与「自建服务器/后端」两类常见场景。

---

## 一、项目包含的版本

本仓库包含两套前端实现：

- **静态版（根目录）**：原生 HTML / CSS / JavaScript + THREE.js（本地 `js/vendor/three.min.js`），无需构建、可直接托管。
- **Vue 3 版（`vue-app/`）**：基于 Vite + Vue 3 构建，需要先执行构建步骤。

> 当前线上使用的是**根目录静态版**，功能完整、部署最简单。

---

## 二、当前线上地址（已通过 GitHub Pages 发布）

```
https://duoduo-xixi.github.io/Personal-Summerry-Web/
```

发布方式：

1. 将仓库设为 **公开**（GitHub Pages 在免费版要求仓库公开，否则提示 "Upgrade or make this repository public to enable Pages"）。
2. 在仓库 `Settings → Pages` 中，`Source` 选择 **Deploy from a branch**，Branch 选 `main`、目录选 `/ (root)`，保存。
3. 等待 1–3 分钟即可通过上面的地址访问。

---

## 三、如何修改并更新内容

静态版的内容配置集中在 `js/main.js` 顶部的 `CONFIG` 对象中，主要包括：

- 姓名、头像圆环字符、备选角色（打字机效果）
- 院校、专业、生日、联系方式、个人简介
- 技能矩阵、学习/实习经历、代表作品、社交链接

修改后执行：

```bash
git add .
git commit -m "update content"
git push origin main
```

GitHub Pages 会在推送后自动重新构建并更新线上内容。

---

## 四、免服务器托管方案（适合纯静态站点）

这类平台无需租用服务器，只需上传文件或连接 Git 仓库，平台负责存储、分发并自带 HTTPS + CDN。

| 平台 | 适合版本 | 部署方式 | 亮点 |
|------|---------|---------|------|
| GitHub Pages | 静态版 | 连接 Git 仓库，分支+目录 | 与代码仓库天然一体 |
| Netlify | 静态版 + Vue 版 | 拖拽文件夹 / 连接 Git | 免费额度充足、自带 CDN 与 SSL |
| Vercel | 静态版 + Vue 版 | 连接 Git 自动构建 | 对前端/单页应用支持极好 |
| Cloudflare Pages | 静态版 + Vue 版 | 连接 Git 自动部署 | 流量与请求不限额、全球 CDN |
| Surge.sh | 静态版 | 命令行 `surge ./` | 最快最简单 |
| 对象存储 + CDN（腾讯云 COS / 阿里云 OSS） | 静态版 | 上传文件 + 开启静态托管 | 国内访问快、可绑定域名 |

> 说明：Vue 版在这些平台上默认从**域名根路径**提供，`/assets/...` 这类绝对路径无需额外配置。若部署到 GitHub Pages 的项目子路径（如 `/Personal-Summerry-Web/`），则需要将 `vue-app/vite.config.js` 中配置 `base: './'` 后重新构建。

---

## 五、有后端 / 服务器时的部署方式

如果你的站点包含需要常驻运行的后端（如 WebSocket、定时任务、数据库、接口服务），不再只是纯静态托管，需要选择以下其一。

| 方向 | 代表平台 | 你要做的事 | 适合 |
|------|---------|-----------|------|
| Serverless / 全托管 | Vercel、Netlify、Cloudflare Pages(函数)、Render、Railway、Fly.io | 提交代码，平台运行逻辑，无需运维服务器 | 中小型项目、想省事 |
| 自租云服务器（VPS/ECS） | 阿里云/腾讯云轻量服务器、华为云、Vultr、DigitalOcean、AWS | 自行购买、装环境、跑服务、配域名、防攻击 | 需要稳定长跑、可控、国内速度要求高 |

### 自租服务器部署的一般步骤（以 Nginx + 应用为例）

1. **购买服务器**：国内可用阿里云/腾讯云**轻量应用服务器**（个人小站 1 核 2G 已足够），系统可选 Ubuntu/CentOS。
2. **获取代码**：`git clone <仓库地址>` 上传或拉取到服务器。
3. **安装运行环境**：Node / Python / Java 对应版本；更省事的方式是用 **Docker**，编写 `Dockerfile` 与 `docker-compose.yml`，执行 `docker compose up -d` 即可启动。
4. **保持常驻运行**：不用 Docker 时可用 `pm2 start app.js --name my-site`（Node）并配置 `systemd` 开机自启。
5. **反向代理 + HTTPS**：用 **Nginx** 或 **Caddy** 将 80/443 端口转发到应用端口；Caddy 可自动申请 HTTPS 证书，Nginx 用 `certbot`。
6. **绑定域名与放行端口**：解析 DNS，并在服务器的安全组中放行 22/80/443。
7. **国内服务器 ICP 备案**：使用中国大陆云主机并绑定 `.cn/.com` 域名时，必须完成备案，否则 80/443 会被拦截。
8. **查看日志与监控**：使用 `pm2 logs` / `docker logs` 观察运行与资源占用。

### 简单判断

- 后端只负责「接收一个表单、调一个接口」→ 用 **Vercel / Cloudflare Pages 的云函数** 即可，无需购买服务器。
- 后端需要常驻（WebSocket、定时任务、连数据库、给小程序/游戏做接口）→ 用 **Render / Railway / Fly.io**（省事）或 **国内一台轻量服务器 + Docker**（稳定、国内快）。

---

## 六、国内访问注意事项

- GitHub Pages 在国内有时较慢或偶发打不开。
- 想要国内访问更稳定，可考虑 **Cloudflare Pages**（相对较稳），或 **腾讯云 COS / 阿里云 OSS + CDN** 绑定已备案域名，或直接采用国内的 VPS。
- 使用中国大陆云主机时，域名需完成 **ICP 备案**。

---

## 七、如何抉择

- 只想快速得到一个公开地址 → 用 **GitHub Pages** 或 **Cloudflare Pages / Netlify**（免费、自动、稳定）。
- 需要国内访问无压力 + 自定义域名 → 上 **腾讯云 COS / 阿里云 OSS + CDN**。
- 站点有了持久后端 → 先尝试 **Render / Railway / Fly.io**，需要稳定与可控时再迁移到 **国内轻量服务器 + Docker**。
