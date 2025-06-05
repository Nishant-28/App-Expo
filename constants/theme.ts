export const COLORS = {
  // Professional blue/white/grey theme
  primary: "#2563EB", // Professional blue
  primaryDark: "#1D4ED8", // Darker blue
  primaryLight: "#3B82F6", // Light blue
  primaryGradient: ["#2563EB", "#1D4ED8"], // Blue gradient

  // Secondary palette - Trustworthy greys
  secondary: "#64748B", // Slate grey
  secondaryDark: "#475569", // Dark slate
  secondaryLight: "#94A3B8", // Light slate
  secondaryGradient: ["#64748B", "#475569"], // Grey gradient

  // Accent colors - Minimal and clean
  accent: "#10B981", // Success green
  accentDark: "#059669",
  accentLight: "#34D399",
  accentGradient: ["#10B981", "#059669"], // Green gradient

  // Status colors
  success: "#10B981",
  successLight: "#D1FAE5",
  successDark: "#047857",

  warning: "#F59E0B",
  warningLight: "#FEF3C7",
  warningDark: "#D97706",

  error: "#EF4444",
  errorLight: "#FEE2E2",
  errorDark: "#DC2626",

  info: "#3B82F6",
  infoLight: "#DBEAFE",
  infoDark: "#1D4ED8",

  // Clean neutral palette
  white: "#FFFFFF",
  black: "#000000",

  grey50: "#F8FAFC",
  grey100: "#F1F5F9",
  grey200: "#E2E8F0",
  grey300: "#CBD5E1",
  grey400: "#94A3B8",
  grey500: "#64748B",
  grey600: "#475569",
  grey700: "#334155",
  grey800: "#1E293B",
  grey900: "#0F172A",

  // Clean semantic colors
  background: "#F8FAFC",
  surface: "#FFFFFF",
  surfaceElevated: "#FFFFFF",

  text: "#0F172A",
  textSecondary: "#475569",
  textTertiary: "#94A3B8",
  textInverse: "#FFFFFF",

  border: "#E2E8F0",
  borderLight: "#F1F5F9",
  borderDark: "#CBD5E1",

  // Quality indicators with professional colors
  qualityOriginal: "#2563EB", // Blue for original
  qualityAPlus: "#059669", // Green for A+
  qualityA: "#0891B2", // Cyan for A
  qualityB: "#7C3AED", // Purple for B
  qualityCopy: "#DC2626", // Red for copy

  // Card backgrounds
  cardPrimary: "#FAFBFC",
  cardSecondary: "#F8FAFC",
  cardAccent: "#F0F9FF",
}

export type ColorTheme = typeof COLORS

export const DARK_COLORS: ColorTheme = {
  // Primary colors - adjusted for dark theme
  primary: "#818CF8",
  primaryDark: "#6366F1",
  primaryLight: "#A5B4FC",
  primaryGradient: ["#818CF8", "#A78BFA"],

  secondary: "#34D399",
  secondaryDark: "#10B981",
  secondaryLight: "#6EE7B7",
  secondaryGradient: ["#34D399", "#22D3EE"],

  accent: "#FCD34D",
  accentDark: "#F59E0B",
  accentLight: "#FDE68A",
  accentGradient: ["#FCD34D", "#FB7185"],

  success: "#34D399",
  successLight: "#065F46",
  successDark: "#6EE7B7",

  warning: "#FCD34D",
  warningLight: "#78350F",
  warningDark: "#FDE68A",

  error: "#FB7185",
  errorLight: "#7F1D1D",
  errorDark: "#FCA5A5",

  info: "#60A5FA",
  infoLight: "#1E3A8A",
  infoDark: "#93C5FD",

  white: "#000000",
  black: "#FFFFFF",

  grey50: "#111827",
  grey100: "#1F2937",
  grey200: "#374151",
  grey300: "#4B5563",
  grey400: "#6B7280",
  grey500: "#9CA3AF",
  grey600: "#D1D5DB",
  grey700: "#E5E7EB",
  grey800: "#F3F4F6",
  grey900: "#F9FAFB",

  background: "#0F1419",
  surface: "#1F2937",
  surfaceElevated: "#374151",

  text: "#F9FAFB",
  textSecondary: "#D1D5DB",
  textTertiary: "#9CA3AF",
  textInverse: "#111827",

  border: "#374151",
  borderLight: "#4B5563",
  borderDark: "#1F2937",

  qualityOriginal: "#A78BFA",
  qualityAPlus: "#818CF8",
  qualityA: "#60A5FA",
  qualityB: "#34D399",
  qualityCopy: "#FCD34D",

  cardPrimary: "#1A1B23",
  cardSecondary: "#1A1F1A",
  cardAccent: "#1F1E1A",
}

// Optimized spacing for mobile-first design
export const SPACING = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
  huge: 48,
  massive: 64,
}

// Mobile-optimized font sizes
export const FONT_SIZE = {
  xs: 11,
  s: 13,
  m: 15,
  l: 17,
  xl: 19,
  xxl: 21,
  xxxl: 24,
  xxxxl: 28,
  huge: 32,
  massive: 36,
}

export const FONT_WEIGHT = {
  light: "300",
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
  black: "900",
}

export const LINE_HEIGHT = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
}

export const BORDER_RADIUS = {
  none: 0,
  xs: 2,
  s: 4,
  m: 8,
  l: 12,
  xl: 16,
  xxl: 20,
  xxxl: 24,
  round: 9999,
}

// Enhanced shadows for better depth perception
export const SHADOWS = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
}

// Professional gradients
export const GRADIENTS = {
  primary: ["#2563EB", "#1D4ED8"],
  secondary: ["#64748B", "#475569"],
  accent: ["#10B981", "#059669"],
  subtle: ["#F8FAFC", "#F1F5F9"],
  card: ["#FFFFFF", "#F8FAFC"],
}

// Faster animations for low-end devices
export const TIMING = {
  fast: 100,
  normal: 200,
  slow: 300,
  slower: 400,
}

// Z-index values
export const Z_INDEX = {
  background: -1,
  base: 0,
  overlay: 10,
  modal: 100,
  toast: 1000,
  tooltip: 1100,
}

// Breakpoints for responsive design
export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}
