/**
 * RDK S 系列（S100 / S100P / S600）手册章节搜索索引。
 * path 与 rdk_s_doc 站点 slug 对齐（见 D-Robotics/rdk_s_doc 仓库 docs/）。
 */
export const RDK_S_CHAPTERS = [
  {
    path: "/RDK",
    zh: {
      title: "首页 · D-Robotics RDK Super 系列",
      parent: null,
      summary:
        "RDK Super 系列（S100 / S100P / S600）整体介绍与文档入口；套件定位、产品说明与文档结构指引。",
      keywords: ["RDK S", "S100", "S100P", "S600", "Super"],
    },
    en: {
      title: "Home · D-Robotics RDK Super Series",
      parent: null,
      summary:
        "Overview and documentation entry for RDK Super series (S100, S100P, S600).",
      keywords: ["RDK S", "S100", "S600", "Super", "overview"],
    },
  },
  {
    path: "/Quick_start",
    zh: {
      title: "1. 快速开始",
      parent: null,
      summary: "系统安装与硬件入门，帮助首次上手 S 系列开发板。",
      keywords: ["快速开始", "入门"],
    },
    en: {
      title: "1. Quick Start",
      parent: null,
      summary: "System installation and hardware basics for S-series boards.",
      keywords: ["quick start"],
    },
  },
  {
    path: "/01_hardware_introduction",
    zh: {
      title: "1.1 硬件简介",
      parent: "1. 快速开始",
      summary: "S100 / S600 开发板硬件规格、接口、扩展板与套件说明。",
      keywords: ["硬件简介", "规格", "接口", "扩展板", "套件"],
    },
    en: {
      title: "1.1 Hardware Introduction",
      parent: "1. Quick Start",
      summary: "Hardware specs, interfaces, expansion boards and kits for S100/S600.",
      keywords: ["hardware", "expansion board"],
    },
  },
  {
    path: "/01_hardware_introduction/01_rdk_s100",
    zh: {
      title: "RDK S100 硬件简介",
      parent: "1.1 硬件简介",
      summary: "S100 开发板硬件规格、接口与套件说明。",
      keywords: ["S100", "开发板", "硬件规格", "接口"],
    },
    en: {
      title: "RDK S100 Hardware",
      parent: "1.1 Hardware Introduction",
      summary: "RDK S100 board specifications, interfaces and kit information.",
      keywords: ["S100", "hardware", "interfaces"],
    },
  },
  {
    path: "/Quick_start/hardware_introduction/rdk_s100/rdk_s100_camera_expansion_board",
    zh: {
      title: "S100 相机扩展板",
      parent: "1.1 硬件简介",
      summary: "相机扩展板功能、连接与使用方式。",
      keywords: ["相机扩展板", "S100"],
    },
    en: {
      title: "S100 Camera Expansion Board",
      parent: "1.1 Hardware Introduction",
      summary: "Camera expansion board features, connection and usage.",
      keywords: ["camera expansion", "S100"],
    },
  },
  {
    path: "/Quick_start/hardware_introduction/rdk_s100/rdk_s100_mcu_port_expansion_board",
    zh: {
      title: "S100 MCU 扩展板",
      parent: "1.1 硬件简介",
      summary: "MCU 扩展板功能、连接与使用方式。",
      keywords: ["S100", "扩展板"],
    },
    en: {
      title: "S100 MCU Expansion Board",
      parent: "1.1 Hardware Introduction",
      summary: "MCU port expansion board features, connection and usage.",
      keywords: ["MCU expansion", "S100"],
    },
  },
  {
    path: "/01_hardware_introduction/02_rdk_s600",
    zh: {
      title: "RDK S600 硬件简介",
      parent: "1.1 硬件简介",
      summary: "S600 开发板硬件规格、接口与套件说明。",
      keywords: ["S600", "开发板", "硬件规格"],
    },
    en: {
      title: "RDK S600 Hardware",
      parent: "1.1 Hardware Introduction",
      summary: "RDK S600 board specifications, interfaces and kit information.",
      keywords: ["S600", "hardware"],
    },
  },
  {
    path: "/Quick_start/hardware_introduction/FAQ",
    zh: {
      title: "硬件简介 FAQ",
      parent: "1.1 硬件简介",
      summary: "硬件与套件相关常见问题。",
      keywords: ["套件"],
    },
    en: {
      title: "Hardware Introduction FAQ",
      parent: "1.1 Hardware Introduction",
      summary: "FAQ for hardware and kit related issues.",
      keywords: ["kit"],
    },
  },
  {
    path: "/02_install_os/rdk_s100",
    zh: {
      title: "1.2 系统烧录",
      parent: "1. 快速开始",
      summary: "S100/S600 烧录说明、准备事项；XBurn 在 Windows/Linux/macOS 的操作步骤与 FAQ。",
      keywords: ["烧录", "XBurn", "S100", "S600"],
    },
    en: {
      title: "1.2 System Flashing",
      parent: "1. Quick Start",
      summary: "S100/S600 flashing guide; XBurn on Windows/Linux/macOS; FAQ and troubleshooting.",
      keywords: ["flash", "XBurn", "S100", "S600"],
    },
  },
  {
    path: "/Quick_start/configuration_wizard/configuration_wizard_s100",
    zh: {
      title: "1.3 入门配置",
      parent: "1. 快速开始",
      summary: "S100/S600 首次上电后的基础配置（网络、账号、初始化等）。",
      keywords: ["入门配置", "网络", "初始化", "账号"],
    },
    en: {
      title: "1.3 Getting Started Configuration",
      parent: "1. Quick Start",
      summary: "Initial setup after first boot: network, account, initialization for S100/S600.",
      keywords: ["configuration", "network", "initialization"],
    },
  },
  {
    path: "/Quick_start/remote_login",
    zh: {
      title: "1.4 远程登录",
      parent: "1. 快速开始",
      summary: "串口/SSH 连接开发板的方法与注意事项。",
      keywords: ["远程登录", "SSH", "串口"],
    },
    en: {
      title: "1.4 Remote Login",
      parent: "1. Quick Start",
      summary: "Serial and SSH connection methods and notes.",
      keywords: ["remote login", "SSH", "serial"],
    },
  },
  {
    path: "/Quick_start/classification",
    zh: {
      title: "1.5 算法体验",
      parent: "1. 快速开始",
      summary: "快速体验模型示例的引导。",
      keywords: ["算法体验", "模型示例", "快速体验"],
    },
    en: {
      title: "1.5 Algorithm Experience",
      parent: "1. Quick Start",
      summary: "Quick guide to try pre-installed model demos.",
      keywords: ["algorithm experience", "demo", "model"],
    },
  },
  {
    path: "/Quick_start/download",
    zh: {
      title: "1.6 资源汇总",
      parent: "1. 快速开始",
      summary: "镜像、工具、文档等官方下载入口汇总。",
      keywords: ["下载", "镜像", "资源汇总", "工具"],
    },
    en: {
      title: "1.6 Resource Downloads",
      parent: "1. Quick Start",
      summary: "Official download hub for images, tools and documentation.",
      keywords: ["download", "image"],
    },
  },
  {
    path: "/Quick_start/rdk_studio",
    zh: {
      title: "1.9 RDK Studio",
      parent: "1. 快速开始",
      summary: "RDK Studio 安装与基础使用。",
      keywords: ["RDK Studio", "安装"],
    },
    en: {
      title: "1.9 RDK Studio",
      parent: "1. Quick Start",
      summary: "RDK Studio installation and basic usage.",
      keywords: ["RDK Studio", "installation"],
    },
  },
  {
    path: "/System_configuration",
    zh: {
      title: "2. 系统配置",
      parent: null,
      summary: "系统正常运行与按需调优的配置步骤。",
      keywords: ["系统配置"],
    },
    en: {
      title: "2. System Configuration",
      parent: null,
      summary: "Configuration steps for stable and tuned system operation.",
      keywords: ["system configuration"],
    },
  },
  {
    path: "/System_configuration/network_bluetooth",
    zh: {
      title: "2.1 网络与蓝牙",
      parent: "2. 系统配置",
      summary: "有线/无线网络及蓝牙配置。",
      keywords: ["网络", "蓝牙"],
    },
    en: {
      title: "2.1 Network & Bluetooth",
      parent: "2. System Configuration",
      summary: "Wired/wireless network and Bluetooth configuration.",
      keywords: ["network", "bluetooth"],
    },
  },
  {
    path: "/System_configuration/srpi-config",
    zh: {
      title: "2.2 srpi-config 工具",
      parent: "2. 系统配置",
      summary: "系统功能项配置入口与用法。",
      keywords: ["srpi-config"],
    },
    en: {
      title: "2.2 srpi-config Tool",
      parent: "2. System Configuration",
      summary: "System feature configuration utility.",
      keywords: ["srpi-config"],
    },
  },
  {
    path: "/System_configuration/config_txt",
    zh: {
      title: "2.3 config.txt 配置",
      parent: "2. 系统配置",
      summary: "设备树覆盖与系统行为定制。",
      keywords: ["config.txt", "设备树"],
    },
    en: {
      title: "2.3 config.txt",
      parent: "2. System Configuration",
      summary: "Device tree overlays and system behavior customization.",
      keywords: ["config.txt", "device tree"],
    },
  },
  {
    path: "/System_configuration/frequency_management",
    zh: {
      title: "2.4 Thermal & CPU 频率管理",
      parent: "2. 系统配置",
      summary: "温控与 CPU/BPU 频率调节策略。",
      keywords: ["温控", "频率", "CPU", "Thermal"],
    },
    en: {
      title: "2.4 Thermal & CPU Frequency",
      parent: "2. System Configuration",
      summary: "Thermal control and CPU/BPU frequency tuning.",
      keywords: ["thermal", "frequency", "CPU"],
    },
  },
  {
    path: "/System_configuration/self_start",
    zh: {
      title: "2.5 开机自启动",
      parent: "2. 系统配置",
      summary: "systemd/脚本自启动配置方式。",
      keywords: ["自启动", "systemd"],
    },
    en: {
      title: "2.5 Auto Start on Boot",
      parent: "2. System Configuration",
      summary: "Configure systemd/scripts for boot auto-start.",
      keywords: ["systemd"],
    },
  },
  {
    path: "/System_configuration/gui_network_config",
    zh: {
      title: "2.6 GUI 配网流程",
      parent: "2. 系统配置",
      summary: "图形界面网络配置步骤。",
      keywords: ["GUI", "配网", "图形界面", "网络"],
    },
    en: {
      title: "2.6 GUI Network Setup",
      parent: "2. System Configuration",
      summary: "Graphical UI network configuration workflow.",
      keywords: ["GUI", "network setup"],
    },
  },
  {
    path: "/System_configuration/share_file_tool",
    zh: {
      title: "2.7 共享文件配置",
      parent: "2. 系统配置",
      summary: "Samba/NFS 等文件共享方案。",
      keywords: ["Samba", "NFS", "文件共享"],
    },
    en: {
      title: "2.7 File Sharing",
      parent: "2. System Configuration",
      summary: "Samba/NFS and other file sharing setups.",
      keywords: ["Samba", "NFS", "file sharing"],
    },
  },
  {
    path: "/Basic_Application",
    zh: {
      title: "3. 基础应用开发",
      parent: null,
      summary: "图像、语音、40Pin 扩展与多媒体入门应用开发。",
      keywords: ["基础应用", "图像", "语音", "40Pin", "多媒体"],
    },
    en: {
      title: "3. Basic Application Development",
      parent: null,
      summary: "Image, audio, 40-pin expansion and multimedia starter development.",
      keywords: ["basic application", "image", "audio", "multimedia"],
    },
  },
  {
    path: "/Basic_Application/Image/mipi_camera",
    zh: {
      title: "3.1 图像应用",
      parent: "3. 基础应用开发",
      summary: "MIPI/USB 相机接入、驱动、采集示例与常见问题。",
      keywords: ["图像", "MIPI", "采集"],
    },
    en: {
      title: "3.1 Image Applications",
      parent: "3. Basic Application Development",
      summary: "MIPI/USB camera integration, drivers, capture samples and FAQ.",
      keywords: ["image", "MIPI", "USB camera", "capture"],
    },
  },
  {
    path: "/Basic_Application/audio/audio_board_super",
    zh: {
      title: "3.2 语音应用",
      parent: "3. 基础应用开发",
      summary: "录音/播放、声卡与音频配置说明。",
      keywords: ["语音", "音频", "录音", "播放", "声卡"],
    },
    en: {
      title: "3.2 Audio Applications",
      parent: "3. Basic Application Development",
      summary: "Recording/playback, sound card and audio configuration.",
      keywords: ["audio", "recording", "playback"],
    },
  },
  {
    path: "/Basic_Application/03_40pin_user_guide/s100/01_40pin_define",
    zh: {
      title: "3.3 40Pin 扩展引脚",
      parent: "3. 基础应用开发",
      summary: "S100/S600 管脚定义与 GPIO/PWM/UART/I2C/SPI 实战示例。",
      keywords: ["40Pin", "GPIO", "PWM", "UART", "I2C", "SPI", "S100", "S600"],
    },
    en: {
      title: "3.3 40-Pin Expansion",
      parent: "3. Basic Application Development",
      summary: "Pin definitions and GPIO/PWM/UART/I2C/SPI samples for S100/S600.",
      keywords: ["40-pin", "GPIO", "PWM", "UART", "SPI"],
    },
  },
  {
    path: "/Basic_Application/multi_media/pydev_vio_demo",
    zh: {
      title: "3.4 多媒体应用",
      parent: "3. 基础应用开发",
      summary:
        "Python/C++ 多媒体参考示例；S100 Camera/Decoder/Display/Encoder API；VIO/SYS/DISPLAY 等 C++ 模块。",
      keywords: ["多媒体", "VIO", "encoder", "decoder", "display", "Camera"],
    },
    en: {
      title: "3.4 Multimedia Applications",
      parent: "3. Basic Application Development",
      summary:
        "Python/C++ multimedia samples; S100 media APIs; VIO/SYS/DISPLAY/DECODER/ENCODER modules.",
      keywords: ["multimedia", "VIO", "encoder", "decoder", "display"],
    },
  },
  {
    path: "/Basic_Development",
    zh: {
      title: "4. 算法应用开发",
      parent: null,
      summary: "Model Zoo、hbm_runtime Python API 与 Python/C++ 参考示例。",
      keywords: ["算法应用", "Model Zoo", "hbm_runtime"],
    },
    en: {
      title: "4. Algorithm Application Development",
      parent: null,
      summary: "Model Zoo, hbm_runtime Python API, and Python/C++ reference samples.",
      keywords: ["algorithm", "Model Zoo", "hbm_runtime"],
    },
  },
  {
    path: "/Algorithm_Application/model_zoo_intro",
    zh: {
      title: "4.1 Model Zoo 概述",
      parent: "4. 算法应用开发",
      summary: "模型资源、部署流程与目录说明。",
      keywords: ["Model Zoo", "部署"],
    },
    en: {
      title: "4.1 Model Zoo Overview",
      parent: "4. Algorithm Application Development",
      summary: "Model resources, deployment workflow and directory layout.",
      keywords: ["Model Zoo", "deployment"],
    },
  },
  {
    path: "/Algorithm_Application/python-api",
    zh: {
      title: "4.2 Python API 手册（hbm_runtime）",
      parent: "4. 算法应用开发",
      summary: "hbm_runtime 模型加载、推理、调度、多模型/多线程用法。",
      keywords: ["hbm_runtime", "Python API", "推理", "多线程", "多模型"],
    },
    en: {
      title: "4.2 Python API (hbm_runtime)",
      parent: "4. Algorithm Application Development",
      summary: "hbm_runtime model load, inference, scheduling, multi-model/thread usage.",
      keywords: ["hbm_runtime", "Python API", "inference"],
    },
  },
  {
    path: "/03_Python_Sample",
    zh: {
      title: "4.2 Python 参考示例",
      parent: "4. 算法应用开发",
      summary:
        "YOLO/ResNet/MobileNet 等分类检测，分割/姿态/车道线/ASR 语音/OCR/实时流（USB/MIPI/WebSocket/RTSP）等 Python 推理示例。",
      keywords: [
        "Python示例",
        "YOLO",
        "ResNet",
        "MobileNet",
        "分割",
        "姿态",
        "OCR",
        "RTSP",
        "ASR",
      ],
    },
    en: {
      title: "4.2 Python Reference Samples",
      parent: "4. Algorithm Application Development",
      summary:
        "Python inference samples: classification, detection, segmentation, pose, lane, ASR, OCR, RTSP/WebSocket streams.",
      keywords: ["Python", "segmentation", "OCR", "RTSP"],
    },
  },
  {
    path: "/Algorithm_Application/Python_Sample/Ultralytics_YOLOv5x",
    zh: {
      title: "YOLOv5x 检测示例",
      parent: "4.2 Python 参考示例",
      summary: "YOLOv5x 目标检测 Python 推理与部署示例。",
      keywords: ["YOLOv5", "检测", "目标检测"],
    },
    en: {
      title: "YOLOv5x Detection Sample",
      parent: "4.2 Python Reference Samples",
      summary: "YOLOv5x object detection Python inference sample.",
      keywords: ["YOLOv5", "detection"],
    },
  },
  {
    path: "/Algorithm_Application/Python_Sample/Ultralytics_YOLO11",
    zh: {
      title: "YOLO11 检测示例",
      parent: "4.2 Python 参考示例",
      summary: "YOLO11 目标检测 Python 推理示例。",
      keywords: ["YOLO11", "检测"],
    },
    en: {
      title: "YOLO11 Detection Sample",
      parent: "4.2 Python Reference Samples",
      summary: "YOLO11 object detection Python sample.",
      keywords: ["YOLO11", "detection"],
    },
  },
  {
    path: "/Algorithm_Application/Python_Sample/LaneNet",
    zh: {
      title: "LaneNet 车道线示例",
      parent: "4.2 Python 参考示例",
      summary: "LaneNet 车道线检测 Python 示例。",
      keywords: ["LaneNet", "车道线"],
    },
    en: {
      title: "LaneNet Sample",
      parent: "4.2 Python Reference Samples",
      summary: "LaneNet lane detection Python sample.",
      keywords: ["LaneNet", "lane detection"],
    },
  },
  {
    path: "/Algorithm_Application/Python_Sample/PaddleOCR",
    zh: {
      title: "PaddleOCR 示例",
      parent: "4.2 Python 参考示例",
      summary: "PaddleOCR 文字识别 Python 示例。",
      keywords: ["OCR", "PaddleOCR", "文字识别"],
    },
    en: {
      title: "PaddleOCR Sample",
      parent: "4.2 Python Reference Samples",
      summary: "PaddleOCR text recognition Python sample.",
      keywords: ["OCR", "PaddleOCR"],
    },
  },
  {
    path: "/Algorithm_Application/Python_Sample/rtsp_yolov5x_display",
    zh: {
      title: "RTSP 实时流推理示例",
      parent: "4.2 Python 参考示例",
      summary: "RTSP 流 YOLOv5x 推理与显示示例。",
      keywords: ["RTSP", "实时流", "YOLOv5", "推理"],
    },
    en: {
      title: "RTSP Stream Inference Sample",
      parent: "4.2 Python Reference Samples",
      summary: "RTSP stream YOLOv5x inference and display sample.",
      keywords: ["RTSP", "stream", "inference"],
    },
  },
  {
    path: "/Basic_Development",
    zh: {
      title: "4.3 C++ 参考示例",
      parent: "4. 算法应用开发",
      summary: "与 Python 示例对应的 C++ 编译与部署示例。",
      keywords: ["编译", "部署"],
    },
    en: {
      title: "4.3 C++ Reference Samples",
      parent: "4. Algorithm Application Development",
      summary: "C++ build and deployment samples matching Python examples.",
      keywords: ["C++", "sample", "deployment"],
    },
  },
  {
    path: "/Robot_development",
    zh: {
      title: "5. TogetheROS.Bot",
      parent: null,
      summary: "TROS 生态与机器人应用入口说明，含官方手册链接。",
      keywords: ["TROS", "TogetheROS", "机器人", "ROS"],
    },
    en: {
      title: "5. TogetheROS.Bot",
      parent: null,
      summary: "TROS ecosystem and robot application entry with official manual links.",
      keywords: ["TROS", "TogetheROS", "robot", "ROS"],
    },
  },
  {
    path: "/Application_case/intro",
    zh: {
      title: "6. 应用开发指南",
      parent: null,
      summary: "面向场景的案例索引（机器狗、语音控制、无人车等）与实现路径说明。",
      keywords: ["机器狗", "无人车"],
    },
    en: {
      title: "6. Application Development Guide",
      parent: null,
      summary: "Scenario-based case index (robot dog, voice control, AMR, etc.) and implementation paths.",
      keywords: ["robot dog", "AMR"],
    },
  },
  {
    path: "/Advanced_development",
    zh: {
      title: "7. 进阶开发",
      parent: null,
      summary: "硬件、Linux、多媒体、算法工具链、MCU、构建系统、VDSP 深度开发。",
      keywords: ["进阶开发", "MCU", "VDSP"],
    },
    en: {
      title: "7. Advanced Development",
      parent: null,
      summary: "Hardware, Linux, multimedia, toolchain, MCU, build system and VDSP development.",
      keywords: ["advanced", "MCU", "VDSP"],
    },
  },
  {
    path: "/hardware_development",
    zh: {
      title: "7.1 硬件开发指南",
      parent: "7. 进阶开发",
      summary: "硬件资料、配件清单、S100 bringup 流程。",
      keywords: ["硬件开发", "bringup", "配件清单"],
    },
    en: {
      title: "7.1 Hardware Development Guide",
      parent: "7. Advanced Development",
      summary: "Hardware docs, accessory list and S100 bring-up workflow.",
      keywords: ["hardware development"],
    },
  },
  {
    path: "/linux_development",
    zh: {
      title: "7.2 Linux 开发指南",
      parent: "7. 进阶开发",
      summary:
        "开发环境、编译、内核头文件、实时内核；UART/I2C/SPI/GPIO 等驱动；PCIe/HBMEM/Wi-Fi/EtherCAT/OTA/调试与单元测试。",
      keywords: [
        "Linux开发",
        "驱动",
        "内核",
        "UART",
        "I2C",
        "SPI",
        "GPIO",
        "OTA",
        "EtherCAT",
        "PCIe",
      ],
    },
    en: {
      title: "7.2 Linux Development Guide",
      parent: "7. Advanced Development",
      summary:
        "Dev environment, build, kernel headers, RT kernel; drivers; PCIe/HBMEM/Wi-Fi/EtherCAT/OTA/debug/unit tests.",
      keywords: ["Linux", "driver", "kernel", "OTA", "EtherCAT"],
    },
  },
  {
    path: "/03_multimedia_development",
    zh: {
      title: "7.3 多媒体开发指南",
      parent: "7. 进阶开发",
      summary:
        "S100 camsys/camera 点亮、编解码、显示、多路相机同步；VIN/ISP/PYM/GDC/CODEC/pipeline/GPU/hbmem 示例。",
      keywords: ["多媒体开发", "camsys", "ISP", "编解码", "VIN", "PYM", "GDC"],
    },
    en: {
      title: "7.3 Multimedia Development Guide",
      parent: "7. Advanced Development",
      summary:
        "S100 camera pipeline, encode/decode, display, multi-camera sync; VIN/ISP/PYM/GDC/CODEC samples.",
      keywords: ["multimedia", "ISP", "codec", "VIN"],
    },
  },
  {
    path: "/04_toolchain_development",
    zh: {
      title: "7.4 算法工具链",
      parent: "7. 进阶开发",
      summary: "算法工具链总览，S100/S600 LLM 工具链使用。",
      keywords: ["算法工具链", "LLM", "S100", "S600"],
    },
    en: {
      title: "7.4 Algorithm Toolchain",
      parent: "7. Advanced Development",
      summary: "Toolchain overview and S100/S600 LLM toolchain usage.",
      keywords: ["toolchain", "LLM"],
    },
  },
  {
    path: "/05_MCU_development",
    zh: {
      title: "7.5 MCU 开发指南",
      parent: "7. 进阶开发",
      summary:
        "MCU 代码结构、快速入门、系统说明、MCU1 开发；UART/PWM/SPI/ADC/IPC/CAN/I2C/Eth 外设；Port 复用、看门狗、EtherCAT。",
      keywords: ["MCU", "外设", "UART", "CAN", "IPC", "EtherCAT", "看门狗"],
    },
    en: {
      title: "7.5 MCU Development Guide",
      parent: "7. Advanced Development",
      summary:
        "MCU structure, quick start, peripherals (UART/PWM/SPI/CAN/I2C/Eth), port mux, watchdog, EtherCAT.",
      keywords: ["MCU", "UART", "CAN", "EtherCAT"],
    },
  },
  {
    path: "/Advanced_development/rdk_gen",
    zh: {
      title: "7.6 构建系统开发指南（rdk_gen）",
      parent: "7. 进阶开发",
      summary: "rdk_gen 构建、打包与离线/在线流程。",
      keywords: ["rdk_gen", "构建系统", "打包"],
    },
    en: {
      title: "7.6 Build System Guide (rdk_gen)",
      parent: "7. Advanced Development",
      summary: "rdk_gen build, packaging, offline/online workflows.",
      keywords: ["rdk_gen", "build system", "packaging"],
    },
  },
  {
    path: "/Advanced_development/vdsp_development",
    zh: {
      title: "7.7 VDSP 开发指南",
      parent: "7. 进阶开发",
      summary: "VDSP 固件加载、调试、sample 与 ARM 侧联调。",
      keywords: ["VDSP", "固件", "联调", "调试"],
    },
    en: {
      title: "7.7 VDSP Development Guide",
      parent: "7. Advanced Development",
      summary: "VDSP firmware load, debug, samples and ARM-side co-debug.",
      keywords: ["VDSP", "firmware", "debug"],
    },
  },
  {
    path: "/FAQ",
    zh: {
      title: "8. 常见问题（FAQ）",
      parent: null,
      summary: "硬件/系统/应用/多媒体/AI 工具链/TROS/桌面应用等 FAQ 汇总。",
      keywords: ["FAQ", "常见问题"],
    },
    en: {
      title: "8. FAQ",
      parent: null,
      summary: "FAQ for hardware, system, apps, multimedia, AI toolchain, TROS and desktop.",
      keywords: ["FAQ"],
    },
  },
  {
    path: "/FAQ/hardware_and_system",
    zh: {
      title: "8.1 硬件、系统与环境",
      parent: "8. 常见问题（FAQ）",
      summary: "硬件、系统与环境类 FAQ。",
      keywords: ["系统", "环境"],
    },
    en: {
      title: "8.1 Hardware, System & Environment",
      parent: "8. FAQ",
      summary: "Hardware, system and environment FAQ.",
      keywords: ["system"],
    },
  },
  {
    path: "/FAQ/interface",
    zh: {
      title: "8.2 接口、外设与驱动",
      parent: "8. 常见问题（FAQ）",
      summary: "接口、外设与驱动相关 FAQ。",
      keywords: ["外设", "驱动"],
    },
    en: {
      title: "8.2 Interfaces & Drivers",
      parent: "8. FAQ",
      summary: "Interface, peripheral and driver FAQ.",
      keywords: ["driver"],
    },
  },
  {
    path: "/FAQ/applications_and_examples",
    zh: {
      title: "8.3 应用开发、编译与示例",
      parent: "8. 常见问题（FAQ）",
      summary: "应用开发、编译与示例运行 FAQ。",
      keywords: ["编译", "示例"],
    },
    en: {
      title: "8.3 Applications, Build & Samples",
      parent: "8. FAQ",
      summary: "Application development, build and sample execution FAQ.",
      keywords: ["build"],
    },
  },
  {
    path: "/FAQ/multimedia",
    zh: {
      title: "8.4 多媒体",
      parent: "8. 常见问题（FAQ）",
      summary: "多媒体相关 FAQ。",
      keywords: [],
    },
    en: {
      title: "8.4 Multimedia",
      parent: "8. FAQ",
      summary: "Multimedia related FAQ.",
      keywords: [],
    },
  },
  {
    path: "/FAQ/toolchain",
    zh: {
      title: "8.5 AI 模型与工具链",
      parent: "8. 常见问题（FAQ）",
      summary: "AI 模型与算法工具链 FAQ。",
      keywords: [],
    },
    en: {
      title: "8.5 AI Models & Toolchain",
      parent: "8. FAQ",
      summary: "AI models and algorithm toolchain FAQ.",
      keywords: ["toolchain FAQ", "AI model"],
    },
  },
  {
    path: "/FAQ/tros_ros",
    zh: {
      title: "8.6 TROS/ROS",
      parent: "8. 常见问题（FAQ）",
      summary: "TROS/ROS 机器人中间件 FAQ。",
      keywords: ["TROS", "ROS", "FAQ"],
    },
    en: {
      title: "8.6 TROS/ROS",
      parent: "8. FAQ",
      summary: "TROS/ROS middleware FAQ.",
      keywords: ["TROS", "ROS"],
    },
  },
  {
    path: "/FAQ/desktop_app",
    zh: {
      title: "8.7 桌面应用",
      parent: "8. 常见问题（FAQ）",
      summary: "桌面应用相关 FAQ。",
      keywords: ["桌面应用", "FAQ"],
    },
    en: {
      title: "8.7 Desktop Applications",
      parent: "8. FAQ",
      summary: "Desktop application FAQ.",
      keywords: [],
    },
  },
  {
    path: "/Appendix",
    zh: {
      title: "9. 附录",
      parent: null,
      summary: "RDK OS 常用命令速查。",
      keywords: ["附录", "命令"],
    },
    en: {
      title: "9. Appendix",
      parent: null,
      summary: "Quick reference for common RDK OS commands.",
      keywords: ["appendix", "commands"],
    },
  },
  {
    path: "/Appendix/rdk-command-manual/cmd_devmem",
    zh: {
      title: "9.1 RDK 专属命令",
      parent: "9. 附录",
      summary: "rdkos_info、hrut_boardid、hrut_socuid、hrut_somstatus、hrut_ps、devmem 等命令说明。",
      keywords: ["rdkos_info", "hrut", "devmem"],
    },
    en: {
      title: "9.1 RDK Commands",
      parent: "9. Appendix",
      summary: "rdkos_info, hrut_* commands, devmem and other board-level commands.",
      keywords: ["rdkos_info", "hrut", "devmem"],
    },
  },
  {
    path: "/Appendix/linux-command-manual/cmd_apt",
    zh: {
      title: "9.2 Linux 命令手册",
      parent: "9. 附录",
      summary: "apt/dpkg、ssh/scp/rsync、ip/route、mount/find/grep/ps/top/tar、dmesg/nohup 等实用命令。",
      keywords: ["apt", "ssh", "grep", "mount", "ip"],
    },
    en: {
      title: "9.2 Linux Command Manual",
      parent: "9. Appendix",
      summary: "apt/dpkg, ssh/scp/rsync, ip/route, mount/find/grep/ps/top/tar, dmesg/nohup, etc.",
      keywords: ["Linux", "apt", "ssh", "grep"],
    },
  },
  {
    path: "/Release_Note/roadmap",
    zh: {
      title: "10. 版本发布",
      parent: null,
      summary: "S100 / S600 版本规划与 Release Notes，记录新特性、修复与兼容性说明。",
      keywords: ["版本发布", "Release Notes", "S100", "S600"],
    },
    en: {
      title: "10. Release Notes",
      parent: null,
      summary: "S100 and S600 release planning and notes: features, fixes and compatibility.",
      keywords: ["release notes", "S100", "S600"],
    },
  },
  {
    path: "/Release_Note/roadmap",
    zh: {
      title: "S100 版本发布",
      parent: "10. 版本发布",
      summary: "RDK S100 各版本新增/修复/兼容性说明。",
      keywords: ["S100", "版本"],
    },
    en: {
      title: "S100 Release Notes",
      parent: "10. Release Notes",
      summary: "RDK S100 version history: features, fixes and compatibility.",
      keywords: ["S100", "release"],
    },
  },
  {
    path: "/Release_Note/roadmap",
    zh: {
      title: "S600 版本发布",
      parent: "10. 版本发布",
      summary: "RDK S600 版本演进与 Beta 发布说明。",
      keywords: ["S600", "Beta"],
    },
    en: {
      title: "S600 Release Notes",
      parent: "10. Release Notes",
      summary: "RDK S600 version evolution and beta release notes.",
      keywords: ["S600", "beta", "release"],
    },
  },
];
