[English](./README_EN.md) | 简体中文

# RDK 文档中心

D-Robotics **RDK 文档中心**门户站点：提供多语言首页、文档入口聚合与搜索。

| 项 | 值 |
| --- | --- |
| 线上地址（中文） | https://developer.d-robotics.cc/rdk_doc_center/ |
| 线上地址（英文） | https://developer.d-robotics.cc/rdk_doc_center/en/ |


## 功能概览

- **文档入口聚合**：按分类展示 RDK X/S、SDK、TROS、Model Zoo、示例、配件、软件、算法工具链等手册卡片
- **搜索**：在首页搜索框检索已索引手册章节
- **双语门户**：导航栏语言切换；中文/英文文案在配置中分别维护
- **外链跳转**：卡片 `href` 指向各子站（`developer.d-robotics.cc` 等），`pendingRelease: true` 时仅提示未上架
- **反馈浮层**：首页与英文首页可配置问卷入口（见 `docusaurus.config.js` → `customFields.feedbackFloat`）

## 环境要求

- Node.js >= 18.0
- npm（推荐与 CI 一致使用 `npm ci` 安装依赖）

## 本地开发

```bash
npm ci
```

| 命令 | 说明 |
| --- | --- |
| `npm run start` | 中文门户开发服务（`zh-Hans`） |
| `npm run start:en` | 英文门户开发服务（`en`） |
| `npm run start:port` | 中文门户，端口 `3001` |
| `npm run start:no-watch` | 中文门户，不监听文件变更 |
| `npm run start:no-watch:en` | 英文门户，不监听文件变更 |

本地访问（端口以实际为主）：

- 中文：http://localhost:3000/rdk_doc_center/
- 英文：http://localhost:3000/rdk_doc_center/en/

## 构建与预览

```bash
npm run build
npm run serve
```

构建产物在 `build/`（中文）与 `build/en/`（英文）。`npm run serve` 预览时路径与上表相同。


## 配置与维护

### 文档卡片（分类 + 入口）

唯一配置源：[`src/data/sites.js`](src/data/sites.js)

- `DOC_CENTER_CONFIG.categories`：首页分类（锚点、图标、中英文标题）
- `DOC_CENTER_CONFIG.entries`：手册卡片（标题、描述、`href`、是否 `pendingRelease`）

修改后首页分组与卡片会自动更新，无需改页面代码。

### 搜索索引

各子站章节用于首页搜索，按手册拆分维护：

| 文件 | 对应手册 |
| --- | --- |
| `manualChapterIndex.js` | RDK X |
| `manualChapterIndexRdkS.js` | RDK S |
| `manualChapterIndexTros.js` | TROS |
| `manualChapterIndexMagicbox.js` | Magicbox |
| `manualChapterIndexOe.js` | 算法工具链 |
| `manualChapterIndexStudio.js` | RDK Studio |


