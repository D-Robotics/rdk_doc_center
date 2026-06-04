/**
 * 算法工具链（Open Explorer / OE）手册章节搜索索引。
 * path 与 toolchain.d-robotics.cc 站点 slug 对齐（见 doc_introduction 导读表）。
 */
export const OE_CHAPTERS = [
  {
    path: "/guide/doc_introduction.html",
    zh: {
      title: "OE 文档脉络",
      parent: null,
      summary:
        "整体文档章节简介、内容跳转与推荐阅读顺序；适用于 S100、S100P、S600 平台开发者。",
      keywords: ["OE", "文档脉络", "阅读顺序"],
    },
    en: {
      title: "OE Documentation Overview",
      parent: null,
      summary:
        "Chapter summaries, navigation links and recommended reading order for the toolchain manual.",
      keywords: ["OE", "overview", "reading order"],
    },
  },
  {
    path: "/guide/preface/learn_oe.html",
    zh: {
      title: "认识 Open Explorer",
      parent: "产品简介",
      summary: "Open Explorer 介绍及 OE 包发布物（samples、model_zoo、ucp_tutorial 等）说明。",
      keywords: ["Open Explorer", "发布物", "samples", "model_zoo"],
    },
    en: {
      title: "Learn Open Explorer",
      parent: "Product Introduction",
      summary: "Introduction to Open Explorer and OE package deliverables.",
      keywords: ["Open Explorer", "OE package"],
    },
  },
  {
    path: "/guide/preface/toolchain_overview.html",
    zh: {
      title: "工具链概览",
      parent: "产品简介",
      summary: "算法工具链组成、PTQ/QAT 双通路及整体使用流程简介。",
      keywords: ["工具链概览", "PTQ", "QAT", "使用流程"],
    },
    en: {
      title: "Toolchain Overview",
      parent: "Product Introduction",
      summary: "Toolchain composition, PTQ/QAT paths and overall workflow.",
      keywords: ["toolchain", "overview", "PTQ", "QAT"],
    },
  },
  {
    path: "/guide/key_concept.html",
    zh: {
      title: "关键概念",
      parent: "产品简介",
      summary: "浮点模型、HBM、模型转换、march、BPU 架构与 S100/S100P/S600 对应关系等背景知识。",
      keywords: ["关键概念", "HBM", "march", "BPU"],
    },
    en: {
      title: "Key Concepts",
      parent: "Product Introduction",
      summary: "Float model, HBM, conversion, march and BPU architecture mapping.",
      keywords: ["key concepts", "HBM", "march", "BPU"],
    },
  },
  {
    path: "/guide/env_install.html",
    zh: {
      title: "环境部署",
      parent: null,
      summary:
        "开发机 PTQ/QAT 环境依赖、Docker 与本地安装，以及板端运行环境与补充工具部署。",
      keywords: ["环境部署", "Docker", "板端", "运行环境"],
    },
    en: {
      title: "Environment Deployment",
      parent: null,
      summary:
        "Host PTQ/QAT dependencies, Docker setup, and board-side runtime deployment.",
      keywords: ["environment", "Docker", "deployment", "runtime"],
    },
  },
  {
    path: "/guide/faststart/ptq_qat_overview.html",
    zh: {
      title: "PTQ、QAT 简介",
      parent: "快速入门",
      summary: "训练后量化（PTQ）与量化感知训练（QAT）的原理差异与选型建议。",
      keywords: ["PTQ", "QAT", "简介", "量化"],
    },
    en: {
      title: "PTQ and QAT Overview",
      parent: "Quick Start",
      summary: "Differences between post-training quantization and QAT.",
      keywords: ["PTQ", "QAT", "overview"],
    },
  },
  {
    path: "/guide/faststart/ptq_quickstart.html",
    zh: {
      title: "算法模型 PTQ 量化+上板 快速上手",
      parent: "快速入门",
      summary:
        "PTQ 方案从浮点模型到量化编译、上板推理的快速入门示例与基本流程。",
      keywords: ["PTQ", "快速上手", "上板"],
    },
    en: {
      title: "PTQ Quantization and On-board Quick Start",
      parent: "Quick Start",
      summary: "Quick start for PTQ model conversion and board deployment.",
      keywords: ["PTQ", "quick start", "on-board"],
    },
  },
  {
    path: "/guide/faststart/qat_quickstart.html",
    zh: {
      title: "算法模型 QAT 量化+部署 快速上手",
      parent: "快速入门",
      summary: "QAT 从模型改造、校准/训练到导出 HBIR、转定点与部署的快速流程。",
      keywords: ["QAT", "快速上手", "部署"],
    },
    en: {
      title: "QAT Quantization and Deployment Quick Start",
      parent: "Quick Start",
      summary: "Quick start for QAT training through export and deployment.",
      keywords: ["QAT", "quick start", "deployment"],
    },
  },
  {
    path: "/guide/ptq/ptq_workflow.html",
    zh: {
      title: "PTQ 转换原理及流程",
      parent: "训练后量化（PTQ）",
      summary:
        "浮点模型准备、模型检查、模型转换、性能评估与精度评估五阶段全流程详解。",
      keywords: ["PTQ", "转换原理", "流程", "模型检查"],
    },
    en: {
      title: "PTQ Conversion Principle and Process",
      parent: "Post-training Quantization (PTQ)",
      summary:
        "End-to-end PTQ workflow: preparation, checking, conversion, performance and accuracy evaluation.",
      keywords: ["PTQ", "workflow", "conversion"],
    },
  },
  {
    path: "/guide/ptq/ptq_tool/tool_overview.html",
    zh: {
      title: "PTQ 转换工具",
      parent: "训练后量化（PTQ）",
      summary:
        "PTQ 工具包概览：hb_compile、hb_verifier、HBRuntime、精度 debug、hb_model_info 等。",
      keywords: ["hb_compile", "hb_verifier", "HBRuntime"],
    },
    en: {
      title: "PTQ Conversion Tools",
      parent: "Post-training Quantization (PTQ)",
      summary: "Overview of PTQ toolchain utilities including hb_compile and HBRuntime.",
      keywords: ["hb_compile", "HBRuntime"],
    },
  },
  {
    path: "/guide/ptq/ptq_usage/model_prepare.html",
    zh: {
      title: "PTQ 转换步骤",
      parent: "训练后量化（PTQ）",
      summary:
        "从模型准备、验证、校准数据、量化编译到性能与精度分析、调优的 PTQ 使用指导总览。",
      keywords: ["模型准备", "校准", "量化编译"],
    },
    en: {
      title: "PTQ Conversion Steps",
      parent: "Post-training Quantization (PTQ)",
      summary: "Guidance on PTQ steps from model prep through compile and tuning.",
      keywords: ["PTQ steps"],
    },
  },
  {
    path: "/guide/ptq/ptq_usage/check_model.html",
    zh: {
      title: "模型验证",
      parent: "PTQ 转换步骤",
      summary: "使用 hb_compile 检查浮点模型算子是否满足平台约束及检查结果解读。",
      keywords: ["模型验证", "hb_compile"],
    },
    en: {
      title: "Model Checking",
      parent: "PTQ Conversion Steps",
      summary: "Verify model operators with hb_compile against platform constraints.",
      keywords: ["model check", "hb_compile", "operator"],
    },
  },
  {
    path: "/guide/ptq/ptq_usage/prepare_data.html",
    zh: {
      title: "校准数据准备",
      parent: "PTQ 转换步骤",
      summary: "模型校准集准备、预处理与 featuremap 输入数据格式要求。",
      keywords: ["校准数据", "数据准备", "预处理"],
    },
    en: {
      title: "Calibration Data Preparation",
      parent: "PTQ Conversion Steps",
      summary: "Prepare and preprocess calibration datasets for PTQ conversion.",
      keywords: ["calibration data", "preprocess"],
    },
  },
  {
    path: "/guide/ptq/ptq_usage/quantize_compile.html",
    zh: {
      title: "模型量化与编译",
      parent: "PTQ 转换步骤",
      summary:
        "模型解析、优化、校准、量化与编译各阶段产出物（onnx/bc/hbm）及输入数据处理说明。",
      keywords: ["量化", "编译", "hbm"],
    },
    en: {
      title: "Model Quantization and Compilation",
      parent: "PTQ Conversion Steps",
      summary: "PTQ optimization, calibration, quantization and compilation outputs.",
      keywords: ["quantization"],
    },
  },
  {
    path: "/guide/ptq/ptq_usage/accuracy_evaluation.html",
    zh: {
      title: "模型精度分析",
      parent: "PTQ 转换步骤",
      summary: "使用 quantized_model.bc 等在开发机上评测 PTQ 转换后模型精度。",
      keywords: ["精度分析", "quantized_model"],
    },
    en: {
      title: "Model Accuracy Analysis",
      parent: "PTQ Conversion Steps",
      summary: "Evaluate quantized model accuracy on the development host.",
      keywords: ["PTQ"],
    },
  },
  {
    path: "/guide/ptq/ptq_usage/accuracy_tune.html",
    zh: {
      title: "模型精度调优",
      parent: "PTQ 转换步骤",
      summary: "混合精度、精度 debug 工具与 quant_config 等方式降低 PTQ 量化精度损失。",
      keywords: ["精度调优", "混合精度"],
    },
    en: {
      title: "Model Accuracy Tuning",
      parent: "PTQ Conversion Steps",
      summary: "Reduce PTQ accuracy loss via mixed precision and debug tools.",
      keywords: ["accuracy tuning", "mixed precision"],
    },
  },
  {
    path: "/guide/ptq/ptq_sample/general_description.html",
    zh: {
      title: "PTQ 转换示例",
      parent: "训练后量化（PTQ）",
      summary:
        "horizon_model_convert_sample 示例包结构、00_init.sh 获取模型与数据及分类/检测/分割示例。",
      keywords: ["horizon_model_convert_sample"],
    },
    en: {
      title: "PTQ Conversion Samples",
      parent: "Post-training Quantization (PTQ)",
      summary: "horizon_model_convert_sample package layout and usage.",
      keywords: ["horizon_model_convert_sample"],
    },
  },
  {
    path: "/guide/ptq/ptq_faq_troubleshooting/ptq_faq.html",
    zh: {
      title: "训练后量化（PTQ）常见问题",
      parent: "常见问题及故障处理",
      summary: "PTQ 模型准备、转换、性能与精度相关常见问题解答。",
      keywords: ["常见问题"],
    },
    en: {
      title: "PTQ FAQ",
      parent: "FAQ and Troubleshooting",
      summary: "Frequently asked questions on PTQ model conversion.",
      keywords: ["PTQ FAQ", "troubleshooting"],
    },
  },
  {
    path: "/guide/ptq/ptq_faq_troubleshooting/troubleshooting.html",
    zh: {
      title: "常见故障处理",
      parent: "常见问题及故障处理",
      summary:
        "Segmentation fault、mean_value 配置错误、模型非法等 PTQ 转换常见故障排查建议。",
      keywords: ["故障处理", "mean_value"],
    },
    en: {
      title: "Common Failure Handling",
      parent: "FAQ and Troubleshooting",
      summary: "Troubleshooting PTQ conversion failures such as segfault and YAML errors.",
      keywords: ["failure", "troubleshooting", "PTQ"],
    },
  },
  {
    path: "/guide/ptq/ptq_appendix/normalize_introduction.html",
    zh: {
      title: "PTQ 附录 · 数据归一化",
      parent: "训练后量化（PTQ）",
      summary: "mean_value、scale_value、std_value 参数说明、计算公式与训练配置换算示例。",
      keywords: ["归一化", "mean_value", "scale_value", "附录"],
    },
    en: {
      title: "PTQ Appendix · Data Normalization",
      parent: "Post-training Quantization (PTQ)",
      summary: "Normalization parameter configuration and formula explanation.",
      keywords: ["normalization", "appendix"],
    },
  },
  {
    path: "/guide/ptq/ptq_appendix/transformer.html",
    zh: {
      title: "PTQ 附录 · Transformer",
      parent: "PTQ 附录",
      summary: "图片缩放、裁剪、归一化等 transformer 概念、参数说明与使用示例。",
      keywords: ["transformer"],
    },
    en: {
      title: "PTQ Appendix · Transformers",
      parent: "PTQ Appendix",
      summary: "Image preprocessing transformers: resize, crop, normalize, etc.",
      keywords: ["transformer", "preprocess", "image"],
    },
  },
  {
    path: "/guide/plugin/introduce.html",
    zh: {
      title: "QAT 简介",
      parent: "量化感知训练（QAT）",
      summary:
        "基于 PyTorch 的 horizon_plugin_pytorch 量化感知训练工具与伪量化原理介绍。",
      keywords: ["QAT", "horizon_plugin_pytorch", "伪量化", "简介"],
    },
    en: {
      title: "QAT Introduction",
      parent: "Quantization-Aware Training (QAT)",
      summary: "Introduction to horizon_plugin_pytorch QAT toolkit.",
      keywords: ["QAT", "horizon_plugin_pytorch"],
    },
  },
  {
    path: "/guide/plugin/terminology.html",
    zh: {
      title: "术语约定",
      parent: "量化感知训练（QAT）",
      summary: "浮点模型、Calibration、QAT 模型、伪量化、HBIR、march 等术语定义。",
      keywords: ["术语", "Calibration", "伪量化", "HBIR"],
    },
    en: {
      title: "Terminology",
      parent: "Quantization-Aware Training (QAT)",
      summary: "Glossary for QAT: calibration, fake quant, HBIR, march, etc.",
      keywords: ["terminology", "QAT", "HBIR"],
    },
  },
  {
    path: "/guide/plugin/installation.html",
    zh: {
      title: "环境依赖",
      parent: "量化感知训练（QAT）",
      summary: "QAT 训练环境要求：Ubuntu 22.04、Python 3.10、CUDA 12.6、PyTorch 2.6 等。",
      keywords: ["环境依赖", "CUDA", "PyTorch", "Ubuntu"],
    },
    en: {
      title: "Environment Dependencies",
      parent: "Quantization-Aware Training (QAT)",
      summary: "QAT environment: Ubuntu, Python, CUDA and PyTorch versions.",
      keywords: ["environment", "CUDA", "PyTorch"],
    },
  },
  {
    path: "/guide/plugin/qat_quickstart/qat_quickstart.html",
    zh: {
      title: "算法模型 QAT 量化+部署 快速上手",
      parent: "量化感知训练（QAT）",
      summary:
        "QAT 模型改造、Calibration/QAT 训练、导出 HBIR、转定点与编译部署的完整快速流程。",
      keywords: ["QAT", "快速上手", "部署"],
    },
    en: {
      title: "QAT Quantization and Deployment Quick Start",
      parent: "Quantization-Aware Training (QAT)",
      summary: "End-to-end QAT quick start from model prep to board deployment.",
      keywords: ["QAT", "quick start"],
    },
  },
  {
    path: "/guide/plugin/user_guide/float_model_requirements.html",
    zh: {
      title: "开发指南",
      parent: "量化感知训练（QAT）",
      summary:
        "QAT 浮点模型要求、prepare/qconfig、精度调优与训练部署一致性等开发指导入口。",
      keywords: ["开发指南", "浮点模型"],
    },
    en: {
      title: "Development Guide",
      parent: "Quantization-Aware Training (QAT)",
      summary: "QAT development guide entry: model requirements and workflow.",
      keywords: ["development guide", "QAT"],
    },
  },
  {
    path: "/guide/plugin/user_guide/prepare.html",
    zh: {
      title: "prepare 详解",
      parent: "开发指南",
      summary: "浮点转伪量化 prepare 流程：算子替换、融合、JIT_STRIP/EAGER 模式与模型检查。",
      keywords: ["prepare", "伪量化", "JIT_STRIP", "EAGER"],
    },
    en: {
      title: "prepare Explained",
      parent: "Development Guide",
      summary: "Prepare float models for QAT: fusion, replacement and check modes.",
      keywords: ["prepare", "QAT", "fusion"],
    },
  },
  {
    path: "/guide/plugin/user_guide/qconfig.html",
    zh: {
      title: "qconfig 配置",
      parent: "开发指南",
      summary: "量化配置 qconfig、模板与 per-layer 精度设置说明。",
      keywords: ["qconfig", "量化配置"],
    },
    en: {
      title: "qconfig Configuration",
      parent: "Development Guide",
      summary: "Quantization qconfig and template configuration.",
      keywords: ["qconfig"],
    },
  },
  {
    path: "/guide/plugin/user_guide/precision_tuning.html",
    zh: {
      title: "量化精度调优指南",
      parent: "开发指南",
      summary: "QAT 模型结构与 qconfig 检查、混合精度调优流程与实践建议。",
      keywords: ["精度调优", "混合精度", "QAT"],
    },
    en: {
      title: "Quantization Accuracy Tuning Guide",
      parent: "Development Guide",
      summary: "QAT accuracy tuning workflow and mixed-precision strategies.",
      keywords: ["accuracy tuning", "QAT"],
    },
  },
  {
    path: "/guide/plugin/advanced_tutorial/eager.html",
    zh: {
      title: "Eager 模式",
      parent: "深入探索",
      summary: "QAT Eager 模式原理、用法及与 Graph Mode 的对比。",
      keywords: ["Eager", "深入探索", "QAT"],
    },
    en: {
      title: "Eager Mode",
      parent: "Advanced Topics",
      summary: "Eager-mode QAT preparation and usage.",
      keywords: ["Eager", "QAT", "advanced"],
    },
  },
  {
    path: "/guide/plugin/advanced_tutorial/fx_quantization_explain.html",
    zh: {
      title: "FX Quantization 原理介绍",
      parent: "深入探索",
      summary: "FX 符号化 trace、自动 fuse 与 prepare 集成原理。",
      keywords: ["FX", "Quantization"],
    },
    en: {
      title: "FX Quantization Explained",
      parent: "Advanced Topics",
      summary: "FX-based graph mode quantization principles.",
      keywords: ["FX", "quantization", "graph mode"],
    },
  },
  {
    path: "/guide/plugin/advanced_tutorial/op_fusion.html",
    zh: {
      title: "算子融合",
      parent: "深入探索",
      summary: "QAT 算子融合 pattern、fuse_known_modules 与 BPU 融合说明。",
      keywords: ["算子融合", "fuse", "BPU", "pattern"],
    },
    en: {
      title: "Operator Fusion",
      parent: "Advanced Topics",
      summary: "Operator fusion patterns and APIs for QAT.",
      keywords: ["fusion", "QAT"],
    },
  },
  {
    path: "/guide/plugin/plugin_api_reference/march.html",
    zh: {
      title: "API 参考",
      parent: "量化感知训练（QAT）",
      summary: "horizon_plugin_pytorch QAT API 参考（prepare、export、qconfig 等）。",
      keywords: ["horizon_plugin_pytorch"],
    },
    en: {
      title: "API Reference",
      parent: "Quantization-Aware Training (QAT)",
      summary: "horizon_plugin_pytorch QAT API reference documentation.",
      keywords: ["API reference", "QAT", "horizon_plugin_pytorch"],
    },
  },
  {
    path: "/guide/plugin/qat_faq/faq.html",
    zh: {
      title: "QAT 常见问题",
      parent: "常见问题及常见故障",
      summary: "QAT 训练环境、量化训练、配置与导出等常见问题解答。",
      keywords: ["常见问题", "量化训练"],
    },
    en: {
      title: "QAT FAQ",
      parent: "FAQ and Common Failures",
      summary: "Frequently asked questions on QAT training and configuration.",
      keywords: ["QAT FAQ", "FAQ"],
    },
  },
  {
    path: "/guide/plugin/qat_faq/failure.html",
    zh: {
      title: "QAT 常见故障",
      parent: "常见问题及常见故障",
      summary:
        "horizon_plugin_pytorch 扩展库加载失败、CUDA 环境不匹配等常见故障处理。",
      keywords: ["常见故障", "CUDA"],
    },
    en: {
      title: "QAT Common Failures",
      parent: "FAQ and Common Failures",
      summary: "Troubleshooting QAT extension library and CUDA issues.",
      keywords: ["failure", "QAT", "CUDA", "extension"],
    },
  },
  {
    path: "/guide/tune_content/performance_tune.html",
    zh: {
      title: "模型性能调优",
      parent: "模型性能调优指导",
      summary:
        "编译参数（debug_mode、compile_mode、optimize_level）与 CPU 算子、模型分段等性能优化建议。",
      keywords: ["性能调优", "compile_mode", "optimize_level"],
    },
    en: {
      title: "Model Performance Tuning",
      parent: "Model Performance Tuning Guide",
      summary: "Compiler and model configuration tips to improve inference performance.",
      keywords: ["performance tuning", "compile"],
    },
  },
  {
    path: "/guide/tune_content/efficient_model_advice.html",
    zh: {
      title: "高效模型设计指导",
      parent: "模型性能调优指导",
      summary: "HENet 等高效模型、算子融合与访存优化、小图多 Batch 等设计建议。",
      keywords: ["高效模型", "HENet", "模型设计", "访存", "Batch"],
    },
    en: {
      title: "Efficient Model Design Guide",
      parent: "Model Performance Tuning Guide",
      summary: "Guidance on efficient model architecture and memory/compute balance.",
      keywords: ["efficient model", "design"],
    },
  },
  {
    path: "/guide/ucp/ucp_overview.html",
    zh: {
      title: "UCP 总览",
      parent: "统一计算平台（UCP）",
      summary:
        "统一计算平台（UCP）异构编程接口、直连/中继模式、backend 与 x86 仿真能力介绍。",
      keywords: ["UCP", "统一计算平台", "异构"],
    },
    en: {
      title: "UCP Overview",
      parent: "Unified Compute Platform (UCP)",
      summary: "UCP heterogeneous APIs, direct/relay modes and simulation.",
      keywords: ["UCP", "overview", "heterogeneous"],
    },
  },
  {
    path: "/guide/ucp/runtime/runtime_dev.html",
    zh: {
      title: "模型推理开发",
      parent: "统一计算平台（UCP）",
      summary:
        "板端 HBM 模型加载推理、依赖库配置、hrt_model_exec 与 AI Benchmark 等开发指导。",
      keywords: ["模型推理", "hrt_model_exec", "hbm"],
    },
    en: {
      title: "Model Inference Development",
      parent: "Unified Compute Platform (UCP)",
      summary: "Board-side model inference app development and tools.",
      keywords: ["inference"],
    },
  },
  {
    path: "/guide/ucp/ucp_api_reference/ucp_api_overview.html",
    zh: {
      title: "UCP 通用 API 概览",
      parent: "统一计算平台（UCP）",
      summary: "UCP 任务管理、内存管理、版本信息等通用 API 与数据结构。",
      keywords: ["版本"],
    },
    en: {
      title: "UCP Common API Overview",
      parent: "Unified Compute Platform (UCP)",
      summary: "UCP common APIs for tasks, memory and versioning.",
      keywords: ["memory"],
    },
  },
  {
    path: "/guide/ucp/ucp_tools/ucp_trace.html",
    zh: {
      title: "UCP 性能分析工具",
      parent: "统一计算平台（UCP）",
      summary: "UCP Trace（Perfetto/Chrome Trace）环境变量、采集与分析方法。",
      keywords: ["UCP Trace", "Perfetto", "性能分析", "trace"],
    },
    en: {
      title: "UCP Performance Analysis Tools",
      parent: "Unified Compute Platform (UCP)",
      summary: "UCP Trace usage with Perfetto and Chrome backends.",
      keywords: ["UCP trace", "Perfetto"],
    },
  },
  {
    path: "/guide/ucp/ucp_faq_errorcode/ucp_faq.html",
    zh: {
      title: "UCP 常见问题及错误码",
      parent: "统一计算平台（UCP）",
      summary: "UCP 异构编程常见问题、推理超时/挂起排查及错误码说明。",
      keywords: ["错误码"],
    },
    en: {
      title: "UCP FAQ and Error Codes",
      parent: "Unified Compute Platform (UCP)",
      summary: "UCP FAQ, inference issues and error code reference.",
      keywords: ["UCP FAQ", "error code"],
    },
  },
  {
    path: "/guide/model_deployment_guidance/model_deployment_principle_process.html",
    zh: {
      title: "模型部署原理及流程",
      parent: "模型部署实践指导",
      summary:
        "模型从浮点准备、转换编译、性能评测到板端部署的全流程原理与示例代码指引。",
      keywords: ["模型部署", "原理", "流程"],
    },
    en: {
      title: "Model Deployment Principles and Process",
      parent: "Model Deployment Guidance",
      summary: "End-to-end deployment principles from model prep to on-board run.",
      keywords: ["deployment", "principles"],
    },
  },
  {
    path: "/guide/model_deployment_guidance/model_deployment_guidance_examples/rgb_resnet18_deployment_guidance.html",
    zh: {
      title: "模型部署实践指导实例",
      parent: "模型部署实践指导",
      summary:
        "以公版 ResNet18 为例的 PTQ 全流程实践（RGB/Pyramid/多 Batch 等典型输入场景）。",
      keywords: ["ResNet18", "部署实践", "Pyramid", "RGB"],
    },
    en: {
      title: "Model Deployment Practice Examples",
      parent: "Model Deployment Guidance",
      summary: "ResNet18 PTQ deployment walkthrough for typical input scenarios.",
      keywords: ["ResNet18", "deployment", "practice", "PTQ"],
    },
  },
  {
    path: "/guide/advanced_content/hmct_api_reference/load_model.html",
    zh: {
      title: "HMCT API Reference",
      parent: "进阶内容",
      summary: "HMCT Python API：load_model、check_model、build_model 等 PTQ 模型转换接口。",
      keywords: ["HMCT", "API", "build_model", "check_model", "load_model"],
    },
    en: {
      title: "HMCT API Reference",
      parent: "Advanced Content",
      summary: "HMCT APIs for ONNX load, check and PTQ build_model.",
      keywords: ["HMCT", "API", "build_model"],
    },
  },
  {
    path: "/guide/advanced_content/hbdk_api_reference.html",
    zh: {
      title: "HBDK Tool API Reference",
      parent: "进阶内容",
      summary: "hbdk4 编译器 API：convert、compile、HBIR 模型修改与 HBM 工具接口。",
      keywords: ["HBDK", "API", "convert", "compile", "hbdk4"],
    },
    en: {
      title: "HBDK Tool API Reference",
      parent: "Advanced Content",
      summary: "HBDK compiler APIs for convert, compile and HBIR/HBM operations.",
      keywords: ["HBDK", "API", "compiler"],
    },
  },
  {
    path: "/guide/benchmark/j6ph_benchmark.html",
    zh: {
      title: "S600 模型性能 Benchmark",
      parent: "模型性能 Benchmark",
      summary: "S600 平台 AI Benchmark 模型 Latency、FPS 与多线程配置参考数据。",
      keywords: ["S600", "Benchmark", "FPS", "Latency"],
    },
    en: {
      title: "S600 Model Performance Benchmark",
      parent: "Model Performance Benchmark",
      summary: "S600 benchmark latency and FPS reference tables.",
      keywords: ["S600", "benchmark", "FPS"],
    },
  },
  {
    path: "/guide/benchmark/j6em_benchmark.html",
    zh: {
      title: "S100 模型性能 Benchmark",
      parent: "模型性能 Benchmark",
      summary: "S100/S100P 平台 Benchmark 模型性能与精度参考数据。",
      keywords: ["S100", "S100P", "Benchmark", "性能"],
    },
    en: {
      title: "S100 Model Performance Benchmark",
      parent: "Model Performance Benchmark",
      summary: "S100/S100P benchmark performance reference data.",
      keywords: ["S100", "benchmark", "performance"],
    },
  },
  {
    path: "/guide/appendix/supported_op_list.html",
    zh: {
      title: "工具链算子支持约束列表",
      parent: "附录",
      summary: "ONNX/Torch 算子 BPU/CPU 支持列表与各平台算子 BPU 约束条件。",
      keywords: ["ONNX", "BPU"],
    },
    en: {
      title: "Toolchain Operator Support Constraint List",
      parent: "Appendix",
      summary: "Operator support and BPU constraint lists per platform.",
      keywords: ["operator", "BPU"],
    },
  },
  {
    path: "/guide/appendix/supported_op_list.html",
    zh: {
      title: "HBIR Operator Definition",
      parent: "附录",
      summary: "HBIR 算子定义说明及在地平线计算平台上的使用限制。",
      keywords: ["HBIR", "算子定义", "Operator Definition"],
    },
    en: {
      title: "HBIR Operator Definition",
      parent: "Appendix",
      summary: "HBIR operator definitions and platform usage constraints.",
      keywords: ["HBIR", "operator definition"],
    },
  },
  {
    path: "/guide/appendix/dataset_link.html",
    zh: {
      title: "数据集下载",
      parent: "附录",
      summary: "示例所用 ImageNet、COCO、VOC、Cityscapes 等公开数据集下载链接与目录结构说明。",
      keywords: ["数据集", "下载", "ImageNet", "COCO", "VOC"],
    },
    en: {
      title: "Dataset Download",
      parent: "Appendix",
      summary: "Download links for datasets used in toolchain samples.",
      keywords: ["dataset", "download"],
    },
  },
  {
    path: "/guide/appendix/common_abbreviations.html",
    zh: {
      title: "常用缩略语",
      parent: "附录",
      summary: "文档中常见缩略词全称与含义对照，便于阅读工具链文档。",
      keywords: ["缩略语", "附录"],
    },
    en: {
      title: "Common Abbreviations",
      parent: "Appendix",
      summary: "Glossary of common abbreviations used in the manual.",
      keywords: ["abbreviations", "glossary"],
    },
  },
  {
    path: "/guide/appendix/community_articles/oe_package_sample.html",
    zh: {
      title: "社区优质文章",
      parent: "附录",
      summary: "OE 开发包示例介绍及算法工具链相关社区优质文章与资料索引。",
      keywords: ["社区", "优质文章"],
    },
    en: {
      title: "Community Articles",
      parent: "Appendix",
      summary: "OE package sample overview and curated community articles.",
      keywords: ["community", "articles"],
    },
  },
  {
    path: "/guide/legalnotice/license_agreement.html",
    zh: {
      title: "工具链授权使用协议",
      parent: "授权使用协议及第三方软件漏洞说明",
      summary: "工具链软件包授权范围、使用限制、免责声明与协议终止条款。",
      keywords: ["授权", "使用协议"],
    },
    en: {
      title: "Toolchain License Agreement",
      parent: "License and Third-party Notices",
      summary: "License terms, restrictions and disclaimers for the toolchain.",
      keywords: ["license", "agreement"],
    },
  },
  {
    path: "/guide/legalnotice/open_source_software_summary.html",
    zh: {
      title: "第三方软件及许可证声明",
      parent: "授权使用协议及第三方软件漏洞说明",
      summary: "工具链集成的第三方开源组件名称、许可证类型与合规说明。",
      keywords: ["第三方软件", "许可证", "开源", "合规"],
    },
    en: {
      title: "Third-Party Software and License Statement",
      parent: "License and Third-party Notices",
      summary: "Third-party components and their license statements.",
      keywords: ["third-party", "license"],
    },
  },
  {
    path: "/guide/legalnotice/trd_component.html",
    zh: {
      title: "第三方软件漏洞说明",
      parent: "授权使用协议及第三方软件漏洞说明",
      summary: "第三方软件/组件相关漏洞说明与安全披露信息。",
      keywords: ["漏洞", "第三方", "安全"],
    },
    en: {
      title: "Third-Party Software Vulnerability Notice",
      parent: "License and Third-party Notices",
      summary: "Vulnerability disclosures for third-party software components.",
      keywords: ["vulnerability", "third-party"],
    },
  },
];
