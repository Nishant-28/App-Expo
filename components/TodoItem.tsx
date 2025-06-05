import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppwrite } from '../context/AppwriteContext';
import { storageService } from '../lib/appwrite';

interface TodoItemProps {
  todo: {
    $id: string;
    title: string;
    description?: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    attachments?: string[];
    createdAt: string;
    updatedAt: string;
  };
  onUpdate: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [isUpdating, setIsUpdating] = useState(false);
  
  const { updateTodo, deleteTodo, uploadFile, deleteFile } = useAppwrite();

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      await updateTodo(todo.$id, {
        completed: !todo.completed,
        updatedAt: new Date().toISOString(),
      });
      onUpdate();
    } catch (error) {
      Alert.alert('Error', 'Failed to update todo');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      Alert.alert('Error', 'Title cannot be empty');
      return;
    }

    setIsUpdating(true);
    try {
      await updateTodo(todo.$id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        updatedAt: new Date().toISOString(),
      });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      Alert.alert('Error', 'Failed to update todo');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Delete attachments first
              if (todo.attachments) {
                for (const fileId of todo.attachments) {
                  await deleteFile(fileId);
                }
              }
              await deleteTodo(todo.$id);
              onUpdate();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete todo');
            }
          },
        },
      ]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#FF6B6B';
      case 'medium':
        return '#FFD93D';
      case 'low':
        return '#6BCF7F';
      default:
        return '#DDD';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isEditing) {
    return (
      <View style={styles.container}>
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editTitle}
            onChangeText={setEditTitle}
            placeholder="Todo title"
            multiline
          />
          <TextInput
            style={[styles.editInput, styles.descriptionInput]}
            value={editDescription}
            onChangeText={setEditDescription}
            placeholder="Description (optional)"
            multiline
          />
          <View style={styles.editActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => {
                setIsEditing(false);
                setEditTitle(todo.title);
                setEditDescription(todo.description || '');
              }}
              disabled={isUpdating}
            >
              <Ionicons name="close" size={20} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.saveButton]}
              onPress={handleSaveEdit}
              disabled={isUpdating}
            >
              <Ionicons name="checkmark" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, todo.completed && styles.completedContainer]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={handleToggleComplete}
          disabled={isUpdating}
        >
          {todo.completed ? (
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          ) : (
            <Ionicons name="ellipse-outline" size={24} color="#DDD" />
          )}
        </TouchableOpacity>
        
        <View style={styles.content}>
          <Text style={[styles.title, todo.completed && styles.completedText]}>
            {todo.title}
          </Text>
          {todo.description && (
            <Text style={[styles.description, todo.completed && styles.completedText]}>
              {todo.description}
            </Text>
          )}
          
          <View style={styles.metadata}>
            <View style={styles.priorityContainer}>
              <View
                style={[
                  styles.priorityDot,
                  { backgroundColor: getPriorityColor(todo.priority) },
                ]}
              />
              <Text style={styles.priorityText}>{todo.priority}</Text>
            </View>
            
            {todo.dueDate && (
              <Text style={styles.dueDate}>
                Due: {formatDate(todo.dueDate)}
              </Text>
            )}
          </View>

          {todo.attachments && todo.attachments.length > 0 && (
            <View style={styles.attachments}>
              <Ionicons name="attach" size={16} color="#666" />
              <Text style={styles.attachmentText}>
                {todo.attachments.length} attachment{todo.attachments.length > 1 ? 's' : ''}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setIsEditing(true)}
          >
            <Ionicons name="create-outline" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedContainer: {
    opacity: 0.7,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  priorityText: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
  },
  dueDate: {
    fontSize: 12,
    color: '#666',
  },
  attachments: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachmentText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  editContainer: {
    width: '100%',
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
}); 