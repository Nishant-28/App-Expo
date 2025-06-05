import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, SHADOWS, BORDER_RADIUS, GRADIENTS } from '@/constants/theme';
import { Star, Clock, Package, Shield, CheckCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface Vendor {
  id: number;
  vendor: {
    id: number;
    name: string;
    rating: number;
    deliveryDays: string;
  };
  quality_type: string;
  price: number;
  stock: number;
}

type VendorListProps = {
  vendors: Vendor[];
  onSelectVendor: (vendor: Vendor) => void;
  selectedVendor: Vendor | null;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function VendorList({ 
  vendors, 
  onSelectVendor,
  selectedVendor 
}: VendorListProps) {
  const getQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case 'original': return COLORS.qualityOriginal;
      case 'a+': return COLORS.qualityAPlus;
      case 'a': return COLORS.qualityA;
      case 'b': return COLORS.qualityB;
      case 'copy': return COLORS.qualityCopy;
      default: return COLORS.grey500;
    }
  };
  
  const getQualityGradient = (quality: string) => {
    const color = getQualityColor(quality);
    return [color, color + '80'];
  };

  const renderVendorCard = (vendor: Vendor) => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);
    
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
      };
    });

    const handlePressIn = () => {
      runOnJS(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      })();
      scale.value = withSpring(0.96, { damping: 15 });
      opacity.value = withTiming(0.8, { duration: 150 });
    };

    const handlePressOut = () => {
      scale.value = withSpring(1, { damping: 15 });
      opacity.value = withTiming(1, { duration: 150 });
    };

    const isSelected = selectedVendor?.id === vendor.id;
    const qualityColor = getQualityColor(vendor.quality_type);

    return (
      <AnimatedPressable
        key={vendor.id}
        style={[styles.vendorCard, animatedStyle]}
        onPress={() => onSelectVendor(vendor)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {isSelected && (
          <LinearGradient
            colors={GRADIENTS.primary as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.selectedOverlay}
          />
        )}
        
        <View style={styles.cardContent}>
          <View style={styles.vendorHeader}>
            <View style={styles.vendorInfo}>
              <Text style={styles.vendorName}>{vendor.vendor.name}</Text>
              <View style={styles.ratingContainer}>
                <Star size={14} color={COLORS.accent} fill={COLORS.accent} />
                <Text style={styles.ratingText}>{vendor.vendor.rating}</Text>
                <Text style={styles.ratingLabel}>rating</Text>
              </View>
            </View>
            
            {isSelected && (
              <View style={styles.selectedBadge}>
                <CheckCircle size={20} color={COLORS.primary} />
              </View>
            )}
          </View>

          <View style={styles.qualityContainer}>
            <LinearGradient
              colors={getQualityGradient(vendor.quality_type) as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.qualityBadge}
            >
              <Shield size={12} color={COLORS.white} />
              <Text style={styles.qualityText}>{vendor.quality_type}</Text>
            </LinearGradient>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Clock size={16} color={COLORS.textSecondary} />
              <Text style={styles.detailText}>
                {vendor.vendor.deliveryDays} days delivery
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <Package size={16} color={COLORS.textSecondary} />
              <Text style={styles.detailText}>
                {vendor.stock} in stock
              </Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <View style={styles.priceInfo}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.priceValue}>${vendor.price.toFixed(2)}</Text>
            </View>
            
            {isSelected && (
              <View style={styles.selectedIndicator}>
                <Text style={styles.selectedText}>Selected</Text>
              </View>
            )}
          </View>
        </View>
      </AnimatedPressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Vendor</Text>
        <Text style={styles.subtitle}>
          Compare quality, prices, and delivery options
        </Text>
      </View>
      
      <View style={styles.vendorList}>
        {vendors.map(renderVendorCard)}
      </View>
      
      {vendors.length === 0 && (
        <View style={styles.emptyState}>
          <Package size={48} color={COLORS.textTertiary} />
          <Text style={styles.emptyTitle}>No vendors available</Text>
          <Text style={styles.emptyMessage}>
            Please try a different model or check back later
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: FONT_SIZE.xxxl,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.s,
  },
  subtitle: {
    fontSize: FONT_SIZE.l,
    fontFamily: 'Inter-Regular',
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: FONT_SIZE.l * 1.4,
  },
  vendorList: {
    gap: SPACING.l,
  },
  vendorCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.md,
    position: 'relative',
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    zIndex: 1,
  },
  cardContent: {
    padding: SPACING.xl,
  },
  vendorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.l,
  },
  vendorInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: FONT_SIZE.xl,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  ratingText: {
    fontSize: FONT_SIZE.m,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
  },
  ratingLabel: {
    fontSize: FONT_SIZE.s,
    fontFamily: 'Inter-Regular',
    color: COLORS.textSecondary,
  },
  selectedBadge: {
    backgroundColor: COLORS.primaryLight + '20',
    borderRadius: BORDER_RADIUS.round,
    padding: SPACING.s,
  },
  qualityContainer: {
    marginBottom: SPACING.l,
    alignItems: 'flex-start',
  },
  qualityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: BORDER_RADIUS.l,
    gap: SPACING.xs,
  },
  qualityText: {
    fontSize: FONT_SIZE.s,
    fontFamily: 'Inter-Bold',
    color: COLORS.white,
    textTransform: 'uppercase',
  },
  detailsContainer: {
    gap: SPACING.m,
    marginBottom: SPACING.l,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.s,
  },
  detailText: {
    fontSize: FONT_SIZE.m,
    fontFamily: 'Inter-Regular',
    color: COLORS.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.l,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  priceInfo: {
    flex: 1,
  },
  priceLabel: {
    fontSize: FONT_SIZE.s,
    fontFamily: 'Inter-Regular',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  priceValue: {
    fontSize: FONT_SIZE.xxl,
    fontFamily: 'Inter-Bold',
    color: COLORS.primary,
  },
  selectedIndicator: {
    backgroundColor: COLORS.primary + '15',
    borderRadius: BORDER_RADIUS.l,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
  },
  selectedText: {
    fontSize: FONT_SIZE.s,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.xl,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.textSecondary,
    marginTop: SPACING.l,
    marginBottom: SPACING.s,
  },
  emptyMessage: {
    fontSize: FONT_SIZE.m,
    fontFamily: 'Inter-Regular',
    color: COLORS.textTertiary,
    textAlign: 'center',
    lineHeight: FONT_SIZE.m * 1.4,
  },
});