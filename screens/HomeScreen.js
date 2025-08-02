import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function UserDashboard() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-[#C9E4FF]">
      <SafeAreaView className="flex-1 px-6">
        {/* Header */}
        <View className="mt-4 mb-6">
          <Text className="text-2xl font-bold text-gray-800">Hi, Nawal 👋</Text>
          <Text className="text-lg text-gray-600">Welcome to your DigiLex Dashboard</Text>
        </View>

        {/* Progress Card */}
        <View className="bg-white p-5 rounded-3xl shadow-md mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-2">Your Progress</Text>
          <Text className="text-gray-600 mb-1">Lessons Completed: 12</Text>
          <Text className="text-gray-600 mb-1">Badges Earned: 5</Text>
          <Text className="text-gray-600">Streak: 4 days 🔥</Text>
        </View>

        {/* Quick Actions */}
        <View className="space-y-4 mb-10">
          <TouchableOpacity
            className="bg-blue-500 py-4 px-6 rounded-2xl"
            onPress={() => navigation.navigate('LessonStart')}
          >
            <Text className="text-white text-lg font-semibold text-center">📘 Start Lesson</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-green-500 py-4 px-6 rounded-2xl"
            onPress={() => navigation.navigate('Achievements')}
          >
            <Text className="text-white text-lg font-semibold text-center">🏆 View Achievements</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-purple-500 py-4 px-6 rounded-2xl"
            onPress={() => navigation.navigate('Settings')}
          >
            <Text className="text-white text-lg font-semibold text-center">⚙️ Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Image */}
        <View className="flex-1 justify-end items-center">
          <Image
            source={require('../assets/images/dashboardfooter.jpg')} // Add this in your assets
            style={{ width: 300, height: 160, resizeMode: 'contain' }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
