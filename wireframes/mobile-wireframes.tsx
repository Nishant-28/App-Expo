import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native"
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from "@/constants/theme"

const { width } = Dimensions.get("window")

// Mobile UI Wireframes and Design Recommendations
export default function MobileWireframes() {
  return (
    <ScrollView style={styles.container}>
      {/* Design System Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mobile-First Design System</Text>

        <View style={styles.designCard}>
          <Text style={styles.cardTitle}>🎨 Color Scheme</Text>
          <Text style={styles.cardContent}>
            • Primary: Professional Blue (#2563EB) - Trust & reliability{"\n"}• Secondary: Slate Grey (#64748B) - Modern
            & clean{"\n"}• Accent: Success Green (#10B981) - Positive actions{"\n"}• Background: Light Grey (#F8FAFC) -
            Easy on eyes{"\n"}• Text: Dark Slate (#0F172A) - High contrast
          </Text>
        </View>

        <View style={styles.designCard}>
          <Text style={styles.cardTitle}>📱 Mobile Optimization</Text>
          <Text style={styles.cardContent}>
            • Minimum touch target: 44px (iOS) / 48dp (Android){"\n"}• Thumb-friendly navigation at bottom{"\n"}•
            Single-column layouts for mobile{"\n"}• Large, readable fonts (15px+ for body text){"\n"}• Reduced
            animations for low-end devices
          </Text>
        </View>

        <View style={styles.designCard}>
          <Text style={styles.cardTitle}>🚀 Performance Features</Text>
          <Text style={styles.cardContent}>
            • Lazy loading for images and lists{"\n"}• Minimal shadows and gradients{"\n"}• Optimized font sizes and
            spacing{"\n"}• Fast animations (100-200ms){"\n"}• Efficient state management
          </Text>
        </View>
      </View>

      {/* Home Screen Wireframe */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📱 Home Screen Layout</Text>

        <View style={styles.wireframe}>
          <View style={styles.wireframeHeader}>
            <Text style={styles.wireframeText}>Header: User Info + Sign Out</Text>
          </View>

          <View style={styles.wireframeSearchBar}>
            <Text style={styles.wireframeText}>Search Bar (Prominent)</Text>
          </View>

          <View style={styles.wireframeStats}>
            <Text style={styles.wireframeText}>Quick Stats: Products | Rating | Delivery</Text>
          </View>

          <View style={styles.wireframeCategories}>
            <Text style={styles.wireframeText}>Categories Grid (2 columns)</Text>
            <View style={styles.categoryGrid}>
              <View style={styles.categoryItem}>
                <Text style={styles.wireframeSmallText}>Display</Text>
              </View>
              <View style={styles.categoryItem}>
                <Text style={styles.wireframeSmallText}>Battery</Text>
              </View>
            </View>
          </View>

          <View style={styles.wireframeFeatures}>
            <Text style={styles.wireframeText}>Trust Indicators</Text>
          </View>

          <View style={styles.wireframeActions}>
            <Text style={styles.wireframeText}>Quick Actions</Text>
          </View>
        </View>
      </View>

      {/* Product Detail Screen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛍️ Product Detail Screen</Text>

        <View style={styles.wireframe}>
          <View style={styles.wireframeHeader}>
            <Text style={styles.wireframeText}>Back Button + Progress Bar</Text>
          </View>

          <View style={styles.wireframeVendorCard}>
            <Text style={styles.wireframeText}>Vendor Card</Text>
            <Text style={styles.wireframeSmallText}>
              • Recommended badge{"\n"}• Vendor name & rating{"\n"}• Quality indicator{"\n"}• Price & delivery info
              {"\n"}• Stock status
            </Text>
          </View>

          <View style={styles.wireframeVendorCard}>
            <Text style={styles.wireframeText}>Alternative Vendor</Text>
          </View>

          <View style={styles.wireframeVendorCard}>
            <Text style={styles.wireframeText}>Budget Option</Text>
          </View>
        </View>
      </View>

      {/* Cart/Checkout Screen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛒 Cart & Checkout Screen</Text>

        <View style={styles.wireframe}>
          <View style={styles.wireframeHeader}>
            <Text style={styles.wireframeText}>Review Your Order</Text>
          </View>

          <View style={styles.wireframeOrderSummary}>
            <Text style={styles.wireframeText}>Product Summary Card</Text>
            <Text style={styles.wireframeSmallText}>Category | Model | Vendor | Quality</Text>
          </View>

          <View style={styles.wireframeQuantity}>
            <Text style={styles.wireframeText}>Quantity Selector</Text>
          </View>

          <View style={styles.wireframePricing}>
            <Text style={styles.wireframeText}>Price Breakdown</Text>
            <Text style={styles.wireframeSmallText}>Unit Price + Quantity + Shipping = Total</Text>
          </View>

          <View style={styles.wireframeSecurity}>
            <Text style={styles.wireframeText}>Security & Trust Badges</Text>
          </View>

          <View style={styles.wireframeCTA}>
            <Text style={styles.wireframeText}>Place Order Button (Prominent)</Text>
          </View>
        </View>
      </View>

      {/* Typography & Spacing */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 Typography & Spacing</Text>

        <View style={styles.designCard}>
          <Text style={styles.cardTitle}>Font Hierarchy</Text>
          <Text style={[styles.cardContent, { fontSize: 28 }]}>Heading 1 (28px)</Text>
          <Text style={[styles.cardContent, { fontSize: 21 }]}>Heading 2 (21px)</Text>
          <Text style={[styles.cardContent, { fontSize: 17 }]}>Heading 3 (17px)</Text>
          <Text style={[styles.cardContent, { fontSize: 15 }]}>Body Text (15px)</Text>
          <Text style={[styles.cardContent, { fontSize: 13 }]}>Small Text (13px)</Text>
        </View>

        <View style={styles.designCard}>
          <Text style={styles.cardTitle}>Spacing System</Text>
          <View style={styles.spacingDemo}>
            <View style={[styles.spacingBox, { margin: 4 }]}>
              <Text style={styles.spacingText}>4px</Text>
            </View>
            <View style={[styles.spacingBox, { margin: 8 }]}>
              <Text style={styles.spacingText}>8px</Text>
            </View>
            <View style={[styles.spacingBox, { margin: 16 }]}>
              <Text style={styles.spacingText}>16px</Text>
            </View>
            <View style={[styles.spacingBox, { margin: 24 }]}>
              <Text style={styles.spacingText}>24px</Text>
            </View>
          </View>
        </View>
      </View>

      {/* User Flow Improvements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔄 User Flow Improvements</Text>

        <View style={styles.designCard}>
          <Text style={styles.cardTitle}>Optimized User Journey</Text>
          <Text style={styles.cardContent}>
            1. Landing → Clear category selection{"\n"}
            2. Category → Visual model search with filters{"\n"}
            3. Model → Vendor comparison with recommendations{"\n"}
            4. Vendor → Simple quantity selection{"\n"}
            5. Review → Clear pricing breakdown{"\n"}
            6. Success → Order tracking & next steps
          </Text>
        </View>

        <View style={styles.designCard}>
          <Text style={styles.cardTitle}>Micro-Interactions</Text>
          <Text style={styles.cardContent}>
            • Haptic feedback on button taps{"\n"}• Smooth scale animations (0.96x){"\n"}• Progress indicators for
            multi-step flows{"\n"}• Loading states with meaningful messages{"\n"}• Success animations for completed
            actions
          </Text>
        </View>

        <View style={styles.designCard}>
          <Text style={styles.cardTitle}>Accessibility Features</Text>
          <Text style={styles.cardContent}>
            • High contrast ratios (4.5:1 minimum){"\n"}• Large touch targets (44px+){"\n"}• Clear visual hierarchy
            {"\n"}• Readable fonts at all sizes{"\n"}• Descriptive button labels
          </Text>
        </View>
      </View>

      {/* Performance Recommendations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ Performance for Tier 2/3 Cities</Text>

        <View style={styles.designCard}>
          <Text style={styles.cardTitle}>Low-End Device Optimization</Text>
          <Text style={styles.cardContent}>
            • Reduced animation complexity{"\n"}• Minimal use of gradients and shadows{"\n"}• Optimized image sizes and
            formats{"\n"}• Efficient list rendering with FlatList{"\n"}• Memory-conscious state management
          </Text>
        </View>

        <View style={styles.designCard}>
          <Text style={styles.cardTitle}>Network Optimization</Text>
          <Text style={styles.cardContent}>
            • Offline-first approach where possible{"\n"}• Progressive loading of content{"\n"}• Compressed images and
            assets{"\n"}• Minimal API calls with caching{"\n"}• Graceful degradation for slow networks
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.l,
  },
  section: {
    marginBottom: SPACING.xxxl,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xxl,
    fontFamily: "Inter-Bold",
    color: COLORS.text,
    marginBottom: SPACING.l,
  },
  designCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.l,
    marginBottom: SPACING.m,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: {
    fontSize: FONT_SIZE.l,
    fontFamily: "Inter-Bold",
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  cardContent: {
    fontSize: FONT_SIZE.m,
    fontFamily: "Inter-Regular",
    color: COLORS.textSecondary,
    lineHeight: FONT_SIZE.m * 1.4,
  },
  wireframe: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.l,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: "dashed",
  },
  wireframeHeader: {
    backgroundColor: COLORS.primary + "20",
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.m,
  },
  wireframeSearchBar: {
    backgroundColor: COLORS.grey200,
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.m,
  },
  wireframeStats: {
    backgroundColor: COLORS.accent + "20",
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.m,
  },
  wireframeCategories: {
    backgroundColor: COLORS.grey100,
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.m,
  },
  wireframeFeatures: {
    backgroundColor: COLORS.info + "20",
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.m,
  },
  wireframeActions: {
    backgroundColor: COLORS.warning + "20",
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
  },
  wireframeVendorCard: {
    backgroundColor: COLORS.grey100,
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.m,
  },
  wireframeOrderSummary: {
    backgroundColor: COLORS.primary + "10",
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.m,
  },
  wireframeQuantity: {
    backgroundColor: COLORS.accent + "10",
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.m,
  },
  wireframePricing: {
    backgroundColor: COLORS.warning + "10",
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.m,
  },
  wireframeSecurity: {
    backgroundColor: COLORS.info + "10",
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.m,
  },
  wireframeCTA: {
    backgroundColor: COLORS.primary + "30",
    padding: SPACING.l,
    borderRadius: BORDER_RADIUS.m,
  },
  wireframeText: {
    fontSize: FONT_SIZE.m,
    fontFamily: "Inter-SemiBold",
    color: COLORS.text,
    textAlign: "center",
  },
  wireframeSmallText: {
    fontSize: FONT_SIZE.s,
    fontFamily: "Inter-Regular",
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: "center",
  },
  categoryGrid: {
    flexDirection: "row",
    gap: SPACING.s,
    marginTop: SPACING.s,
  },
  categoryItem: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    alignItems: "center",
  },
  spacingDemo: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  spacingBox: {
    backgroundColor: COLORS.primary + "20",
    borderRadius: BORDER_RADIUS.s,
  },
  spacingText: {
    fontSize: FONT_SIZE.xs,
    fontFamily: "Inter-Bold",
    color: COLORS.primary,
    padding: SPACING.s,
  },
})
