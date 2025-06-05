# Tryodo - Real-time Todo App with Appwrite

A modern React Native todo application built with Expo and powered by Appwrite for backend services. Features real-time synchronization, user authentication, file storage, and cross-device syncing.

## 🚀 Features

### 🔐 Authentication
- **Email/Password Authentication**: Traditional sign-up and login
- **Google OAuth**: One-click sign-in with Google
- **Session Management**: Persistent authentication across app restarts
- **Secure Token Storage**: Uses AsyncStorage for secure session management

### 📱 Real-time Todo Management
- **Live Updates**: See changes instantly across all devices
- **CRUD Operations**: Create, read, update, and delete todos
- **Priority System**: Low, medium, and high priority todos
- **Rich Text Support**: Add descriptions and notes to todos
- **Completion Tracking**: Mark todos as complete/incomplete

### ☁️ Cloud Synchronization
- **Cross-device Sync**: Access your todos from any device
- **Offline Support**: Works offline with automatic sync when online
- **Real-time Collaboration**: Multiple users can see updates instantly
- **Data Persistence**: All data stored securely in Appwrite Cloud

### 📎 File Attachments
- **File Upload**: Attach images, documents, and files to todos
- **Cloud Storage**: Files stored in Appwrite's cloud storage
- **Automatic Cleanup**: Files deleted when todos are removed
- **Preview Support**: Preview images and documents

### 🎨 Modern UI/UX
- **Beautiful Interface**: Modern, clean design with smooth animations
- **Dark/Light Theme**: Automatic theme switching (coming soon)
- **Responsive Design**: Works great on phones and tablets
- **Native Feel**: Uses platform-specific components and interactions

## 🛠️ Technology Stack

- **Frontend**: React Native with Expo
- **Backend**: Appwrite Cloud
- **Database**: Appwrite Database with real-time subscriptions
- **Authentication**: Appwrite Auth with OAuth providers
- **Storage**: Appwrite Storage for file attachments
- **State Management**: React Context API
- **UI Components**: Custom components with React Native
- **Navigation**: Expo Router

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd tryodo
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Appwrite** (See APPWRITE_SETUP.md for detailed instructions)
   - Create an Appwrite Cloud account
   - Create a new project
   - Set up authentication with Google OAuth
   - Create database collections
   - Configure storage bucket
   - Update configuration in `lib/appwrite.ts`

4. **Start the development server**
```bash
npm run dev
```

## 🔧 Configuration

Update the Appwrite configuration in `lib/appwrite.ts`:

```typescript
export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: 'YOUR_PROJECT_ID',
  databaseId: 'YOUR_DATABASE_ID',
  userCollectionId: 'users',
  todoCollectionId: 'todos',
  orderCollectionId: 'orders',
  storageId: 'attachments',
};
```

## 📊 Database Schema

### Users Collection
- `userId` (string) - User's Appwrite account ID
- `name` (string) - User's display name
- `email` (string) - User's email
- `avatar` (string) - Profile picture URL
- `createdAt` (datetime) - Account creation date
- `updatedAt` (datetime) - Last update date

### Todos Collection
- `userId` (string) - Reference to user ID
- `title` (string) - Todo title
- `description` (string) - Todo description
- `completed` (boolean) - Completion status
- `priority` (enum) - low, medium, high
- `dueDate` (datetime) - Due date
- `attachments` (string) - JSON array of file IDs
- `createdAt` (datetime) - Creation date
- `updatedAt` (datetime) - Last update date

## 🎯 Key Features Implemented

### Real-time Updates
The app uses Appwrite's real-time subscriptions to provide instant updates:

```typescript
// Subscribe to todo collection changes
const unsubscribe = subscribeTo(appwriteConfig.todoCollectionId, (payload) => {
  const { events, payload: data } = payload;
  
  if (events.includes('databases.*.collections.*.documents.*.create')) {
    // Handle new todo creation
  } else if (events.includes('databases.*.collections.*.documents.*.update')) {
    // Handle todo updates
  } else if (events.includes('databases.*.collections.*.documents.*.delete')) {
    // Handle todo deletion
  }
});
```

### Authentication Flow
Seamless authentication with multiple providers:

```typescript
// Email/Password Authentication
await signUp(email, password, name);
await signIn(email, password);

// Google OAuth
await signInWithGoogle();

// Check current session
const user = await getCurrentUser();
```

### File Management
Easy file upload and management:

```typescript
// Upload file
const file = await uploadFile(fileData);

// Get file preview
const previewUrl = getFilePreview(fileId, 300, 300);

// Delete file
await deleteFile(fileId);
```

## 🚀 Future Enhancements

- [ ] Push notifications for reminders
- [ ] Collaborative todos (shared lists)
- [ ] Calendar integration
- [ ] Voice notes and transcription
- [ ] Advanced filtering and search
- [ ] Export functionality
- [ ] Offline-first architecture with WatermelonDB
- [ ] Analytics and insights
- [ ] Widgets for home screen
- [ ] Apple Watch/Wear OS companion app

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io) for providing an amazing backend-as-a-service
- [Expo](https://expo.dev) for the development platform
- [React Native](https://reactnative.dev) for the mobile framework

## 📞 Support

If you have any questions or need help setting up the project, please:

1. Check the [APPWRITE_SETUP.md](./APPWRITE_SETUP.md) for detailed setup instructions
2. Open an issue on GitHub
3. Contact the development team

---

**Happy Todo Management!** 🎉 