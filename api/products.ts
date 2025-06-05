import database from './database';

export async function getModelsByCategory(category: string) {
  try {
    await database.connect();
    
    const query = `
      SELECT id, model_name, category 
      FROM models 
      WHERE category = $1
      ORDER BY model_name ASC
    `;
    
    const result = await database.query(query, [category]);
    return result;
  } catch (error) {
    console.error('Error fetching models by category:', error);
    throw error;
  }
}

export async function getVendorsByModel(modelId: number, category: string) {
  try {
    await database.connect();
    
    const query = `
      SELECT p.*, v.* 
      FROM products p
      JOIN vendors v ON p.vendor_id = v.id
      WHERE p.model_id = $1 AND p.category = $2
      ORDER BY p.price ASC
    `;
    
    const result = await database.query('vendors', [modelId, category]);
    return result;
  } catch (error) {
    console.error('Error fetching vendors by model:', error);
    throw error;
  }
}

export async function placeOrder(orderData: any) {
  try {
    await database.connect();
    
    const query = `
      INSERT INTO orders (
        customer_id, 
        model_id, 
        product_id, 
        vendor_id,
        quantity, 
        total_price, 
        order_date
      )
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING id
    `;
    
    const params = [
      orderData.customerId || null,
      orderData.modelId,
      orderData.productId,
      orderData.vendorId,
      orderData.quantity,
      orderData.totalPrice,
    ];
    
    const result = await database.query(query, params);
    return result[0]?.id;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
}