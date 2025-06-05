import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppwrite } from '../context/AppwriteContext';
import { TodoItem } from './TodoItem';
import { appwriteConfig } from '../lib/appwrite';

interface Todo {
  $id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [creating, setCreating] = useState(false);
  const [realtimeStatus, setRealtimeStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');

  const { getTodos, createTodo, subscribeTo, user } = useAppwrite();

  // Load todos
  const loadTodos = useCallback(async () => {
    try {
      const response = await getTodos();
      setTodos(response.documents);
    } catch (error) {
      console.error('Failed to load todos:', error);
      Alert.alert('Error', 'Failed to load todos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [getTodos]);

  // Handle real-time updates
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const setupRealtime = () => {
      try {
        setRealtimeStatus('connecting');
        unsubscribe = subscribeTo(appwriteConfig.todoCollectionId, (payload) => {
          setRealtimeStatus('connected');
          console.log('Real-time update received:', payload);

          const { events, payload: data } = payload;
          
          // Handle different real-time events
          if (events.includes('databases.*.collections.*.documents.*.create')) {
            // New todo created
            if (data.userId === user?.$id) {
              setTodos(prev => [data, ...prev]);
            }
          } else if (events.includes('databases.*.collections.*.documents.*.update')) {
            // Todo updated
            if (data.userId === user?.$id) {
              setTodos(prev => prev.map(todo => 
                todo.$id === data.$id ? { ...todo, ...data } : todo
              ));
            }
          } else if (events.includes('databases.*.collections.*.documents.*.delete')) {
            // Todo deleted
            setTodos(prev => prev.filter(todo => todo.$id !== data.$id));
          }
        });
      } catch (error) {
        console.error('Real-time setup failed:', error);
        setRealtimeStatus('disconnected');
      }
    };

    if (user) {
      loadTodos();
      setupRealtime();
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, loadTodos, subscribeTo]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadTodos();
  };

  const handleCreateTodo = async () => {
    if (!newTodoTitle.trim()) {
      Alert.alert('Error', 'Please enter a todo title');
      return;
    }

    setCreating(true);
    try {
      const todoData = {
        title: newTodoTitle.trim(),
        description: newTodoDescription.trim() || null,
        completed: false,
        priority: newTodoPriority,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await createTodo(todoData);
      
      // Clear form
      setNewTodoTitle('');
      setNewTodoDescription('');
      setNewTodoPriority('medium');
      setShowAddModal(false);
      
      // Don't manually add to list - real-time will handle it
    } catch (error) {
      console.error('Failed to create todo:', error);
      Alert.alert('Error', 'Failed to create todo');
    } finally {
      setCreating(false);
    }
  };

  const getFilteredTodos = () => {
    return todos.sort((a, b) => {
      // Sort by completion status first (incomplete first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Then by priority (high → medium → low)
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      // Finally by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return '#4CAF50';
      case 'connecting':
        return '#FF9800';
      case 'disconnected':
        return '#F44336';
      default:
        return '#999';
    }
  };

  const renderTodo = ({ item }: { item: Todo }) => (
    <TodoItem
      todo={item}
      onUpdate={loadTodos} // Refresh list after updates
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Todos</Text>
        <View style={styles.realtimeStatus}>
          <View 
            style={[
              styles.statusDot, 
              { backgroundColor: getStatusColor(realtimeStatus) }
            ]} 
          />
          <Text style={styles.statusText}>
            {realtimeStatus === 'connected' ? 'Live' : 
             realtimeStatus === 'connecting' ? 'Connecting...' : 'Offline'}
          </Text>
        </View>
      </View>
      
      <View style={styles.stats}>
        <Text style={styles.statsText}>
          {todos.filter(t => !t.completed).length} pending • {todos.filter(t => t.completed).length} completed
        </Text>
      </View>
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddModal(true)}
      >
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={styles.loadingText}>Loading todos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={getFilteredTodos()}
        keyExtractor={(item) => item.$id}
        renderItem={renderTodo}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#667eea']}
            tintColor="#667eea"
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="checkmark-done-outline" size={64} color="#DDD" />
            <Text style={styles.emptyTitle}>No todos yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the "Add Todo" button to create your first todo
            </Text>
          </View>
        }
      />

      {/* Add Todo Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setShowAddModal(false)}
              style={styles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add New Todo</Text>
            <TouchableOpacity
              onPress={handleCreateTodo}
              disabled={creating || !newTodoTitle.trim()}
              style={[
                styles.modalSaveButton,
                (!newTodoTitle.trim() || creating) && styles.modalSaveButtonDisabled
              ]}
            >
              {creating ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.modalSaveButtonText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <TextInput
              style={styles.modalInput}
              placeholder="Todo title"
              value={newTodoTitle}
              onChangeText={setNewTodoTitle}
              autoFocus
            />
            
            <TextInput
              style={[styles.modalInput, styles.modalDescriptionInput]}
              placeholder="Description (optional)"
              value={newTodoDescription}
              onChangeText={setNewTodoDescription}
              multiline
              textAlignVertical="top"
            />

            <Text style={styles.priorityLabel}>Priority</Text>
            <View style={styles.priorityContainer}>
              {(['low', 'medium', 'high'] as const).map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={[
                    styles.priorityButton,
                    newTodoPriority === priority && styles.priorityButtonActive
                  ]}
                  onPress={() => setNewTodoPriority(priority)}
                >
                  <Text style={[
                    styles.priorityButtonText,
                    newTodoPriority === priority && styles.priorityButtonTextActive
                  ]}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    paddingVertical: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  realtimeStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  stats: {
    marginBottom: 16,
  },
  statsText: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalSaveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  modalSaveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  modalSaveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  modalDescriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  priorityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  priorityButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  priorityButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  priorityButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  priorityButtonTextActive: {
    color: '#fff',
  },
}); 