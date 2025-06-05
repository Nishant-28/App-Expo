import React from 'react';
import { StyleSheet, Text, Pressable, ActivityIndicator, View } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS, TIMING, GRADIENTS } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSpring,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'success' | 'warning' | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: any;
  hapticFeedback?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  hapticFeedback = true
}: ButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  
  const triggerHaptic = () => {
    if (hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };
  
  const handlePressIn = () => {
    runOnJS(triggerHaptic)();
    scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
    opacity.value = withTiming(0.8, { duration: TIMING.fast });
  };
  
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    opacity.value = withTiming(1, { duration: TIMING.fast });
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });
  
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
      case 'gradient':
        return GRADIENTS.primary;
      case 'secondary':
        return GRADIENTS.secondary;
      case 'success':
        return [COLORS.success, COLORS.successDark];
      case 'warning':
        return [COLORS.warning, COLORS.warningDark];
      case 'error':
        return [COLORS.error, COLORS.errorDark];
      default:
        return GRADIENTS.primary;
    }
  };
  
  const getSizeStyles = () => {
    const sizes = {
      xs: {
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.m,
        borderRadius: BORDER_RADIUS.s,
        fontSize: FONT_SIZE.xs,
        iconSize: 14,
      },
      sm: {
        paddingVertical: SPACING.s,
        paddingHorizontal: SPACING.l,
        borderRadius: BORDER_RADIUS.m,
        fontSize: FONT_SIZE.s,
        iconSize: 16,
      },
      md: {
        paddingVertical: SPACING.m,
        paddingHorizontal: SPACING.xl,
        borderRadius: BORDER_RADIUS.l,
        fontSize: FONT_SIZE.m,
        iconSize: 18,
      },
      lg: {
        paddingVertical: SPACING.l,
        paddingHorizontal: SPACING.xxl,
        borderRadius: BORDER_RADIUS.l,
        fontSize: FONT_SIZE.l,
        iconSize: 20,
      },
      xl: {
        paddingVertical: SPACING.xl,
        paddingHorizontal: SPACING.xxxl,
        borderRadius: BORDER_RADIUS.xl,
        fontSize: FONT_SIZE.xl,
        iconSize: 22,
      },
    };
    return sizes[size];
  };
  
  const sizeStyles = getSizeStyles();
  
  const containerStyle = [
    styles.container,
    {
      paddingVertical: sizeStyles.paddingVertical,
      paddingHorizontal: sizeStyles.paddingHorizontal,
      borderRadius: sizeStyles.borderRadius,
    },
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];
  
  const textStyle = [
    styles.text,
    {
      fontSize: sizeStyles.fontSize,
    },
    getTextColor(),
    disabled && styles.disabledText,
  ];
  
  function getTextColor() {
    switch (variant) {
      case 'outline':
        return { color: COLORS.primary };
      case 'ghost':
        return { color: COLORS.primary };
      default:
        return { color: COLORS.textInverse };
    }
  }
  
  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? COLORS.primary : COLORS.textInverse}
        />
      );
    }
    
    const iconElement = icon && React.cloneElement(icon as React.ReactElement<any>, {
      size: sizeStyles.iconSize,
      color: variant === 'outline' || variant === 'ghost' ? COLORS.primary : COLORS.textInverse,
    });
    
    return (
      <View style={styles.contentContainer}>
        {icon && iconPosition === 'left' && (
          <View style={[styles.iconContainer, styles.iconLeft]}>
            {iconElement}
          </View>
        )}
        <Text style={textStyle}>{title}</Text>
        {icon && iconPosition === 'right' && (
          <View style={[styles.iconContainer, styles.iconRight]}>
            {iconElement}
          </View>
        )}
      </View>
    );
  };
  
  const shouldUseGradient = ['primary', 'secondary', 'gradient', 'success', 'warning', 'error'].includes(variant);
  
  if (shouldUseGradient) {
    return (
      <AnimatedPressable
        style={[containerStyle, animatedStyle]}
        onPress={disabled || loading ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
      >
        <AnimatedLinearGradient
          colors={disabled ? [COLORS.grey300, COLORS.grey300] as const : getGradientColors() as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          {renderContent()}
        </AnimatedLinearGradient>
      </AnimatedPressable>
    );
  }
  
  return (
    <AnimatedPressable
      style={[
        containerStyle,
        animatedStyle,
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
      ]}
      onPress={disabled || loading ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
    >
      {renderContent()}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.6,
    ...SHADOWS.none,
  },
  gradientContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    ...SHADOWS.none,
  },
  ghost: {
    backgroundColor: 'transparent',
    ...SHADOWS.none,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLeft: {
    marginRight: SPACING.s,
  },
  iconRight: {
    marginLeft: SPACING.s,
  },
  text: {
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    lineHeight: FONT_SIZE.l * 1.2,
  },
  disabledText: {
    opacity: 0.7,
  },
});