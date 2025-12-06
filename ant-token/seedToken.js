/**
 * Ant Design v5 SeedToken（完整一次性版本）
 * 新增：在注释中标注 @inherit，表示此属性会被 MapToken 或 AliasToken 继承/计算
 */

const SeedToken = {
  // =====================
  // 颜色基础（Colors）
  // =====================

  /** 主色（品牌色）@type {string} @inherit */
  colorPrimary: "#1677ff",

  /** 成功色 @type {string} @inherit */
  colorSuccess: "#52c41a",

  /** 警告色 @type {string} @inherit */
  colorWarning: "#faad14",

  /** 错误色 @type {string} @inherit */
  colorError: "#ff4d4f",

  /** 信息色 @type {string} @inherit */
  colorInfo: "#1677ff",

  /** 基础文本色 @type {string} @inherit */
  colorText: "rgba(0,0,0,0.88)",

  /** 次级文本色 @type {string} @inherit */
  colorTextSecondary: "rgba(0,0,0,0.65)",

  /** 辅助提示文本色 @type {string} @inherit */
  colorTextTertiary: "rgba(0,0,0,0.45)",

  /** 失效文本色 @type {string} @inherit */
  colorTextQuaternary: "rgba(0,0,0,0.25)",

  /** 背景色（默认）@type {string} @inherit */
  colorBgBase: "#ffffff",

  /** 组件容器背景色 @type {string} @inherit */
  colorBgContainer: "#ffffff",

  /** 页面背景色（Layout）@type {string} @inherit */
  colorBgLayout: "#f5f5f5",

  /** 遮罩背景色（如 Modal）@type {string} @inherit */
  colorBgMask: "rgba(0,0,0,0.45)",

  /** 边框颜色 @type {string} @inherit */
  colorBorder: "#d9d9d9",

  /** 次级边框颜色 @type {string} @inherit */
  colorBorderSecondary: "#f0f0f0",

  // =====================
  // 排版（Typography）
  // =====================

  /** 基础字体大小 @type {number} @inherit */
  fontSize: 14,

  /** 小号字体 @type {number} @inherit */
  fontSizeSM: 12,

  /** 大号字体 @type {number} @inherit */
  fontSizeLG: 16,

  /** 标题字体大小 @type {number} @inherit */
  fontSizeHeading1: 38,
  fontSizeHeading2: 30,
  fontSizeHeading3: 24,
  fontSizeHeading4: 20,
  fontSizeHeading5: 16,

  /** 行高 @type {number} @inherit */
  lineHeight: 1.5715,

  // =====================
  // 尺寸（Size）
  // =====================

  /** 控件高度 - 小 @type {number} @inherit */
  controlHeightSM: 24,

  /** 控件高度 - 默认 @type {number} @inherit */
  controlHeight: 32,

  /** 控件高度 - 大 @type {number} @inherit */
  controlHeightLG: 40,

  /** 内间距 XS @type {number} @inherit */
  paddingXS: 4,

  /** 内间距 SM @type {number} @inherit */
  paddingSM: 8,

  /** 内间距 @type {number} @inherit */
  padding: 16,

  /** 内间距 LG @type {number} @inherit */
  paddingLG: 24,

  /** 内间距 XL @type {number} @inherit */
  paddingXL: 32,

  /** 外间距 XS @type {number} @inherit */
  marginXS: 4,

  /** 外间距 SM @type {number} @inherit */
  marginSM: 8,

  /** 外间距 @type {number} @inherit */
  margin: 16,

  /** 外间距 LG @type {number} @inherit */
  marginLG: 24,

  /** 外间距 XL @type {number} @inherit */
  marginXL: 32,

  /** 控件字体大小 @type {number} @inherit */
  controlFontSize: 14,

  /** 控件字体大小（小）@type {number} @inherit */
  controlFontSizeSM: 12,

  /** 控件字体大小（大）@type {number} @inherit */
  controlFontSizeLG: 16,

  // =====================
  // 圆角（Radius）
  // =====================

  /** 默认圆角 @type {number} @inherit */
  borderRadius: 6,

  /** 小号圆角 @type {number} @inherit */
  borderRadiusSM: 4,

  /** 大号圆角 @type {number} @inherit */
  borderRadiusLG: 8,

  /** 外层圆角（更大）@type {number} @inherit */
  borderRadiusOuter: 12,

  // =====================
  // 线宽（Line Width）
  // =====================

  /** 默认线宽 @type {number} @inherit */
  lineWidth: 1,

  /** 粗线宽 @type {number} @inherit */
  lineWidthBold: 2,

  // =====================
  // 控件内部结构
  // =====================

  /** 控件水平内边距（小）@type {number} @inherit */
  controlPaddingHorizontalSM: 7,

  /** 控件水平内边距 @type {number} @inherit */
  controlPaddingHorizontal: 11,

  /** 控件水平内边距（大）@type {number} @inherit */
  controlPaddingHorizontalLG: 15,

  /** 控件垂直内边距 @type {number} @inherit */
  controlPaddingVertical: 6,

  // =====================
  // 动效（Motion）
  // =====================

  /** 动画快速度 @type {string} @inherit */
  motionDurationFast: "0.1s",

  /** 动画中速 @type {string} @inherit */
  motionDurationMid: "0.2s",

  /** 动画慢速 @type {string} @inherit */
  motionDurationSlow: "0.3s",

  /** 缓动：入出场 @type {string} @inherit */
  motionEaseInOut: "cubic-bezier(0.4, 0, 0.2, 1)",

  /** 缓动：回弹（出）@type {string} @inherit */
  motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",

  /** 缓动：回弹（入）@type {string} @inherit */
  motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",

  /** 缓动：离场 @type {string} @inherit */
  motionEaseOut: "cubic-bezier(0.22, 0, 0.36, 1)",

  // =====================
  // 其他
  // =====================

  /** 基础 ZIndex @type {number} @inherit */
  zIndexBase: 0,

  /** Popup ZIndex @type {number} @inherit */
  zIndexPopupBase: 1000,

  /** 激活背景色 @type {string} @inherit */
  colorBgActive: "#f0f0f0",
};

export default SeedToken;
