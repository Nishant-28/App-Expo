import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  Pressable, 
  ActivityIndicator 
} from 'react-native';
import { COLORS, SPACING, FONT_SIZE, SHADOWS, BORDER_RADIUS } from '@/constants/theme';
import { Search, X } from 'lucide-react-native';

interface Model {
  id: number;
  model_name: string;
  category: string;
}

type ModelSearchProps = {
  models: Model[];
  loading: boolean;
  error: string | null;
  onSelectModel: (model: Model) => void;
  selectedCategory: string | null;
};

export default function ModelSearch({ 
  models, 
  loading, 
  error, 
  onSelectModel,
  selectedCategory 
}: ModelSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredModels(models);
    } else {
      const filtered = models.filter(model => 
        model.model_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredModels(filtered);
    }
  }, [searchQuery, models]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const renderModelItem = ({ item }: { item: Model }) => (
    <Pressable
      style={styles.modelItem}
      onPress={() => onSelectModel(item)}
    >
      <Text style={styles.modelName}>{item.model_name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Select {selectedCategory} Model
      </Text>
      
      <View style={styles.searchContainer}>
        <Search size={20} color={COLORS.grey} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search mobile model..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={COLORS.grey}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={clearSearch} style={styles.clearButton}>
            <X size={18} color={COLORS.grey} />
          </Pressable>
        )}
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : filteredModels.length > 0 ? (
        <FlatList
          data={filteredModels}
          renderItem={renderModelItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.modelsList}
          contentContainerStyle={styles.modelsListContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noResultsText}>No models found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    marginBottom: SPACING.m,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.greyLight,
    borderRadius: BORDER_RADIUS.m,
    paddingHorizontal: SPACING.m,
    marginBottom: SPACING.m,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    marginRight: SPACING.s,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: FONT_SIZE.m,
    fontFamily: 'Inter-Regular',
    color: COLORS.text,
  },
  clearButton: {
    padding: SPACING.xs,
  },
  modelsList: {
    maxHeight: 300,
  },
  modelsListContent: {
    paddingVertical: SPACING.s,
  },
  modelItem: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.m,
    marginBottom: SPACING.s,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modelName: {
    fontSize: FONT_SIZE.m,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
  },
  loader: {
    marginTop: SPACING.xl,
  },
  errorText: {
    fontSize: FONT_SIZE.m,
    fontFamily: 'Inter-Regular',
    color: COLORS.error,
    textAlign: 'center',
    marginTop: SPACING.m,
  },
  noResultsText: {
    fontSize: FONT_SIZE.m,
    fontFamily: 'Inter-Regular',
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
});