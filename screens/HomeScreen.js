import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Modal,
  Dimensions,
  Switch,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { RFValue } from "react-native-responsive-fontsize";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const { width, height } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState("Nawy");
  const [profilePic, setProfilePic] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: async () => {
            setIsLoggingOut(true);
            try {
              await signOut(auth);
              await AsyncStorage.multiRemove([
                'userToken', 
                'userData',
                'profilePic',
                'darkMode',
                'notifications'
              ]);
              navigation.replace('Login');
            } catch (error) {
              console.error("Logout error:", error);
              Alert.alert("Logout Failed", error.message);
            } finally {
              setIsLoggingOut(false);
            }
          } 
        }
      ]
    );
  };

  const handleProfileEdit = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission required", "We need access to your photos to change your profile picture");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
      await AsyncStorage.setItem('profilePic', result.assets[0].uri);
    }
  };

  const toggleDarkMode = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    await AsyncStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const toggleNotifications = async () => {
    const newSetting = !notifications;
    setNotifications(newSetting);
    await AsyncStorage.setItem('notifications', JSON.stringify(newSetting));
  };

  React.useEffect(() => {
    const loadPreferences = async () => {
      try {
        const [darkModePref, notificationsPref, savedProfilePic] = await Promise.all([
          AsyncStorage.getItem('darkMode'),
          AsyncStorage.getItem('notifications'),
          AsyncStorage.getItem('profilePic')
        ]);

        if (darkModePref !== null) setDarkMode(JSON.parse(darkModePref));
        if (notificationsPref !== null) setNotifications(JSON.parse(notificationsPref));
        if (savedProfilePic !== null) setProfilePic(savedProfilePic);
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    };

    loadPreferences();
  }, []);

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style={darkMode ? "dark" : "light"} />

        {/* HEADER */}
        <View style={[styles.header, darkMode && styles.darkHeader]}>
          <View style={styles.headerTextContainer}>
            <Text style={[styles.greeting, darkMode && styles.darkText]}>Hi, {userName} 👋</Text>
            <Text style={[styles.subGreeting, darkMode && styles.darkSubText]}>
              Welcome to your DigiLex Dashboard
            </Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.settingsButton}
              disabled={isLoggingOut}
            >
              <Text style={styles.settingsText}>⚙</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleLogout} 
              style={[styles.logoutButton, isLoggingOut && styles.logoutButtonDisabled]}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.logoutText}>Logout</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* PROFILE CARD */}
          <View style={[styles.profileCard, darkMode && styles.darkCard]}>
            <TouchableOpacity onPress={handleProfileEdit}>
              <Image
                source={
                  profilePic
                    ? { uri: profilePic }
                    : require("../assets/images/avatar.jpeg")
                }
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <View style={styles.profileTextContainer}>
              <Text style={[styles.profileName, darkMode && styles.darkText]}>{userName}</Text>
              <Text style={[styles.profileJoined, darkMode && styles.darkSubText]}>Joined May 2022</Text>
            </View>
          </View>

          {/* STATISTICS */}
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Your Stats</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
              <View style={[styles.statCard, darkMode && styles.darkCard]}>
                <Text style={styles.statValue}>6645</Text>
                <Text style={[styles.statLabel, darkMode && styles.darkSubText]}>Total XP</Text>
              </View>
              <View style={[styles.statCard, darkMode && styles.darkCard]}>
                <Text style={styles.statValue}>198</Text>
                <Text style={[styles.statLabel, darkMode && styles.darkSubText]}>Day Streak</Text>
              </View>
            </View>
            <View style={styles.statsRow}>
              <View style={[styles.statCard, darkMode && styles.darkCard]}>
                <Text style={styles.statValue}>Bronze</Text>
                <Text style={[styles.statLabel, darkMode && styles.darkSubText]}>Current League</Text>
              </View>
              <View style={[styles.statCard, darkMode && styles.darkCard]}>
                <Text style={styles.statValue}>5</Text>
                <Text style={[styles.statLabel, darkMode && styles.darkSubText]}>Courses Completed</Text>
              </View>
            </View>
          </View>

          {/* ACHIEVEMENTS */}
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            <View style={[styles.achievement, darkMode && styles.darkCard]}>
              <Text style={styles.achievementIcon}>🔥</Text>
              <View style={styles.achievementText}>
                <Text style={[styles.achievementTitle, darkMode && styles.darkText]}>Wildfire</Text>
                <Text style={[styles.achievementDesc, darkMode && styles.darkSubText]}>250 Day Streak Goal</Text>
              </View>
            </View>
            <View style={[styles.achievement, darkMode && styles.darkCard]}>
              <Text style={styles.achievementIcon}>📚</Text>
              <View style={styles.achievementText}>
                <Text style={[styles.achievementTitle, darkMode && styles.darkText]}>Sage</Text>
                <Text style={[styles.achievementDesc, darkMode && styles.darkSubText]}>Earn 7500 XP</Text>
              </View>
            </View>
          </View>

          {/* START LESSON BUTTON */}
          <TouchableOpacity 
            style={[styles.startLessonButton, darkMode && styles.darkButton]}
            onPress={() => navigation.navigate('Lessons')}
          >
            <Text style={styles.startLessonText}>🚀 Start Learning</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      {/* SETTINGS MODAL */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, darkMode && styles.darkModalContent]}>
            <Text style={[styles.modalTitle, darkMode && styles.darkText]}>Settings</Text>
            
            {/* Profile Picture Edit */}
            <TouchableOpacity
              style={[styles.modalButton, darkMode && styles.darkButton]}
              onPress={handleProfileEdit}
            >
              <Text style={styles.modalButtonText}>Edit Profile Picture</Text>
            </TouchableOpacity>

            {/* Dark Mode Toggle */}
            <View style={[styles.settingItem, darkMode && styles.darkCard]}>
              <Text style={[styles.settingText, darkMode && styles.darkText]}>Dark Mode</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={toggleDarkMode}
                value={darkMode}
              />
            </View>

            {/* Notifications Toggle */}
            <View style={[styles.settingItem, darkMode && styles.darkCard]}>
              <Text style={[styles.settingText, darkMode && styles.darkText]}>Notifications</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={notifications ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={toggleNotifications}
                value={notifications}
              />
            </View>

            {/* Close Button */}
            <TouchableOpacity
              style={[styles.modalButton, styles.closeButton, darkMode && styles.darkCloseButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.modalButtonText, styles.closeButtonText]}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Light mode background
  },
  darkContainer: {
    backgroundColor: "#0E1A2B", // Dark mode background
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  scrollContent: {
    paddingHorizontal: width * 0.05,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.06,
    paddingBottom: height * 0.03,
    marginTop: height * 0.02,
    backgroundColor: "#FFFFFF", // Light mode header
  },
  darkHeader: {
    backgroundColor: "#0E1A2B", // Dark mode header
  },
  headerTextContainer: {
    flex: 1,
  },
  greeting: {
    color: "#000000", // Light mode text
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  darkText: {
    color: "#FFFFFF", // Dark mode text
  },
  subGreeting: {
    color: "#666666", // Light mode subtext
    fontSize: RFValue(12),
    marginTop: 4,
  },
  darkSubText: {
    color: "#AAAAAA", // Dark mode subtext
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  settingsButton: {
    marginRight: width * 0.03,
  },
  settingsText: {
    fontSize: RFValue(22),
    color: "#1D4ED8", // Settings icon color
  },
  logoutButton: {
    backgroundColor: "#FF5C5C",
    paddingVertical: RFValue(6),
    paddingHorizontal: RFValue(12),
    borderRadius: 8,
  },
  logoutButtonDisabled: {
    opacity: 0.7,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(12),
  },
  profileCard: {
    backgroundColor: "#F0F4F8", // Light mode card
    flexDirection: "row",
    alignItems: "center",
    padding: RFValue(15),
    borderRadius: 12,
    marginVertical: height * 0.02,
  },
  darkCard: {
    backgroundColor: "#1F2C3E", // Dark mode card
  },
  profileImage: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    marginRight: width * 0.04,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    color: "#000000", // Light mode text
    fontSize: RFValue(16),
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileJoined: {
    color: "#666666", // Light mode subtext
    fontSize: RFValue(12),
  },
  sectionTitle: {
    color: "#000000", // Light mode text
    fontSize: RFValue(16),
    fontWeight: "bold",
    marginBottom: height * 0.015,
  },
  statsContainer: {
    marginBottom: height * 0.02,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.015,
  },
  statCard: {
    backgroundColor: "#F0F4F8", // Light mode card
    width: width * 0.43,
    padding: width * 0.04,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: {
    color: "#1D4ED8", // Accent color
    fontSize: RFValue(18),
    fontWeight: "bold",
    marginBottom: 5,
  },
  statLabel: {
    color: "#666666", // Light mode subtext
    fontSize: RFValue(12),
    textAlign: "center",
  },
  achievementsContainer: {
    marginBottom: height * 0.02,
  },
  achievement: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F4F8", // Light mode card
    padding: width * 0.04,
    borderRadius: 10,
    marginBottom: height * 0.015,
  },
  achievementIcon: {
    fontSize: RFValue(24),
    marginRight: width * 0.04,
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    color: "#000000", // Light mode text
    fontWeight: "bold",
    fontSize: RFValue(14),
    marginBottom: 2,
  },
  achievementDesc: {
    color: "#666666", // Light mode subtext
    fontSize: RFValue(12),
  },
  startLessonButton: {
    backgroundColor: "#4CAF50",
    padding: width * 0.04,
    borderRadius: 12,
    alignItems: "center",
    marginTop: height * 0.02,
  },
  darkButton: {
    backgroundColor: "#2E7D32", // Darker green for dark mode
  },
  startLessonText: {
    color: "#fff",
    fontSize: RFValue(16),
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: width * 0.85,
    borderRadius: 12,
    padding: width * 0.06,
  },
  darkModalContent: {
    backgroundColor: "#1F2C3E",
  },
  modalTitle: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    marginBottom: height * 0.02,
    textAlign: "center",
    color: "#000",
  },
  darkText: {
    color: "#FFFFFF",
  },
  modalButton: {
    backgroundColor: "#1D4ED8",
    padding: width * 0.04,
    borderRadius: 8,
    marginBottom: height * 0.015,
    alignItems: "center",
  },
  darkButton: {
    backgroundColor: "#1F2C3E",
  },
  closeButton: {
    backgroundColor: "#ccc",
    marginTop: height * 0.02,
  },
  darkCloseButton: {
    backgroundColor: "#555555",
  },
  closeButtonText: {
    color: "#000",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(14),
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  darkSettingItem: {
    backgroundColor: '#333333',
  },
  settingText: {
    fontSize: RFValue(14),
    color: '#333',
  },
  darkSettingText: {
    color: '#FFFFFF',
  },
});