import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, SHADOWS, BORDER_RADIUS, GRADIENTS } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/Button';
import { User, Package, Star, Settings, LogOut, Phone, Mail } from 'lucide-react-native';

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      {/* Header with gradient */}
      <LinearGradient
        colors={GRADIENTS.primary as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Account</Text>
          <Text style={styles.headerSubtitle}>Manage your profile and preferences</Text>
        </View>
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <User size={32} color={COLORS.primary} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Guest User</Text>
                <Text style={styles.profileEmail}>Sign in to access your account</Text>
              </View>
            </View>
            
            <View style={styles.loginButtons}>
              <Button
                title="Sign In"
                onPress={() => {}}
                variant="gradient"
                fullWidth
                style={styles.signInButton}
              />
              <Button
                title="Create Account"
                onPress={() => {}}
                variant="outline"
                fullWidth
                style={styles.createAccountButton}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Package size={20} color={COLORS.primary} />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>My Orders</Text>
              <Text style={styles.menuSubtext}>View order history</Text>
            </View>
          </View>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Star size={20} color={COLORS.secondary} />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Favorites</Text>
              <Text style={styles.menuSubtext}>Saved items</Text>
            </View>
          </View>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Settings size={20} color={COLORS.accent} />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Settings</Text>
              <Text style={styles.menuSubtext}>App preferences</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.supportSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <View style={styles.supportCard}>
            <LinearGradient
              colors={[COLORS.grey100, COLORS.white]}
              style={styles.supportGradient}
            >
              <Text style={styles.supportTitle}>Need Help?</Text>
              <Text style={styles.supportText}>
                Contact our customer support team for assistance with your orders or any questions.
              </Text>
              
              <View style={styles.contactOptions}>
                <View style={styles.contactItem}>
                  <Phone size={16} color={COLORS.primary} />
                  <Text style={styles.contactText}>Call Support</Text>
                </View>
                <View style={styles.contactItem}>
                  <Mail size={16} color={COLORS.secondary} />
                  <Text style={styles.contactText}>Email Us</Text>
                </View>
              </View>
              
              <Button
                title="Contact Support"
                onPress={() => {}}
                variant="outline"
                size="md"
                fullWidth
                style={styles.supportButton}
              />
            </LinearGradient>
          </View>
        </View>
        
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.copyright}>© 2025 Mobile Parts Store</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerGradient: {
    paddingTop: SPACING.massive,
    paddingBottom: SPACING.xl,
  },
  header: {
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZE.xxxxl,
    fontFamily: 'Inter-Bold',
    color: COLORS.textInverse,
    textAlign: 'center',
    marginBottom: SPACING.s,
  },
  headerSubtitle: {
    fontSize: FONT_SIZE.l,
    fontFamily: 'Inter-Regular',
    color: COLORS.textInverse + 'CC',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: SPACING.xl,
    marginTop: -SPACING.l,
    marginBottom: SPACING.xxxl,
  },
  profileCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xxl,
    padding: SPACING.xl,
    ...SHADOWS.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.l,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: FONT_SIZE.xl,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  profileEmail: {
    fontSize: FONT_SIZE.m,
    fontFamily: 'Inter-Regular',
    color: COLORS.textSecondary,
  },
  loginButtons: {
    gap: SPACING.m,
  },
  signInButton: {
    marginBottom: SPACING.s,
  },
  createAccountButton: {
    // No additional styling needed
  },
  menuSection: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xxxl,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xxl,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    marginBottom: SPACING.l,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.l,
    marginBottom: SPACING.m,
    ...SHADOWS.sm,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.l,
    backgroundColor: COLORS.grey100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.l,
  },
  menuContent: {
    flex: 1,
  },
  menuText: {
    fontSize: FONT_SIZE.l,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  menuSubtext: {
    fontSize: FONT_SIZE.s,
    fontFamily: 'Inter-Regular',
    color: COLORS.textSecondary,
  },
  supportSection: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xxxl,
  },
  supportCard: {
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  supportGradient: {
    padding: SPACING.xl,
  },
  supportTitle: {
    fontSize: FONT_SIZE.xl,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  supportText: {
    fontSize: FONT_SIZE.m,
    fontFamily: 'Inter-Regular',
    color: COLORS.textSecondary,
    lineHeight: FONT_SIZE.m * 1.4,
    marginBottom: SPACING.l,
  },
  contactOptions: {
    flexDirection: 'row',
    gap: SPACING.l,
    marginBottom: SPACING.l,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.s,
  },
  contactText: {
    fontSize: FONT_SIZE.s,
    fontFamily: 'Inter-Medium',
    color: COLORS.textSecondary,
  },
  supportButton: {
    // No additional styling needed
  },
  appInfo: {
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    paddingBottom: SPACING.xxxl,
  },
  appVersion: {
    fontSize: FONT_SIZE.s,
    fontFamily: 'Inter-Regular',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  copyright: {
    fontSize: FONT_SIZE.xs,
    fontFamily: 'Inter-Regular',
    color: COLORS.textTertiary,
  },
});