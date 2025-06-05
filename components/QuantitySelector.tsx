import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, SHADOWS, BORDER_RADIUS } from '@/constants/theme';
import { Plus, Minus } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  withTiming 
} from 'react-native-reanimated';

type QuantitySelectorProps = {
  quantity: number;
  onChangeQuantity: (quantity: number) => void;
  maxQuantity?: number;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function QuantitySelector({ 
  quantity, 
  onChangeQuantity, 
  maxQuantity = 10 
}: QuantitySelectorProps) {
  // Animation values
  const decreaseScale = useSharedValue(1);
  const increaseScale = useSharedValue(1);
  const quantityScale = useSharedValue(1);

  // Animated styles
  const decreaseAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: decreaseScale.value }],
    };
  });

  const increaseAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: increaseScale.value }],
    };
  });

  const quantityAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: quantityScale.value }],
    };
  });

  const handleDecrease = () => {
    if (quantity > 1) {
      decreaseScale.value = withSequence(
        withTiming(0.9, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
      quantityScale.value = withSequence(
        withTiming(0.9, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
      onChangeQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      increaseScale.value = withSequence(
        withTiming(0.9, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
      quantityScale.value = withSequence(
        withTiming(1.1, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
      onChangeQuantity(quantity + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Quantity</Text>
      
      <View style={styles.quantityContainer}>
        <AnimatedPressable
          style={[styles.quantityButton, decreaseAnimatedStyle]}
          onPress={handleDecrease}
          disabled={quantity <= 1}
        >
          <Minus 
            size={20} 
            color={quantity <= 1 ? COLORS.greyLight : COLORS.primary} 
          />
        </AnimatedPressable>
        
        <Animated.View style={[styles.quantityDisplay, quantityAnimatedStyle]}>
          <Text style={styles.quantityText}>{quantity}</Text>
        </Animated.View>
        
        <AnimatedPressable
          style={[styles.quantityButton, increaseAnimatedStyle]}
          onPress={handleIncrease}
          disabled={quantity >= maxQuantity}
        >
          <Plus 
            size={20} 
            color={quantity >= maxQuantity ? COLORS.greyLight : COLORS.primary} 
          />
        </AnimatedPressable>
      </View>
      
      <Text style={styles.stockInfo}>
        {maxQuantity} in stock
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    marginBottom: SPACING.m,
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.m,
  },
  quantityButton: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.m,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quantityDisplay: {
    width: 80,
    height: 60,
    borderRadius: BORDER_RADIUS.m,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.m,
  },
  quantityText: {
    fontSize: FONT_SIZE.xl,
    fontFamily: 'Inter-Bold',
    color: COLORS.primary,
  },
  stockInfo: {
    fontSize: FONT_SIZE.s,
    fontFamily: 'Inter-Regular',
    color: COLORS.textLight,
    marginTop: SPACING.s,
  },
});