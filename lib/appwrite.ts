import { Client, Account, Databases, Storage, ID, Query, OAuthProvider } from 'appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Appwrite configuration
export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1', // Appwrite Cloud endpoint
  projectId: '6840af10002eee7a16b9', // Replace with your actual project ID
  databaseId: 'YOUR_DATABASE_ID', // Replace with your database ID
  userCollectionId: 'YOUR_USER_COLLECTION_ID',
  todoCollectionId: 'YOUR_TODO_COLLECTION_ID',
  orderCollectionId: 'YOUR_ORDER_COLLECTION_ID',
  storageId: 'YOUR_STORAGE_BUCKET_ID',
};

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Auth functions
export const authService = {
  // Create account
  async createAccount(email: string, password: string, name: string) {
    try {
      const newAccount = await account.create(ID.unique(), email, password, name);
      if (newAccount) {
        return await this.signIn(email, password);
      }
      return newAccount;
    } catch (error) {
      console.error('Create account error:', error);
      throw error;
    }
  },

  // Sign in
  async signIn(email: string, password: string) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      await AsyncStorage.setItem('userSession', JSON.stringify(session));
      return session;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  // Google OAuth
  async signInWithGoogle() {
    try {
      // For React Native, we'll use WebBrowser for OAuth
      const session = await account.createOAuth2Session(
        OAuthProvider.Google,
        'exp://localhost:8081', // Replace with your app scheme
        'exp://localhost:8081/error'
      );
      await AsyncStorage.setItem('userSession', JSON.stringify(session));
      return session;
    } catch (error) {
      console.error('Google OAuth error:', error);
      throw error;
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  // Sign out
  async signOut() {
    try {
      await account.deleteSession('current');
      await AsyncStorage.removeItem('userSession');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  // Check session
  async checkSession() {
    try {
      const storedSession = await AsyncStorage.getItem('userSession');
      if (storedSession) {
        return await this.getCurrentUser();
      }
      return null;
    } catch (error) {
      console.error('Check session error:', error);
      return null;
    }
  }
};

// Database functions
export const databaseService = {
  // Create document
  async createDocument(collectionId: string, data: any, documentId?: string) {
    try {
      return await databases.createDocument(
        appwriteConfig.databaseId,
        collectionId,
        documentId || ID.unique(),
        data
      );
    } catch (error) {
      console.error('Create document error:', error);
      throw error;
    }
  },

  // Get documents
  async getDocuments(collectionId: string, queries?: string[]) {
    try {
      return await databases.listDocuments(
        appwriteConfig.databaseId,
        collectionId,
        queries
      );
    } catch (error) {
      console.error('Get documents error:', error);
      throw error;
    }
  },

  // Update document
  async updateDocument(collectionId: string, documentId: string, data: any) {
    try {
      return await databases.updateDocument(
        appwriteConfig.databaseId,
        collectionId,
        documentId,
        data
      );
    } catch (error) {
      console.error('Update document error:', error);
      throw error;
    }
  },

  // Delete document
  async deleteDocument(collectionId: string, documentId: string) {
    try {
      return await databases.deleteDocument(
        appwriteConfig.databaseId,
        collectionId,
        documentId
      );
    } catch (error) {
      console.error('Delete document error:', error);
      throw error;
    }
  }
};

// Storage functions
export const storageService = {
  // Upload file
  async uploadFile(file: any, fileName?: string) {
    try {
      return await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error('Upload file error:', error);
      throw error;
    }
  },

  // Get file preview
  getFilePreview(fileId: string, width?: number, height?: number) {
    return storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      width,
      height
    );
  },

  // Get file download URL
  getFileDownload(fileId: string) {
    return storage.getFileDownload(appwriteConfig.storageId, fileId);
  },

  // Delete file
  async deleteFile(fileId: string) {
    try {
      return await storage.deleteFile(appwriteConfig.storageId, fileId);
    } catch (error) {
      console.error('Delete file error:', error);
      throw error;
    }
  }
};

// Real-time functions - using client directly for subscriptions
export const realtimeService = {
  // Subscribe to collection changes
  subscribeToCollection(collectionId: string, callback: (payload: any) => void) {
    return client.subscribe(
      `databases.${appwriteConfig.databaseId}.collections.${collectionId}.documents`,
      callback
    );
  },

  // Subscribe to document changes
  subscribeToDocument(collectionId: string, documentId: string, callback: (payload: any) => void) {
    return client.subscribe(
      `databases.${appwriteConfig.databaseId}.collections.${collectionId}.documents.${documentId}`,
      callback
    );
  }
};

export { ID, Query }; 