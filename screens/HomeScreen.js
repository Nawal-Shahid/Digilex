import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || 'User');
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Logged Out', 'You have been logged out successfully.');
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error.message);
      Alert.alert('Logout Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header with Logout */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi, {userName} 👋</Text>
            <Text style={styles.subGreeting}>Welcome to your DigiLex Dashboard</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Your Progress</Text>
          <Text style={styles.progressItem}>📘 Lessons Completed: 12</Text>
          <Text style={styles.progressItem}>🏅 Badges Earned: 5</Text>
          <Text style={styles.progressItem}>🔥 Streak: 4 days</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#3B82F6' }]}
            onPress={() => navigation.navigate('LessonStart')}
          >
            <Text style={styles.actionText}>📖 Start Lesson</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#10B981' }]}
            onPress={() => navigation.navigate('Achievements')}
          >
            <Text style={styles.actionText}>🏆 View Achievements</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#8B5CF6' }]}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.actionText}>⚙️ Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Image */}
        <View style={styles.footer}>
          <Image
            source={require('../assets/images/dashboardfooter.jpg')}
            style={styles.footerImage}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9E4FF',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subGreeting: {
    fontSize: 16,
    color: '#334155',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    elevation: 2,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 24,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1E293B',
  },
  progressItem: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 6,
  },
  actions: {
    gap: 16,
  },
  actionButton: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 30,
  },
  footerImage: {
    width: 300,
    height: 160,
    resizeMode: 'contain',
  },
});
