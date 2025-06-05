"use client"

import { useState, useEffect } from "react"
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { useOrder } from "@/context/OrderContext"
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from "@/constants/theme"

import CategorySelector from "@/components/CategorySelector"
import ModelSearch from "@/components/ModelSearch"
import VendorList from "@/components/VendorList"
import QuantitySelector from "@/components/QuantitySelector"
import Button from "@/components/Button"
import { ChevronLeft, CheckCircle, Package, Truck, Shield, CreditCard } from "lucide-react-native"

const { width } = Dimensions.get("window")

export default function OrderScreen() {
  const params = useLocalSearchParams()
  const [orderStep, setOrderStep] = useState<number>(1)
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const {
    selectedCategory,
    setSelectedCategory,
    models,
    loadingModels,
    errorModels,
    selectedModel,
    setSelectedModel,
    vendors,
    loadingVendors,
    errorVendors,
    selectedVendor,
    setSelectedVendor,
    quantity,
    setQuantity,
    totalPrice,
    resetOrder,
    placeOrder,
  } = useOrder()

  useEffect(() => {
    if (params.category && ["Display", "Battery"].includes(params.category as string)) {
      setSelectedCategory(params.category as "Display" | "Battery")
      setOrderStep(2)
    }
  }, [params])

  const handleCategorySelect = (category: "Display" | "Battery") => {
    setSelectedCategory(category)
    setOrderStep(2)
  }

  const handleModelSelect = (model: any) => {
    setSelectedModel(model)
    setOrderStep(3)
  }

  const handleVendorSelect = (vendor: any) => {
    setSelectedVendor(vendor)
    setOrderStep(4)
  }

  const handlePlaceOrder = async () => {
    setLoading(true)

    try {
      const success = await placeOrder()

      if (success) {
        setOrderPlaced(true)
        setOrderStep(5)
      }
    } catch (error) {
      console.error("Error placing order:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartNewOrder = () => {
    resetOrder()
    setOrderPlaced(false)
    setOrderStep(1)
  }

  const renderProgressBar = () => {
    const steps = ["Category", "Model", "Vendor", "Review"]
    const currentProgress = Math.min(orderStep, 4)

    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentProgress / 4) * 100}%` }]} />
        </View>
        <View style={styles.progressSteps}>
          {steps.map((step, index) => (
            <View key={index} style={styles.progressStep}>
              <View style={[styles.progressDot, index < currentProgress && styles.progressDotActive]}>
                {index < currentProgress - 1 ? (
                  <CheckCircle size={12} color={COLORS.white} />
                ) : (
                  <Text style={[styles.progressDotText, index < currentProgress && styles.progressDotTextActive]}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={[styles.progressStepText, index < currentProgress && styles.progressStepTextActive]}>
                {step}
              </Text>
            </View>
          ))}
        </View>
      </View>
    )
  }

  const renderOrderStep = () => {
    switch (orderStep) {
      case 1:
        return <CategorySelector onSelectCategory={handleCategorySelect} />

      case 2:
        return (
          <View style={styles.stepContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => setOrderStep(1)}>
              <ChevronLeft size={20} color={COLORS.primary} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <ModelSearch
              models={models}
              loading={loadingModels}
              error={errorModels}
              onSelectModel={handleModelSelect}
              selectedCategory={selectedCategory}
            />
          </View>
        )

      case 3:
        return (
          <View style={styles.stepContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => setOrderStep(2)}>
              <ChevronLeft size={20} color={COLORS.primary} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            {loadingVendors ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Finding best vendors...</Text>
              </View>
            ) : errorVendors ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorVendors}</Text>
              </View>
            ) : (
              <VendorList vendors={vendors} onSelectVendor={handleVendorSelect} selectedVendor={selectedVendor} />
            )}
          </View>
        )

      case 4:
        return (
          <View style={styles.stepContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => setOrderStep(3)}>
              <ChevronLeft size={20} color={COLORS.primary} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            {/* Cart Summary */}
            <View style={styles.cartContainer}>
              <Text style={styles.cartTitle}>Review Your Order</Text>

              {/* Product Summary */}
              <View style={styles.productSummary}>
                <View style={styles.productHeader}>
                  <Package size={20} color={COLORS.primary} />
                  <Text style={styles.productTitle}>Product Details</Text>
                </View>

                <View style={styles.productDetails}>
                  <View style={styles.productRow}>
                    <Text style={styles.productLabel}>Category:</Text>
                    <Text style={styles.productValue}>{selectedCategory}</Text>
                  </View>
                  <View style={styles.productRow}>
                    <Text style={styles.productLabel}>Model:</Text>
                    <Text style={styles.productValue}>{selectedModel?.model_name}</Text>
                  </View>
                  <View style={styles.productRow}>
                    <Text style={styles.productLabel}>Vendor:</Text>
                    <Text style={styles.productValue}>{selectedVendor?.vendor.name}</Text>
                  </View>
                  <View style={styles.productRow}>
                    <Text style={styles.productLabel}>Quality:</Text>
                    <Text style={styles.productValue}>{selectedVendor?.quality_type}</Text>
                  </View>
                </View>
              </View>

              {/* Quantity Selector */}
              <QuantitySelector
                quantity={quantity}
                onChangeQuantity={setQuantity}
                maxQuantity={selectedVendor?.stock || 10}
              />

              {/* Price Summary */}
              <View style={styles.priceSummaryCard}>
                <View style={styles.priceHeader}>
                  <CreditCard size={20} color={COLORS.primary} />
                  <Text style={styles.priceTitle}>Price Breakdown</Text>
                </View>

                <View style={styles.priceDetails}>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Unit Price:</Text>
                    <Text style={styles.priceValue}>₹{selectedVendor?.price || 0}</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Quantity:</Text>
                    <Text style={styles.priceValue}>{quantity}</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Shipping:</Text>
                    <Text style={[styles.priceValue, styles.freeShipping]}>FREE</Text>
                  </View>

                  <View style={styles.priceDivider} />

                  <View style={styles.priceRow}>
                    <Text style={styles.totalLabel}>Total Amount:</Text>
                    <Text style={styles.totalValue}>₹{totalPrice}</Text>
                  </View>
                </View>

                {/* Delivery Info */}
                <View style={styles.deliveryInfo}>
                  <Truck size={16} color={COLORS.accent} />
                  <Text style={styles.deliveryText}>Expected delivery: {selectedVendor?.vendor.deliveryDays} days</Text>
                </View>
              </View>

              {/* Security Badge */}
              <View style={styles.securityBadge}>
                <Shield size={16} color={COLORS.primary} />
                <Text style={styles.securityText}>Secure payment • Quality guaranteed • Easy returns</Text>
              </View>
            </View>

            <Button
              title="Place Order"
              onPress={handlePlaceOrder}
              size="lg"
              variant="gradient"
              loading={loading}
              fullWidth
              style={styles.placeOrderButton}
            />
          </View>
        )

      case 5:
        return (
          <View style={styles.successContainer}>
            <View style={styles.successCard}>
              <View style={styles.successIconContainer}>
                <CheckCircle size={60} color={COLORS.accent} />
              </View>

              <Text style={styles.successTitle}>Order Placed Successfully!</Text>
              <Text style={styles.successMessage}>
                Your order has been confirmed and will be processed within 24 hours.
              </Text>

              <View style={styles.orderIdContainer}>
                <Text style={styles.orderIdLabel}>Order ID</Text>
                <Text style={styles.orderIdValue}>#ORD{Date.now().toString().slice(-6)}</Text>
              </View>

              <Button
                title="Start New Order"
                onPress={handleStartNewOrder}
                size="lg"
                variant="outline"
                fullWidth
                style={styles.newOrderButton}
              />

              <Button
                title="Track Order"
                onPress={() => {}}
                size="lg"
                variant="gradient"
                fullWidth
                style={styles.trackOrderButton}
              />
            </View>
          </View>
        )

      default:
        return null
    }
  }

  const getStepTitle = () => {
    switch (orderStep) {
      case 1:
        return "Choose Category"
      case 2:
        return "Select Model"
      case 3:
        return "Pick Vendor"
      case 4:
        return "Review & Pay"
      case 5:
        return "Order Complete"
      default:
        return "Order Process"
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Mobile Parts</Text>
        <Text style={styles.headerSubtitle}>{orderStep < 5 ? getStepTitle() : "Order Complete"}</Text>

        {/* Progress Bar */}
        {orderStep < 5 && renderProgressBar()}
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderOrderStep()}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.surface,
    paddingTop: SPACING.massive,
    paddingBottom: SPACING.l,
    paddingHorizontal: SPACING.l,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xxl,
    fontFamily: "Inter-Bold",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: FONT_SIZE.m,
    fontFamily: "Inter-Regular",
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.l,
  },
  progressContainer: {
    marginTop: SPACING.m,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.grey200,
    borderRadius: BORDER_RADIUS.round,
    overflow: "hidden",
    marginBottom: SPACING.m,
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.round,
  },
  progressSteps: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressStep: {
    alignItems: "center",
    flex: 1,
  },
  progressDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.grey300,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
  },
  progressDotText: {
    fontSize: FONT_SIZE.xs,
    fontFamily: "Inter-Bold",
    color: COLORS.textSecondary,
  },
  progressDotTextActive: {
    color: COLORS.white,
  },
  progressStepText: {
    fontSize: FONT_SIZE.xs,
    fontFamily: "Inter-Medium",
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  progressStepTextActive: {
    color: COLORS.primary,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xxxl,
  },
  stepContainer: {
    flex: 1,
    padding: SPACING.l,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.l,
    backgroundColor: COLORS.grey100,
    borderRadius: BORDER_RADIUS.m,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    alignSelf: "flex-start",
  },
  backButtonText: {
    fontSize: FONT_SIZE.m,
    fontFamily: "Inter-SemiBold",
    color: COLORS.primary,
    marginLeft: SPACING.xs,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xxxl,
  },
  loadingText: {
    fontSize: FONT_SIZE.m,
    fontFamily: "Inter-Regular",
    color: COLORS.textSecondary,
    marginTop: SPACING.l,
  },
  errorContainer: {
    alignItems: "center",
    padding: SPACING.l,
    backgroundColor: COLORS.errorLight,
    borderRadius: BORDER_RADIUS.l,
    marginTop: SPACING.l,
  },
  errorText: {
    fontSize: FONT_SIZE.m,
    fontFamily: "Inter-SemiBold",
    color: COLORS.error,
    textAlign: "center",
  },
  cartContainer: {
    marginBottom: SPACING.xl,
  },
  cartTitle: {
    fontSize: FONT_SIZE.xl,
    fontFamily: "Inter-Bold",
    color: COLORS.text,
    marginBottom: SPACING.l,
    textAlign: "center",
  },
  productSummary: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.l,
    marginBottom: SPACING.l,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  productHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.m,
  },
  productTitle: {
    fontSize: FONT_SIZE.l,
    fontFamily: "Inter-Bold",
    color: COLORS.text,
    marginLeft: SPACING.s,
  },
  productDetails: {
    gap: SPACING.s,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productLabel: {
    fontSize: FONT_SIZE.m,
    fontFamily: "Inter-Regular",
    color: COLORS.textSecondary,
  },
  productValue: {
    fontSize: FONT_SIZE.m,
    fontFamily: "Inter-SemiBold",
    color: COLORS.text,
    flex: 1,
    textAlign: "right",
  },
  priceSummaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.l,
    marginBottom: SPACING.l,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  priceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.m,
  },
  priceTitle: {
    fontSize: FONT_SIZE.l,
    fontFamily: "Inter-Bold",
    color: COLORS.text,
    marginLeft: SPACING.s,
  },
  priceDetails: {
    gap: SPACING.s,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: FONT_SIZE.m,
    fontFamily: "Inter-Regular",
    color: COLORS.textSecondary,
  },
  priceValue: {
    fontSize: FONT_SIZE.m,
    fontFamily: "Inter-SemiBold",
    color: COLORS.text,
  },
  freeShipping: {
    color: COLORS.accent,
  },
  priceDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.s,
  },
  totalLabel: {
    fontSize: FONT_SIZE.l,
    fontFamily: "Inter-Bold",
    color: COLORS.text,
  },
  totalValue: {
    fontSize: FONT_SIZE.xl,
    fontFamily: "Inter-Bold",
    color: COLORS.primary,
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.accent + "15",
    borderRadius: BORDER_RADIUS.m,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    marginTop: SPACING.m,
    gap: SPACING.s,
  },
  deliveryText: {
    fontSize: FONT_SIZE.s,
    fontFamily: "Inter-Medium",
    color: COLORS.accent,
  },
  securityBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary + "10",
    borderRadius: BORDER_RADIUS.m,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    marginBottom: SPACING.l,
    gap: SPACING.s,
  },
  securityText: {
    fontSize: FONT_SIZE.s,
    fontFamily: "Inter-Regular",
    color: COLORS.textSecondary,
    flex: 1,
  },
  placeOrderButton: {
    marginTop: SPACING.l,
  },
  successContainer: {
    flex: 1,
    padding: SPACING.l,
    justifyContent: "center",
  },
  successCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xxxl,
    alignItems: "center",
    ...SHADOWS.lg,
  },
  successIconContainer: {
    marginBottom: SPACING.xl,
  },
  successTitle: {
    fontSize: FONT_SIZE.xxxl,
    fontFamily: "Inter-Bold",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SPACING.m,
  },
  successMessage: {
    fontSize: FONT_SIZE.m,
    fontFamily: "Inter-Regular",
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.xl,
    lineHeight: FONT_SIZE.m * 1.4,
  },
  orderIdContainer: {
    backgroundColor: COLORS.grey100,
    borderRadius: BORDER_RADIUS.m,
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.l,
    marginBottom: SPACING.xl,
    alignItems: "center",
  },
  orderIdLabel: {
    fontSize: FONT_SIZE.s,
    fontFamily: "Inter-Regular",
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  orderIdValue: {
    fontSize: FONT_SIZE.l,
    fontFamily: "Inter-Bold",
    color: COLORS.primary,
  },
  newOrderButton: {
    marginBottom: SPACING.m,
  },
  trackOrderButton: {
    // No additional styling needed
  },
})
