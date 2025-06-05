import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getModelsByCategory, getVendorsByModel } from '@/api/products';

type Category = 'Display' | 'Battery' | null;
type QualityType = 'OG' | 'A+' | 'A' | 'B' | 'Copy' | null;

interface Model {
  id: number;
  model_name: string;
  category: string;
}

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

interface OrderContextType {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  
  models: Model[];
  loadingModels: boolean;
  errorModels: string | null;
  
  selectedModel: Model | null;
  setSelectedModel: (model: Model | null) => void;
  
  vendors: Vendor[];
  loadingVendors: boolean;
  errorVendors: string | null;
  selectedVendor: Vendor | null;
  setSelectedVendor: (vendor: Vendor | null) => void;
  
  quantity: number;
  setQuantity: (quantity: number) => void;
  
  totalPrice: number;
  
  resetOrder: () => void;
  placeOrder: () => Promise<boolean>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  const [models, setModels] = useState<Model[]>([]);
  const [loadingModels, setLoadingModels] = useState<boolean>(false);
  const [errorModels, setErrorModels] = useState<string | null>(null);
  
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loadingVendors, setLoadingVendors] = useState<boolean>(false);
  const [errorVendors, setErrorVendors] = useState<string | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (selectedCategory) {
      fetchModels(selectedCategory);
    } else {
      setModels([]);
    }
    
    setSelectedModel(null);
    setSelectedVendor(null);
    setQuantity(1);
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedModel) {
      fetchVendors(selectedModel.id, selectedCategory as string);
    } else {
      setVendors([]);
    }
    
    setSelectedVendor(null);
  }, [selectedModel]);

  useEffect(() => {
    if (selectedVendor) {
      setTotalPrice(selectedVendor.price * quantity);
    } else {
      setTotalPrice(0);
    }
  }, [selectedVendor, quantity]);

  const fetchModels = async (category: Category) => {
    setLoadingModels(true);
    setErrorModels(null);
    
    try {
      const data = await getModelsByCategory(category as string);
      setModels(data);
    } catch (error) {
      console.error('Error fetching models:', error);
      setErrorModels('Failed to load models. Please try again.');
    } finally {
      setLoadingModels(false);
    }
  };

  const fetchVendors = async (modelId: number, category: string) => {
    setLoadingVendors(true);
    setErrorVendors(null);
    
    try {
      const data = await getVendorsByModel(modelId, category);
      setVendors(data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      setErrorVendors('Failed to load vendors. Please try again.');
    } finally {
      setLoadingVendors(false);
    }
  };

  const resetOrder = () => {
    setSelectedCategory(null);
    setSelectedModel(null);
    setSelectedVendor(null);
    setQuantity(1);
  };

  const placeOrder = async (): Promise<boolean> => {
    if (!selectedVendor || !selectedModel) return false;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Order placed:', {
          category: selectedCategory,
          model: selectedModel.model_name,
          vendor: selectedVendor.vendor.name,
          quality: selectedVendor.quality_type,
          quantity,
          totalPrice,
        });
        resolve(true);
      }, 1000);
    });
  };

  const value: OrderContextType = {
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
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};