import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import { useAppwrite } from "@/context/AppwriteContext"
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from "@/constants/theme"
import { LinearGradient } from "expo-linear-gradient"
import { Smartphone, Battery, Star, TrendingUp, Clock, Shield, ChevronRight, Search } from "lucide-react-native"
import { router } from "expo-router"

const { width } = Dimensions.get("window")
const CARD_WIDTH = (width - SPACING.xl * 3) / 2

export default function HomeScreen() {
  const { user, signOut } = useAppwrite()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const navigateToCategory = (category: string) => {
    router.push(`/(tabs)/order?category=${category}`)
  }

  const categories = [
    {
      id: "Display",
      title: "Display",
      subtitle: "Screens & LCDs",
      icon: <Smartphone size={24} color={COLORS.primary} />,
      count: "2K+ Products",
      gradient: [COLORS.primary + "15", COLORS.primary + "05"],
    },
    {
      id: "Battery",
      title: "Battery",
      subtitle: "Power Solutions",
      icon: <Battery size={24} color={COLORS.accent} />,
      count: "1.5K+ Products",
      gradient: [COLORS.accent + "15", COLORS.accent + "05"],
    },
  ]

  const features = [
    { icon: <Shield size={16} color={COLORS.primary} />, text: "Quality Assured" },
    { icon: <Clock size={16} color={COLORS.primary} />, text: "Fast Delivery" },
    { icon: <Star size={16} color={COLORS.primary} />, text: "Top Rated" },
  ]

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.userSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase() || "U"}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.userName}>{user?.name || "User"}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <Search size={20} color={COLORS.textSecondary} />
          <Text style={styles.searchPlaceholder}>Search mobile parts...</Text>
        </TouchableOpacity>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.statsGradient}>
            <View style={styles.statsContent}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>3.5K+</Text>
                <Text style={styles.statLabel}>Products</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>4.8★</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>24h</Text>
                <Text style={styles.statLabel}>Delivery</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop by Category</Text>
            <Text style={styles.sectionSubtitle}>Find the perfect part for your device</Text>
          </View>

          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => navigateToCategory(category.id)}
                activeOpacity={0.8}
              >
                <LinearGradient colors={category.gradient} style={styles.categoryGradient}>
                  <View style={styles.categoryIcon}>{category.icon}</View>
                  <View style={styles.categoryContent}>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
                    <Text style={styles.categoryCount}>{category.count}</Text>
                  </View>
                  <ChevronRight size={16} color={COLORS.textSecondary} />
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us</Text>
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIcon}>{feature.icon}</View>
                <Text style={styles.featureText}>{feature.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton} onPress={() => router.push("/(tabs)/order")}>
              <TrendingUp size={20} color={COLORS.primary} />
              <Text style={styles.quickActionText}>Start Order</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton} onPress={() => router.push("/(tabs)/account")}>
              <Clock size={20} color={COLORS.accent} />
              <Text style={styles.quickActionText}>Order History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.m,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.l,
    fontFamily: "Inter-Bold",
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: FONT_SIZE.s,
    color: COLORS.textSecondary,
    fontFamily: "Inter-Regular",
  },
  userName: {
    fontSize: FONT_SIZE.l,
    fontFamily: "Inter-SemiBold",
    color: COLORS.text,
    marginTop: 2,
  },
  signOutButton: {
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    backgroundColor: COLORS.grey100,
  },
  signOutText: {
    fontSize: FONT_SIZE.s,
    color: COLORS.textSecondary,
    fontFamily: "Inter-Medium",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xxxl,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.l,
    marginTop: SPACING.l,
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.m,
    borderRadius: BORDER_RADIUS.l,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  searchPlaceholder: {
    marginLeft: SPACING.m,
    fontSize: FONT_SIZE.m,
    color: COLORS.textSecondary,
    fontFamily: "Inter-Regular",
  },
  statsContainer: {
    marginHorizontal: SPACING.l,
    marginTop: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    overflow: "hidden",
    ...SHADOWS.md,
  },
  statsGradient: {
    padding: SPACING.xl,
  },
  statsContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: FONT_SIZE.xxl,
    fontFamily: "Inter-Bold",
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZE.s,
    fontFamily: "Inter-Regular",
    color: COLORS.white + "CC",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.white + "30",
  },
  section: {
    marginTop: SPACING.xxxl,
    paddingHorizontal: SPACING.l,
  },
  sectionHeader: {
    marginBottom: SPACING.l,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xxl,
    fontFamily: "Inter-Bold",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    fontSize: FONT_SIZE.m,
    fontFamily: "Inter-Regular",
    color: COLORS.textSecondary,
  },
  categoriesGrid: {
    gap: SPACING.m,
  },
  categoryCard: {
    borderRadius: BORDER_RADIUS.xl,
    overflow: "hidden",
    ...SHADOWS.sm,
  },
  categoryGradient: {
    backgroundColor: COLORS.surface,
    padding: SPACING.l,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.l,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.m,
    ...SHADOWS.xs,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: FONT_SIZE.l,
    fontFamily: "Inter-SemiBold",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  categorySubtitle: {
    fontSize: FONT_SIZE.s,
    fontFamily: "Inter-Regular",
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  categoryCount: {
    fontSize: FONT_SIZE.xs,
    fontFamily: "Inter-Medium",
    color: COLORS.primary,
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.l,
    ...SHADOWS.sm,
  },
  featureItem: {
    alignItems: "center",
    flex: 1,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.l,
    backgroundColor: COLORS.primary + "15",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.s,
  },
  featureText: {
    fontSize: FONT_SIZE.s,
    fontFamily: "Inter-Medium",
    color: COLORS.text,
    textAlign: "center",
  },
  quickActions: {
    flexDirection: "row",
    gap: SPACING.m,
  },
  quickActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.l,
    paddingHorizontal: SPACING.m,
    borderRadius: BORDER_RADIUS.l,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  quickActionText: {
    marginLeft: SPACING.s,
    fontSize: FONT_SIZE.m,
    fontFamily: "Inter-SemiBold",
    color: COLORS.text,
  },
})
