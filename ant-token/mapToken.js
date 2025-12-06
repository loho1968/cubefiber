/**
 * Ant Design v5
 * MapToken（基于 SeedToken 自动计算出的 Token）
 * 带 @inherit 标注：表示由哪个 SeedToken 派生而来
 */

const MapToken = {
  // =====================
  // 色彩体系（Colors）
  // =====================

  /** 主色 1 阶（更亮）@inherit colorPrimary */
  colorPrimaryBg: "#e6f4ff",

  /** 主色 2 阶 @inherit colorPrimary */
  colorPrimaryBgHover: "#bae0ff",

  /** 主色 hover @inherit colorPrimary */
  colorPrimaryHover: "#4096ff",

  /** 主色 active @inherit colorPrimary */
  colorPrimaryActive: "#0958d9",

  /** 主色 outlined @inherit colorPrimary */
  colorPrimaryBorder: "#91caff",

  /** 主色文本 @inherit colorPrimary */
  colorPrimaryText: "#1677ff",

  /** 成功色背景 @inherit colorSuccess */
  colorSuccessBg: "#f6ffed",

  /** 成功 hover @inherit colorSuccess */
  colorSuccessHover: "#73d13d",

  /** 警告背景 @inherit colorWarning */
  colorWarningBg: "#fffbe6",

  /** 错误背景 @inherit colorError */
  colorErrorBg: "#fff2f0",

  /** 基本文本 @inherit colorText */
  colorTextBase: "rgba(0,0,0,0.88)",

  /** 文本反色（亮面）@inherit colorBgBase */
  colorTextLightSolid: "#fff",

  /** 失效文本 hover @inherit colorTextQuaternary */
  colorTextDisabled: "rgba(0,0,0,0.25)",

  /** 分割线颜色 @inherit colorBorderSecondary */
  colorSplit: "rgba(5,5,5,0.06)",

  /** 背景 layout @inherit colorBgLayout */
  colorBgLayout: "#f5f5f5",

  /** 背景 container @inherit colorBgContainer */
  colorBgContainerDisabled: "#fafafa",

  /** 激活背景 hover @inherit colorBgActive */
  colorBgTextHover: "rgba(0,0,0,0.06)",

  /** 警告边框 @inherit colorWarning */
  colorWarningBorder: "#ffe58f",

  /** 错误边框 @inherit colorError */
  colorErrorBorder: "#ffccc7",

  // =====================
  // 排版（Typography）
  // =====================

  /** 字体基础 @inherit fontSize */
  fontSizeSM: 12,

  /** 大字体 @inherit fontSize */
  fontSizeLG: 16,

  /** 文字高度 @inherit lineHeight */
  lineHeight: 1.5715,

  /** 行高（小）@inherit lineHeight */
  lineHeightSM: 1.5,

  /** 行高（大）@inherit lineHeight */
  lineHeightLG: 1.75,

  /** 字体家族 */
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
               "Helvetica Neue", Arial, "Noto Sans", sans-serif`,

  // =====================
  // 控件尺寸（Sizes）
  // =====================

  /** 控件 padding 小 @inherit controlPaddingHorizontalSM */
  controlPaddingHorizontalSM: 7,

  /** 控件 padding 默认 @inherit controlPaddingHorizontal */
  controlPaddingHorizontal: 11,

  /** 控件 padding 大 @inherit controlPaddingHorizontalLG */
  controlPaddingHorizontalLG: 15,

  /** 控件高度小 @inherit controlHeightSM */
  controlHeightSM: 24,

  /** 控件高度 @inherit controlHeight */
  controlHeight: 32,

  /** 控件高度大 @inherit controlHeightLG */
  controlHeightLG: 40,

  /** 控件字体大小 @inherit controlFontSize */
  controlFontSize: 14,

  /** 控件字体（小）@inherit controlFontSizeSM */
  controlFontSizeSM: 12,

  /** 控件字体（大）@inherit controlFontSizeLG */
  controlFontSizeLG: 16,

  /** 控件垂直 padding @inherit controlPaddingVertical */
  controlPaddingVertical: 6,

  /** 控件 item spacing @inherit margin */
  controlSpacing: 16,

  // =====================
  // 圆角（Radius）
  // =====================

  /** 默认圆角 @inherit borderRadius */
  borderRadius: 6,

  /** 小圆角 @inherit borderRadiusSM */
  borderRadiusSM: 4,

  /** 大圆角 @inherit borderRadiusLG */
  borderRadiusLG: 8,

  /** 外圆角 @inherit borderRadiusOuter */
  borderRadiusOuter: 12,

  // =====================
  // 边框与线宽（Border & Line）
  // =====================

  /** 默认线宽 @inherit lineWidth */
  lineWidth: 1,

  /** 粗线条 @inherit lineWidthBold */
  lineWidthBold: 2,

  /** 默认边框圆角 @inherit borderRadius */
  borderRadiusBase: 6,

  // =====================
  // 动效（Motion）
  // =====================

  /** 快速动画 @inherit motionDurationFast */
  motionDurationFast: "0.1s",

  /** 中速动画 @inherit motionDurationMid */
  motionDurationMid: "0.2s",

  /** 慢速动画 @inherit motionDurationSlow */
  motionDurationSlow: "0.3s",

  /** 标准缓动 @inherit motionEaseInOut */
  motionEaseInOut: "cubic-bezier(0.4, 0, 0.2, 1)",

  /** 回弹（出）@inherit motionEaseOutBack */
  motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",

  /** 回弹（入）@inherit motionEaseInBack */
  motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",

  /** 缓出 @inherit motionEaseOut */
  motionEaseOut: "cubic-bezier(0.22, 0, 0.36, 1)",

  // =====================
  // ZIndex
  // =====================

  /** 基础 ZIndex @inherit zIndexBase */
  zIndexBase: 0,

  /** Popup ZIndex @inherit zIndexPopupBase */
  zIndexPopupBase: 1000,
};

export default MapToken;
