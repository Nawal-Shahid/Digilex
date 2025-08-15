import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

export default function LessonsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="auto" />
        
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Choose Your Lesson</Text>
            <Text style={styles.subtitle}>
              Select a category to start learning
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* CAPITAL LETTERS CARD */}
          <TouchableOpacity 
            style={[styles.lessonCard, styles.capitalCard]}
            onPress={() => navigation.navigate('Capital')}
          >
            <View style={styles.lessonContent}>
              <Text style={styles.lessonIcon}>🔠</Text>
              <View style={styles.lessonTextContainer}>
                <Text style={styles.lessonTitle}>Capital Letters</Text>
                <Text style={styles.lessonDescription}>
                  Learn uppercase letters A-Z with fun activities
                </Text>
              </View>
            </View>
            <Text style={styles.startText}>START →</Text>
          </TouchableOpacity>

          {/* SMALL LETTERS CARD */}
          <TouchableOpacity 
            style={[styles.lessonCard, styles.smallCard]}
            onPress={() => navigation.navigate('Small')}
          >
            <View style={styles.lessonContent}>
              <Text style={styles.lessonIcon}>🔡</Text>
              <View style={styles.lessonTextContainer}>
                <Text style={styles.lessonTitle}>Small Letters</Text>
                <Text style={styles.lessonDescription}>
                  Master lowercase letters a-z through interactive games
                </Text>
              </View>
            </View>
            <Text style={styles.startText}>START →</Text>
          </TouchableOpacity>

          {/* BOSSY R CARD */}
          <TouchableOpacity 
            style={[styles.lessonCard, styles.bossyCard]}
            onPress={() => navigation.navigate('BossyR')}
          >
            <View style={styles.lessonContent}>
              <Text style={styles.lessonIcon}>👑</Text>
              <View style={styles.lessonTextContainer}>
                <Text style={styles.lessonTitle}>Bossy R</Text>
                <Text style={styles.lessonDescription}>
                  Explore R-controlled vowels (ar, er, ir, or, ur)
                </Text>
              </View>
            </View>
            <Text style={styles.startText}>START →</Text>
          </TouchableOpacity>

          {/* PROGRESS SECTION */}
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressItem}>
              <View style={styles.progressCircle}>
                <Text style={styles.progressText}>25%</Text>
              </View>
              <Text style={styles.progressLabel}>Capital</Text>
            </View>
            <View style={styles.progressItem}>
              <View style={styles.progressCircle}>
                <Text style={styles.progressText}>10%</Text>
              </View>
              <Text style={styles.progressLabel}>Small</Text>
            </View>
            <View style={styles.progressItem}>
              <View style={styles.progressCircle}>
                <Text style={styles.progressText}>0%</Text>
              </View>
              <Text style={styles.progressLabel}>Bossy R</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: width * 0.05,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.04,
    paddingBottom: height * 0.02,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: RFValue(22),
    fontWeight: "bold",
    color: "#000000",
  },
  subtitle: {
    fontSize: RFValue(12),
    color: "#666666",
    marginTop: 4,
  },
  backButton: {
    marginLeft: 15,
    padding: 8,
  },
  backButtonText: {
    fontSize: RFValue(24),
    color: "#1D4ED8",
  },
  lessonCard: {
    borderRadius: 12,
    padding: width * 0.05,
    marginBottom: height * 0.02,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  capitalCard: {
    backgroundColor: "#E3F2FD",
  },
  smallCard: {
    backgroundColor: "#E8F5E9",
  },
  bossyCard: {
    backgroundColor: "#FFF3E0",
  },
  lessonContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  lessonIcon: {
    fontSize: RFValue(30),
    marginRight: width * 0.04,
  },
  lessonTextContainer: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: RFValue(12),
    color: "#666666",
  },
  startText: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    color: "#1D4ED8",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    color: "#000000",
    marginTop: height * 0.02,
    marginBottom: height * 0.015,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.02,
  },
  progressItem: {
    alignItems: "center",
    width: width * 0.28,
  },
  progressCircle: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.09,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  progressText: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: "#1D4ED8",
  },
  progressLabel: {
    fontSize: RFValue(12),
    color: "#666666",
  },
});