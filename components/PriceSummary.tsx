import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, SHADOWS, BORDER_RADIUS } from '@/constants/theme';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  interpolate,
  Extrapolate 
} from 'react-native-reanimated';

type PriceSummaryProps = {
  price: number;
  quantity: number;
  totalPrice: number;
  modelName?: string;
  quality?: string;
};

export default function PriceSummary({ 
  price = 0, 
  quantity = 1, 
  totalPrice = 0,
  modelName = '',
  quality = ''
}: PriceSummaryProps) {
  // Animation value
  const animation = useSharedValue(0);
  
  // Initialize animation when component mounts
  useEffect(() => {
    animation.value = withSpring(1, { damping: 12 });
  }, []);
  
  // Create animated style for price container
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animation.value,
      [0, 1],
      [0.9, 1],
      Extrapolate.CLAMP
    );
    
    const opacity = interpolate(
      animation.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP
    );
    
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.orderSummary}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        
        {modelName && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Model:</Text>
            <Text style={styles.summaryValue}>{modelName}</Text>
          </View>
        )}
        
        {quality && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Quality:</Text>
            <Text style={styles.summaryValue}>{quality}</Text>
          </View>
        )}
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Unit Price:</Text>
          <Text style={styles.summaryValue}>${price.toFixed(2)}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Quantity:</Text>
          <Text style={styles.summaryValue}>{quantity}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  orderSummary: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.l,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryTitle: {
    fontSize: FONT_SIZE.l,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    marginBottom: SPACING.m,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.s,
  },
  summaryLabel: {
    fontSize: FONT_SIZE.m,
    fontFamily: 'Inter-Regular',
    color: COLORS.textLight,
  },
  summaryValue: {
    fontSize: FONT_SIZE.m,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.m,
  },
  totalLabel: {
    fontSize: FONT_SIZE.l,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
  },
  totalValue: {
    fontSize: FONT_SIZE.l,
    fontFamily: 'Inter-Bold',
    color: COLORS.primary,
  },
});