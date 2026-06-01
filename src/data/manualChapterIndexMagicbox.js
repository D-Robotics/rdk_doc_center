/**
 * RDK X5 Magicbox 手册章节搜索索引。
 * path 与 magicbox_doc 站点 slug 对齐（见 D-Robotics/magicbox_doc 仓库 docs/）。
 */
export const MAGICBOX_CHAPTERS = [
  {
    path: "/magicbox",
    zh: {
      title: "1. 产品概述",
      parent: null,
      summary:
        "介绍 RDK X5 Magicbox 多模态智能平台：融合视觉、听觉与动觉，支持「看、听、说、动」交互，适用于教学、创意开发与智能展示。",
      keywords: ["Magicbox", "产品概述", "多模态", "RDK X5", "看听说动"],
    },
    en: {
      title: "1. Product Overview",
      parent: null,
      summary:
        "RDK X5 Magicbox multimodal platform: vision, audio and motion for see-hear-speak-act interaction.",
      keywords: ["Magicbox", "overview", "multimodal", "RDK X5"],
    },
  },
  {
    path: "/magicbox",
    zh: {
      title: "拓扑结构",
      parent: "1. 产品概述",
      summary: "展示整机物理结构示意图。",
      keywords: ["拓扑", "物理结构", "整机"],
    },
    en: {
      title: "Topology",
      parent: "1. Product Overview",
      summary: "Physical structure diagram of the complete device.",
      keywords: ["topology", "structure"],
    },
  },
  {
    path: "/magicbox",
    zh: {
      title: "接口、按键与指示灯说明",
      parent: "1. 产品概述",
      summary:
        "双目相机、电源口、闪连口、HDMI、耳机、网口、USB、扬声器、麦克风及三颗功能键用途；上电指示灯状态；三键分别启动深度估计（红）、手势交互（绿）、语音交互（蓝）。",
      keywords: ["接口", "按键", "指示灯", "闪连", "深度估计", "手势", "语音"],
    },
    en: {
      title: "Interfaces, Keys and LEDs",
      parent: "1. Product Overview",
      summary:
        "Ports, buttons and status LEDs; red/green/blue keys for depth, gesture and voice demos.",
      keywords: ["interface", "button", "LED", "HDMI", "USB"],
    },
  },
  {
    path: "/magicbox",
    zh: {
      title: "硬件规格",
      parent: "1. 产品概述",
      summary: "技术规格与包装及裸机尺寸重量说明。",
      keywords: ["硬件规格", "技术规格", "包装"],
    },
    en: {
      title: "Hardware Specifications",
      parent: "1. Product Overview",
      summary: "Technical specs and packaging dimensions.",
      keywords: ["hardware", "specification"],
    },
  },
  {
    path: "/magicbox",
    zh: {
      title: "RDK X5 8G 主控",
      parent: "硬件规格",
      summary: "CPU/BPU/GPU、内存、存储、接口、显示、音频、网络、电源等参数。",
      keywords: ["RDK X5", "8G", "主控", "BPU", "10TOPS"],
    },
    en: {
      title: "RDK X5 8G Main Board",
      parent: "Hardware Specifications",
      summary: "CPU, BPU, GPU, memory, storage, interfaces, display, audio, network and power.",
      keywords: ["RDK X5", "8G", "BPU", "TOPS"],
    },
  },
  {
    path: "/magicbox",
    zh: {
      title: "双目相机 GS130WI",
      parent: "硬件规格",
      summary: "传感器、IMU、分辨率/帧率、FOV、基线、翻折角度等。",
      keywords: ["GS130WI", "双目相机", "SC132GS", "IMU", "FOV"],
    },
    en: {
      title: "Stereo Camera GS130WI",
      parent: "Hardware Specifications",
      summary: "Sensor, IMU, resolution, frame rate, FOV, baseline and fold angle.",
      keywords: ["GS130WI", "stereo camera", "SC132GS"],
    },
  },
  {
    path: "/magicbox",
    zh: {
      title: "舵机 PTK 7465 MG-D",
      parent: "硬件规格",
      summary: "角度范围、速度、堵转扭力等。",
      keywords: ["舵机", "PTK 7465", "MG-D", "扭力"],
    },
    en: {
      title: "Servo PTK 7465 MG-D",
      parent: "Hardware Specifications",
      summary: "Angle range, speed and stall torque.",
      keywords: ["servo", "PTK 7465"],
    },
  },
  {
    path: "/magicbox",
    zh: {
      title: "其他板载资源",
      parent: "硬件规格",
      summary: "WS2812B 灯带、麦克风、扬声器、三颗按键。",
      keywords: ["WS2812B", "灯带", "麦克风", "扬声器", "按键"],
    },
    en: {
      title: "Other On-board Resources",
      parent: "Hardware Specifications",
      summary: "WS2812B LED strip, microphone, speaker and three buttons.",
      keywords: ["WS2812B", "LED", "microphone", "speaker"],
    },
  },
  {
    path: "/magicbox",
    zh: {
      title: "包装及裸机规格",
      parent: "硬件规格",
      summary: "外包装材质、裸机尺寸与重量。",
      keywords: ["包装", "裸机", "尺寸", "重量"],
    },
    en: {
      title: "Packaging and Device Dimensions",
      parent: "Hardware Specifications",
      summary: "Packaging material, device size and weight.",
      keywords: ["packaging", "dimensions", "weight"],
    },
  },
  {
    path: "/magicbox",
    zh: {
      title: "预置软件",
      parent: "1. 产品概述",
      summary: "预装 RDK OS、ROS、三大示例程序及网页端性能监控应用。",
      keywords: ["预置软件", "RDK OS", "ROS", "性能监控"],
    },
    en: {
      title: "Pre-installed Software",
      parent: "1. Product Overview",
      summary: "RDK OS, ROS, three demo apps and web performance monitor.",
      keywords: ["RDK OS", "ROS", "pre-installed"],
    },
  },
  {
    path: "/quickstart",
    zh: {
      title: "2. 快速入门",
      parent: null,
      summary: "从开箱到上手的完整流程，含安全注意事项与三大功能体验。",
      keywords: ["快速入门", "开箱", "上电", "网络配置"],
    },
    en: {
      title: "2. Quick Start",
      parent: null,
      summary: "Unboxing to first use: safety notes and three demo experiences.",
      keywords: ["quick start", "unboxing", "network"],
    },
  },
  {
    path: "/quickstart",
    zh: {
      title: "开箱清单",
      parent: "2. 快速入门",
      summary: "主机（含 32GB TF 卡）及两条数据线。",
      keywords: ["开箱", "TF卡", "数据线"],
    },
    en: {
      title: "Package Contents",
      parent: "2. Quick Start",
      summary: "Main unit with 32GB TF card and two data cables.",
      keywords: ["package", "TF card", "cable"],
    },
  },
  {
    path: "/quickstart",
    zh: {
      title: "系统烧录",
      parent: "2. 快速入门",
      summary: "出厂已预置系统；需重烧时拆 TF 卡，参考 RDK X5 烧录文档操作。",
      keywords: ["烧录", "TF卡", "RDK OS"],
    },
    en: {
      title: "System Flashing",
      parent: "2. Quick Start",
      summary: "Pre-flashed OS; remove TF card and follow RDK X5 flash guide to reflash.",
      keywords: ["flash", "TF card", "OS"],
    },
  },
  {
    path: "/quickstart",
    zh: {
      title: "快速上手指导视频",
      parent: "2. 快速入门",
      summary: "嵌入快速上手演示视频。",
      keywords: ["视频", "快速上手"],
    },
    en: {
      title: "Quick Start Video",
      parent: "2. Quick Start",
      summary: "Embedded quick start demonstration video.",
      keywords: ["video", "tutorial"],
    },
  },
  {
    path: "/quickstart",
    zh: {
      title: "供电",
      parent: "2. 快速入门",
      summary: "Type-C 5V/5A，需 PD 3.0 适配器。",
      keywords: ["供电", "Type-C", "PD 3.0", "5V"],
    },
    en: {
      title: "Power Supply",
      parent: "2. Quick Start",
      summary: "Type-C 5V/5A with PD 3.0 adapter required.",
      keywords: ["power", "Type-C", "PD 3.0"],
    },
  },
  {
    path: "/quickstart",
    zh: {
      title: "闪连配置",
      parent: "网络配置",
      summary: "PC 通过闪连口连接，配置 IPv4，ping 192.168.128.10 验证。",
      keywords: ["闪连", "192.168.128.10", "网络"],
    },
    en: {
      title: "Flash Link Network Setup",
      parent: "Network Configuration",
      summary: "Connect via flash link port; ping 192.168.128.10 to verify.",
      keywords: ["flash link", "192.168.128.10", "network"],
    },
  },
  {
    path: "/quickstart",
    zh: {
      title: "有线网口配置",
      parent: "网络配置",
      summary: "PC 通过网口连接，配置 IPv4，ping 192.168.127.10 验证。",
      keywords: ["网口", "192.168.127.10", "以太网"],
    },
    en: {
      title: "Wired Ethernet Setup",
      parent: "Network Configuration",
      summary: "Connect via RJ45; ping 192.168.127.10 to verify.",
      keywords: ["ethernet", "192.168.127.10", "network"],
    },
  },
  {
    path: "/quickstart",
    zh: {
      title: "启动 RDK X5 Magicbox",
      parent: "2. 快速入门",
      summary: "上电约 50s，白灯闪烁并播放音效表示启动完成。",
      keywords: ["启动", "上电", "白灯"],
    },
    en: {
      title: "Boot RDK X5 Magicbox",
      parent: "2. Quick Start",
      summary: "About 50s after power-on; white LED blink and sound indicate ready.",
      keywords: ["boot", "power on"],
    },
  },
  {
    path: "/quickstart",
    zh: {
      title: "双目深度估计（快速体验）",
      parent: "示例体验",
      summary: "按左键（红灯），浏览器访问 :8000 查看深度效果。",
      keywords: ["深度估计", "8000", "左键", "红灯"],
    },
    en: {
      title: "Stereo Depth Demo (Quick Start)",
      parent: "Demo Experience",
      summary: "Press left button (red LED); open browser :8000 for depth view.",
      keywords: ["depth", "8000", "stereo"],
    },
  },
  {
    path: "/quickstart",
    zh: {
      title: "手势交互（快速体验）",
      parent: "示例体验",
      summary: "按中键（绿灯），5 种手势控制摇臂/灯光，浏览器 :8000 查看。",
      keywords: ["手势", "绿灯", "ThumbUp", "Victory"],
    },
    en: {
      title: "Gesture Demo (Quick Start)",
      parent: "Demo Experience",
      summary: "Press middle button (green); five gestures control arm and lights at :8000.",
      keywords: ["gesture", "green LED"],
    },
  },
  {
    path: "/quickstart",
    zh: {
      title: "语音交互（快速体验）",
      parent: "示例体验",
      summary: "按右键（蓝灯），唤醒词「你好地瓜」、结束对话；麦克风/灯光状态流程。",
      keywords: ["语音", "你好地瓜", "蓝灯", "唤醒"],
    },
    en: {
      title: "Voice Demo (Quick Start)",
      parent: "Demo Experience",
      summary: "Press right button (blue); wake word and end-conversation flow.",
      keywords: ["voice", "wake word", "blue LED"],
    },
  },
  {
    path: "/quickstart",
    zh: {
      title: "使用 RDK Studio 体验更多示例",
      parent: "示例体验",
      summary: "通过 RDK Studio 连接并体验更多应用。",
      keywords: ["RDK Studio", "示例"],
    },
    en: {
      title: "More Demos via RDK Studio",
      parent: "Demo Experience",
      summary: "Connect with RDK Studio for additional sample apps.",
      keywords: ["RDK Studio", "samples"],
    },
  },
  {
    path: "/quickstart",
    zh: {
      title: "资源监控",
      parent: "2. 快速入门",
      summary: "自启动监控，浏览器访问 :7999 查看 CPU/BPU 等资源占用。",
      keywords: ["资源监控", "7999", "CPU", "BPU"],
    },
    en: {
      title: "Resource Monitor",
      parent: "2. Quick Start",
      summary: "Auto-started monitor at :7999 for CPU/BPU usage.",
      keywords: ["monitor", "7999", "CPU", "BPU"],
    },
  },
  {
    path: "/basic-peripherals",
    zh: {
      title: "3. 基础外设使用",
      parent: null,
      summary:
        "介绍 /userdata/magicbox/basic_function_demo/ 下预置 Python 外设示例及目录结构。",
      keywords: ["基础外设", "basic_function_demo", "Python"],
    },
    en: {
      title: "3. Basic Peripherals",
      parent: null,
      summary: "Pre-built Python peripheral demos under basic_function_demo.",
      keywords: ["peripherals", "basic_function_demo", "Python"],
    },
  },
  {
    path: "/basic-peripherals",
    zh: {
      title: "舵机控制",
      parent: "3. 基础外设使用",
      summary: "PTK 7465 MG-D 参数、BOARD 32/33 PWM、运行 servo.py 撑起机身。",
      keywords: ["舵机", "servo.py", "PWM", "32", "33"],
    },
    en: {
      title: "Servo Control",
      parent: "3. Basic Peripherals",
      summary: "PTK 7465 MG-D, PWM pins 32/33, run servo.py to lift the body.",
      keywords: ["servo", "servo.py", "PWM"],
    },
  },
  {
    path: "/basic-peripherals",
    zh: {
      title: "灯光控制",
      parent: "3. 基础外设使用",
      summary: "WS2812B 24-bit 全彩，SPI 总线 1 设备 0，运行 ws2812b.py。",
      keywords: ["WS2812B", "灯带", "ws2812b.py", "SPI"],
    },
    en: {
      title: "LED Control",
      parent: "3. Basic Peripherals",
      summary: "WS2812B via SPI bus 1 device 0; run ws2812b.py.",
      keywords: ["WS2812B", "ws2812b.py", "SPI"],
    },
  },
  {
    path: "/basic-peripherals",
    zh: {
      title: "IMU 控制",
      parent: "3. 基础外设使用",
      summary: "相机 IMU + 拓展板 ICM20948，I2C 总线 5、smbus2，运行 imu.py。",
      keywords: ["IMU", "ICM20948", "imu.py", "I2C"],
    },
    en: {
      title: "IMU Control",
      parent: "3. Basic Peripherals",
      summary: "Camera IMU and ICM20948 on expansion board; I2C bus 5; run imu.py.",
      keywords: ["IMU", "ICM20948", "imu.py"],
    },
  },
  {
    path: "/basic-peripherals",
    zh: {
      title: "按钮控制",
      parent: "3. 基础外设使用",
      summary: "GPIO BCM 22/16/26 下降沿检测，运行 button.py 打印 button1/2/3 OK。",
      keywords: ["按钮", "GPIO", "button.py", "BCM"],
    },
    en: {
      title: "Button Control",
      parent: "3. Basic Peripherals",
      summary: "GPIO BCM 22/16/26 falling edge; run button.py.",
      keywords: ["button", "GPIO", "button.py"],
    },
  },
  {
    path: "/basic-peripherals",
    zh: {
      title: "麦克风及扬声器使用",
      parent: "3. 基础外设使用",
      summary: "INMP441、NS4168，I2S hw:0,0；arecord、aplay、mpg123 命令。",
      keywords: ["麦克风", "扬声器", "arecord", "aplay", "I2S"],
    },
    en: {
      title: "Microphone and Speaker",
      parent: "3. Basic Peripherals",
      summary: "INMP441, NS4168, I2S hw:0,0; arecord, aplay, mpg123.",
      keywords: ["microphone", "speaker", "arecord", "aplay"],
    },
  },
  {
    path: "/resource-download",
    zh: {
      title: "4. 资源下载",
      parent: null,
      summary: "集中提供硬件、系统与工具下载链接。",
      keywords: ["资源下载", "下载", "镜像"],
    },
    en: {
      title: "4. Resource Download",
      parent: null,
      summary: "Hardware docs, system images and tool download links.",
      keywords: ["download", "resources"],
    },
  },
  {
    path: "/resource-download",
    zh: {
      title: "硬件资料",
      parent: "4. 资源下载",
      summary: "产品规格书、灯珠板/转接板原理图、2D 结构图、渲染图与实物图。",
      keywords: ["硬件资料", "原理图", "结构图"],
    },
    en: {
      title: "Hardware Materials",
      parent: "4. Resource Download",
      summary: "Spec sheets, schematics, 2D drawings and product images.",
      keywords: ["hardware", "schematic"],
    },
  },
  {
    path: "/resource-download",
    zh: {
      title: "系统资源",
      parent: "4. 资源下载",
      summary: "RDK OS 镜像下载。",
      keywords: ["RDK OS", "镜像", "系统"],
    },
    en: {
      title: "System Resources",
      parent: "4. Resource Download",
      summary: "RDK OS image download.",
      keywords: ["RDK OS", "image"],
    },
  },
  {
    path: "/resource-download",
    zh: {
      title: "软件资源",
      parent: "4. 资源下载",
      summary: "RDK Studio（烧录/连接/示例）、Rufus（写 SD 卡工具）。",
      keywords: ["RDK Studio", "Rufus", "软件"],
    },
    en: {
      title: "Software Resources",
      parent: "4. Resource Download",
      summary: "RDK Studio and Rufus SD card writer.",
      keywords: ["RDK Studio", "Rufus"],
    },
  },
  {
    path: "/algorithm-development",
    zh: {
      title: "5. 算法开发",
      parent: null,
      summary: "预置三大 AI 交互算法的开发说明与启动方式。",
      keywords: ["算法开发", "AI", "深度", "手势", "语音"],
    },
    en: {
      title: "5. Algorithm Development",
      parent: null,
      summary: "Development guides for depth, gesture and voice interaction demos.",
      keywords: ["algorithm", "AI", "development"],
    },
  },
  {
    path: "/algorithm-development/stereo-depth",
    zh: {
      title: "双目深度估计",
      parent: "5. 算法开发",
      summary:
        "基于 IGEV/GRU 的双目深度算法，输入双目图像，输出视差图与深度图；GS130WI、V2.4_int16/int8，run_stereo.sh，浏览器 :8000。",
      keywords: ["双目深度", "IGEV", "GRU", "stereonet", "GS130WI", "8000"],
    },
    en: {
      title: "Stereo Depth Estimation",
      parent: "5. Algorithm Development",
      summary: "IGEV/GRU stereo depth; GS130WI; V2.4 models; run_stereo.sh; browser :8000.",
      keywords: ["stereo depth", "IGEV", "GRU", "stereonet"],
    },
  },
  {
    path: "/algorithm-development/stereo-depth",
    zh: {
      title: "深度估计 · 模型版本",
      parent: "双目深度估计",
      summary: "V2.4_int16（15fps 高精度）与 V2.4_int8（23fps 高帧率），默认 int8。",
      keywords: ["V2.4", "int8", "int16", "帧率"],
    },
    en: {
      title: "Depth · Model Versions",
      parent: "Stereo Depth Estimation",
      summary: "V2.4_int16 15fps and V2.4_int8 23fps; int8 default.",
      keywords: ["V2.4", "int8", "int16"],
    },
  },
  {
    path: "/algorithm-development/gesture-interaction",
    zh: {
      title: "手势交互",
      parent: "5. 算法开发",
      summary:
        "人体检测、人手关键点与手势识别；ThumbUp/Victory/ThumbLeft/ThumbRight/Okay 控制摇臂与灯光；ros2 launch，:8000。",
      keywords: ["手势", "gesture", "fastrcnn", "handLMKs", "gestureDet"],
    },
    en: {
      title: "Gesture Interaction",
      parent: "5. Algorithm Development",
      summary: "Body/hand/gesture models; five gestures control arm and LEDs; ros2 launch.",
      keywords: ["gesture", "hand", "ThumbUp", "Victory"],
    },
  },
  {
    path: "/algorithm-development/voice-interaction",
    zh: {
      title: "语音交互",
      parent: "5. 算法开发",
      summary:
        "ASR SenseVoice + LLM Qwen2.5-1.5B + TTS/KWS Sherpa-onnx；持续唤醒、wait_for_llm、audio_io 与 qwen_llm launch。",
      keywords: ["语音", "SenseVoice", "Qwen", "Sherpa", "ASR", "LLM", "TTS"],
    },
    en: {
      title: "Voice Interaction",
      parent: "5. Algorithm Development",
      summary: "SenseVoice ASR, Qwen2.5 LLM, Sherpa TTS/KWS; audio_io and qwen_llm launches.",
      keywords: ["voice", "ASR", "LLM", "Qwen", "Sherpa"],
    },
  },
  {
    path: "/algorithm-development/voice-interaction",
    zh: {
      title: "语音流处理功能说明",
      parent: "语音交互",
      summary:
        "持续对话/持续唤醒、continuous_wake_mode 与 wait_for_llm、TTS 结束与麦克风重开、开机自启与按钮控制。",
      keywords: ["语音流", "continuous_wake_mode", "wait_for_llm", "麦克风"],
    },
    en: {
      title: "Voice Pipeline",
      parent: "Voice Interaction",
      summary: "Continuous dialog/wake modes, TTS end and mic reopen, boot and button control.",
      keywords: ["voice pipeline", "wake mode", "TTS"],
    },
  },
  {
    path: "/algorithm-development/voice-interaction",
    zh: {
      title: "大语言模型功能说明",
      parent: "语音交互",
      summary: "模型默认 /dev/shm/、llm_model_path、wait_for_audio 参数。",
      keywords: ["大模型", "LLM", "llm_model_path", "Qwen"],
    },
    en: {
      title: "LLM Configuration",
      parent: "Voice Interaction",
      summary: "Model under /dev/shm/, llm_model_path and wait_for_audio.",
      keywords: ["LLM", "llm_model_path", "Qwen"],
    },
  },
  {
    path: "/faq",
    zh: {
      title: "6. FAQ",
      parent: null,
      summary: "常见问题：手势画面卡死/摇臂摆动需 PD 3.0 电源；Soft AP 配置参考 RDK 网络文档。",
      keywords: ["FAQ", "常见问题", "PD 3.0", "Soft AP"],
    },
    en: {
      title: "6. FAQ",
      parent: null,
      summary: "Gesture freeze and arm jitter: check PD 3.0 power; Soft AP via RDK network docs.",
      keywords: ["FAQ", "PD 3.0", "Soft AP"],
    },
  },
  {
    path: "/known_issues",
    zh: {
      title: "7. 已知问题",
      parent: null,
      summary: "软件已知问题说明。",
      keywords: ["已知问题"],
    },
    en: {
      title: "7. Known Issues",
      parent: null,
      summary: "Known software issues.",
      keywords: ["known issues"],
    },
  },
  {
    path: "/known_issues",
    zh: {
      title: "软件相关已知问题",
      parent: "7. 已知问题",
      summary:
        "图像边缘少量黑边：畸变校正/极线矫正正常现象，为保留更大 FOV；不影响成像与算法；后续版本优化裁剪。",
      keywords: ["黑边", "畸变", "极线矫正", "FOV"],
    },
    en: {
      title: "Software Known Issues",
      parent: "7. Known Issues",
      summary: "Edge black bars from rectify for larger FOV; no impact on imaging or algorithms.",
      keywords: ["black border", "rectify", "FOV"],
    },
  },
  {
    path: "/changelog",
    zh: {
      title: "8. 更新日志",
      parent: null,
      summary: "RDK OS 版本记录。",
      keywords: ["更新日志", "changelog"],
    },
    en: {
      title: "8. Changelog",
      parent: null,
      summary: "RDK OS release history.",
      keywords: ["changelog", "release"],
    },
  },
  {
    path: "/changelog",
    zh: {
      title: "RDK OS 版本记录",
      parent: "8. 更新日志",
      summary: "v1.0.0（2026-03-05）首版发布。",
      keywords: ["v1.0.0", "2026-03-05", "RDK OS"],
    },
    en: {
      title: "RDK OS Release Notes",
      parent: "8. Changelog",
      summary: "v1.0.0 (2026-03-05) initial release.",
      keywords: ["v1.0.0", "RDK OS"],
    },
  },
  {
    path: "/technical-support",
    zh: {
      title: "9. 技术支持",
      parent: null,
      summary: "开发者社区、技术支持邮箱、官方飞书技术交流群。",
      keywords: ["技术支持", "社区", "飞书", "邮箱"],
    },
    en: {
      title: "9. Technical Support",
      parent: null,
      summary: "Developer community, support email and Feishu tech group.",
      keywords: ["support", "community", "Feishu"],
    },
  },
];
