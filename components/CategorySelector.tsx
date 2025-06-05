import React from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS, GRADIENTS } from '@/constants/theme';
import { Smartphone, Battery, Zap, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type CategorySelectorProps = {
  onSelectCategory: (category: 'Display' | 'Battery') => void;
};

export default function CategorySelector({ onSelectCategory }: CategorySelectorProps) {
  const displayScale = useSharedValue(1);
  const batteryScale = useSharedValue(1);
  
  const handlePress = (category: 'Display' | 'Battery', scale: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    scale.value = withSpring(0.95, { damping: 15 }, () => {
      scale.value = withSpring(1);
    });
    setTimeout(() => onSelectCategory(category), 100);
  };
  
  const displayAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: displayScale.value }],
  }));
  
  const batteryAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: batteryScale.value }],
  }));
  
  const categories = [
    {
      id: 'Display' as const,
      title: 'Display Screens',
      subtitle: 'LCD & OLED Displays',
      description: 'High-quality replacement screens for all popular mobile devices',
      icon: <Smartphone size={32} color={COLORS.textInverse} />,
      gradient: GRADIENTS.primary,
      stats: { products: '2K+', rating: '4.9' },
      scale: displayScale,
      animatedStyle: displayAnimatedStyle,
    },
    {
      id: 'Battery' as const,
      title: 'Batteries',
      subtitle: 'Power Solutions',
      description: 'Long-lasting replacement batteries with extended warranty',
      icon: <Battery size={32} color={COLORS.textInverse} />,
      gradient: GRADIENTS.secondary,
      stats: { products: '1.5K+', rating: '4.8' },
      scale: batteryScale,
      animatedStyle: batteryAnimatedStyle,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Category</Text>
        <Text style={styles.subtitle}>
          Select the type of mobile part you're looking for
        </Text>
      </View>
      
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <AnimatedPressable
            key={category.id}
            style={[styles.categoryCard, category.animatedStyle]}
            onPress={() => handlePress(category.id, category.scale)}
          >
            <LinearGradient
              colors={category.gradient as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientContainer}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  {category.icon}
                </View>
                
                <View style={styles.textContent}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                  
                  <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                      <Zap size={14} color={COLORS.textInverse + 'CC'} />
                      <Text style={styles.statText}>{category.stats.products} Products</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Star size={14} color={COLORS.accent} fill={COLORS.accent} />
                      <Text style={styles.statText}>{category.stats.rating} Rating</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.arrowContainer}>
                  <View style={styles.arrowIcon}>
                    <Text style={styles.arrowText}>→</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </AnimatedPressable>
        ))}
      </View>
      
      <View style={styles.helpSection}>
        <Text style={styles.helpText}>
          Not sure which category? Our parts come with detailed compatibility guides.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
    paddingTop: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.xxxxl,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.m,
  },
  subtitle: {
    fontSize: FONT_SIZE.l,
    fontFamily: 'Inter-Regular',
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: FONT_SIZE.l * 1.4,
  },
  categoriesContainer: {
    gap: SPACING.xl,
    marginBottom: SPACING.xxxl,
  },
  categoryCard: {
    borderRadius: BORDER_RADIUS.xxl,
    overflow: 'hidden',
    ...SHADOWS.lg,
  },
  gradientContainer: {
    padding: SPACING.xl,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.white + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.l,
  },
  textContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: FONT_SIZE.xxl,
    fontFamily: 'Inter-Bold',
    color: COLORS.textInverse,
    marginBottom: SPACING.xs,
  },
  categorySubtitle: {
    fontSize: FONT_SIZE.m,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.textInverse + 'CC',
    marginBottom: SPACING.s,
  },
  categoryDescription: {
    fontSize: FONT_SIZE.s,
    fontFamily: 'Inter-Regular',
    color: COLORS.textInverse + 'AA',
    lineHeight: FONT_SIZE.s * 1.4,
    marginBottom: SPACING.m,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: SPACING.l,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  statText: {
    fontSize: FONT_SIZE.xs,
    fontFamily: 'Inter-Medium',
    color: COLORS.textInverse + 'CC',
  },
  arrowContainer: {
    marginLeft: SPACING.m,
  },
  arrowIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.white + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.textInverse,
    fontFamily: 'Inter-Bold',
  },
  helpSection: {
    backgroundColor: COLORS.grey100,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.l,
    alignItems: 'center',
  },
  helpText: {
    fontSize: FONT_SIZE.s,
    fontFamily: 'Inter-Regular',
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: FONT_SIZE.s * 1.4,
  },
});