import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useOrder } from '@/context/OrderContext';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS, GRADIENTS } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

import CategorySelector from '@/components/CategorySelector';
import ModelSearch from '@/components/ModelSearch';
import VendorList from '@/components/VendorList';
import QuantitySelector from '@/components/QuantitySelector';
import PriceSummary from '@/components/PriceSummary';
import Button from '@/components/Button';
import { ChevronLeft, Check, CheckCircle, Package, Truck } from 'lucide-react-native';

export default function OrderScreen() {
  const params = useLocalSearchParams();
  const [orderStep, setOrderStep] = useState<number>(1);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
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
    placeOrder
  } = useOrder();
  
  useEffect(() => {
    if (params.category && ['Display', 'Battery'].includes(params.category as string)) {
      setSelectedCategory(params.category as 'Display' | 'Battery');
      setOrderStep(2);
    }
  }, [params]);
  
  const handleCategorySelect = (category: 'Display' | 'Battery') => {
    setSelectedCategory(category);
    setOrderStep(2);
  };
  
  const handleModelSelect = (model: any) => {
    setSelectedModel(model);
    setOrderStep(3);
  };
  
  const handleVendorSelect = (vendor: any) => {
    setSelectedVendor(vendor);
    setOrderStep(4);
  };
  
  const handlePlaceOrder = async () => {
    setLoading(true);
    
    try {
      const success = await placeOrder();
      
      if (success) {
        setOrderPlaced(true);
        setOrderStep(5);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleStartNewOrder = () => {
    resetOrder();
    setOrderPlaced(false);
    setOrderStep(1);
  };
  
  const renderOrderStep = () => {
    switch (orderStep) {
      case 1:
        return <CategorySelector onSelectCategory={handleCategorySelect} />;
      
      case 2:
        return (
          <View style={styles.stepContainer}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setOrderStep(1)}
            >
              <ChevronLeft size={20} color={COLORS.primary} />
              <Text style={styles.backButtonText}>Back to Categories</Text>
            </TouchableOpacity>
            
            <ModelSearch
              models={models}
              loading={loadingModels}
              error={errorModels}
              onSelectModel={handleModelSelect}
              selectedCategory={selectedCategory}
            />
          </View>
        );
      
      case 3:
        return (
          <View style={styles.stepContainer}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setOrderStep(2)}
            >
              <ChevronLeft size={20} color={COLORS.primary} />
              <Text style={styles.backButtonText}>Back to Models</Text>
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
              <VendorList
                vendors={vendors}
                onSelectVendor={handleVendorSelect}
                selectedVendor={selectedVendor}
              />
            )}
          </View>
        );
      
      case 4:
        return (
          <View style={styles.stepContainer}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setOrderStep(3)}
            >
              <ChevronLeft size={20} color={COLORS.primary} />
              <Text style={styles.backButtonText}>Back to Vendors</Text>
            </TouchableOpacity>
            
            <QuantitySelector
              quantity={quantity}
              onChangeQuantity={setQuantity}
              maxQuantity={selectedVendor?.stock || 10}
            />
            
            <PriceSummary
              price={selectedVendor?.price || 0}
              quantity={quantity}
              totalPrice={totalPrice}
              modelName={selectedModel?.model_name}
              quality={selectedVendor?.quality_type}
            />
            
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
        );
      
      case 5:
        return (
          <View style={styles.successContainer}>
            <LinearGradient
              colors={[COLORS.success + '20', COLORS.success + '10']}
              style={styles.successCard}
            >
              <View style={styles.successIconContainer}>
                <CheckCircle size={60} color={COLORS.success} />
              </View>
              
              <Text style={styles.successTitle}>Order Placed Successfully!</Text>
              <Text style={styles.successMessage}>
                Your order has been confirmed and will be processed within 24 hours.
              </Text>
              
              <View style={styles.orderSummary}>
                <View style={styles.summaryHeader}>
                  <Package size={20} color={COLORS.primary} />
                  <Text style={styles.summaryTitle}>Order Summary</Text>
                </View>
                
                <View style={styles.summaryDetails}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Product</Text>
                    <Text style={styles.summaryValue}>
                      {selectedCategory} - {selectedModel?.model_name}
                    </Text>
                  </View>
                  
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Vendor</Text>
                    <Text style={styles.summaryValue}>
                      {selectedVendor?.vendor.name}
                    </Text>
                  </View>
                  
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Quality</Text>
                    <Text style={styles.summaryValue}>
                      {selectedVendor?.quality_type}
                    </Text>
                  </View>
                  
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Quantity</Text>
                    <Text style={styles.summaryValue}>{quantity}</Text>
                  </View>
                  
                  <View style={styles.summaryDivider} />
                  
                  <View style={styles.summaryRow}>
                    <Text style={[styles.summaryLabel, styles.totalLabel]}>Total Amount</Text>
                    <Text style={[styles.summaryValue, styles.totalValue]}>
                      ${totalPrice.toFixed(2)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.deliveryInfo}>
                  <Truck size={16} color={COLORS.secondary} />
                  <Text style={styles.deliveryText}>
                    Expected delivery: {selectedVendor?.vendor.deliveryDays} days
                  </Text>
                </View>
              </View>
              
              <Button
                title="Start New Order"
                onPress={handleStartNewOrder}
                size="lg"
                variant="outline"
                fullWidth
                style={styles.newOrderButton}
              />
            </LinearGradient>
          </View>
        );
      
      default:
        return null;
    }
  };
  
  const getStepTitle = () => {
    switch (orderStep) {
      case 1: return 'Choose Category';
      case 2: return 'Select Model';
      case 3: return 'Pick Vendor';
      case 4: return 'Review Order';
      case 5: return 'Order Complete';
      default: return 'Order Process';
    }
  };
  
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
          <Text style={styles.headerTitle}>Order Mobile Parts</Text>
          <Text style={styles.headerSubtitle}>
            {orderStep < 5 ? `Step ${orderStep} of 4: ${getStepTitle()}` : 'Order Complete'}
          </Text>
          
          {/* Progress indicator */}
          {orderStep < 5 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBackground}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${(orderStep / 4) * 100}%` }
                  ]} 
                />
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.stepsContainer}>
          {renderOrderStep()}
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
    marginBottom: SPACING.l,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBackground: {
    width: '80%',
    height: 4,
    backgroundColor: COLORS.white + '30',
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.round,
  },
  content: {
    flex: 1,
  },
  stepsContainer: {
    padding: SPACING.xl,
  },
  stepContainer: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.grey100,
    borderRadius: BORDER_RADIUS.l,
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.l,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: FONT_SIZE.m,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.primary,
    marginLeft: SPACING.s,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl,
  },
  loadingText: {
    fontSize: FONT_SIZE.l,
    fontFamily: 'Inter-Regular',
    color: COLORS.textSecondary,
    marginTop: SPACING.l,
  },
  errorContainer: {
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.errorLight,
    borderRadius: BORDER_RADIUS.l,
    marginTop: SPACING.l,
  },
  errorText: {
    fontSize: FONT_SIZE.l,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.error,
    textAlign: 'center',
  },
  placeOrderButton: {
    marginTop: SPACING.xl,
  },
  successContainer: {
    flex: 1,
    paddingTop: SPACING.xl,
  },
  successCard: {
    borderRadius: BORDER_RADIUS.xxl,
    padding: SPACING.xxxl,
    alignItems: 'center',
    ...SHADOWS.lg,
  },
  successIconContainer: {
    marginBottom: SPACING.xl,
  },
  successTitle: {
    fontSize: FONT_SIZE.xxxxl,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.m,
  },
  successMessage: {
    fontSize: FONT_SIZE.l,
    fontFamily: 'Inter-Regular',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xxxl,
    lineHeight: FONT_SIZE.l * 1.4,
  },
  orderSummary: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
    ...SHADOWS.sm,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  summaryTitle: {
    fontSize: FONT_SIZE.xl,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    marginLeft: SPACING.s,
  },
  summaryDetails: {
    marginBottom: SPACING.l,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.s,
  },
  summaryLabel: {
    fontSize: FONT_SIZE.m,
    fontFamily: 'Inter-Regular',
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: FONT_SIZE.m,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
    flex: 1,
    textAlign: 'right',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.m,
  },
  totalLabel: {
    fontSize: FONT_SIZE.l,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
  },
  totalValue: {
    fontSize: FONT_SIZE.xl,
    fontFamily: 'Inter-Bold',
    color: COLORS.primary,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.grey100,
    borderRadius: BORDER_RADIUS.l,
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.l,
  },
  deliveryText: {
    fontSize: FONT_SIZE.s,
    fontFamily: 'Inter-Medium',
    color: COLORS.textSecondary,
    marginLeft: SPACING.s,
  },
  newOrderButton: {
    width: '100%',
  },
});