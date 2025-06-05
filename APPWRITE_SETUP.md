# Appwrite Setup Guide for Tryodo

This guide will help you set up Appwrite Cloud for your Tryodo application.

## 1. Create Appwrite Cloud Account

1. Go to https://cloud.appwrite.io
2. Sign up for a new account
3. Create a new project named "Tryodo"

## 2. Update Configuration

Copy your Project ID and update `lib/appwrite.ts`:

```typescript
export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: 'YOUR_PROJECT_ID', // Replace with your actual project ID
  databaseId: 'YOUR_DATABASE_ID',
  userCollectionId: 'users',
  todoCollectionId: 'todos', 
  orderCollectionId: 'orders',
  storageId: 'attachments',
};
```

## 3. Setup Authentication

1. Go to Auth → Settings
2. Add React Native platform
3. Enable Google OAuth2
4. Set redirect URLs: `exp://localhost:8081`

## 4. Create Database

1. Create database "TryodoDatabase"
2. Create collections with these schemas:

### Users Collection
- userId (string, required)
- name (string, required)
- email (string, required)
- avatar (string, optional)
- createdAt (datetime, required)
- updatedAt (datetime, required)

### Todos Collection  
- userId (string, required)
- title (string, required)
- description (string, optional)
- completed (boolean, default: false)
- priority (enum: low, medium, high)
- dueDate (datetime, optional)
- attachments (string, optional)
- createdAt (datetime, required)
- updatedAt (datetime, required)

### Orders Collection
- userId (string, required)
- title (string, required)
- description (string, optional)
- status (enum: pending, processing, completed, cancelled)
- priority (enum: low, medium, high)
- totalAmount (float, optional)
- dueDate (datetime, optional)
- createdAt (datetime, required)
- updatedAt (datetime, required)

## 5. Create Storage Bucket

1. Create bucket "attachments"
2. Set permissions for authenticated users
3. Max file size: 10MB

## 6. Set Permissions

For all collections and storage:
- Create: Users
- Read: Users (where userId = current user)
- Update: Users (where userId = current user)  
- Delete: Users (where userId = current user)

## 7. Test Your Setup

Run the app and test authentication, todos, and file uploads. 