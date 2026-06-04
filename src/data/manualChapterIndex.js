/**
 * 手册章节搜索索引（与卡片 description 分离，专供首页搜索）。
 * 维护：path 须与线上子站侧栏 slug 一致（如 rdk_x_doc 烧录为 /install_os/rdk_x3，非旧版 Quick_start/install_os）。
 */
import { MAGICBOX_CHAPTERS } from "./manualChapterIndexMagicbox";
import { OE_CHAPTERS } from "./manualChapterIndexOe";
import { RDK_S_CHAPTERS } from "./manualChapterIndexRdkS";
import { STUDIO_CHAPTERS } from "./manualChapterIndexStudio";
import { TROS_CHAPTERS } from "./manualChapterIndexTros";

export const MANUAL_CHAPTER_INDEX = [
  {
    siteHrefMatch: "rdk_x_doc",
    docBase: { zh: "https://developer.d-robotics.cc/rdk_x_doc", en: "https://developer.d-robotics.cc/rdk_x_doc/en" },
    chapters: [
      {
        path: "/RDK",
        zh: {
          title: "首页 · D-Robotics RDK 套件",
          parent: null,
          summary:
            "RDK X 系列（X3 / X3 Module / X5 / X5 Module 等）用户手册总览；套件定位、产品介绍、工作温度与散热建议、文档结构说明、下载资源入口及生态项目对接说明。",
          keywords: ["总览", "套件", "X3", "X5", "散热", "下载", "文档结构"],
        },
        en: {
          title: "Home · D-Robotics RDK Kits",
          parent: null,
          summary:
            "Overview of the RDK X series user manual (X3, X3 Module, X5, X5 Module, etc.): kit positioning, product introduction, thermal guidance, documentation structure, download resources, and ecosystem integration.",
          keywords: ["overview", "X3", "X5", "thermal", "download", "documentation"],
        },
      },
      {
        path: "/Quick_start",
        zh: {
          title: "1. 快速开始",
          parent: null,
          summary: "系统安装与硬件入门，帮助首次上手开发板。",
          keywords: ["快速开始", "入门", "上手", "安装"],
        },
        en: {
          title: "1. Quick Start",
          parent: null,
          summary: "System installation and hardware basics for first-time board setup.",
          keywords: ["quick start", "installation"],
        },
      },
      {
        path: "/Quick_start/hardware_introduction/rdk_x3",
        zh: {
          title: "1.1 硬件简介",
          parent: "1. 快速开始",
          summary: "X3/X5 等各型号硬件规格、40PIN 与 MIPI 等接口及配件说明。",
          keywords: ["硬件", "规格", "接口", "配件", "X3", "X5", "40PIN", "MIPI"],
        },
        en: {
          title: "1.1 Hardware Introduction",
          parent: "1. Quick Start",
          summary: "Hardware specifications, 40-pin and MIPI interfaces, and accessories for X3/X5 models.",
          keywords: ["hardware", "specification", "interface", "accessories", "X3", "X5", "40-pin", "MIPI"],
        },
      },
      {
        path: "/install_os/rdk_x3",
        zh: {
          title: "1.2 系统烧录",
          parent: "1. 快速开始",
          summary: "按产品（X3 / X5 / Module 等）分流的镜像烧录、SD 卡写入、Etcher/xburn 工具、NAND 固件与启动流程。",
          keywords: ["烧录", "镜像", "固件", "NAND", "启动", "Etcher", "xburn"],
        },
        en: {
          title: "1.2 System Flashing",
          parent: "1. Quick Start",
          summary: "Image flashing for X3/X5/Module: SD card write, Etcher/xburn tools, NAND firmware, and boot flow.",
          keywords: ["flash", "image", "firmware", "NAND", "SD card", "boot", "Etcher", "xburn"],
        },
      },
      {
        path: "/display_use",
        zh: {
          title: "1.5 显示屏使用",
          parent: "1. 快速开始",
          summary: "HDMI、LCD、MIPI DSI 等显示屏连接与使用。",
          keywords: ["显示屏", "HDMI", "LCD", "MIPI DSI"],
        },
        en: {
          title: "1.5 Display Usage",
          parent: "1. Quick Start",
          summary: "Display connection and usage via HDMI, LCD, and MIPI DSI.",
          keywords: ["display", "HDMI", "LCD", "MIPI"],
        },
      },
      {
        path: "/Quick_start/classification",
        zh: {
          title: "1.6 算法体验",
          parent: "1. 快速开始",
          summary: "板端 BPU 预装分类示例（如 MobileNet）快速推理体验。",
          keywords: ["算法体验", "MobileNet", "BPU", "推理", "示例"],
        },
        en: {
          title: "1.6 Algorithm Experience",
          parent: "1. Quick Start",
          summary: "Quick BPU inference try-out of pre-installed classification demos such as MobileNet.",
          keywords: ["algorithm", "MobileNet", "BPU", "inference", "demo"],
        },
      },
      {
        path: "/Quick_start/download",
        zh: {
          title: "1.7 下载资源汇总",
          parent: "1. 快速开始",
          summary: "系统镜像、OpenExplore/MiniBoot 工具链、硬件资料等全部下载资源汇总。",
          keywords: ["下载", "镜像", "OpenExplore", "MiniBoot", "资源"],
        },
        en: {
          title: "1.7 Download Resources",
          parent: "1. Quick Start",
          summary: "Aggregated downloads: OS images, OpenExplore/MiniBoot toolchain, and hardware docs.",
          keywords: ["download", "image", "OpenExplore", "MiniBoot", "resources"],
        },
      },
      {
        path: "/Quick_start/remote_login",
        zh: {
          title: "1.4 远程登录",
          parent: "1. 快速开始",
          summary: "SSH、串口、VNC 等远程登录与连接方式。",
          keywords: ["远程登录", "SSH", "串口", "VNC"],
        },
        en: {
          title: "1.4 Remote Login",
          parent: "1. Quick Start",
          summary: "Remote access via SSH, serial console, VNC, and related setup.",
          keywords: ["remote", "SSH", "serial", "VNC"],
        },
      },
      {
        path: "/Quick_start/rdk_studio",
        zh: {
          title: "1.9 RDK Studio 使用指南",
          parent: "1. 快速开始",
          summary: "RDK Studio 桌面工作台使用说明入口。",
          keywords: ["RDK Studio", "工作台"],
        },
        en: {
          title: "1.9 RDK Studio Guide",
          parent: "1. Quick Start",
          summary: "Entry guide for the RDK Studio desktop workspace.",
          keywords: ["RDK Studio", "workspace" ],
        },
      },
      {
        path: "/System_configuration",
        zh: {
          title: "2. 系统配置",
          parent: null,
          summary: "网络、蓝牙、自启动等保证系统正常运行与按需调优的配置步骤。",
          keywords: ["系统配置", "网络", "蓝牙", "自启动"],
        },
        en: {
          title: "2. System Configuration",
          parent: null,
          summary: "Network, bluetooth, autostart, and other configuration steps to keep the system running.",
          keywords: ["system configuration", "network", "bluetooth", "autostart"],
        },
      },
      {
        path: "/System_configuration/network_blueteeth",
        zh: {
          title: "2.1 网络与蓝牙",
          parent: "2. 系统配置",
          summary: "Wi-Fi/以太网有线无线、静态 IP、DHCP、蓝牙等网络与蓝牙配置。",
          keywords: ["网络", "蓝牙", "Wi-Fi", "以太网", "DHCP", "静态 IP"],
        },
        en: {
          title: "2.1 Network & Bluetooth",
          parent: "2. System Configuration",
          summary: "Wired/wireless networking, static IP, DHCP, and Bluetooth setup.",
          keywords: ["network", "bluetooth", "DHCP"],
        },
      },
      {
        path: "/System_configuration/srpi-config",
        zh: {
          title: "2.2 srpi-config",
          parent: "2. 系统配置",
          summary: "系统配置工具 srpi-config 相关说明。",
          keywords: ["srpi-config", "配置工具"],
        },
        en: {
          title: "2.2 srpi-config",
          parent: "2. System Configuration",
          summary: "System configuration utility srpi-config.",
          keywords: ["srpi-config"],
        },
      },
      {
        path: "/System_configuration/config_txt",
        zh: {
          title: "2.3 config.txt",
          parent: "2. 系统配置",
          summary: "启动与硬件相关 config.txt 配置项说明。",
          keywords: ["config.txt", "启动", "硬件"],
        },
        en: {
          title: "2.3 config.txt",
          parent: "2. System Configuration",
          summary: "Boot and hardware-related config.txt options.",
          keywords: ["config.txt", "boot", "hardware"],
        },
      },
      {
        path: "/System_configuration/frequency_management",
        zh: {
          title: "2.4 频率管理",
          parent: "2. 系统配置",
          summary: "CPU/BPU 频率调频与性能调节。",
          keywords: ["频率", "CPU", "BPU", "性能", "调频"],
        },
        en: {
          title: "2.4 Frequency Management",
          parent: "2. System Configuration",
          summary: "CPU/BPU frequency and performance tuning.",
          keywords: ["frequency", "CPU", "BPU", "performance"],
        },
      },
      {
        path: "/System_configuration/self_start",
        zh: {
          title: "2.5 自启动",
          parent: "2. 系统配置",
          summary: "systemd 服务/应用开机自启配置。",
          keywords: ["自启动", "systemd", "开机自启", "服务"],
        },
        en: {
          title: "2.5 Auto Start",
          parent: "2. System Configuration",
          summary: "Configure services and applications to start on boot.",
          keywords: ["boot"],
        },
      },
      {
        path: "/Basic_Application",
        zh: {
          title: "3. 基础应用开发",
          parent: null,
          summary:
            "系统预装能力与入门示例：GPIO、音视频、多媒体 API、Python/C 示例（/app/cdev、/app/pydev 等）。",
          keywords: ["基础应用", "GPIO", "多媒体", "pydev", "cdev", "Python", "C"],
        },
        en: {
          title: "3. Basic Application Development",
          parent: null,
          summary:
            "Pre-installed capabilities and starter samples: GPIO, audio/video, multimedia APIs, Python/C examples.",
          keywords: ["basic application", "GPIO", "multimedia"],
        },
      },
      {
        path: "/Basic_Application/40pin_user_sample",
        zh: {
          title: "3.1 40PIN 管脚应用",
          parent: "3. 基础应用开发",
          summary: "40PIN 功能说明与 GPIO 等示例。",
          keywords: ["40PIN", "GPIO", "管脚"],
        },
        en: {
          title: "3.1 40-Pin Applications",
          parent: "3. Basic Application Development",
          summary: "40-pin header features and GPIO sample code.",
          keywords: ["40-pin", "GPIO", "header"],
        },
      },
      {
        path: "/03_Basic_Application/02_cdev_demo_sample",
        zh: {
          title: "3.2 参考示例（C 语言）",
          parent: "3. 基础应用开发",
          summary: "C dev 多媒体/采集等示例（如 VIO 采集）。",
          keywords: ["VIO", "多媒体", "采集"],
        },
        en: {
          title: "3.2 Reference Samples (C)",
          parent: "3. Basic Application Development",
          summary: "C dev multimedia and capture samples (e.g. VIO capture).",
          keywords: ["C", "VIO", "multimedia", "capture"],
        },
      },
      {
        path: "/Basic_Application/pydev_demo_sample",
        zh: {
          title: "3.3 参考示例（Python）",
          parent: "3. 基础应用开发",
          summary:
            "图像分类、检测、分割、姿态、相机/RTSP 等 BPU 推理示例（RDK X3/X5 分目录）。",
          keywords: ["Python", "BPU", "检测", "分割", "分类", "RTSP", "推理"],
        },
        en: {
          title: "3.3 Reference Samples (Python)",
          parent: "3. Basic Application Development",
          summary:
            "BPU inference samples: classification, detection, segmentation, pose, camera/RTSP (X3/X5).",
          keywords: ["Python", "BPU", "detection", "segmentation", "inference"],
        },
      },
      {
        path: "/03_Basic_Application/04_vision",
        zh: {
          title: "3.4 视觉方案",
          parent: "3. 基础应用开发",
          summary: "USB/MIPI 相机等视觉接入方案。",
          keywords: ["视觉", "相机", "USB", "MIPI"],
        },
        en: {
          title: "3.4 Vision Solutions",
          parent: "3. Basic Application Development",
          summary: "Vision integration for USB/MIPI cameras and related setups.",
          keywords: ["vision", "camera", "USB", "MIPI"],
        },
      },
      {
        path: "/03_Basic_Application/05_audio/rdk_x3_and_rdk_x3_module",
        zh: {
          title: "3.5 声觉方案",
          parent: "3. 基础应用开发",
          summary: "板载/扩展音频 HAT、驱动与录音播放。",
          keywords: ["音频", "声觉", "录音", "播放", "HAT"],
        },
        en: {
          title: "3.5 Audio Solutions",
          parent: "3. Basic Application Development",
          summary: "On-board and expansion audio HAT, drivers, recording and playback.",
          keywords: ["audio", "recording", "playback", "HAT"],
        },
      },
      {
        path: "/03_Basic_Application/06_multi_media_sp_dev_api",
        zh: {
          title: "3.6 API 说明",
          parent: "3. 基础应用开发",
          summary: "C/Python 多媒体与 BPU 等 API 文档（encoder、display、vio、bpu 等）。",
          keywords: ["API", "多媒体", "bpu", "encoder", "display", "vio"],
        },
        en: {
          title: "3.6 API Reference",
          parent: "3. Basic Application Development",
          summary: "C/Python multimedia and BPU APIs (encoder, display, vio, bpu, etc.).",
          keywords: ["API", "multimedia", "bpu", "encoder", "display", "vio"],
        },
      },
      {
        path: "/Application_case",
        zh: {
          title: "6. 应用开发指南",
          parent: null,
          summary: "面向具体场景的完整应用方案（算法/机器人等）。",
          keywords: ["应用开发", "机器人"],
        },
        en: {
          title: "6. Application Development Guide",
          parent: null,
          summary: "End-to-end application solutions for algorithms and robotics scenarios.",
          keywords: ["robotics", "solution"],
        },
      },
      {
        path: "/Application_case/line_follower",
        zh: {
          title: "深度学习巡线小车",
          parent: "6. 应用开发指南",
          summary: "基于 CNN 的巡线感知与小车控制（主要面向 X3 系列）。",
          keywords: ["巡线", "小车", "CNN", "深度学习", "X3"],
        },
        en: {
          title: "Deep Learning Line-Following Car",
          parent: "6. Application Development Guide",
          summary: "CNN-based line following perception and car control (mainly for X3 series).",
          keywords: ["CNN", "deep learning", "X3"],
        },
      },
      {
        path: "/Application_case/amr",
        zh: {
          title: "AMR 开发指南",
          parent: "6. 应用开发指南",
          summary: "自主移动机器人：激光雷达、导航框架、组装与开发流程（面向 RDK X5）。",
          keywords: ["AMR", "激光雷达", "导航", "X5", "移动机器人"],
        },
        en: {
          title: "AMR Development Guide",
          parent: "6. Application Development Guide",
          summary: "Autonomous mobile robot: lidar, navigation stack, assembly and dev workflow (RDK X5).",
          keywords: ["AMR", "lidar", "navigation", "X5"],
        },
      },
      {
        path: "/Advanced_development",
        zh: {
          title: "7. 进阶开发",
          parent: null,
          summary: "硬件、Linux 系统、多媒体与算法工具链的深度开发。",
          keywords: ["进阶", "工具链"],
        },
        en: {
          title: "7. Advanced Development",
          parent: null,
          summary: "In-depth hardware, Linux, multimedia, and algorithm toolchain development.",
          keywords: ["advanced", "toolchain"],
        },
      },
      {
        path: "/07_Advanced_development/01_hardware_development/rdk_x3",
        zh: {
          title: "7.1 硬件开发指南",
          parent: "7. 进阶开发",
          summary: "各型号硬件设计、接口、配件与扩展板资料。",
          keywords: ["硬件开发", "扩展板", "硬件设计"],
        },
        en: {
          title: "7.1 Hardware Development Guide",
          parent: "7. Advanced Development",
          summary: "Hardware design, interfaces, accessories and expansion board documentation.",
          keywords: ["hardware development", "expansion board"],
        },
      },
      {
        path: "/linux_development",
        zh: {
          title: "7.2 Linux 开发指南",
          parent: "7. 进阶开发",
          summary: "内核头文件、驱动开发、U-Boot/内核配置、硬件单元测试等。",
          keywords: ["Linux", "驱动", "内核", "U-Boot", "驱动开发"],
        },
        en: {
          title: "7.2 Linux Development Guide",
          parent: "7. Advanced Development",
          summary: "Kernel headers, driver development, U-Boot/kernel config, hardware unit tests.",
          keywords: ["Linux", "driver", "kernel", "U-Boot"],
        },
      },
      {
        path: "/03_multimedia_development",
        zh: {
          title: "7.3 多媒体开发指南",
          parent: "7. 进阶开发",
          summary: "视频输入/输出、编解码、区域处理、调试与示例。",
          keywords: ["多媒体开发", "编解码", "视频"],
        },
        en: {
          title: "7.3 Multimedia Development Guide",
          parent: "7. Advanced Development",
          summary: "Video I/O, encode/decode, region processing, debugging and samples.",
          keywords: ["multimedia", "encode", "decode", "video"],
        },
      },
      {
        path: "/04_toolchain_development",
        zh: {
          title: "7.4 算法工具链开发指南",
          parent: "7. 进阶开发",
          summary: "模型训练、量化、上板；含中级/专家级环境与 runtime 示例。",
          keywords: ["算法工具链", "量化", "训练", "runtime"],
        },
        en: {
          title: "7.4 Algorithm Toolchain Guide",
          parent: "7. Advanced Development",
          summary: "Model training, quantization, on-board deployment; intermediate/expert environments.",
          keywords: ["toolchain", "quantization", "training"],
        },
      },
      {
        path: "/FAQ",
        zh: {
          title: "8. 常见问题（FAQ）",
          parent: null,
          summary: "使用过程中的排错与技巧汇总。",
          keywords: ["FAQ", "常见问题", "排错"],
        },
        en: {
          title: "8. FAQ",
          parent: null,
          summary: "Troubleshooting tips and common issues.",
          keywords: ["FAQ", "troubleshooting", "issues"],
        },
      },
      {
        path: "/FAQ/hardware_and_system",
        zh: {
          title: "8.1 硬件、系统与环境",
          parent: "8. 常见问题（FAQ）",
          summary: "烧录、启动、版本、环境类问题。",
          keywords: ["烧录问题", "启动", "环境", "版本"],
        },
        en: {
          title: "8.1 Hardware, System & Environment",
          parent: "8. FAQ",
          summary: "Flashing, boot, version and environment related issues.",
          keywords: ["flashing", "boot", "environment", "version"],
        },
      },
      {
        path: "/FAQ/interface",
        zh: {
          title: "8.2 接口",
          parent: "8. 常见问题（FAQ）",
          summary: "外设与接口相关问题。",
          keywords: ["接口", "外设", "FAQ"],
        },
        en: {
          title: "8.2 Interfaces",
          parent: "8. FAQ",
          summary: "Peripheral and interface related issues.",
          keywords: ["interface", "peripheral"],
        },
      },
      {
        path: "/FAQ/applications_and_examples",
        zh: {
          title: "8.3 应用与示例",
          parent: "8. 常见问题（FAQ）",
          summary: "示例运行、应用类问题。",
          keywords: ["应用", "示例"],
        },
        en: {
          title: "8.3 Applications & Samples",
          parent: "8. FAQ",
          summary: "Sample execution and application related issues.",
          keywords: ["application", "sample"],
        },
      },
      {
        path: "/FAQ/multimedia",
        zh: {
          title: "8.4 多媒体",
          parent: "8. 常见问题（FAQ）",
          summary: "音视频、相机、编解码等。",
          keywords: ["多媒体", "相机", "编解码", "音视频"],
        },
        en: {
          title: "8.4 Multimedia",
          parent: "8. FAQ",
          summary: "Audio/video, camera, encode/decode issues.",
          keywords: ["multimedia", "camera"],
        },
      },
      {
        path: "/FAQ/toolchain",
        zh: {
          title: "8.5 工具链",
          parent: "8. 常见问题（FAQ）",
          summary: "算法工具链与开发环境问题。",
          keywords: ["工具链", "开发环境"],
        },
        en: {
          title: "8.5 Toolchain",
          parent: "8. FAQ",
          summary: "Algorithm toolchain and development environment issues.",
          keywords: ["toolchain", "environment"],
        },
      },
      {
        path: "/FAQ/tros_ros",
        zh: {
          title: "8.6 TROS/ROS",
          parent: "8. 常见问题（FAQ）",
          summary: "机器人中间件相关。",
          keywords: ["TROS", "ROS", "机器人中间件"],
        },
        en: {
          title: "8.6 TROS/ROS",
          parent: "8. FAQ",
          summary: "Robot middleware related issues.",
          keywords: ["TROS", "ROS", "middleware"],
        },
      },
      {
        path: "/FAQ/desktop_app",
        zh: {
          title: "8.7 桌面应用",
          parent: "8. 常见问题（FAQ）",
          summary: "桌面/GPU/VLC 等桌面体验问题。",
          keywords: ["桌面", "GPU", "VLC"],
        },
        en: {
          title: "8.7 Desktop Applications",
          parent: "8. FAQ",
          summary: "Desktop experience issues: GPU, VLC, HDMI, etc.",
          keywords: ["desktop", "GPU", "VLC", "HDMI"],
        },
      },
      {
        path: "/Appendix",
        zh: {
          title: "9. 附录",
          parent: null,
          summary: "RDK OS 常用命令速查。",
          keywords: ["附录", "命令", "速查"],
        },
        en: {
          title: "9. Appendix",
          parent: null,
          summary: "Quick reference for common RDK OS commands.",
          keywords: ["appendix", "commands", "reference"],
        },
      },
      {
        path: "/09_Appendix/rdk-command-manual",
        zh: {
          title: "9.1 RDK 专属命令",
          parent: "9. 附录",
          summary: "hrut_*、rdk-backup、devmem 等板级信息与管理命令。",
          keywords: ["hrut", "rdk-backup", "devmem"],
        },
        en: {
          title: "9.1 RDK Commands",
          parent: "9. Appendix",
          summary: "Board-level commands: hrut_*, rdk-backup, devmem, etc.",
          keywords: ["hrut", "rdk-backup", "devmem"],
        },
      },
      {
        path: "/09_Appendix/linux-command-manual",
        zh: {
          title: "9.2 Linux 命令",
          parent: "9. 附录",
          summary: "grep、find、dpkg、mount、ip 等通用命令说明。",
          keywords: ["grep", "find", "dpkg", "mount", "ip"],
        },
        en: {
          title: "9.2 Linux Commands",
          parent: "9. Appendix",
          summary: "Common Linux commands: grep, find, dpkg, mount, ip, etc.",
          keywords: ["Linux", "grep", "find", "dpkg", "mount", "ip"],
        },
      },
      {
        path: "/10_Release_Note",
        zh: {
          title: "10. 版本发布",
          parent: null,
          summary:
            "RDK OS 各版本发布记录：版本号、发布日期、新特性（hbm_runtime、pydev 示例重构、HDMI/GPU 优化）、修复项与升级注意事项。",
          keywords: ["版本发布", "RDK OS", "升级"],
        },
        en: {
          title: "10. Release Notes",
          parent: null,
          summary:
            "RDK OS release history: version, date, features (hbm_runtime, pydev refactor, HDMI/GPU), fixes and upgrade notes.",
          keywords: ["release notes", "RDK OS", "upgrade"],
        },
      },
    ],
  },
  {
    siteHrefMatch: "rdk_s_doc",
    docBase: { zh: "https://developer.d-robotics.cc/rdk_s_doc", en: "https://developer.d-robotics.cc/rdk_s_doc/en" },
    chapters: RDK_S_CHAPTERS,
  },
  {
    siteHrefMatch: "tros_doc",
    docBase: { zh: "https://developer.d-robotics.cc/tros_doc", en: "https://developer.d-robotics.cc/tros_doc/en" },
    chapters: TROS_CHAPTERS,
  },
  {
    siteHrefMatch: "magicbox_doc",
    docBase: {
      zh: "https://developer.d-robotics.cc/magicbox_doc",
      en: "https://developer.d-robotics.cc/magicbox_doc/en",
    },
    chapters: MAGICBOX_CHAPTERS,
  },
  {
    siteHrefMatch: "toolchain.d-robotics.cc",
    docBase: {
      zh: "https://toolchain.d-robotics.cc",
      en: "https://toolchain.d-robotics.cc/en",
    },
    chapters: OE_CHAPTERS,
  },
  {
    siteHrefMatch: "rdk_studio_doc",
    docBase: {
      zh: "https://developer.d-robotics.cc/rdk_studio_doc",
      en: "https://developer.d-robotics.cc/rdk_studio_doc/en",
    },
    chapters: STUDIO_CHAPTERS,
  },
];
