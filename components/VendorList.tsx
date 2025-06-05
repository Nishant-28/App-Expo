import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native"
import { COLORS, SPACING, FONT_SIZE, SHADOWS, BORDER_RADIUS } from "@/constants/theme"
import { Star, Clock, Package, Shield, CheckCircle, Truck } from "lucide-react-native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from "react-native-reanimated"
import * as Haptics from "expo-haptics"

interface Vendor {
  id: number
  vendor: {
    id: number
    name: string
    rating: number
    deliveryDays: string
  }
  quality_type: string
  price: number
  stock: number
}

type VendorListProps = {
  vendors: Vendor[]
  onSelectVendor: (vendor: Vendor) => void
  selectedVendor: Vendor | null
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function VendorList({ vendors, onSelectVendor, selectedVendor }: VendorListProps) {
  const getQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case "og":
        return COLORS.primary
      case "a+":
        return COLORS.accent
      case "a":
        return COLORS.info
      case "b":
        return COLORS.secondary
      case "copy":
        return COLORS.warning
      default:
        return COLORS.grey500
    }
  }

  const getQualityLabel = (quality: string) => {
    switch (quality.toLowerCase()) {
      case "og":
        return "Original"
      case "a+":
        return "Premium"
      case "a":
        return "High Quality"
      case "b":
        return "Standard"
      case "copy":
        return "Budget"
      default:
        return quality
    }
  }

  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }
  })

  const handlePressIn = () => {
    runOnJS(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    })()
    scale.value = withSpring(0.98, { damping: 15 })
    opacity.value = withTiming(0.9, { duration: 100 })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 })
    opacity.value = withTiming(1, { duration: 100 })
  }

  const renderVendorCard = (vendor: Vendor, index: number) => {
    const isSelected = selectedVendor?.id === vendor.id
    const qualityColor = getQualityColor(vendor.quality_type)
    const isRecommended = index === 0 // First vendor is recommended

    return (
      <AnimatedPressable
        key={vendor.id}
        style={[styles.vendorCard, animatedStyle, isSelected && styles.selectedCard]}
        onPress={() => onSelectVendor(vendor)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {/* Recommended Badge */}
        {isRecommended && (
          <View style={styles.recommendedBadge}>
            <Star size={12} color={COLORS.white} fill={COLORS.white} />
            <Text style={styles.recommendedText}>Recommended</Text>
          </View>
        )}

        {/* Selected Indicator */}
        {isSelected && (
          <View style={styles.selectedIndicator}>
            <CheckCircle size={20} color={COLORS.primary} />
          </View>
        )}

        <View style={styles.cardContent}>
          {/* Vendor Header */}
          <View style={styles.vendorHeader}>
            <View style={styles.vendorInfo}>
              <Text style={styles.vendorName}>{vendor.vendor.name}</Text>
              <View style={styles.ratingContainer}>
                <Star size={14} color={COLORS.warning} fill={COLORS.warning} />
                <Text style={styles.ratingText}>{vendor.vendor.rating}</Text>
                <Text style={styles.ratingCount}>(500+ reviews)</Text>
              </View>
            </View>
          </View>

          {/* Quality Badge */}
          <View style={styles.qualitySection}>
            <View style={[styles.qualityBadge, { backgroundColor: qualityColor + "15" }]}>
              <Shield size={14} color={qualityColor} />
              <Text style={[styles.qualityText, { color: qualityColor }]}>{getQualityLabel(vendor.quality_type)}</Text>
            </View>
          </View>

          {/* Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Clock size={16} color={COLORS.textSecondary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Delivery</Text>
                <Text style={styles.detailValue}>{vendor.vendor.deliveryDays} days</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Package size={16} color={COLORS.textSecondary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Stock</Text>
                <Text style={styles.detailValue}>{vendor.stock} units</Text>
              </View>
            </View>
          </View>

          {/* Price Section */}
          <View style={styles.priceSection}>
            <View style={styles.priceInfo}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.priceValue}>₹{vendor.price.toFixed(0)}</Text>
            </View>

            {isSelected ? (
              <View style={styles.selectedPriceIndicator}>
                <CheckCircle size={16} color={COLORS.primary} />
                <Text style={styles.selectedPriceText}>Selected</Text>
              </View>
            ) : (
              <View style={styles.selectButton}>
                <Text style={styles.selectButtonText}>Select</Text>
              </View>
            )}
          </View>

          {/* Free Shipping Badge */}
          {vendor.price > 500 && (
            <View style={styles.shippingBadge}>
              <Truck size={12} color={COLORS.accent} />
              <Text style={styles.shippingText}>Free Shipping</Text>
            </View>
          )}
        </View>
      </AnimatedPressable>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Vendor</Text>
        <Text style={styles.subtitle}>Compare quality, prices, and delivery options</Text>
      </View>

      <ScrollView
        style={styles.vendorList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {vendors.map((vendor, index) => renderVendorCard(vendor, index))}
      </ScrollView>

      {vendors.length === 0 && (
        <View style={styles.emptyState}>
          <Package size={48} color={COLORS.textTertiary} />
          <Text style={styles.emptyTitle}>No vendors available</Text>
          <Text style={styles.emptyMessage}>Please try a different model or check back later</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.l,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
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
  vendorList: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.l,
    paddingBottom: SPACING.xl,
  },
  vendorCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.l,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
    position: "relative",
    overflow: "hidden",
  },
  selectedCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    ...SHADOWS.md,
  },
  recommendedBadge: {
    position: "absolute",
    top: SPACING.m,
    right: SPACING.m,
    backgroundColor: COLORS.warning,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.s,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.s,
    gap: SPACING.xs,
    zIndex: 1,
  },
  recommendedText: {
    fontSize: FONT_SIZE.xs,
    fontFamily: "Inter-Bold",
    color: COLORS.white,
  },
  selectedIndicator: {
    position: "absolute",
    top: SPACING.m,
    left: SPACING.m,
    backgroundColor: COLORS.primary + "15",
    borderRadius: BORDER_RADIUS.round,
    padding: SPACING.xs,
    zIndex: 1,
  },
  cardContent: {
    padding: SPACING.l,
  },
  vendorHeader: {
    marginBottom: SPACING.m,
  },
  vendorInfo: {
    marginTop: SPACING.s,
  },
  vendorName: {
    fontSize: FONT_SIZE.l,
    fontFamily: "Inter-Bold",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  ratingText: {
    fontSize: FONT_SIZE.m,
    fontFamily: "Inter-SemiBold",
    color: COLORS.text,
  },
  ratingCount: {
    fontSize: FONT_SIZE.s,
    fontFamily: "Inter-Regular",
    color: COLORS.textSecondary,
  },
  qualitySection: {
    marginBottom: SPACING.m,
  },
  qualityBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    gap: SPACING.xs,
    alignSelf: "flex-start",
  },
  qualityText: {
    fontSize: FONT_SIZE.s,
    fontFamily: "Inter-Bold",
  },
  detailsGrid: {
    flexDirection: "row",
    gap: SPACING.l,
    marginBottom: SPACING.m,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.s,
    flex: 1,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: FONT_SIZE.xs,
    fontFamily: "Inter-Regular",
    color: COLORS.textSecondary,
  },
  detailValue: {
    fontSize: FONT_SIZE.s,
    fontFamily: "Inter-SemiBold",
    color: COLORS.text,
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: SPACING.m,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  priceInfo: {
    flex: 1,
  },
  priceLabel: {
    fontSize: FONT_SIZE.s,
    fontFamily: "Inter-Regular",
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  priceValue: {
    fontSize: FONT_SIZE.xl,
    fontFamily: "Inter-Bold",
    color: COLORS.primary,
  },
  selectedPriceIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary + "15",
    borderRadius: BORDER_RADIUS.m,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    gap: SPACING.xs,
  },
  selectedPriceText: {
    fontSize: FONT_SIZE.s,
    fontFamily: "Inter-SemiBold",
    color: COLORS.primary,
  },
  selectButton: {
    backgroundColor: COLORS.grey100,
    borderRadius: BORDER_RADIUS.m,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.l,
  },
  selectButtonText: {
    fontSize: FONT_SIZE.s,
    fontFamily: "Inter-SemiBold",
    color: COLORS.textSecondary,
  },
  shippingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.accent + "15",
    borderRadius: BORDER_RADIUS.s,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.s,
    gap: SPACING.xs,
    alignSelf: "flex-start",
    marginTop: SPACING.s,
  },
  shippingText: {
    fontSize: FONT_SIZE.xs,
    fontFamily: "Inter-SemiBold",
    color: COLORS.accent,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: SPACING.xxxl,
    paddingHorizontal: SPACING.l,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.xl,
    fontFamily: "Inter-SemiBold",
    color: COLORS.textSecondary,
    marginTop: SPACING.l,
    marginBottom: SPACING.s,
  },
  emptyMessage: {
    fontSize: FONT_SIZE.m,
    fontFamily: "Inter-Regular",
    color: COLORS.textTertiary,
    textAlign: "center",
    lineHeight: FONT_SIZE.m * 1.4,
  },
})
