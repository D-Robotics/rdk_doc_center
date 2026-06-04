/**
 * TogetheROS.Bot 用户手册章节搜索索引（tros_doc 站点）。
 * path 与 developer.d-robotics.cc/tros_doc 下 slug 对齐（源自 rdk_doc/docs/05_Robot_development）。
 */
export const TROS_CHAPTERS = [
  {
    path: "/tros",
    zh: {
      title: "TogetheROS.Bot 总览",
      parent: null,
      summary:
        "TROS 总览：Communication 通信组件、Boxs 算法仓库、Apps 应用示例；含 zero-copy、hobot_dnn 等名词解释与功能支持矩阵。",
      keywords: [
        "TROS",
        "TogetheROS",
        "通信组件",
        "Boxs",
        "Apps",
        "zero-copy",
        "hobot_dnn",
        "功能支持",
      ],
    },
    en: {
      title: "TogetheROS.Bot Overview",
      parent: null,
      summary:
        "Overview of Communication components, Boxs algorithms, Apps examples, glossary and feature matrix.",
      keywords: ["TogetheROS", "Communication", "Boxs", "Apps"],
    },
  },
  {
    path: "/Quick_start/preparation",
    zh: {
      title: "5.1 快速开始",
      parent: null,
      summary: "tros.b 环境准备、安装、交叉编译、Hello World 与 ROS2 包使用。",
      keywords: ["快速开始", "tros.b", "安装", "交叉编译"],
    },
    en: {
      title: "5.1 Quick Start",
      parent: null,
      summary: "tros.b environment setup, installation, cross-compile, Hello World and ROS2 packages.",
      keywords: ["quick start", "tros.b", "install"],
    },
  },
  {
    path: "/Quick_start/preparation",
    zh: {
      title: "环境准备",
      parent: "5.1 快速开始",
      summary: "环境准备与仓库配置入口，分别面向 RDK 平台与 X86 平台。",
      keywords: ["环境准备"],
    },
    en: {
      title: "Environment Preparation",
      parent: "5.1 Quick Start",
      summary: "Environment preparation for RDK and x86 platforms.",
      keywords: ["preparation", "RDK", "x86"],
    },
  },
  {
    path: "/Quick_start/install_tros",
    zh: {
      title: "安装 tros.b",
      parent: "5.1 快速开始",
      summary: "通过 apt 安装/升级 tros.b，含不同硬件平台的源配置与注意事项。",
      keywords: ["apt", "tros.b", "升级"],
    },
    en: {
      title: "Install tros.b",
      parent: "5.1 Quick Start",
      summary: "Install/upgrade tros.b via apt with platform-specific repo configuration.",
      keywords: ["install", "apt", "tros.b"],
    },
  },
  {
    path: "/Quick_start/cross_compile",
    zh: {
      title: "源码安装与交叉编译",
      parent: "5.1 快速开始",
      summary: "源码安装与交叉编译全流程：Docker、代码拉取、指定版本编译、X86 编译与常见问题。",
      keywords: ["交叉编译", "源码", "Docker"],
    },
    en: {
      title: "Source Build & Cross Compile",
      parent: "5.1 Quick Start",
      summary: "Full source build and cross-compile workflow with Docker and version pinning.",
      keywords: ["cross compile", "source", "Docker"],
    },
  },
  {
    path: "/Quick_start/hello_world",
    zh: {
      title: "Hello World",
      parent: "5.1 快速开始",
      summary: "Hello World 最小示例，验证基础运行链路是否正常。",
      keywords: ["Hello World"],
    },
    en: {
      title: "Hello World",
      parent: "5.1 Quick Start",
      summary: "Minimal Hello World sample to verify the basic runtime pipeline.",
      keywords: ["Hello World"],
    },
  },
  {
    path: "/Quick_start/ros_pkg",
    zh: {
      title: "ROS2 package 使用",
      parent: "5.1 快速开始",
      summary: "ROS2 package 的安装与使用说明，指导包管理与调用。",
      keywords: ["ROS2", "package"],
    },
    en: {
      title: "ROS2 Package Usage",
      parent: "5.1 Quick Start",
      summary: "Install and use ROS2 packages with tros.b.",
      keywords: ["ROS2", "package"],
    },
  },
  {
    path: "/Quick_start/changelog",
    zh: {
      title: "版本发布记录",
      parent: "5.1 快速开始",
      summary: "按 tros-jazzy / tros-humble / tros-foxy 维护的版本变更历史。",
      keywords: ["tros-humble", "tros-foxy", "tros-jazzy"],
    },
    en: {
      title: "Release Changelog",
      parent: "5.1 Quick Start",
      summary: "Release history for tros-jazzy, tros-humble and tros-foxy.",
      keywords: ["changelog", "release"],
    },
  },
  {
    path: "/quick_demo/demo_sensor",
    zh: {
      title: "5.2 快速示例",
      parent: null,
      summary: "传感器采集、可视化、编解码、CV 加速、通信、推理、TTS 等快速体验示例。",
      keywords: ["快速示例", "传感器", "推理"],
    },
    en: {
      title: "5.2 Quick Demos",
      parent: null,
      summary: "Quick demos for sensors, rendering, codec, CV, communication and inference.",
      keywords: ["quick demo", "sensor", "inference"],
    },
  },
  {
    path: "/quick_demo/demo_sensor",
    zh: {
      title: "数据采集",
      parent: "5.2 快速示例",
      summary:
        "USB/MIPI/双目/RGBD/RealSense/Orbbec/ZED 等相机采集链路总览与配置。",
      keywords: ["数据采集", "USB", "MIPI", "双目", "RGBD", "RealSense", "ZED", "Orbbec"],
    },
    en: {
      title: "Sensor Data Collection",
      parent: "5.2 Quick Demos",
      summary: "Camera capture for USB, MIPI, stereo, RGBD, RealSense, Orbbec and ZED.",
      keywords: ["sensor", "USB", "MIPI", "RGBD", "RealSense"],
    },
  },
  {
    path: "/quick_demo/demo_render",
    zh: {
      title: "数据展示",
      parent: "5.2 快速示例",
      summary: "Web、HDMI、RViz2、RQt、Foxglove 等可视化展示方案。",
      keywords: ["可视化", "RViz2", "Foxglove", "HDMI", "Web"],
    },
    en: {
      title: "Data Visualization",
      parent: "5.2 Quick Demos",
      summary: "Visualization via Web, HDMI, RViz2, RQt and Foxglove.",
      keywords: ["visualization", "RViz2", "Foxglove"],
    },
  },
  {
    path: "/quick_demo/hobot_codec",
    zh: {
      title: "图像编解码",
      parent: "5.2 快速示例",
      summary: "hobot_codec 图像编解码示例：功能介绍、平台支持、准备、使用方式与注意事项。",
      keywords: ["编解码", "hobot_codec", "解码"],
    },
    en: {
      title: "Image Codec",
      parent: "5.2 Quick Demos",
      summary: "hobot_codec encode/decode sample with setup and usage notes.",
      keywords: ["codec", "hobot_codec", "encode", "decode"],
    },
  },
  {
    path: "/quick_demo/demo_cv",
    zh: {
      title: "图像处理加速",
      parent: "5.2 快速示例",
      summary: "高斯/均值滤波、crop/resize/rotate/pyramid/color 等 CV 算子加速示例。",
      keywords: ["图像处理", "滤波", "resize", "pyramid"],
    },
    en: {
      title: "CV Acceleration",
      parent: "5.2 Quick Demos",
      summary: "Accelerated CV ops: filter, crop, resize, rotate, pyramid and color.",
      keywords: [],
    },
  },
  {
    path: "/quick_demo/demo_communication",
    zh: {
      title: "数据通信",
      parent: "5.2 快速示例",
      summary: "数据通信示例，重点演示零拷贝（zero-copy）通信机制。",
      keywords: ["通信", "zero-copy", "零拷贝"],
    },
    en: {
      title: "Data Communication",
      parent: "5.2 Quick Demos",
      summary: "Communication demo focusing on zero-copy mechanism.",
      keywords: ["communication", "zero-copy"],
    },
  },
  {
    path: "/quick_demo/ai_predict",
    zh: {
      title: "模型推理快速上手",
      parent: "5.2 快速示例",
      summary: "模型推理快速上手：准备、运行、结果分析与多算法推理入口。",
      keywords: ["模型推理", "多算法推理"],
    },
    en: {
      title: "Quick AI Inference",
      parent: "5.2 Quick Demos",
      summary: "Quick start for model inference: prep, run, analysis and multi-algorithm entry.",
      keywords: ["inference"],
    },
  },
  {
    path: "/quick_demo/demo_tool",
    zh: {
      title: "工具类示例",
      parent: "5.2 快速示例",
      summary: "图像发布工具与 Trigger 记录工具等实用工具示例。",
      keywords: ["工具", "图像发布", "Trigger"],
    },
    en: {
      title: "Tool Demos",
      parent: "5.2 Quick Demos",
      summary: "Utility tools including image publisher and trigger recorder.",
      keywords: ["tool", "trigger"],
    },
  },
  {
    path: "/quick_demo/hobot_tts",
    zh: {
      title: "文本转语音",
      parent: "5.2 快速示例",
      summary: "hobot_tts 文本转语音示例：模型准备、推理执行与注意事项。",
      keywords: ["TTS", "hobot_tts"],
    },
    en: {
      title: "Text to Speech",
      parent: "5.2 Quick Demos",
      summary: "hobot_tts text-to-speech sample with model prep and inference.",
      keywords: ["TTS", "text to speech"],
    },
  },
  {
    path: "/boxs/detection/yolo",
    zh: {
      title: "5.3 Boxs 算法仓库",
      parent: null,
      summary: "语音、人体/手势、检测、分割、空间感知、驾驶感知、大模型等算法 Box 示例集合。",
      keywords: ["Boxs", "算法仓库"],
    },
    en: {
      title: "5.3 Boxs Algorithm Repository",
      parent: null,
      summary: "Algorithm boxes for audio, body, detection, segmentation, spatial, driver and LLM.",
      keywords: ["Boxs", "algorithm"],
    },
  },
  {
    path: "/boxs/audio/hobot_audio",
    zh: {
      title: "智能语音 hobot_audio",
      parent: "5.3 Boxs 算法仓库",
      summary: "智能语音能力示例：语音前后处理、推理链路、结果分析。",
      keywords: ["语音", "hobot_audio"],
    },
    en: {
      title: "hobot_audio",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "Smart audio pipeline: preprocessing, inference and result analysis.",
      keywords: ["audio", "hobot_audio"],
    },
  },
  {
    path: "/boxs/audio/sensevoice_ros2",
    zh: {
      title: "SenseVoice 语音识别",
      parent: "5.3 Boxs 算法仓库",
      summary: "SenseVoice 语音识别/理解相关 ROS2 示例。",
      keywords: ["SenseVoice", "语音识别", "ROS2"],
    },
    en: {
      title: "SenseVoice ROS2",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "SenseVoice speech recognition and understanding ROS2 sample.",
      keywords: ["SenseVoice", "speech"],
    },
  },
  {
    path: "/boxs/body/mono2d_body_detection",
    zh: {
      title: "人体检测与跟踪",
      parent: "5.3 Boxs 算法仓库",
      summary: "mono2d_body_detection 人体检测与跟踪基础示例。",
      keywords: ["人体检测", "跟踪"],
    },
    en: {
      title: "Body Detection & Tracking",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "mono2d_body_detection basic body detection and tracking.",
      keywords: ["body detection", "tracking"],
    },
  },
  {
    path: "/boxs/body/mono2d_yolo_pose",
    zh: {
      title: "YOLO Pose 人体关键点",
      parent: "5.3 Boxs 算法仓库",
      summary: "基于 YOLO Pose 的人体关键点检测与跟踪。",
      keywords: ["YOLO Pose", "关键点"],
    },
    en: {
      title: "YOLO Pose",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "YOLO Pose based human keypoint detection and tracking.",
      keywords: ["YOLO Pose", "keypoint"],
    },
  },
  {
    path: "/boxs/body/hand_lmk_detection",
    zh: {
      title: "手部关键点检测",
      parent: "5.3 Boxs 算法仓库",
      summary: "手部关键点检测算法示例。",
      keywords: ["手部关键点"],
    },
    en: {
      title: "Hand Landmark Detection",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "Hand landmark detection sample.",
      keywords: ["hand landmark"],
    },
  },
  {
    path: "/boxs/body/hand_gesture_detection",
    zh: {
      title: "手势识别",
      parent: "5.3 Boxs 算法仓库",
      summary: "手势识别算法示例。",
      keywords: ["手势识别"],
    },
    en: {
      title: "Hand Gesture Detection",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "Hand gesture recognition sample.",
      keywords: ["gesture", "hand"],
    },
  },
  {
    path: "/boxs/body/hand_lmk_gesture_mediapipe",
    zh: {
      title: "MediaPipe 手部关键点+手势",
      parent: "5.3 Boxs 算法仓库",
      summary: "基于 mediapipe 的手部关键点与手势识别。",
      keywords: ["mediapipe", "手势", "手部"],
    },
    en: {
      title: "MediaPipe Hand Gesture",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "MediaPipe based hand landmark and gesture recognition.",
      keywords: ["mediapipe", "gesture"],
    },
  },
  {
    path: "/boxs/body/mono_face_age_detection",
    zh: {
      title: "人脸年龄估计",
      parent: "5.3 Boxs 算法仓库",
      summary: "人脸年龄估计示例。",
      keywords: ["人脸", "年龄估计"],
    },
    en: {
      title: "Face Age Estimation",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "Face age estimation sample.",
      keywords: ["face", "age"],
    },
  },
  {
    path: "/boxs/body/mono_face_landmarks_detection",
    zh: {
      title: "人脸 106 关键点",
      parent: "5.3 Boxs 算法仓库",
      summary: "人脸 106 关键点检测示例。",
      keywords: [],
    },
    en: {
      title: "Face 106 Landmarks",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "Face 106 landmark detection sample.",
      keywords: [],
    },
  },
  {
    path: "/boxs/body/reid",
    zh: {
      title: "人体 ReID 跟踪",
      parent: "5.3 Boxs 算法仓库",
      summary: "人体实例跟踪/ReID 场景示例。",
      keywords: ["ReID"],
    },
    en: {
      title: "Human ReID",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "Human instance tracking and ReID sample.",
      keywords: ["ReID", "tracking"],
    },
  },
  {
    path: "/boxs/body/mono_edgetam",
    zh: {
      title: "EdgeTAM 跟踪分割",
      parent: "5.3 Boxs 算法仓库",
      summary: "EdgeTAM 目标跟踪分割，支持框/点等提示输入的进阶用法。",
      keywords: ["EdgeTAM", "分割", "跟踪"],
    },
    en: {
      title: "EdgeTAM Tracking Segmentation",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "EdgeTAM tracking segmentation with box/point prompts.",
      keywords: ["EdgeTAM", "segmentation"],
    },
  },
  {
    path: "/boxs/classification/mobilenetv2",
    zh: {
      title: "MobileNetV2 分类",
      parent: "5.3 Boxs 算法仓库",
      summary: "MobileNetV2 图像分类示例。",
      keywords: ["MobileNetV2", "分类"],
    },
    en: {
      title: "MobileNetV2 Classification",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "MobileNetV2 image classification sample.",
      keywords: ["MobileNetV2", "classification"],
    },
  },
  {
    path: "/boxs/detection/yolo",
    zh: {
      title: "YOLO 目标检测",
      parent: "5.3 Boxs 算法仓库",
      summary: "YOLO 目标检测基础示例。",
      keywords: ["YOLO", "目标检测"],
    },
    en: {
      title: "YOLO Detection",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "YOLO object detection basic sample.",
      keywords: ["YOLO", "detection"],
    },
  },
  {
    path: "/boxs/detection/mobilenet",
    zh: {
      title: "MobileNet SSD 检测",
      parent: "5.3 Boxs 算法仓库",
      summary: "MobileNet SSD 检测示例。",
      keywords: ["MobileNet", "SSD", "检测"],
    },
    en: {
      title: "MobileNet SSD",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "MobileNet SSD detection sample.",
      keywords: ["MobileNet", "SSD"],
    },
  },
  {
    path: "/boxs/detection/fcos",
    zh: {
      title: "FCOS 检测",
      parent: "5.3 Boxs 算法仓库",
      summary: "FCOS 检测示例。",
      keywords: ["FCOS", "检测"],
    },
    en: {
      title: "FCOS Detection",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "FCOS detection sample.",
      keywords: ["FCOS"],
    },
  },
  {
    path: "/boxs/detection/efficientnet",
    zh: {
      title: "EfficientNet_Det 检测",
      parent: "5.3 Boxs 算法仓库",
      summary: "EfficientNet_Det 检测示例。",
      keywords: ["EfficientNet", "检测"],
    },
    en: {
      title: "EfficientNet Detection",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "EfficientNet_Det detection sample.",
      keywords: ["EfficientNet"],
    },
  },
  {
    path: "/boxs/detection/hobot_dosod",
    zh: {
      title: "DOSOD 检测",
      parent: "5.3 Boxs 算法仓库",
      summary: "DOSOD 检测示例（含进阶使用）。",
      keywords: ["DOSOD", "检测"],
    },
    en: {
      title: "DOSOD Detection",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "DOSOD detection sample with advanced usage.",
      keywords: ["DOSOD"],
    },
  },
  {
    path: "/boxs/detection/hobot_yolo_world",
    zh: {
      title: "YOLO-World 开放词汇检测",
      parent: "5.3 Boxs 算法仓库",
      summary: "YOLO-World 开放词汇检测示例（含词汇扩展）。",
      keywords: ["YOLO-World", "开放词汇"],
    },
    en: {
      title: "YOLO-World Detection",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "YOLO-World open-vocabulary detection with vocabulary extension.",
      keywords: ["YOLO-World"],
    },
  },
  {
    path: "/boxs/driver/hobot_centerpoint",
    zh: {
      title: "CenterPoint 激光雷达 3D 检测",
      parent: "5.3 Boxs 算法仓库",
      summary: "激光雷达 3D 目标检测（CenterPoint）示例。",
      keywords: ["CenterPoint", "激光雷达"],
    },
    en: {
      title: "CenterPoint LiDAR 3D",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "LiDAR 3D object detection with CenterPoint.",
      keywords: ["CenterPoint", "lidar"],
    },
  },
  {
    path: "/boxs/driver/hobot_bev",
    zh: {
      title: "BEV 感知",
      parent: "5.3 Boxs 算法仓库",
      summary: "BEV 感知示例。",
      keywords: ["BEV"],
    },
    en: {
      title: "BEV Perception",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "Bird's-eye-view perception sample.",
      keywords: ["BEV"],
    },
  },
  {
    path: "/boxs/driver/parking_perception",
    zh: {
      title: "路面结构化/车位感知",
      parent: "5.3 Boxs 算法仓库",
      summary: "路面结构化与车位相关感知示例。",
      keywords: ["车位", "结构化"],
    },
    en: {
      title: "Parking Perception",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "Road structure and parking slot perception sample.",
      keywords: ["parking", "perception"],
    },
  },
  {
    path: "/boxs/function/mono_pwcnet",
    zh: {
      title: "光流估计",
      parent: "5.3 Boxs 算法仓库",
      summary: "mono_pwcnet 光流估计示例。",
      keywords: ["光流", "PWCNet"],
    },
    en: {
      title: "Optical Flow (PWCNet)",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "mono_pwcnet optical flow estimation sample.",
      keywords: ["optical flow", "PWCNet"],
    },
  },
  {
    path: "/boxs/function/hobot_clip",
    zh: {
      title: "CLIP 图文检索",
      parent: "5.3 Boxs 算法仓库",
      summary: "CLIP 图文特征检索示例。",
      keywords: ["CLIP", "图文检索"],
    },
    en: {
      title: "CLIP Retrieval",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "CLIP image-text feature retrieval sample.",
      keywords: ["CLIP"],
    },
  },
  {
    path: "/boxs/generate/hobot_llm",
    zh: {
      title: "Bloom 大语言模型",
      parent: "5.3 Boxs 算法仓库",
      summary: "Bloom 大语言模型接入示例。",
      keywords: ["Bloom"],
    },
    en: {
      title: "Bloom LLM",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "Bloom large language model integration sample.",
      keywords: ["LLM", "Bloom"],
    },
  },
  {
    path: "/boxs/generate/hobot_xlm",
    zh: {
      title: "DeepSeek 大语言模型",
      parent: "5.3 Boxs 算法仓库",
      summary: "DeepSeek 大语言模型接入示例。",
      keywords: ["DeepSeek"],
    },
    en: {
      title: "DeepSeek LLM",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "DeepSeek large language model integration sample.",
      keywords: ["DeepSeek", "LLM"],
    },
  },
  {
    path: "/boxs/generate/hobot_llamacpp",
    zh: {
      title: "视觉语言模型（llama.cpp）",
      parent: "5.3 Boxs 算法仓库",
      summary: "视觉语言模型 llama.cpp 路线示例。",
      keywords: ["llama.cpp", "视觉语言"],
    },
    en: {
      title: "VLM (llama.cpp)",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "Vision-language model via llama.cpp.",
      keywords: ["VLM", "llama.cpp"],
    },
  },
  {
    path: "/boxs/segmentation/mobilenet_unet",
    zh: {
      title: "UNet 分割",
      parent: "5.3 Boxs 算法仓库",
      summary: "MobileNet UNet 分割示例。",
      keywords: ["UNet", "分割"],
    },
    en: {
      title: "UNet Segmentation",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "MobileNet UNet segmentation sample.",
      keywords: ["UNet", "segmentation"],
    },
  },
  {
    path: "/boxs/segmentation/yolov8_seg",
    zh: {
      title: "YOLOv8-Seg 分割",
      parent: "5.3 Boxs 算法仓库",
      summary: "YOLOv8-Seg 实例分割示例。",
      keywords: ["YOLOv8", "分割"],
    },
    en: {
      title: "YOLOv8-Seg",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "YOLOv8-Seg instance segmentation sample.",
      keywords: ["YOLOv8", "segmentation"],
    },
  },
  {
    path: "/boxs/segmentation/mono_edgesam",
    zh: {
      title: "EdgeSAM 分割一切",
      parent: "5.3 Boxs 算法仓库",
      summary: "EdgeSAM 分割一切示例（含进阶）。",
      keywords: ["EdgeSAM", "SAM", "分割"],
    },
    en: {
      title: "EdgeSAM",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "EdgeSAM segment-anything sample with advanced usage.",
      keywords: ["EdgeSAM", "SAM"],
    },
  },
  {
    path: "/boxs/segmentation/mono_mobilesam",
    zh: {
      title: "MobileSAM 分割一切",
      parent: "5.3 Boxs 算法仓库",
      summary: "MobileSAM 分割一切示例（含进阶）。",
      keywords: ["MobileSAM", "SAM"],
    },
    en: {
      title: "MobileSAM",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "MobileSAM segment-anything sample.",
      keywords: ["MobileSAM"],
    },
  },
  {
    path: "/boxs/spatial/hobot_vio",
    zh: {
      title: "视觉惯性里程计 VIO",
      parent: "5.3 Boxs 算法仓库",
      summary: "hobot_vio 视觉惯性里程计示例。",
      keywords: ["VIO", "里程计"],
    },
    en: {
      title: "VIO",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "hobot_vio visual-inertial odometry sample.",
      keywords: ["VIO", "odometry"],
    },
  },
  {
    path: "/boxs/spatial/mono3d_indoor_detection",
    zh: {
      title: "单目 3D 室内检测",
      parent: "5.3 Boxs 算法仓库",
      summary: "单目 3D 室内检测示例。",
      keywords: ["室内检测"],
    },
    en: {
      title: "Mono3D Indoor Detection",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "Monocular 3D indoor detection sample.",
      keywords: ["mono3d", "indoor"],
    },
  },
  {
    path: "/boxs/spatial/elevation_net",
    zh: {
      title: "单目高程网络",
      parent: "5.3 Boxs 算法仓库",
      summary: "单目高程网络检测示例。",
      keywords: ["高程"],
    },
    en: {
      title: "Elevation Net",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "Monocular elevation network detection sample.",
      keywords: ["elevation"],
    },
  },
  {
    path: "/boxs/spatial/dstereo_occupancy",
    zh: {
      title: "双目 OCC 占用网络",
      parent: "5.3 Boxs 算法仓库",
      summary: "双目 OCC 占用网络示例。",
      keywords: ["OCC", "占用网络", "双目"],
    },
    en: {
      title: "Stereo Occupancy",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "Stereo occupancy network sample.",
      keywords: ["occupancy", "stereo"],
    },
  },
  {
    path: "/boxs/spatial/hobot_stereonet",
    zh: {
      title: "双目深度 Stereonet",
      parent: "5.3 Boxs 算法仓库",
      summary: "hobot_stereonet 双目深度：模型、启动、话题、参数与数据保存。",
      keywords: ["双目深度", "Stereonet"],
    },
    en: {
      title: "StereoNet Depth",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "hobot_stereonet stereo depth: models, launch, topics and parameters.",
      keywords: ["stereo depth", "Stereonet"],
    },
  },
  {
    path: "/boxs/spatial/stereo_imu_cam",
    zh: {
      title: "双目 IMU 相机 / OpenVINS",
      parent: "5.3 Boxs 算法仓库",
      summary: "双目 IMU 相机与 OpenVINS 相关流程示例。",
      keywords: ["OpenVINS", "相机"],
    },
    en: {
      title: "Stereo IMU Camera",
      parent: "5.3 Boxs Algorithm Repository",
      summary: "Stereo IMU camera and OpenVINS workflow sample.",
      keywords: ["OpenVINS", "stereo IMU"],
    },
  },
  {
    path: "/apps/slam",
    zh: {
      title: "5.4 Apps 应用示例",
      parent: null,
      summary: "SLAM、导航、跌倒检测、小车跟随/手势/语音控制、智能盒子等完整应用方案。",
      keywords: ["Apps", "SLAM", "小车", "应用"],
    },
    en: {
      title: "5.4 Apps Examples",
      parent: null,
      summary: "Full apps: SLAM, navigation, fall detection, car control, smart box, etc.",
      keywords: ["Apps", "SLAM", "navigation"],
    },
  },
  {
    path: "/apps/slam",
    zh: {
      title: "SLAM 建图",
      parent: "5.4 Apps 应用示例",
      summary: "SLAM 建图应用：建图流程、运行方式、结果分析。",
      keywords: ["SLAM", "建图"],
    },
    en: {
      title: "SLAM Mapping",
      parent: "5.4 Apps Examples",
      summary: "SLAM mapping workflow, execution and result analysis.",
      keywords: ["SLAM"],
    },
  },
  {
    path: "/apps/navigation2",
    zh: {
      title: "Navigation2 导航",
      parent: "5.4 Apps 应用示例",
      summary: "Navigation2 导航应用示例。",
      keywords: ["Navigation2", "导航"],
    },
    en: {
      title: "Navigation2",
      parent: "5.4 Apps Examples",
      summary: "Navigation2 navigation application sample.",
      keywords: ["Navigation2"],
    },
  },
  {
    path: "/apps/fall_detection",
    zh: {
      title: "跌倒检测",
      parent: "5.4 Apps 应用示例",
      summary: "姿态/跌倒检测应用。",
      keywords: ["跌倒检测", "姿态"],
    },
    en: {
      title: "Fall Detection",
      parent: "5.4 Apps Examples",
      summary: "Pose and fall detection application.",
      keywords: ["fall detection"],
    },
  },
  {
    path: "/apps/car_tracking",
    zh: {
      title: "小车人体跟随",
      parent: "5.4 Apps 应用示例",
      summary: "小车人体跟随应用。",
      keywords: ["小车", "人体跟随"],
    },
    en: {
      title: "Car Body Tracking",
      parent: "5.4 Apps Examples",
      summary: "Car following human body application.",
      keywords: ["follow"],
    },
  },
  {
    path: "/apps/car_gesture_control",
    zh: {
      title: "小车手势控制",
      parent: "5.4 Apps 应用示例",
      summary: "小车手势控制应用。",
      keywords: ["手势控制", "小车"],
    },
    en: {
      title: "Car Gesture Control",
      parent: "5.4 Apps Examples",
      summary: "Car control via hand gestures.",
      keywords: ["gesture control", "car"],
    },
  },
  {
    path: "/apps/car_audio_control",
    zh: {
      title: "语音控制小车",
      parent: "5.4 Apps 应用示例",
      summary: "语音控制小车运动应用。",
      keywords: ["语音控制", "小车"],
    },
    en: {
      title: "Car Voice Control",
      parent: "5.4 Apps Examples",
      summary: "Voice-controlled car motion application.",
      keywords: ["voice control", "car"],
    },
  },
  {
    path: "/apps/car_audio_tracking",
    zh: {
      title: "语音追踪控制小车",
      parent: "5.4 Apps 应用示例",
      summary: "语音追踪控制小车运动应用。",
      keywords: ["语音追踪", "小车"],
    },
    en: {
      title: "Car Voice Tracking",
      parent: "5.4 Apps Examples",
      summary: "Voice tracking to control car motion.",
      keywords: ["voice tracking"],
    },
  },
  {
    path: "/apps/parking_search",
    zh: {
      title: "小车车位寻找",
      parent: "5.4 Apps 应用示例",
      summary: "小车车位寻找应用。",
      keywords: ["车位", "小车"],
    },
    en: {
      title: "Parking Search",
      parent: "5.4 Apps Examples",
      summary: "Car parking slot search application.",
      keywords: ["parking"],
    },
  },
  {
    path: "/apps/video_boxs",
    zh: {
      title: "智能盒子",
      parent: "5.4 Apps 应用示例",
      summary: "智能盒子应用（含不同域配置与启动）。",
      keywords: ["智能盒子"],
    },
    en: {
      title: "Smart Video Box",
      parent: "5.4 Apps Examples",
      summary: "Smart box application with domain config and launch.",
      keywords: [],
    },
  },
  {
    path: "/apps/hobot_llamacpp",
    zh: {
      title: "视觉语音盒子",
      parent: "5.4 Apps 应用示例",
      summary: "视觉语音盒子应用（多输入源与进阶功能）。",
      keywords: ["视觉语音", "盒子"],
    },
    en: {
      title: "Vision-Voice Box",
      parent: "5.4 Apps Examples",
      summary: "Vision-voice box app with multi-input and advanced features.",
      keywords: [],
    },
  },
  {
    path: "/tros_dev/zero_copy",
    zh: {
      title: "5.5 tros 开发进阶",
      parent: null,
      summary: "zero-copy 开发、模型推理工程化、Breakpad、火焰图、垃圾检测等进阶主题。",
      keywords: ["开发进阶", "zero-copy"],
    },
    en: {
      title: "5.5 Advanced tros Development",
      parent: null,
      summary: "Advanced topics: zero-copy dev, inference workflow, Breakpad, flame graph.",
      keywords: ["advanced", "zero-copy"],
    },
  },
  {
    path: "/tros_dev/zero_copy",
    zh: {
      title: "zero-copy 开发实践",
      parent: "5.5 tros 开发进阶",
      summary: "zero-copy 机制开发实践：背景、任务、总结与限制。",
      keywords: ["zero-copy", "开发"],
    },
    en: {
      title: "zero-copy Development",
      parent: "5.5 Advanced tros Development",
      summary: "zero-copy development practice: background, tasks, limits.",
      keywords: ["zero-copy"],
    },
  },
  {
    path: "/tros_dev/ai_predict",
    zh: {
      title: "模型推理（开发版）",
      parent: "5.5 tros 开发进阶",
      summary: "模型推理开发版，较 quick_demo 更偏工程化，含 workflow 构建。",
      keywords: ["模型推理", "workflow", "开发"],
    },
    en: {
      title: "AI Inference (Dev)",
      parent: "5.5 Advanced tros Development",
      summary: "Engineering-oriented inference guide with workflow building.",
      keywords: ["inference", "workflow"],
    },
  },
  {
    path: "/tros_dev/breakpad",
    zh: {
      title: "Breakpad 崩溃诊断",
      parent: "5.5 tros 开发进阶",
      summary: "Breakpad 崩溃捕获与诊断使用。",
      keywords: ["Breakpad", "崩溃", "诊断"],
    },
    en: {
      title: "Breakpad Crash Diagnostics",
      parent: "5.5 Advanced tros Development",
      summary: "Breakpad crash capture and diagnostics.",
      keywords: ["Breakpad", "crash"],
    },
  },
  {
    path: "/tros_dev/flame_graph",
    zh: {
      title: "性能火焰图",
      parent: "5.5 tros 开发进阶",
      summary: "性能火焰图分析流程。",
      keywords: ["火焰图"],
    },
    en: {
      title: "Flame Graph Profiling",
      parent: "5.5 Advanced tros Development",
      summary: "Performance flame graph analysis workflow.",
      keywords: ["flame graph", "profiling"],
    },
  },
  {
    path: "/tros_dev/mono2d_trash_detection",
    zh: {
      title: "垃圾检测开发示例",
      parent: "5.5 tros 开发进阶",
      summary: "垃圾检测开发示例：功能、算法、配置、结果分析。",
      keywords: ["垃圾检测"],
    },
    en: {
      title: "Trash Detection (Dev)",
      parent: "5.5 Advanced tros Development",
      summary: "Trash detection development sample with config and analysis.",
      keywords: ["trash detection"],
    },
  },
];
