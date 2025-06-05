import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native"
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from "@/constants/theme"
import { Smartphone, Battery, Star, Shield, Clock, TrendingUp } from "lucide-react-native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated"
import * as Haptics from "expo-haptics"

const { width } = Dimensions.get("window")
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type CategorySelectorProps = {
  onSelectCategory: (category: "Display" | "Battery") => void
}

export default function CategorySelector({ onSelectCategory }: CategorySelectorProps) {
  const displayScale = useSharedValue(1)
  const batteryScale = useSharedValue(1)

  const handlePress = (category: "Display" | "Battery", scale: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    scale.value = withSpring(0.96, { damping: 15 }, () => {
      scale.value = withSpring(1)
    })
    setTimeout(() => onSelectCategory(category), 100)
  }

  const displayAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: displayScale.value }],
  }))

  const batteryAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: batteryScale.value }],
  }))

  const categories = [
    {
      id: "Display" as const,
      title: "Display Screens",
      subtitle: "LCD & OLED Displays",
      description: "High-quality replacement screens for all popular mobile devices",
      icon: <Smartphone size={28} color={COLORS.primary} />,
      stats: { products: "2K+", rating: "4.9", delivery: "1-2 days" },
      scale: displayScale,
      animatedStyle: displayAnimatedStyle,
      color: COLORS.primary,
    },
    {
      id: "Battery" as const,
      title: "Batteries",
      subtitle: "Power Solutions",
      description: "Long-lasting replacement batteries with extended warranty",
      icon: <Battery size={28} color={COLORS.accent} />,
      stats: { products: "1.5K+", rating: "4.8", delivery: "1-3 days" },
      scale: batteryScale,
      animatedStyle: batteryAnimatedStyle,
      color: COLORS.accent,
    },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Category</Text>
        <Text style={styles.subtitle}>Select the type of mobile part you need</Text>
      </View>

      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <AnimatedPressable
            key={category.id}
            style={[styles.categoryCard, category.animatedStyle]}
            onPress={() => handlePress(category.id, category.scale)}
          >
            <View style={styles.cardContent}>
              {/* Header */}
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: category.color + "15" }]}>{category.icon}</View>
                <View style={styles.headerText}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
                </View>
              </View>

              {/* Description */}
              <Text style={styles.categoryDescription}>{category.description}</Text>

              {/* Stats */}
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <TrendingUp size={14} color={category.color} />
                  <Text style={styles.statText}>{category.stats.products} Products</Text>
                </View>
                <View style={styles.statItem}>
                  <Star size={14} color={COLORS.warning} fill={COLORS.warning} />
                  <Text style={styles.statText}>{category.stats.rating} Rating</Text>
                </View>
                <View style={styles.statItem}>
                  <Clock size={14} color={COLORS.textSecondary} />
                  <Text style={styles.statText}>{category.stats.delivery}</Text>
                </View>
              </View>

              {/* Action indicator */}
              <View style={styles.actionIndicator}>
                <Text style={[styles.actionText, { color: category.color }]}>Tap to explore →</Text>
              </View>
            </View>
          </AnimatedPressable>
        ))}
      </View>

      <View style={styles.helpSection}>
        <Shield size={16} color={COLORS.primary} />
        <Text style={styles.helpText}>All parts come with quality guarantee and compatibility guides</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.l,
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.xxl,
    paddingTop: SPACING.l,
  },
  title: {
    fontSize: FONT_SIZE.xxxl,
    fontFamily: "Inter-Bold",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SPACING.s,
  },
  subtitle: {
    fontSize: FONT_SIZE.m,
    fontFamily: "Inter-Regular",
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: FONT_SIZE.m * 1.4,
  },
  categoriesContainer: {
    gap: SPACING.l,
    marginBottom: SPACING.xxl,
  },
  categoryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.l,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  cardContent: {
    gap: SPACING.m,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.l,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.m,
  },
  headerText: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: FONT_SIZE.xl,
    fontFamily: "Inter-Bold",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  categorySubtitle: {
    fontSize: FONT_SIZE.m,
    fontFamily: "Inter-Medium",
    color: COLORS.textSecondary,
  },
  categoryDescription: {
    fontSize: FONT_SIZE.s,
    fontFamily: "Inter-Regular",
    color: COLORS.textSecondary,
    lineHeight: FONT_SIZE.s * 1.4,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.grey50,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.m,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    flex: 1,
    justifyContent: "center",
  },
  statText: {
    fontSize: FONT_SIZE.xs,
    fontFamily: "Inter-Medium",
    color: COLORS.textSecondary,
  },
  actionIndicator: {
    alignItems: "center",
    paddingTop: SPACING.s,
  },
  actionText: {
    fontSize: FONT_SIZE.s,
    fontFamily: "Inter-SemiBold",
  },
  helpSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary + "10",
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.m,
    gap: SPACING.s,
  },
  helpText: {
    flex: 1,
    fontSize: FONT_SIZE.s,
    fontFamily: "Inter-Regular",
    color: COLORS.textSecondary,
    lineHeight: FONT_SIZE.s * 1.3,
  },
})
