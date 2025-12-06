/**
 * Ant Design v5
 * AliasToken（最终组件可用 Token，基于 MapToken 计算得来）
 * 带 @inherit 标注：表示由哪个 MapToken 派生而来
 */

const AliasToken = {
  // =====================
  // 颜色体系（Colors）
  // =====================

  /** 主色（链接色）@inherit colorPrimary */
  colorLink: "#1677ff",

  /** 成功色 @inherit colorSuccess */
  colorSuccess: "#52c41a",

  /** 警告色 @inherit colorWarning */
  colorWarning: "#faad14",

  /** 错误色 @inherit colorError */
  colorError: "#ff4d4f",

  /** 信息色（辅助色）@inherit colorInfo */
  colorInfo: "#1677ff",

  /** 主背景色 @inherit colorBgBase */
  colorBackground: "#ffffff",

  /** 字体色 @inherit colorTextBase */
  colorText: "rgba(0,0,0,0.88)",

  /** 次级文本色 @inherit colorTextSecondary */
  colorTextSecondary: "rgba(0,0,0,0.65)",

  /** 次级背景色 @inherit colorBgContainer */
  colorBackgroundSecondary: "#fafafa",

  /** 组件内容背景色 @inherit colorBgContainer */
  colorComponentBg: "#ffffff",

  /** 行内元素背景色（按钮）@inherit colorPrimaryBg */
  colorItemBg: "#e6f4ff",

  /** 激活背景色（hover）@inherit colorBgActive */
  colorBackgroundHover: "rgba(0,0,0,0.06)",

  // =====================
  // 字体体系（Typography）
  // =====================

  /** 基础字体 @inherit fontSize */
  fontSizeBase: 14,

  /** 大号字体 @inherit fontSizeLG */
  fontSizeLarge: 16,

  /** 小号字体 @inherit fontSizeSM */
  fontSizeSmall: 12,

  /** 标题字体 @inherit fontSizeHeading */
  fontSizeHeading1: 38,
  fontSizeHeading2: 30,
  fontSizeHeading3: 24,
  fontSizeHeading4: 20,
  fontSizeHeading5: 16,

  /** 默认行高 @inherit lineHeight */
  lineHeightBase: 1.5715,

  /** 小行高 @inherit lineHeightSM */
  lineHeightSmall: 1.5,

  /** 大行高 @inherit lineHeightLG */
  lineHeightLarge: 1.75,

  /** 文字字体（家族） */
  fontFamily: `"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif`,

  // =====================
  // 尺寸体系（Sizes）
  // =====================

  /** 小号控件 @inherit controlHeightSM */
  controlHeightSmall: 24,

  /** 默认控件 @inherit controlHeight */
  controlHeightDefault: 32,

  /** 大号控件 @inherit controlHeightLG */
  controlHeightLarge: 40,

  /** 控件小字体 @inherit controlFontSizeSM */
  controlFontSizeSmall: 12,

  /** 控件大字体 @inherit controlFontSizeLG */
  controlFontSizeLarge: 16,

  /** 控件水平间距（小）@inherit controlPaddingHorizontalSM */
  controlPaddingHorizontalSmall: 7,

  /** 控件水平间距（默认）@inherit controlPaddingHorizontal */
  controlPaddingHorizontalDefault: 11,

  /** 控件水平间距（大）@inherit controlPaddingHorizontalLG */
  controlPaddingHorizontalLarge: 15,

  /** 控件内垂直间距 @inherit controlPaddingVertical */
  controlPaddingVerticalDefault: 6,

  // =====================
  // 圆角体系（Radius）
  // =====================

  /** 默认圆角 @inherit borderRadius */
  borderRadiusBase: 6,

  /** 小号圆角 @inherit borderRadiusSM */
  borderRadiusSmall: 4,

  /** 大号圆角 @inherit borderRadiusLG */
  borderRadiusLarge: 8,

  /** 外部圆角 @inherit borderRadiusOuter */
  borderRadiusOuter: 12,

  // =====================
  // 边框 & 线宽（Line Width & Border）
  // =====================

  /** 默认线宽 @inherit lineWidth */
  borderWidth: 1,

  /** 粗线宽 @inherit lineWidthBold */
  borderWidthBold: 2,

  // =====================
  // 动效（Motion）
  // =====================

  /** 快速动画 @inherit motionDurationFast */
  motionDurationFast: "0.1s",

  /** 中等动画 @inherit motionDurationMid */
  motionDurationMedium: "0.2s",

  /** 慢速动画 @inherit motionDurationSlow */
  motionDurationSlow: "0.3s",

  /** 动画：标准缓动 @inherit motionEaseInOut */
  motionEaseInOut: "cubic-bezier(0.4, 0, 0.2, 1)",

  /** 动画：回弹缓动 @inherit motionEaseOutBack */
  motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",

  /** 动画：进场缓动 @inherit motionEaseInBack */
  motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",

  /** 动画：离场缓动 @inherit motionEaseOut */
  motionEaseOut: "cubic-bezier(0.22, 0, 0.36, 1)",

  // =====================
  // ZIndex（层级）
  // =====================

  /** 基础 ZIndex @inherit zIndexBase */
  zIndexBase: 0,

  /** 浮层 ZIndex @inherit zIndexPopupBase */
  zIndexPopup: 1000,
};

export default AliasToken;
