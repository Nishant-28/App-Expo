import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Switch, 
  TouchableOpacity 
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SPACING, FONT_SIZE, SHADOWS, BORDER_RADIUS, type ColorTheme } from '@/constants/theme';
import { 
  Bell, 
  Moon, 
  Globe, 
  Shield, 
  HelpCircle,
  ChevronRight
} from 'lucide-react-native';

export default function SettingsScreen() {
  const { theme, colors, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const styles = getStyles(colors);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>App Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={24} color={colors.text} style={styles.settingIcon} />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: colors.greyLight, true: colors.primaryLight }}
            thumbColor={notificationsEnabled ? colors.primary : colors.grey}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Moon size={24} color={colors.text} style={styles.settingIcon} />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.greyLight, true: colors.primaryLight }}
            thumbColor={theme === 'dark' ? colors.primary : colors.grey}
          />
        </View>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Globe size={24} color={colors.text} style={styles.settingIcon} />
            <Text style={styles.settingText}>Language</Text>
          </View>
          <View style={styles.settingAction}>
            <Text style={styles.settingValue}>English</Text>
            <ChevronRight size={20} color={colors.grey} />
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Privacy & Security</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Shield size={24} color={colors.text} style={styles.settingIcon} />
            <Text style={styles.settingText}>Privacy Policy</Text>
          </View>
          <ChevronRight size={20} color={colors.grey} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Shield size={24} color={colors.text} style={styles.settingIcon} />
            <Text style={styles.settingText}>Terms of Service</Text>
          </View>
          <ChevronRight size={20} color={colors.grey} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <HelpCircle size={24} color={colors.text} style={styles.settingIcon} />
            <Text style={styles.settingText}>Help Center</Text>
          </View>
          <ChevronRight size={20} color={colors.grey} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <HelpCircle size={24} color={colors.text} style={styles.settingIcon} />
            <Text style={styles.settingText}>Contact Support</Text>
          </View>
          <ChevronRight size={20} color={colors.grey} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingText}>App Version</Text>
          </View>
          <Text style={styles.settingValue}>1.0.0</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const getStyles = (colors: ColorTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: SPACING.xxl,
  },
  header: {
    paddingTop: SPACING.xxl,
    paddingHorizontal: SPACING.l,
    marginBottom: SPACING.l,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xxl,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  settingsSection: {
    marginHorizontal: SPACING.l,
    marginBottom: SPACING.l,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.l,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: SPACING.m,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: SPACING.m,
  },
  settingText: {
    fontSize: FONT_SIZE.m,
    fontFamily: 'Inter-Regular',
    color: colors.text,
  },
  settingAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: FONT_SIZE.s,
    fontFamily: 'Inter-Regular',
    color: colors.textLight,
    marginRight: SPACING.s,
  },
});