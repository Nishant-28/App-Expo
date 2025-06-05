export const COLORS = {
  // Modern primary palette - Purple/Blue gradient theme
  primary: '#6366F1', // Indigo
  primaryDark: '#4338CA', // Darker indigo
  primaryLight: '#818CF8', // Light indigo
  primaryGradient: ['#6366F1', '#8B5CF6'], // Indigo to Purple
  
  // Secondary palette - Complementary colors
  secondary: '#10B981', // Emerald
  secondaryDark: '#059669', // Dark emerald
  secondaryLight: '#34D399', // Light emerald
  secondaryGradient: ['#10B981', '#06B6D4'], // Emerald to Cyan
  
  // Accent colors
  accent: '#F59E0B', // Amber
  accentDark: '#D97706',
  accentLight: '#FCD34D',
  accentGradient: ['#F59E0B', '#EF4444'], // Amber to Red
  
  // Status colors
  success: '#10B981',
  successLight: '#D1FAE5',
  successDark: '#047857',
  
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  warningDark: '#D97706',
  
  error: '#EF4444',
  errorLight: '#FEE2E2',
  errorDark: '#DC2626',
  
  info: '#3B82F6',
  infoLight: '#DBEAFE',
  infoDark: '#1D4ED8',
  
  // Neutral palette
  white: '#FFFFFF',
  black: '#000000',
  
  grey50: '#F9FAFB',
  grey100: '#F3F4F6',
  grey200: '#E5E7EB',
  grey300: '#D1D5DB',
  grey400: '#9CA3AF',
  grey500: '#6B7280',
  grey600: '#4B5563',
  grey700: '#374151',
  grey800: '#1F2937',
  grey900: '#111827',
  
  // Semantic colors
  background: '#FAFBFC',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  
  text: '#1F2937',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',
  
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#D1D5DB',
  
  // Quality gradients - Modern colorful approach
  qualityOriginal: '#8B5CF6', // Purple for original
  qualityAPlus: '#6366F1', // Indigo for A+
  qualityA: '#3B82F6', // Blue for A
  qualityB: '#10B981', // Green for B
  qualityCopy: '#F59E0B', // Amber for copy
  
  // Card backgrounds with slight tints
  cardPrimary: '#FAFAFF',
  cardSecondary: '#FAFFFE',
  cardAccent: '#FFFEF7',
};

export type ColorTheme = typeof COLORS;

export const DARK_COLORS: ColorTheme = {
  // Primary colors - adjusted for dark theme
  primary: '#818CF8',
  primaryDark: '#6366F1',
  primaryLight: '#A5B4FC',
  primaryGradient: ['#818CF8', '#A78BFA'],
  
  secondary: '#34D399',
  secondaryDark: '#10B981',
  secondaryLight: '#6EE7B7',
  secondaryGradient: ['#34D399', '#22D3EE'],
  
  accent: '#FCD34D',
  accentDark: '#F59E0B',
  accentLight: '#FDE68A',
  accentGradient: ['#FCD34D', '#FB7185'],
  
  success: '#34D399',
  successLight: '#065F46',
  successDark: '#6EE7B7',
  
  warning: '#FCD34D',
  warningLight: '#78350F',
  warningDark: '#FDE68A',
  
  error: '#FB7185',
  errorLight: '#7F1D1D',
  errorDark: '#FCA5A5',
  
  info: '#60A5FA',
  infoLight: '#1E3A8A',
  infoDark: '#93C5FD',
  
  white: '#000000',
  black: '#FFFFFF',
  
  grey50: '#111827',
  grey100: '#1F2937',
  grey200: '#374151',
  grey300: '#4B5563',
  grey400: '#6B7280',
  grey500: '#9CA3AF',
  grey600: '#D1D5DB',
  grey700: '#E5E7EB',
  grey800: '#F3F4F6',
  grey900: '#F9FAFB',
  
  background: '#0F1419',
  surface: '#1F2937',
  surfaceElevated: '#374151',
  
  text: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textTertiary: '#9CA3AF',
  textInverse: '#111827',
  
  border: '#374151',
  borderLight: '#4B5563',
  borderDark: '#1F2937',
  
  qualityOriginal: '#A78BFA',
  qualityAPlus: '#818CF8',
  qualityA: '#60A5FA',
  qualityB: '#34D399',
  qualityCopy: '#FCD34D',
  
  cardPrimary: '#1A1B23',
  cardSecondary: '#1A1F1A',
  cardAccent: '#1F1E1A',
};

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
};

export const FONT_SIZE = {
  xs: 10,
  s: 12,
  m: 14,
  l: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  xxxxl: 28,
  huge: 32,
  massive: 40,
};

export const FONT_WEIGHT = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
};

export const LINE_HEIGHT = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
};

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
};

export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 12,
  },
  colored: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
};

// Gradients for modern design
export const GRADIENTS = {
  primary: ['#6366F1', '#8B5CF6'],
  secondary: ['#10B981', '#06B6D4'],
  accent: ['#F59E0B', '#EF4444'],
  sunset: ['#FF6B6B', '#FFE66D'],
  ocean: ['#667eea', '#764ba2'],
  cosmic: ['#8B5CF6', '#EC4899'],
  emerald: ['#10B981', '#34D399'],
  fire: ['#FF512F', '#DD2476'],
  ice: ['#667eea', '#764ba2'],
  aurora: ['#667eea', '#f093fb'],
};

// Animation timings
export const TIMING = {
  fast: 150,
  normal: 250,
  slow: 350,
  slower: 500,
};

// Z-index values
export const Z_INDEX = {
  background: -1,
  base: 0,
  overlay: 10,
  modal: 100,
  toast: 1000,
  tooltip: 1100,
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};