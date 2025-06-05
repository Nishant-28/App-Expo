import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, SHADOWS, BORDER_RADIUS } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Check } from 'lucide-react-native';

type QualityType = 'OG' | 'A+' | 'A' | 'B' | 'Copy';

type QualitySelectorProps = {
  onSelectQuality: (quality: QualityType) => void;
  selectedQuality: QualityType | null;
};

interface QualityOption {
  type: QualityType;
  label: string;
  description: string;
  gradientColors: string[];
}

const qualityOptions: QualityOption[] = [
  {
    type: 'OG',
    label: 'Original',
    description: 'Original manufacturer quality',
    gradientColors: ['#1B5E20', '#2E7D32'],
  },
  {
    type: 'A+',
    label: 'A+ Quality',
    description: 'Premium aftermarket quality',
    gradientColors: ['#2E7D32', '#388E3C'],
  },
  {
    type: 'A',
    label: 'A Quality',
    description: 'High-quality aftermarket',
    gradientColors: ['#388E3C', '#43A047'],
  },
  {
    type: 'B',
    label: 'B Quality',
    description: 'Standard aftermarket quality',
    gradientColors: ['#43A047', '#4CAF50'],
  },
  {
    type: 'Copy',
    label: 'Copy',
    description: 'Budget-friendly option',
    gradientColors: ['#4CAF50', '#66BB6A'],
  },
];

export default function QualitySelector({ onSelectQuality, selectedQuality }: QualitySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Display Quality</Text>
      <Text style={styles.subtitle}>Higher quality = longer lifespan</Text>
      
      <View style={styles.qualityOptionsContainer}>
        {qualityOptions.map((option) => (
          <Pressable
            key={option.type}
            style={[
              styles.qualityCard,
              selectedQuality === option.type && styles.selectedCard
            ]}
            onPress={() => onSelectQuality(option.type)}
          >
            <LinearGradient
              colors={option.gradientColors}
              style={styles.qualityBadge}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.qualityType}>{option.type}</Text>
            </LinearGradient>
            
            <View style={styles.qualityInfo}>
              <Text style={styles.qualityLabel}>{option.label}</Text>
              <Text style={styles.qualityDescription}>{option.description}</Text>
            </View>
            
            {selectedQuality === option.type && (
              <View style={styles.checkIconContainer}>
                <Check size={20} color={COLORS.primary} />
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZE.s,
    fontFamily: 'Inter-Regular',
    color: COLORS.textLight,
    marginBottom: SPACING.m,
    textAlign: 'center',
  },
  qualityOptionsContainer: {
    marginTop: SPACING.s,
  },
  qualityCard: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.m,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: SPACING.m,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  qualityBadge: {
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
    borderTopLeftRadius: BORDER_RADIUS.m,
    borderBottomLeftRadius: BORDER_RADIUS.m,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  qualityType: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: FONT_SIZE.m,
  },
  qualityInfo: {
    flex: 1,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
  },
  qualityLabel: {
    fontSize: FONT_SIZE.m,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  qualityDescription: {
    fontSize: FONT_SIZE.s,
    fontFamily: 'Inter-Regular',
    color: COLORS.textLight,
  },
  checkIconContainer: {
    padding: SPACING.s,
  },
});