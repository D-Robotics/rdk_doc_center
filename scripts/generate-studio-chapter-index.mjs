/**
 * 一次性生成 src/data/manualChapterIndexStudio.js
 * 运行: node scripts/generate-studio-chapter-index.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "../src/data/manualChapterIndexStudio.js");

/** path（无尾斜杠）→ 章节元数据 */
const CHAPTERS = {
  "/product-intro/overview": {
    zh: {
      title: "1.1 产品概述",
      parent: "1. 产品简介",
      summary:
        "RDK Studio 是面向机器人开发的 AI 原生桌面工作台，集成 Moss 对话、项目工作区、设备连接、远程开发、烧录、本地模型和板端 Agent；说明其与传统远程工具的差异及信息整合方式。",
      keywords: ["产品概述", "Moss", "工作台", "OpenClaw", "AI 原生"],
    },
    en: {
      title: "1.1 Product Overview",
      parent: "1. Product Introduction",
      summary:
        "RDK Studio is an AI-native desktop workspace for robotics: Moss chat, project workspace, device connection, remote dev, flashing, local models, and on-board Agent—how it differs from traditional remote tools.",
      keywords: ["overview", "Moss", "workspace", "OpenClaw"],
    },
  },
  "/product-intro/architecture": {
    zh: {
      title: "1.2 核心架构",
      parent: "1. 产品简介",
      summary:
        "从桌面客户端、Moss、OpenClaw 三部分说明架构，对比二者适用场景、连接关系及消息处理流程。",
      keywords: ["架构", "Moss", "OpenClaw", "客户端"],
    },
    en: {
      title: "1.2 Core Architecture",
      parent: "1. Product Introduction",
      summary:
        "Desktop client, Moss, and OpenClaw: roles, when to use each, connectivity, and message flow.",
      keywords: ["architecture", "Moss", "OpenClaw"],
    },
  },
  "/product-intro/feature-matrix": {
    zh: {
      title: "1.3 功能入口",
      parent: "1. 产品简介",
      summary: "按「核心 / 开发工具 / AI 能力」梳理左侧导航，介绍工作台常用区域与设置入口。",
      keywords: ["功能入口", "导航", "核心", "开发工具", "AI 能力"],
    },
    en: {
      title: "1.3 Feature Entry Points",
      parent: "1. Product Introduction",
      summary: "Left nav groups (Core / Dev tools / AI): workbench areas and settings entry.",
      keywords: ["navigation", "features", "workbench"],
    },
  },
  "/product-intro/supported-hardware": {
    zh: {
      title: "1.4 支持的硬件",
      parent: "1. 产品简介",
      summary:
        "说明 RDK X3/X5/S100 的烧录、Type-C 直连、OpenClaw 支持，以及 SSH 接入 Jetson、树莓派等通用 Linux 主机时的能力边界。",
      keywords: ["硬件", "X3", "X5", "S100", "Type-C", "SSH", "Jetson", "树莓派"],
    },
    en: {
      title: "1.4 Supported Hardware",
      parent: "1. Product Introduction",
      summary:
        "RDK X3/X5/S100 flashing, Type-C, OpenClaw; SSH to Jetson, Raspberry Pi and generic Linux limits.",
      keywords: ["hardware", "X3", "X5", "S100", "Type-C", "SSH"],
    },
  },
  "/product-intro/version-notes": {
    zh: {
      title: "1.5 版本说明",
      parent: "1. 产品简介",
      summary: "介绍客户端查看/升级、升级注意事项及论坛、反馈等求助渠道。",
      keywords: ["版本", "升级", "更新", "论坛", "反馈"],
    },
    en: {
      title: "1.5 Version Notes",
      parent: "1. Product Introduction",
      summary: "Check and upgrade the client, upgrade notes, forum and feedback channels.",
      keywords: ["version", "upgrade", "release"],
    },
  },
  "/product-intro/ai-showcase": {
    zh: {
      title: "1.6 AI Dock 实战演示",
      parent: "1. 产品简介",
      summary:
        "用三段真实对话展示 AI Dock：设备全量体检、端到端部署 YOLO 并 Web 验证、生成社区发帖草稿。",
      keywords: ["AI Dock", "演示", "YOLO", "体检", "实战"],
    },
    en: {
      title: "1.6 AI Dock Showcase",
      parent: "1. Product Introduction",
      summary:
        "Three real dialogs: full device health check, end-to-end YOLO deploy with web verify, community post draft.",
      keywords: ["AI Dock", "demo", "YOLO"],
    },
  },
  "/quick-start/install-and-login": {
    zh: {
      title: "2.1 安装与登录",
      parent: "2. 快速入门",
      summary:
        "下载 Windows/macOS 安装包，通过 D-Robotics 统一登录完成首次登录，介绍四步引导流程。",
      keywords: ["安装", "登录", "Windows", "macOS", "引导"],
    },
    en: {
      title: "2.1 Install and Sign In",
      parent: "2. Quick Start",
      summary: "Download for Windows/macOS, D-Robotics sign-in, and the four-step onboarding flow.",
      keywords: ["install", "login", "onboarding"],
    },
  },
  "/quick-start/flash-system": {
    zh: {
      title: "2.2 烧录系统镜像",
      parent: "2. 快速入门",
      summary: "面向无系统或需重装场景，说明烧录向导、各板型推荐方式及稳定/高速模式选择。",
      keywords: ["烧录", "镜像", "TF卡", "eMMC", "向导"],
    },
    en: {
      title: "2.2 Flash System Image",
      parent: "2. Quick Start",
      summary: "Flash wizard for blank or reflash boards; per-board options and stable/fast modes.",
      keywords: ["flash", "image", "wizard"],
    },
  },
  "/quick-start/connect-device": {
    zh: {
      title: "2.3 接入设备",
      parent: "2. 快速入门",
      summary: "概述 SSH、Type-C 直连、串口日志三类入口的差异、适用场景及设备保存后的后续行为。",
      keywords: ["接入设备", "SSH", "Type-C", "串口"],
    },
    en: {
      title: "2.3 Connect a Device",
      parent: "2. Quick Start",
      summary: "SSH vs Type-C vs serial log: differences, use cases, and behavior after saving a device.",
      keywords: ["connect", "SSH", "Type-C", "serial"],
    },
  },
  "/quick-start/connect-device/typec-flash": {
    zh: {
      title: "2.3.1 Type-C 直连",
      parent: "2.3 接入设备",
      summary: "RDK X5/S100 通过 Type-C 识别网卡、配置直连网络并添加设备的步骤。",
      keywords: ["Type-C", "直连", "网卡", "X5", "S100"],
    },
    en: {
      title: "2.3.1 Type-C Direct Connect",
      parent: "2.3 Connect a Device",
      summary: "RDK X5/S100: detect USB NIC, set up direct network, and add the device.",
      keywords: ["Type-C", "direct connect"],
    },
  },
  "/quick-start/connect-device/ssh": {
    zh: {
      title: "2.3.2 SSH 添加设备",
      parent: "2.3 接入设备",
      summary: "最通用的 SSH 接入：连接信息填写、添加流程及设备类型识别后的能力差异。",
      keywords: ["SSH", "添加设备", "Host", "识别"],
    },
    en: {
      title: "2.3.2 Add Device via SSH",
      parent: "2.3 Connect a Device",
      summary: "Universal SSH onboarding: credentials, add flow, and capabilities after auto-detect.",
      keywords: ["SSH", "add device"],
    },
  },
  "/quick-start/connect-device/serial": {
    zh: {
      title: "2.3.3 串口日志",
      parent: "2.3 接入设备",
      summary: "串口仅用于查看启动日志、不保存为设备；含接线、授权与连接步骤。",
      keywords: ["串口", "日志", "启动", "授权"],
    },
    en: {
      title: "2.3.3 Serial Log",
      parent: "2.3 Connect a Device",
      summary: "Serial for boot logs only (not saved as a device): wiring, permissions, connect steps.",
      keywords: ["serial", "boot log"],
    },
  },
  "/quick-start/configure-network": {
    zh: {
      title: "2.4 配置网络",
      parent: "2. 快速入门",
      summary: "添加设备后的 Wi-Fi 配置、Type-C 后电脑外网异常处置及借助 Moss 排查。",
      keywords: ["Wi-Fi", "网络", "Type-C", "外网", "Moss"],
    },
    en: {
      title: "2.4 Configure Network",
      parent: "2. Quick Start",
      summary: "Wi-Fi after adding a device; PC internet issues after Type-C; Moss-assisted troubleshooting.",
      keywords: ["Wi-Fi", "network"],
    },
  },
  "/quick-start/configure-ai-model": {
    zh: {
      title: "2.5 接入 AI 模型",
      parent: "2. 快速入门",
      summary: "默认模型、团队自建模型、本机 Ollama 三条配置路径，以及思考/快速模式用途。",
      keywords: ["AI 模型", "Ollama", "思考模式", "快速模式"],
    },
    en: {
      title: "2.5 Connect AI Models",
      parent: "2. Quick Start",
      summary: "Default, team-hosted, and local Ollama models; thinking vs fast mode.",
      keywords: ["AI model", "Ollama", "thinking", "fast"],
    },
  },
  "/quick-start/first-conversation": {
    zh: {
      title: "2.6 发起首次对话",
      parent: "2. 快速入门",
      summary: "在工作台发送首条消息，说明执行/计划、快速/思考开关及示例提问。",
      keywords: ["首次对话", "Moss", "执行", "计划", "工作台"],
    },
    en: {
      title: "2.6 First Conversation",
      parent: "2. Quick Start",
      summary: "Send the first message on the workbench: execute/plan, fast/thinking toggles, sample prompts.",
      keywords: ["first chat", "Moss", "workbench"],
    },
  },
  "/user-guide/workbench": {
    zh: {
      title: "3.1 工作台",
      parent: "3. 用户指南",
      summary: "Moss 主工作区：对话、现场、历史、诊断、变更、文件、终端等区域及设备/项目绑定。",
      keywords: ["工作台", "Moss", "现场", "诊断", "终端"],
    },
    en: {
      title: "3.1 Workbench",
      parent: "3. User Guide",
      summary: "Moss workspace: chat, live view, history, diagnostics, changes, files, terminal; device/project binding.",
      keywords: ["workbench", "Moss"],
    },
  },
  "/user-guide/workbench/device-status": {
    zh: {
      title: "3.1.1 设备状态与诊断",
      parent: "3.1 工作台",
      summary: "现场页、诊断快照与 Moss 如何展示设备信息，及一键送入 Moss 分析。",
      keywords: ["设备状态", "诊断", "现场"],
    },
    en: {
      title: "3.1.1 Device Status and Diagnostics",
      parent: "3.1 Workbench",
      summary: "Live page and diagnostic snapshots; send device info to Moss for analysis.",
      keywords: ["diagnostics", "device status"],
    },
  },
  "/user-guide/workbench/cross-page": {
    zh: {
      title: "3.1.2 跨页面联动",
      parent: "3.1 工作台",
      summary: "现场卡片、右侧工作区及 Moss 与终端、文件、诊断等面板的协同。",
      keywords: ["联动", "工作区", "面板"],
    },
    en: {
      title: "3.1.2 Cross-Panel Workflow",
      parent: "3.1 Workbench",
      summary: "Live cards, right workspace, and Moss coordination with terminal, files, diagnostics.",
      keywords: ["workflow", "panels"],
    },
  },
  "/user-guide/workbench/offline-cache": {
    zh: {
      title: "3.1.3 离线缓存",
      parent: "3.1 工作台",
      summary: "设备离线时展示最后状态、数据时效性及多设备切换时的数据隔离。",
      keywords: ["离线", "缓存", "多设备"],
    },
    en: {
      title: "3.1.3 Offline Cache",
      parent: "3.1 Workbench",
      summary: "Last-known state when offline, data freshness, isolation when switching devices.",
      keywords: ["offline", "cache"],
    },
  },
  "/user-guide/ai-chat": {
    zh: {
      title: "3.2 AI Dock",
      parent: "3. 用户指南",
      summary: "Moss 输入区的使用顺序、设备标签、执行/计划、快速/思考、附件等控件。",
      keywords: ["AI Dock", "Moss", "输入区"],
    },
    en: {
      title: "3.2 AI Dock",
      parent: "3. User Guide",
      summary: "Moss input area: device tag, execute/plan, fast/thinking, attachments.",
      keywords: ["AI Dock", "Moss"],
    },
  },
  "/user-guide/ai-chat/overview-and-entry": {
    zh: {
      title: "3.2.1 打开 AI Dock",
      parent: "3.2 AI Dock",
      summary: "「打开入口 → 确认设备 → 选择方式 → 发送 → 查看结果」及各场景入口。",
      keywords: ["打开", "AI Dock", "入口"],
    },
    en: {
      title: "3.2.1 Open AI Dock",
      parent: "3.2 AI Dock",
      summary: "Open → confirm device → choose mode → send → review results; entry points per scenario.",
      keywords: ["open", "AI Dock"],
    },
  },
  "/user-guide/ai-chat/device-aware-tools": {
    zh: {
      title: "3.2.2 设备操作与结果",
      parent: "3.2 AI Dock",
      summary: "界定设备操作类提问，说明目标设备确定、执行过程与确认机制。",
      keywords: ["设备操作", "执行", "确认"],
    },
    en: {
      title: "3.2.2 Device Actions and Results",
      parent: "3.2 AI Dock",
      summary: "Device-action prompts: target device, execution flow, and confirmation.",
      keywords: ["device action", "confirm"],
    },
  },
  "/user-guide/ai-chat/multi-session": {
    zh: {
      title: "3.2.3 查看历史会话",
      parent: "3.2 AI Dock",
      summary: "新建/继续历史会话、长会话整理、取消任务及多设备会话组织。",
      keywords: ["历史会话", "会话", "多设备"],
    },
    en: {
      title: "3.2.3 Session History",
      parent: "3.2 AI Dock",
      summary: "New/continue sessions, long-thread cleanup, cancel tasks, multi-device organization.",
      keywords: ["session", "history"],
    },
  },
  "/user-guide/ai-chat/attachments": {
    zh: {
      title: "3.2.4 上传文件和截图",
      parent: "3.2 AI Dock",
      summary: "附件类型、添加方式及分析报错截图、上传配置等场景。",
      keywords: ["附件", "截图", "上传"],
    },
    en: {
      title: "3.2.4 Files and Screenshots",
      parent: "3.2 AI Dock",
      summary: "Attachment types, how to add, error screenshots, config uploads.",
      keywords: ["attachment", "screenshot"],
    },
  },
  "/user-guide/ai-chat/slash-commands": {
    zh: {
      title: "3.2.5 使用快捷命令",
      parent: "3.2 AI Dock",
      summary: "`/help`、`/clear`、`/sessions`、`/skills`、`/model`、`/reset` 等斜杠命令。",
      keywords: ["斜杠命令", "/help", "/skills", "/model"],
    },
    en: {
      title: "3.2.5 Slash Commands",
      parent: "3.2 AI Dock",
      summary: "/help, /clear, /sessions, /skills, /model, /reset and other slash commands.",
      keywords: ["slash command", "/help", "/skills"],
    },
  },
  "/user-guide/ai-chat/dual-lane": {
    zh: {
      title: "3.2.6 选择回复模式",
      parent: "3.2 AI Dock",
      summary: "快速 vs 思考模式、Ollama 设为快速模式及相关配置入口。",
      keywords: ["快速模式", "思考模式", "Ollama"],
    },
    en: {
      title: "3.2.6 Reply Mode",
      parent: "3.2 AI Dock",
      summary: "Fast vs thinking mode; Ollama as fast mode and related settings.",
      keywords: ["fast mode", "thinking mode"],
    },
  },
  "/user-guide/remote-terminal": {
    zh: {
      title: "3.3 终端",
      parent: "3. 用户指南",
      summary: "SSH 与串口终端的首次使用顺序及 Moss 执行命令时的输出展示。",
      keywords: ["终端", "SSH", "串口", "Moss"],
    },
    en: {
      title: "3.3 Terminal",
      parent: "3. User Guide",
      summary: "SSH and serial terminal first-use order; Moss command output in terminal.",
      keywords: ["terminal", "SSH", "serial"],
    },
  },
  "/user-guide/remote-terminal/multi-tab-ssh": {
    zh: {
      title: "3.3.1 打开 SSH 终端",
      parent: "3.3 终端",
      summary: "多标签独立性、Moss 执行可见输出及切换设备时的标签行为。",
      keywords: ["SSH 终端", "多标签"],
    },
    en: {
      title: "3.3.1 SSH Terminal",
      parent: "3.3 Terminal",
      summary: "Independent tabs, visible Moss output, tab behavior when switching devices.",
      keywords: ["SSH", "tabs"],
    },
  },
  "/user-guide/remote-terminal/reconnect": {
    zh: {
      title: "3.3.2 断线重连",
      parent: "3.3 终端",
      summary: "网络波动时的自动重连、失败提示及排查方向。",
      keywords: ["重连", "断线", "网络"],
    },
    en: {
      title: "3.3.2 Reconnect",
      parent: "3.3 Terminal",
      summary: "Auto-reconnect on network blips, failure hints, troubleshooting.",
      keywords: ["reconnect", "network"],
    },
  },
  "/user-guide/remote-terminal/serial": {
    zh: {
      title: "3.3.3 查看串口日志",
      parent: "3.3 终端",
      summary: "统一入口创建 SSH/串口会话及串口能力边界。",
      keywords: ["串口", "日志", "会话"],
    },
    en: {
      title: "3.3.3 Serial Log",
      parent: "3.3 Terminal",
      summary: "Unified SSH/serial sessions and serial capability limits.",
      keywords: ["serial", "log"],
    },
  },
  "/user-guide/file-manager": {
    zh: {
      title: "3.4 文件",
      parent: "3. 用户指南",
      summary: "板端文件浏览、上传下载、在线编辑的首次使用顺序及与 Moss 的数据一致性。",
      keywords: ["文件", "上传", "下载", "编辑"],
    },
    en: {
      title: "3.4 Files",
      parent: "3. User Guide",
      summary: "Browse, transfer, online edit on board; first-use order and consistency with Moss.",
      keywords: ["files", "upload", "edit"],
    },
  },
  "/user-guide/file-manager/browse-and-transfer": {
    zh: {
      title: "3.4.1 浏览和传文件",
      parent: "3.4 文件",
      summary: "目录树、地址栏、拖拽/批量上传下载操作。",
      keywords: ["浏览", "传输", "拖拽", "批量"],
    },
    en: {
      title: "3.4.1 Browse and Transfer",
      parent: "3.4 Files",
      summary: "Tree, address bar, drag-and-drop and batch upload/download.",
      keywords: ["browse", "transfer"],
    },
  },
  "/user-guide/file-manager/online-edit": {
    zh: {
      title: "3.4.2 编辑文件",
      parent: "3.4 文件",
      summary: "双击打开、Ctrl+S 保存及适合/不适合在线编辑的文件类型。",
      keywords: ["在线编辑", "保存", "Ctrl+S"],
    },
    en: {
      title: "3.4.2 Edit Files",
      parent: "3.4 Files",
      summary: "Double-click open, Ctrl+S save; file types suitable for online edit.",
      keywords: ["edit", "save"],
    },
  },
  "/user-guide/file-manager/path-access-control": {
    zh: {
      title: "3.4.3 哪些路径不能改",
      parent: "3.4 文件",
      summary: "`/sys`、`/proc`、`/dev`、`/boot` 等受限路径及例外授权方式。",
      keywords: ["/sys", "/proc", "受限路径", "权限"],
    },
    en: {
      title: "3.4.3 Restricted Paths",
      parent: "3.4 Files",
      summary: "/sys, /proc, /dev, /boot and other protected paths; exception grants.",
      keywords: ["restricted path", "/sys", "/proc"],
    },
  },
  "/user-guide/remote-ide": {
    zh: {
      title: "3.5 代码编辑器",
      parent: "3. 用户指南",
      summary: "板端项目级开发流程，以及与文件页、终端的分工对比。",
      keywords: ["代码编辑器", "远程 IDE", "项目"],
    },
    en: {
      title: "3.5 Code Editor",
      parent: "3. User Guide",
      summary: "On-board project development vs files page and terminal roles.",
      keywords: ["code editor", "IDE"],
    },
  },
  "/user-guide/remote-ide/install-and-init": {
    zh: {
      title: "3.5.1 打开代码编辑器",
      parent: "3.5 代码编辑器",
      summary: "首次打开时的自动安装、重装场景及启动成功判断。",
      keywords: ["代码编辑器", "安装", "启动"],
    },
    en: {
      title: "3.5.1 Open Code Editor",
      parent: "3.5 Code Editor",
      summary: "Auto-install on first open, reinstall, and success indicators.",
      keywords: ["install", "code editor"],
    },
  },
  "/user-guide/remote-ide/system-requirements": {
    zh: {
      title: "3.5.2 准备编辑环境",
      parent: "3.5 代码编辑器",
      summary: "板端内存、磁盘、网络等前置条件及非标准镜像限制。",
      keywords: ["编辑环境", "内存", "磁盘"],
    },
    en: {
      title: "3.5.2 Prepare Edit Environment",
      parent: "3.5 Code Editor",
      summary: "Board memory, disk, network prerequisites; non-standard image limits.",
      keywords: ["environment", "requirements"],
    },
  },
  "/user-guide/remote-ide/floating-window": {
    zh: {
      title: "3.5.3 弹出编辑器窗口",
      parent: "3.5 代码编辑器",
      summary: "浮窗多屏用法及 RDK 开发常用扩展推荐。",
      keywords: ["浮窗", "多屏", "扩展"],
    },
    en: {
      title: "3.5.3 Floating Editor Window",
      parent: "3.5 Code Editor",
      summary: "Pop-out multi-monitor usage and recommended extensions for RDK dev.",
      keywords: ["floating window", "extensions"],
    },
  },
  "/user-guide/remote-desktop": {
    zh: {
      title: "3.6 远程桌面",
      parent: "3. 用户指南",
      summary: "在 Studio 内查看/操作板端图形界面的流程及 ROS 调试、摄像头预览等场景。",
      keywords: ["远程桌面", "VNC", "图形界面", "ROS"],
    },
    en: {
      title: "3.6 Remote Desktop",
      parent: "3. User Guide",
      summary: "View/control board GUI in Studio; ROS debug, camera preview use cases.",
      keywords: ["remote desktop", "GUI"],
    },
  },
  "/user-guide/remote-desktop/startup-auth": {
    zh: {
      title: "3.6.1 打开远程桌面",
      parent: "3.6 远程桌面",
      summary: "自动检测/安装组件、启动远程桌面及密码认证与安全注意。",
      keywords: ["远程桌面", "认证", "安全"],
    },
    en: {
      title: "3.6.1 Open Remote Desktop",
      parent: "3.6 Remote Desktop",
      summary: "Auto-detect/install, start session, password auth and security notes.",
      keywords: ["remote desktop", "auth"],
    },
  },
  "/user-guide/remote-desktop/performance-tuning": {
    zh: {
      title: "3.6.2 弹出远程桌面窗口",
      parent: "3.6 远程桌面",
      summary: "拆为独立悬浮窗及多屏并排观察用法。",
      keywords: ["浮窗", "多屏", "远程桌面"],
    },
    en: {
      title: "3.6.2 Pop Out Remote Desktop",
      parent: "3.6 Remote Desktop",
      summary: "Detach to floating window and multi-monitor side-by-side viewing.",
      keywords: ["floating", "multi-monitor"],
    },
  },
  "/user-guide/remote-desktop/alternatives": {
    zh: {
      title: "3.6.3 其他远程方式",
      parent: "3.6 远程桌面",
      summary: "内置远程桌面 vs 原生 VNC、xrdp、SSH X11 等方案对比。",
      keywords: ["VNC", "xrdp", "X11", "远程"],
    },
    en: {
      title: "3.6.3 Other Remote Options",
      parent: "3.6 Remote Desktop",
      summary: "Built-in remote desktop vs native VNC, xrdp, SSH X11, etc.",
      keywords: ["VNC", "xrdp", "X11"],
    },
  },
  "/user-guide/system-flashing": {
    zh: {
      title: "3.7 烧录",
      parent: "3. 用户指南",
      summary: "按板型选择镜像与写入目标的使用顺序，并指向各介质详细文档。",
      keywords: ["烧录", "镜像", "TF卡", "eMMC"],
    },
    en: {
      title: "3.7 Flashing",
      parent: "3. User Guide",
      summary: "Pick image and target by board; links to per-medium guides.",
      keywords: ["flashing", "image"],
    },
  },
  "/user-guide/system-flashing/media-comparison": {
    zh: {
      title: "3.7.1 选择烧录方式",
      parent: "3.7 烧录",
      summary: "TF 卡、eMMC、S100 三种入口对比及 TF 卡选购建议。",
      keywords: ["TF卡", "eMMC", "S100", "烧录方式"],
    },
    en: {
      title: "3.7.1 Choose Flash Medium",
      parent: "3.7 Flashing",
      summary: "TF card vs eMMC vs S100 paths and TF card buying tips.",
      keywords: ["TF card", "eMMC", "S100"],
    },
  },
  "/user-guide/system-flashing/tf-card": {
    zh: {
      title: "3.7.2 TF 卡烧录",
      parent: "3.7 烧录",
      summary: "RDK X3/X5 的 TF 卡烧录步骤、速度模式与镜像选择。",
      keywords: ["TF卡烧录", "X3", "X5"],
    },
    en: {
      title: "3.7.2 TF Card Flashing",
      parent: "3.7 Flashing",
      summary: "RDK X3/X5 TF card steps, speed modes, image selection.",
      keywords: ["TF card", "X3", "X5"],
    },
  },
  "/user-guide/system-flashing/emmc": {
    zh: {
      title: "3.7.3 eMMC 烧录",
      parent: "3.7 烧录",
      summary: "RDK X5 eMMC 烧录、备份还原及进入烧录模式注意点。",
      keywords: ["eMMC", "X5", "备份"],
    },
    en: {
      title: "3.7.3 eMMC Flashing",
      parent: "3.7 Flashing",
      summary: "RDK X5 eMMC flash, backup/restore, entering flash mode.",
      keywords: ["eMMC", "X5"],
    },
  },
  "/user-guide/system-flashing/s100-xburn": {
    zh: {
      title: "3.7.4 S100 烧录",
      parent: "3.7 烧录",
      summary: "RDK S100 通过 xburn-gui 的专用烧录流程与工具获取。",
      keywords: ["S100", "xburn", "烧录"],
    },
    en: {
      title: "3.7.4 S100 Flashing",
      parent: "3.7 Flashing",
      summary: "RDK S100 xburn-gui workflow and obtaining tools.",
      keywords: ["S100", "xburn"],
    },
  },
  "/user-guide/network-config": {
    zh: {
      title: "3.8 网络配置",
      parent: "3. 用户指南",
      summary: "SSH/Type-C 接入后配置 Wi-Fi 的使用顺序及常见场景处理。",
      keywords: ["网络配置", "Wi-Fi"],
    },
    en: {
      title: "3.8 Network Configuration",
      parent: "3. User Guide",
      summary: "Wi-Fi setup order after SSH/Type-C and common scenarios.",
      keywords: ["network", "Wi-Fi"],
    },
  },
  "/user-guide/network-config/entry-and-status": {
    zh: {
      title: "3.8.1 打开 Wi-Fi 配置",
      parent: "3.8 网络配置",
      summary: "顶部 Wi-Fi 图标入口、连接状态含义及 Moss 排查失败。",
      keywords: ["Wi-Fi", "配置入口"],
    },
    en: {
      title: "3.8.1 Open Wi-Fi Settings",
      parent: "3.8 Network Configuration",
      summary: "Top-bar Wi-Fi entry, status meanings, Moss troubleshooting.",
      keywords: ["Wi-Fi", "settings"],
    },
  },
  "/user-guide/network-config/hidden-ssid": {
    zh: {
      title: "3.8.2 添加隐藏 Wi-Fi",
      parent: "3.8 网络配置",
      summary: "手动添加隐藏 SSID、高级选项及有线/无线并存行为。",
      keywords: ["隐藏 Wi-Fi", "SSID"],
    },
    en: {
      title: "3.8.2 Hidden Wi-Fi",
      parent: "3.8 Network Configuration",
      summary: "Manual hidden SSID, advanced options, wired/wireless coexistence.",
      keywords: ["hidden SSID", "Wi-Fi"],
    },
  },
  "/user-guide/network-config/persistence": {
    zh: {
      title: "3.8.3 保存 Wi-Fi 配置",
      parent: "3.8 网络配置",
      summary: "重启后自动重连、删除已保存网络及长期有线+固定 IP 建议。",
      keywords: ["Wi-Fi", "保存", "自动重连"],
    },
    en: {
      title: "3.8.3 Save Wi-Fi Profile",
      parent: "3.8 Network Configuration",
      summary: "Auto-reconnect after reboot, remove saved networks, wired+static IP tips.",
      keywords: ["Wi-Fi", "persist"],
    },
  },
  "/user-guide/device-management": {
    zh: {
      title: "3.9 设备管理",
      parent: "3. 用户指南",
      summary: "多设备列表、切换、添加/移除及连接信息更新的使用顺序。",
      keywords: ["设备管理", "多设备", "切换"],
    },
    en: {
      title: "3.9 Device Management",
      parent: "3. User Guide",
      summary: "Multi-device list, switch, add/remove, update connection info.",
      keywords: ["device management", "multi-device"],
    },
  },
  "/user-guide/device-management/list-and-switch": {
    zh: {
      title: "3.9.1 切换当前设备",
      parent: "3.9 设备管理",
      summary: "设备列表字段、三种切换方式及切换后各功能区变化。",
      keywords: ["切换设备", "设备列表"],
    },
    en: {
      title: "3.9.1 Switch Active Device",
      parent: "3.9 Device Management",
      summary: "List fields, three switch methods, panel updates after switch.",
      keywords: ["switch device"],
    },
  },
  "/user-guide/device-management/auto-detect": {
    zh: {
      title: "3.9.2 自动识别设备",
      parent: "3.9 设备管理",
      summary: "添加时自动识别的板型、镜像、ROS/TROS、OpenClaw 等信息。",
      keywords: ["自动识别", "板型", "ROS", "TROS", "OpenClaw"],
    },
    en: {
      title: "3.9.2 Auto-Detect Device",
      parent: "3.9 Device Management",
      summary: "Auto-detected board, image, ROS/TROS, OpenClaw on add.",
      keywords: ["auto-detect", "OpenClaw"],
    },
  },
  "/user-guide/device-management/online-monitoring": {
    zh: {
      title: "3.9.3 查看在线状态",
      parent: "3.9 设备管理",
      summary: "在线/离线变化、在线无响应处理及多人协作注意点。",
      keywords: ["在线状态", "离线", "协作"],
    },
    en: {
      title: "3.9.3 Online Status",
      parent: "3.9 Device Management",
      summary: "Online/offline changes, unresponsive online device, multi-user notes.",
      keywords: ["online", "offline"],
    },
  },
  "/user-guide/openclaw": {
    zh: {
      title: "3.10 OpenClaw",
      parent: "3. 用户指南",
      summary: "板端 Agent 页面使用顺序、各区域功能及何时需要部署。",
      keywords: ["OpenClaw", "板端 Agent"],
    },
    en: {
      title: "3.10 OpenClaw",
      parent: "3. User Guide",
      summary: "On-board Agent page flow, panels, when to deploy.",
      keywords: ["OpenClaw", "agent"],
    },
  },
  "/user-guide/openclaw/overview": {
    zh: {
      title: "3.10.1 判断是否需要 OpenClaw",
      parent: "3.10 OpenClaw",
      summary: "对比日常 Moss+SSH 与需要板端技能/消息通道的场景。",
      keywords: ["OpenClaw", "Moss", "SSH"],
    },
    en: {
      title: "3.10.1 Do You Need OpenClaw?",
      parent: "3.10 OpenClaw",
      summary: "Moss+SSH daily use vs board skills and messaging channels.",
      keywords: ["OpenClaw", "when to use"],
    },
  },
  "/user-guide/openclaw/deploy-uninstall": {
    zh: {
      title: "3.10.2 部署和卸载",
      parent: "3.10 OpenClaw",
      summary: "一键部署的环境要求、流程、常见失败原因及卸载方式。",
      keywords: ["部署", "卸载", "OpenClaw"],
    },
    en: {
      title: "3.10.2 Deploy and Uninstall",
      parent: "3.10 OpenClaw",
      summary: "One-click deploy requirements, flow, failures, uninstall.",
      keywords: ["deploy", "uninstall"],
    },
  },
  "/user-guide/openclaw/main-panel": {
    zh: {
      title: "3.10.3 查看状态和配置",
      parent: "3.10 OpenClaw",
      summary: "顶部状态摘要、部署/模型/飞书控制面板及配置状态清单。",
      keywords: ["OpenClaw", "状态", "飞书", "配置"],
    },
    en: {
      title: "3.10.3 Status and Configuration",
      parent: "3.10 OpenClaw",
      summary: "Status summary, deploy/model/Feishu panels, config checklist.",
      keywords: ["OpenClaw", "status"],
    },
  },
  "/user-guide/openclaw/collab-with-dmoss": {
    zh: {
      title: "3.10.4 和 Moss 配合使用",
      parent: "3.10 OpenClaw",
      summary: "Moss 与 OpenClaw 分工协作及状态异常处理。",
      keywords: ["Moss", "OpenClaw", "协作"],
    },
    en: {
      title: "3.10.4 Work with Moss",
      parent: "3.10 OpenClaw",
      summary: "Division of labor between Moss and OpenClaw; abnormal status handling.",
      keywords: ["Moss", "OpenClaw"],
    },
  },
  "/user-guide/openclaw/task-delegation": {
    zh: {
      title: "3.10.5 处理板端任务",
      parent: "3.10 OpenClaw",
      summary: "适合板端处理的任务类型、Moss 委派流程及结果展示。",
      keywords: ["板端任务", "委派", "OpenClaw"],
    },
    en: {
      title: "3.10.5 Board-Side Tasks",
      parent: "3.10 OpenClaw",
      summary: "Task types for the board, Moss delegation flow, result display.",
      keywords: ["delegation", "board tasks"],
    },
  },
  "/user-guide/openclaw/pairing-security": {
    zh: {
      title: "3.10.6 配对和确认",
      parent: "3.10 OpenClaw",
      summary: "OpenClaw 与 Studio 安全连接、各入口安全管理及高风险操作确认。",
      keywords: ["配对", "安全", "确认"],
    },
    en: {
      title: "3.10.6 Pairing and Security",
      parent: "3.10 OpenClaw",
      summary: "Secure OpenClaw–Studio link, entry security, high-risk confirmations.",
      keywords: ["pairing", "security"],
    },
  },
  "/user-guide/skill": {
    zh: {
      title: "3.11 技能工坊",
      parent: "3. 用户指南",
      summary: "Moss 与 OpenClaw 技能管理、技能来源（本机/板端/SkillHub/创建/链接）。",
      keywords: ["技能工坊", "SkillHub", "SKILL.md"],
    },
    en: {
      title: "3.11 Skill Workshop",
      parent: "3. User Guide",
      summary: "Moss and OpenClaw skills; sources: local, board, SkillHub, create, URL.",
      keywords: ["skills", "SkillHub"],
    },
  },
  "/user-guide/skill/skill-md-structure": {
    zh: {
      title: "3.11.1 技能文件怎么写",
      parent: "3.11 技能工坊",
      summary: "SKILL.md 头部字段与正文结构及完整模板示例。",
      keywords: ["SKILL.md", "技能文件", "模板"],
    },
    en: {
      title: "3.11.1 Write SKILL.md",
      parent: "3.11 Skill Workshop",
      summary: "SKILL.md header fields, body structure, full template example.",
      keywords: ["SKILL.md", "template"],
    },
  },
  "/user-guide/skill/builtin-skills": {
    zh: {
      title: "3.11.2 查看内置技能",
      parent: "3.11 技能工坊",
      summary: "D-Robotics 官方内置技能分类及在技能工坊与 `/skills` 中查看。",
      keywords: ["内置技能", "/skills"],
    },
    en: {
      title: "3.11.2 Built-in Skills",
      parent: "3.11 Skill Workshop",
      summary: "Official built-in skill categories; view in workshop and /skills.",
      keywords: ["built-in", "/skills"],
    },
  },
  "/user-guide/skill/clawhub-community": {
    zh: {
      title: "3.11.3 查找技能",
      parent: "3.11 技能工坊",
      summary: "SkillHub 搜索预览、添加到本机与部署到设备及批量操作。",
      keywords: ["SkillHub", "查找技能", "部署"],
    },
    en: {
      title: "3.11.3 Find Skills",
      parent: "3.11 Skill Workshop",
      summary: "SkillHub search/preview, add to PC, deploy to board, batch ops.",
      keywords: ["SkillHub", "marketplace"],
    },
  },
  "/user-guide/skill/create-and-import": {
    zh: {
      title: "3.11.4 创建技能",
      parent: "3.11 技能工坊",
      summary: "模板+AI 辅助创建与从 URL 导入两种流程及审核要点。",
      keywords: ["创建技能", "导入", "URL"],
    },
    en: {
      title: "3.11.4 Create Skills",
      parent: "3.11 Skill Workshop",
      summary: "Template+AI create vs URL import; review checklist.",
      keywords: ["create skill", "import"],
    },
  },
  "/user-guide/skill/trigger-matching": {
    zh: {
      title: "3.11.5 设置触发词",
      parent: "3.11 技能工坊",
      summary: "trigger 关键词匹配机制、精度问题及编写建议。",
      keywords: ["触发词", "trigger"],
    },
    en: {
      title: "3.11.5 Trigger Keywords",
      parent: "3.11 Skill Workshop",
      summary: "Trigger matching, precision issues, authoring tips.",
      keywords: ["trigger", "keywords"],
    },
  },
  "/user-guide/skill/sync-to-board": {
    zh: {
      title: "3.11.6 同步到设备",
      parent: "3.11 技能工坊",
      summary: "将 PC 端技能同步到板端 OpenClaw 的流程及适用场景。",
      keywords: ["同步", "板端", "OpenClaw"],
    },
    en: {
      title: "3.11.6 Sync to Board",
      parent: "3.11 Skill Workshop",
      summary: "Sync PC skills to board OpenClaw; when to use.",
      keywords: ["sync", "board"],
    },
  },
  "/user-guide/local-models": {
    zh: {
      title: "3.12 本地大模型",
      parent: "3. 用户指南",
      summary: "在电脑上安装/运行 Ollama、下载模型、测试并设为 Moss 快速模式的完整流程。",
      keywords: ["本地大模型", "Ollama", "快速模式"],
    },
    en: {
      title: "3.12 Local LLM",
      parent: "3. User Guide",
      summary: "Install/run Ollama on PC, download models, test, set as Moss fast mode.",
      keywords: ["Ollama", "local LLM"],
    },
  },
  "/user-guide/config-center": {
    zh: {
      title: "3.13 配置中心",
      parent: "3. 用户指南",
      summary: "侧栏底部设置区使用顺序、各设置区域及与本地大模型页的划分。",
      keywords: ["配置中心", "设置"],
    },
    en: {
      title: "3.13 Settings",
      parent: "3. User Guide",
      summary: "Bottom settings area: order of use, sections vs local LLM page.",
      keywords: ["settings", "config center"],
    },
  },
  "/user-guide/config-center/overview": {
    zh: {
      title: "3.13.1 看懂设置页",
      parent: "3.13 配置中心",
      summary: "账户、设备、界面、AI 引擎、消息渠道、应用更新等设置的生效时机。",
      keywords: ["设置页", "账户", "AI 引擎"],
    },
    en: {
      title: "3.13.1 Settings Overview",
      parent: "3.13 Settings",
      summary: "Account, device, UI, AI engine, channels, app update—when each applies.",
      keywords: ["settings overview"],
    },
  },
  "/user-guide/config-center/account": {
    zh: {
      title: "3.13.2 登录账号",
      parent: "3.13 配置中心",
      summary: "已登录信息、退出登录与清理本地数据的区别及异常处理。",
      keywords: ["登录", "退出", "账号"],
    },
    en: {
      title: "3.13.2 Account",
      parent: "3.13 Settings",
      summary: "Signed-in info, sign out vs clear local data, error handling.",
      keywords: ["account", "sign out"],
    },
  },
  "/user-guide/config-center/ai-engine": {
    zh: {
      title: "3.13.3 配置 AI 模型",
      parent: "3.13 配置中心",
      summary: "思考/快速模式字段填写、服务商选择及连通性测试。",
      keywords: ["AI 模型", "思考模式", "快速模式"],
    },
    en: {
      title: "3.13.3 AI Models",
      parent: "3.13 Settings",
      summary: "Thinking/fast fields, provider choice, connectivity test.",
      keywords: ["AI model", "provider"],
    },
  },
  "/user-guide/config-center/device-defaults": {
    zh: {
      title: "3.13.4 设置设备连接",
      parent: "3.13 配置中心",
      summary: "自动重连、连接超时、SSH 并发上限、局域网协作等选项。",
      keywords: ["设备连接", "自动重连", "SSH"],
    },
    en: {
      title: "3.13.4 Device Connection Defaults",
      parent: "3.13 Settings",
      summary: "Auto-reconnect, timeout, SSH concurrency, LAN collaboration options.",
      keywords: ["device connection", "SSH"],
    },
  },
  "/user-guide/config-center/import-export": {
    zh: {
      title: "3.13.5 导入导出配置",
      parent: "3.13 配置中心",
      summary: "可导出项、脱敏选项、团队协作推荐做法及导入注意。",
      keywords: ["导入", "导出", "配置", "脱敏"],
    },
    en: {
      title: "3.13.5 Import and Export",
      parent: "3.13 Settings",
      summary: "Exportable items, redaction, team sharing, import cautions.",
      keywords: ["import", "export", "config"],
    },
  },
  "/user-guide/channels": {
    zh: {
      title: "3.14 消息渠道",
      parent: "3. 用户指南",
      summary: "将飞书、微信消息转给 Moss 的使用顺序及外部通道安全确认机制。",
      keywords: ["消息渠道", "飞书", "微信", "Moss"],
    },
    en: {
      title: "3.14 Messaging Channels",
      parent: "3. User Guide",
      summary: "Route Feishu/WeChat messages to Moss; external channel security confirmations.",
      keywords: ["Feishu", "WeChat", "channels"],
    },
  },
  "/user-guide/channels/feishu": {
    zh: {
      title: "3.14.1 接入飞书",
      parent: "3.14 消息渠道",
      summary: "飞书自建应用凭据配置、权限开通及群聊/私聊接入。",
      keywords: ["飞书", "自建应用"],
    },
    en: {
      title: "3.14.1 Feishu",
      parent: "3.14 Messaging Channels",
      summary: "Custom app credentials, permissions, group and DM access.",
      keywords: ["Feishu", "Lark"],
    },
  },
  "/user-guide/channels/weixin": {
    zh: {
      title: "3.14.2 接入微信",
      parent: "3.14 消息渠道",
      summary: "个人微信扫码绑定、用户列表管理及微信场景限制。",
      keywords: ["微信", "扫码绑定"],
    },
    en: {
      title: "3.14.2 WeChat",
      parent: "3.14 Messaging Channels",
      summary: "Personal WeChat QR bind, user list, WeChat limitations.",
      keywords: ["WeChat"],
    },
  },
  "/user-guide/channels/security": {
    zh: {
      title: "3.14.3 确认高风险操作",
      parent: "3.14 消息渠道",
      summary: "外部通道触发高风险操作时的二次确认及不同入口审批要求。",
      keywords: ["高风险", "确认", "安全"],
    },
    en: {
      title: "3.14.3 High-Risk Confirmation",
      parent: "3.14 Messaging Channels",
      summary: "Second confirmation for risky ops from external channels; per-entry approval.",
      keywords: ["security", "confirmation"],
    },
  },
  "/user-guide/monitoring": {
    zh: {
      title: "3.15 监控与运维",
      parent: "3. 用户指南",
      summary: "顶栏任务队列与 AI Dock Token 用量两大监控入口。",
      keywords: ["监控", "任务队列", "Token"],
    },
    en: {
      title: "3.15 Monitoring",
      parent: "3. User Guide",
      summary: "Top task queue and AI Dock token usage monitoring.",
      keywords: ["monitoring", "token", "tasks"],
    },
  },
  "/user-guide/monitoring/task-queue": {
    zh: {
      title: "3.15.1 查看任务进度",
      parent: "3.15 监控与运维",
      summary: "烧录、OpenClaw 部署、批量传输等顶栏任务类型及芯片操作。",
      keywords: ["任务进度", "烧录", "部署"],
    },
    en: {
      title: "3.15.1 Task Progress",
      parent: "3.15 Monitoring",
      summary: "Flash, OpenClaw deploy, batch transfer tasks in the top bar.",
      keywords: ["task queue", "progress"],
    },
  },
  "/user-guide/monitoring/token-usage": {
    zh: {
      title: "3.15.2 查看 Token 用量",
      parent: "3.15 监控与运维",
      summary: "Token 概念、AI Dock 顶部胶囊与会话/task 级统计含义。",
      keywords: ["Token", "用量", "统计"],
    },
    en: {
      title: "3.15.2 Token Usage",
      parent: "3.15 Monitoring",
      summary: "What tokens are; AI Dock capsule and per-session/task stats.",
      keywords: ["token", "usage"],
    },
  },
  "/user-guide/cli": {
    zh: {
      title: "3.16 命令行",
      parent: "3. 用户指南",
      summary: "先在桌面端配置再启用 CLI，`rdkstudio` 与 `dmoss-agent` 的分工。",
      keywords: ["命令行", "CLI", "rdkstudio", "dmoss-agent"],
    },
    en: {
      title: "3.16 Command Line",
      parent: "3. User Guide",
      summary: "Configure in desktop first, then CLI; rdkstudio vs dmoss-agent roles.",
      keywords: ["CLI", "rdkstudio", "dmoss-agent"],
    },
  },
  "/user-guide/cli/rdkstudio": {
    zh: {
      title: "3.16.1 rdkstudio",
      parent: "3.16 命令行",
      summary: "产品 CLI 启用验证及设备列表、exec、file、Moss 提问等常用命令。",
      keywords: ["rdkstudio", "CLI", "exec"],
    },
    en: {
      title: "3.16.1 rdkstudio CLI",
      parent: "3.16 Command Line",
      summary: "Enable/verify CLI; devices, exec, file, Moss ask commands.",
      keywords: ["rdkstudio", "CLI"],
    },
  },
  "/user-guide/cli/dmoss-agent": {
    zh: {
      title: "3.16.2 dmoss-agent",
      parent: "3.16 命令行",
      summary: "独立 NPM 包安装、环境变量配置及 CI/Docker 适用场景。",
      keywords: ["dmoss-agent", "NPM", "CI", "Docker"],
    },
    en: {
      title: "3.16.2 dmoss-agent",
      parent: "3.16 Command Line",
      summary: "Standalone NPM package, env vars, CI/Docker use cases.",
      keywords: ["dmoss-agent", "NPM"],
    },
  },
  "/user-guide/cli/automation-examples": {
    zh: {
      title: "3.16.3 自动化示例",
      parent: "3.16 命令行",
      summary: "CI 代码审查、定时健康检查、日志分析三个 CLI 自动化示例。",
      keywords: ["自动化", "CI", "健康检查"],
    },
    en: {
      title: "3.16.3 Automation Examples",
      parent: "3.16 Command Line",
      summary: "CI review, scheduled health check, log analysis CLI examples.",
      keywords: ["automation", "CI"],
    },
  },
  "/resources/share-skills": {
    zh: {
      title: "4.1 技能分享",
      parent: "4. 资源与社区",
      summary: "通过 SkillHub、Git、NodeHub 或直接发文件分享技能的路径及发布前检查项。",
      keywords: ["技能分享", "SkillHub", "Git", "NodeHub"],
    },
    en: {
      title: "4.1 Share Skills",
      parent: "4. Resources and Community",
      summary: "Share via SkillHub, Git, NodeHub or files; pre-publish checklist.",
      keywords: ["share skills", "SkillHub"],
    },
  },
  "/resources/get-skills": {
    zh: {
      title: "4.2 技能获取",
      parent: "4. 资源与社区",
      summary: "技能工坊内获取技能的多种路径（市场、内置、本机沉淀、链接生成、手动粘贴）。",
      keywords: ["技能获取", "技能工坊"],
    },
    en: {
      title: "4.2 Get Skills",
      parent: "4. Resources and Community",
      summary: "Get skills in workshop: market, built-in, local, link, paste.",
      keywords: ["get skills", "SkillHub"],
    },
  },
  "/resources/nodehub-cases": {
    zh: {
      title: "4.3 NodeHub 案例",
      parent: "4. 资源与社区",
      summary: "NodeHub 与 SkillHub、论坛、RoboGo 的平台分工及从案例链接生成并部署技能。",
      keywords: ["NodeHub", "案例", "SkillHub", "RoboGo"],
    },
    en: {
      title: "4.3 NodeHub Cases",
      parent: "4. Resources and Community",
      summary: "NodeHub vs SkillHub, forum, RoboGo; generate and deploy skills from case links.",
      keywords: ["NodeHub", "cases"],
    },
  },
  "/faq/ai-no-response": {
    zh: {
      title: "5.1 Moss 无响应",
      parent: "5. 常见问题",
      summary: "消息转圈、模型未配置、Ollama 不可达、外部模型密钥/连接错误等排查。",
      keywords: ["Moss", "无响应", "Ollama", "模型"],
    },
    en: {
      title: "5.1 Moss Not Responding",
      parent: "5. FAQ",
      summary: "Spinner, missing model, Ollama unreachable, API key/connection errors.",
      keywords: ["Moss", "no response", "Ollama"],
    },
  },
  "/faq/ssh-failed": {
    zh: {
      title: "5.2 SSH 连接失败",
      parent: "5. 常见问题",
      summary: "超时、密码错误、拒绝连接等提示下的 Host/IP、网络、账号排查。",
      keywords: ["SSH", "连接失败", "超时"],
    },
    en: {
      title: "5.2 SSH Connection Failed",
      parent: "5. FAQ",
      summary: "Timeout, wrong password, refused: check host/IP, network, credentials.",
      keywords: ["SSH", "connection failed"],
    },
  },
  "/faq/typec-flash-failed": {
    zh: {
      title: "5.3 Type-C 直连失败",
      parent: "5. 常见问题",
      summary: "网卡为空、离线、SSH 连不上或电脑外网中断的处理步骤。",
      keywords: ["Type-C", "直连失败", "网卡"],
    },
    en: {
      title: "5.3 Type-C Direct Connect Failed",
      parent: "5. FAQ",
      summary: "Empty NIC, offline, SSH fail, PC internet drop—remediation steps.",
      keywords: ["Type-C", "direct connect"],
    },
  },
  "/faq/camera-no-image": {
    zh: {
      title: "5.4 USB 摄像头无图像",
      parent: "5. 常见问题",
      summary: "`hobot_usb_cam` 黑屏/报错，通过 `v4l2-ctl` 判断 MJPG 并调整分辨率。",
      keywords: ["摄像头", "hobot_usb_cam", "v4l2-ctl", "MJPG"],
    },
    en: {
      title: "5.4 USB Camera No Image",
      parent: "5. FAQ",
      summary: "hobot_usb_cam black screen/errors; v4l2-ctl MJPG and resolution fixes.",
      keywords: ["camera", "hobot_usb_cam", "v4l2"],
    },
  },
  "/faq/hbm-not-found": {
    zh: {
      title: "5.5 hbm 模型无法加载",
      parent: "5. 常见问题",
      summary: "hbm 与 BPU 关系，路径错误、版本不匹配等典型日志的修正方法。",
      keywords: ["hbm", "BPU", "模型加载"],
    },
    en: {
      title: "5.5 HBM Model Won't Load",
      parent: "5. FAQ",
      summary: "HBM and BPU; wrong path, version mismatch log fixes.",
      keywords: ["hbm", "BPU", "model"],
    },
  },
  "/faq/openclaw-install-failed": {
    zh: {
      title: "5.6 OpenClaw 安装失败",
      parent: "5. 常见问题",
      summary: "设备离线、依赖缺失、npm 失败、安装损坏及模型不可用等排查。",
      keywords: ["OpenClaw", "安装失败", "npm"],
    },
    en: {
      title: "5.6 OpenClaw Install Failed",
      parent: "5. FAQ",
      summary: "Offline device, missing deps, npm failure, corrupt install, model issues.",
      keywords: ["OpenClaw", "install failed"],
    },
  },
  "/faq/network-failed": {
    zh: {
      title: "5.7 Wi-Fi 连接失败",
      parent: "5. 常见问题",
      summary: "扫不到 SSID、无 IP、Type-C 后电脑断网、重启丢失配置等处理。",
      keywords: ["Wi-Fi", "连接失败", "SSID"],
    },
    en: {
      title: "5.7 Wi-Fi Connection Failed",
      parent: "5. FAQ",
      summary: "SSID not found, no IP, PC offline after Type-C, config lost on reboot.",
      keywords: ["Wi-Fi", "network failed"],
    },
  },
  "/faq/ide-failed": {
    zh: {
      title: "5.8 代码编辑器无法启动",
      parent: "5. 常见问题",
      summary: "页面空白、环境未安装或安装卡住时的排查。",
      keywords: ["代码编辑器", "无法启动", "空白"],
    },
    en: {
      title: "5.8 Code Editor Won't Start",
      parent: "5. FAQ",
      summary: "Blank page, env not installed, stuck install troubleshooting.",
      keywords: ["code editor", "IDE failed"],
    },
  },
  "/faq/multi-device-issue": {
    zh: {
      title: "5.9 多设备目标不对",
      parent: "5. 常见问题",
      summary: "切换设备后 Moss 目标混淆及设备标签、新建会话等推荐做法。",
      keywords: ["多设备", "目标设备", "Moss"],
    },
    en: {
      title: "5.9 Wrong Target Device",
      parent: "5. FAQ",
      summary: "Moss targets wrong device after switch; tags and new session tips.",
      keywords: ["multi-device", "Moss"],
    },
  },
  "/faq/token-anomaly": {
    zh: {
      title: "5.10 Token 用量异常",
      parent: "5. 常见问题",
      summary: "快速模型未配置、大文件反复发送等导致用量偏高的原因与成本控制。",
      keywords: ["Token", "用量", "成本"],
    },
    en: {
      title: "5.10 Abnormal Token Usage",
      parent: "5. FAQ",
      summary: "Missing fast model, large attachments resent—causes and cost control.",
      keywords: ["token", "usage"],
    },
  },
  "/faq/model-quality": {
    zh: {
      title: "5.11 模型回答质量问题",
      parent: "5. 常见问题",
      summary: "跑题、重复、工具选错、thinking 暴露、中英混杂等排查清单。",
      keywords: ["模型质量", "回答", "thinking"],
    },
    en: {
      title: "5.11 Poor Model Replies",
      parent: "5. FAQ",
      summary: "Off-topic, repeat, wrong tool, leaked thinking, mixed language checklist.",
      keywords: ["model quality", "reply"],
    },
  },
  "/faq/vnc-issue": {
    zh: {
      title: "5.12 远程桌面连接或卡顿",
      parent: "5. 常见问题",
      summary: "连不上、卡顿、鼠标错位、黑屏等从服务启动、画质降载等方面排查。",
      keywords: ["远程桌面", "卡顿", "VNC"],
    },
    en: {
      title: "5.12 Remote Desktop Issues",
      parent: "5. FAQ",
      summary: "Can't connect, lag, mouse offset, black screen—service and quality tuning.",
      keywords: ["remote desktop", "lag"],
    },
  },
  "/faq/local-llm": {
    zh: {
      title: "5.13 本地大模型 / Ollama 问题",
      parent: "5. 常见问题",
      summary: "Ollama 未安装/未启动、模型不存在、磁盘不足等的六步排查。",
      keywords: ["Ollama", "本地大模型", "排查"],
    },
    en: {
      title: "5.13 Local LLM / Ollama Issues",
      parent: "5. FAQ",
      summary: "Ollama not installed/running, missing model, disk full—six-step checklist.",
      keywords: ["Ollama", "local LLM"],
    },
  },
  "/faq/serial-empty": {
    zh: {
      title: "5.14 串口列表为空",
      parent: "5. 常见问题",
      summary: "串口需系统授权的原因、驱动与授权处理及不能替代 SSH 的提醒。",
      keywords: ["串口", "列表为空", "授权"],
    },
    en: {
      title: "5.14 Empty Serial Port List",
      parent: "5. FAQ",
      summary: "OS permission for serial, drivers, serial cannot replace SSH.",
      keywords: ["serial", "permission"],
    },
  },
};

const ORDER = [
  "/product-intro/overview",
  "/product-intro/architecture",
  "/product-intro/feature-matrix",
  "/product-intro/supported-hardware",
  "/product-intro/version-notes",
  "/product-intro/ai-showcase",
  "/quick-start/install-and-login",
  "/quick-start/flash-system",
  "/quick-start/connect-device",
  "/quick-start/connect-device/typec-flash",
  "/quick-start/connect-device/ssh",
  "/quick-start/connect-device/serial",
  "/quick-start/configure-network",
  "/quick-start/configure-ai-model",
  "/quick-start/first-conversation",
  "/user-guide/workbench",
  "/user-guide/workbench/device-status",
  "/user-guide/workbench/cross-page",
  "/user-guide/workbench/offline-cache",
  "/user-guide/ai-chat",
  "/user-guide/ai-chat/overview-and-entry",
  "/user-guide/ai-chat/device-aware-tools",
  "/user-guide/ai-chat/multi-session",
  "/user-guide/ai-chat/attachments",
  "/user-guide/ai-chat/slash-commands",
  "/user-guide/ai-chat/dual-lane",
  "/user-guide/remote-terminal",
  "/user-guide/remote-terminal/multi-tab-ssh",
  "/user-guide/remote-terminal/reconnect",
  "/user-guide/remote-terminal/serial",
  "/user-guide/file-manager",
  "/user-guide/file-manager/browse-and-transfer",
  "/user-guide/file-manager/online-edit",
  "/user-guide/file-manager/path-access-control",
  "/user-guide/remote-ide",
  "/user-guide/remote-ide/install-and-init",
  "/user-guide/remote-ide/system-requirements",
  "/user-guide/remote-ide/floating-window",
  "/user-guide/remote-desktop",
  "/user-guide/remote-desktop/startup-auth",
  "/user-guide/remote-desktop/performance-tuning",
  "/user-guide/remote-desktop/alternatives",
  "/user-guide/system-flashing",
  "/user-guide/system-flashing/media-comparison",
  "/user-guide/system-flashing/tf-card",
  "/user-guide/system-flashing/emmc",
  "/user-guide/system-flashing/s100-xburn",
  "/user-guide/network-config",
  "/user-guide/network-config/entry-and-status",
  "/user-guide/network-config/hidden-ssid",
  "/user-guide/network-config/persistence",
  "/user-guide/device-management",
  "/user-guide/device-management/list-and-switch",
  "/user-guide/device-management/auto-detect",
  "/user-guide/device-management/online-monitoring",
  "/user-guide/openclaw",
  "/user-guide/openclaw/overview",
  "/user-guide/openclaw/deploy-uninstall",
  "/user-guide/openclaw/main-panel",
  "/user-guide/openclaw/collab-with-dmoss",
  "/user-guide/openclaw/task-delegation",
  "/user-guide/openclaw/pairing-security",
  "/user-guide/skill",
  "/user-guide/skill/skill-md-structure",
  "/user-guide/skill/builtin-skills",
  "/user-guide/skill/clawhub-community",
  "/user-guide/skill/create-and-import",
  "/user-guide/skill/trigger-matching",
  "/user-guide/skill/sync-to-board",
  "/user-guide/local-models",
  "/user-guide/config-center",
  "/user-guide/config-center/overview",
  "/user-guide/config-center/account",
  "/user-guide/config-center/ai-engine",
  "/user-guide/config-center/device-defaults",
  "/user-guide/config-center/import-export",
  "/user-guide/channels",
  "/user-guide/channels/feishu",
  "/user-guide/channels/weixin",
  "/user-guide/channels/security",
  "/user-guide/monitoring",
  "/user-guide/monitoring/task-queue",
  "/user-guide/monitoring/token-usage",
  "/user-guide/cli",
  "/user-guide/cli/rdkstudio",
  "/user-guide/cli/dmoss-agent",
  "/user-guide/cli/automation-examples",
  "/resources/share-skills",
  "/resources/get-skills",
  "/resources/nodehub-cases",
  "/faq/ai-no-response",
  "/faq/ssh-failed",
  "/faq/typec-flash-failed",
  "/faq/camera-no-image",
  "/faq/hbm-not-found",
  "/faq/openclaw-install-failed",
  "/faq/network-failed",
  "/faq/ide-failed",
  "/faq/multi-device-issue",
  "/faq/token-anomaly",
  "/faq/model-quality",
  "/faq/vnc-issue",
  "/faq/local-llm",
  "/faq/serial-empty",
];

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
}

function fmtFields(fields, indent) {
  const pad = " ".repeat(indent);
  const lines = [
    `${pad}title: ${JSON.stringify(fields.title)},`,
    `${pad}parent: ${fields.parent == null ? "null" : JSON.stringify(fields.parent)},`,
    `${pad}summary: ${JSON.stringify(fields.summary)},`,
    `${pad}keywords: ${JSON.stringify(fields.keywords)},`,
  ];
  return lines.join("\n");
}

const missing = ORDER.filter((p) => !CHAPTERS[p]);
if (missing.length) {
  console.error("Missing chapter data:", missing);
  process.exit(1);
}

const blocks = ORDER.map((p) => {
  const c = CHAPTERS[p];
  return `  {
    path: ${JSON.stringify(p)},
    zh: {
${fmtFields(c.zh, 6)}
    },
    en: {
${fmtFields(c.en, 6)}
    },
  }`;
});

const file = `/**
 * RDK Studio 用户手册章节搜索索引（rdk_studio_doc 站点）。
 * path 与 developer.d-robotics.cc/rdk_studio_doc 下 slug 对齐。
 */
export const STUDIO_CHAPTERS = [
${blocks.join(",\n")},
];
`;

fs.writeFileSync(outPath, file, "utf8");
console.log("Wrote", outPath, "chapters:", ORDER.length);
