import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService, databaseService, storageService, realtimeService, appwriteConfig } from '../lib/appwrite';

interface User {
  $id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

interface AppwriteContextType {
  // Auth state
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Auth methods
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  
  // Database methods
  createTodo: (todoData: any) => Promise<any>;
  getTodos: () => Promise<any>;
  updateTodo: (todoId: string, todoData: any) => Promise<any>;
  deleteTodo: (todoId: string) => Promise<void>;
  
  createOrder: (orderData: any) => Promise<any>;
  getOrders: () => Promise<any>;
  updateOrder: (orderId: string, orderData: any) => Promise<any>;
  deleteOrder: (orderId: string) => Promise<void>;
  
  // Storage methods
  uploadFile: (file: any) => Promise<any>;
  deleteFile: (fileId: string) => Promise<void>;
  
  // Real-time subscriptions
  subscribeTo: (collectionId: string, callback: (payload: any) => void) => () => void;
}

const AppwriteContext = createContext<AppwriteContextType | undefined>(undefined);

interface AppwriteProviderProps {
  children: ReactNode;
}

export const AppwriteProvider: React.FC<AppwriteProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check for existing session on mount
  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    setIsLoading(true);
    try {
      const currentUser = await authService.checkSession();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Session check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auth methods
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await authService.signIn(email, password);
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      await authService.createAccount(email, password, name);
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await authService.signInWithGoogle();
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Google sign in failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await authService.signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Todo methods
  const createTodo = async (todoData: any) => {
    try {
      const todo = await databaseService.createDocument(
        appwriteConfig.todoCollectionId,
        { ...todoData, userId: user?.$id }
      );
      return todo;
    } catch (error) {
      console.error('Create todo failed:', error);
      throw error;
    }
  };

  const getTodos = async () => {
    try {
      const todos = await databaseService.getDocuments(
        appwriteConfig.todoCollectionId,
        [`equal("userId", "${user?.$id}")`]
      );
      return todos;
    } catch (error) {
      console.error('Get todos failed:', error);
      throw error;
    }
  };

  const updateTodo = async (todoId: string, todoData: any) => {
    try {
      const updatedTodo = await databaseService.updateDocument(
        appwriteConfig.todoCollectionId,
        todoId,
        todoData
      );
      return updatedTodo;
    } catch (error) {
      console.error('Update todo failed:', error);
      throw error;
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      await databaseService.deleteDocument(appwriteConfig.todoCollectionId, todoId);
    } catch (error) {
      console.error('Delete todo failed:', error);
      throw error;
    }
  };

  // Order methods
  const createOrder = async (orderData: any) => {
    try {
      const order = await databaseService.createDocument(
        appwriteConfig.orderCollectionId,
        { ...orderData, userId: user?.$id }
      );
      return order;
    } catch (error) {
      console.error('Create order failed:', error);
      throw error;
    }
  };

  const getOrders = async () => {
    try {
      const orders = await databaseService.getDocuments(
        appwriteConfig.orderCollectionId,
        [`equal("userId", "${user?.$id}")`]
      );
      return orders;
    } catch (error) {
      console.error('Get orders failed:', error);
      throw error;
    }
  };

  const updateOrder = async (orderId: string, orderData: any) => {
    try {
      const updatedOrder = await databaseService.updateDocument(
        appwriteConfig.orderCollectionId,
        orderId,
        orderData
      );
      return updatedOrder;
    } catch (error) {
      console.error('Update order failed:', error);
      throw error;
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      await databaseService.deleteDocument(appwriteConfig.orderCollectionId, orderId);
    } catch (error) {
      console.error('Delete order failed:', error);
      throw error;
    }
  };

  // Storage methods
  const uploadFile = async (file: any) => {
    try {
      const uploadedFile = await storageService.uploadFile(file);
      return uploadedFile;
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  };

  const deleteFile = async (fileId: string) => {
    try {
      await storageService.deleteFile(fileId);
    } catch (error) {
      console.error('File deletion failed:', error);
      throw error;
    }
  };

  // Real-time subscription helper
  const subscribeTo = (collectionId: string, callback: (payload: any) => void) => {
    const unsubscribe = realtimeService.subscribeToCollection(collectionId, callback);
    return unsubscribe;
  };

  const contextValue: AppwriteContextType = {
    // Auth state
    user,
    isLoading,
    isAuthenticated,
    
    // Auth methods
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    
    // Database methods
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    createOrder,
    getOrders,
    updateOrder,
    deleteOrder,
    
    // Storage methods
    uploadFile,
    deleteFile,
    
    // Real-time methods
    subscribeTo,
  };

  return (
    <AppwriteContext.Provider value={contextValue}>
      {children}
    </AppwriteContext.Provider>
  );
};

export const useAppwrite = () => {
  const context = useContext(AppwriteContext);
  if (context === undefined) {
    throw new Error('useAppwrite must be used within an AppwriteProvider');
  }
  return context;
}; 