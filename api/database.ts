import { Platform } from 'react-native';

class Database {
  private static instance: Database;
  private isConnected: boolean = false;
  
  private constructor() {}
  
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  
  public async connect(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isConnected = true;
        console.log('Connected to database');
        resolve(true);
      }, 500);
    });
  }
  
  public async disconnect(): Promise<void> {
    this.isConnected = false;
    console.log('Disconnected from database');
  }
  
  public async query(sql: string, params: any[] = []): Promise<any> {
    console.log('Executing query:', sql);
    console.log('With params:', params);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        if (sql.includes('models')) {
          resolve(this.getMockModels(params[0]));
        } else if (sql.includes('JOIN vendors') || (sql.includes('vendors') && sql.includes('products'))) {
          // Handle vendor queries that join with products table
          resolve(this.getMockVendors(params[0], params[1]));
        } else if (sql.includes('products')) {
          resolve(this.getMockProducts(params[0], params[1]));
        } else if (sql.includes('vendors')) {
          resolve(this.getMockVendors(params[0], params[1]));
        } else {
          resolve([]);
        }
      }, 500);
    });
  }
  
  private getMockModels(category: string): any[] {
    if (category === 'Display') {
      return [
        { id: 1, model_name: 'iPhone 12', category: 'Display' },
        { id: 2, model_name: 'iPhone 13', category: 'Display' },
        { id: 3, model_name: 'iPhone 14', category: 'Display' },
        { id: 4, model_name: 'Samsung S21', category: 'Display' },
        { id: 5, model_name: 'Samsung S22', category: 'Display' },
        { id: 6, model_name: 'Samsung S23', category: 'Display' },
        { id: 7, model_name: 'Google Pixel 6', category: 'Display' },
        { id: 8, model_name: 'Google Pixel 7', category: 'Display' },
        { id: 9, model_name: 'OnePlus 10', category: 'Display' },
        { id: 10, model_name: 'OnePlus 11', category: 'Display' },
      ];
    } else if (category === 'Battery') {
      return [
        { id: 11, model_name: 'iPhone 12', category: 'Battery' },
        { id: 12, model_name: 'iPhone 13', category: 'Battery' },
        { id: 13, model_name: 'iPhone 14', category: 'Battery' },
        { id: 14, model_name: 'Samsung S21', category: 'Battery' },
        { id: 15, model_name: 'Samsung S22', category: 'Battery' },
        { id: 16, model_name: 'Samsung S23', category: 'Battery' },
        { id: 17, model_name: 'Google Pixel 6', category: 'Battery' },
        { id: 18, model_name: 'Google Pixel 7', category: 'Battery' },
        { id: 19, model_name: 'OnePlus 10', category: 'Battery' },
        { id: 20, model_name: 'OnePlus 11', category: 'Battery' },
      ];
    } else {
      return [];
    }
  }
  
  private getMockVendors(modelId: number, category: string): any[] {
    const vendors = [
      { id: 1, name: 'MobilePro Parts', rating: 4.8, deliveryDays: '1-2' },
      { id: 2, name: 'PhoneFix Supply', rating: 4.5, deliveryDays: '2-3' },
      { id: 3, name: 'TechParts Direct', rating: 4.7, deliveryDays: '1-3' },
      { id: 4, name: 'RepairHub Store', rating: 4.6, deliveryDays: '2-4' },
      { id: 5, name: 'GadgetFix Parts', rating: 4.4, deliveryDays: '3-5' },
    ];

    return this.getMockProducts(modelId, category).map(product => ({
      ...product,
      vendor: vendors[Math.floor(Math.random() * vendors.length)],
    }));
  }
  
  private getMockProducts(modelId: number, category: string): any[] {
    if (category === 'Display') {
      return [
        { id: 1, model_id: modelId, quality_type: 'OG', price: 120, stock: 5 },
        { id: 2, model_id: modelId, quality_type: 'A+', price: 100, stock: 10 },
        { id: 3, model_id: modelId, quality_type: 'A', price: 80, stock: 15 },
        { id: 4, model_id: modelId, quality_type: 'B', price: 60, stock: 20 },
        { id: 5, model_id: modelId, quality_type: 'Copy', price: 40, stock: 25 },
      ];
    } else if (category === 'Battery') {
      return [
        { id: 6, model_id: modelId, quality_type: 'OG', price: 50, stock: 8 },
        { id: 7, model_id: modelId, quality_type: 'A+', price: 40, stock: 12 },
        { id: 8, model_id: modelId, quality_type: 'A', price: 35, stock: 18 },
      ];
    } else {
      return [];
    }
  }
}

export default Database.getInstance();