import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#DDEEFF' }}>
      <View style={{ flex: 1, justifyContent: 'space-around', marginVertical: 20, paddingHorizontal: 20 }}>
        
        {/* DigiLex Heading */}
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
              color: '#2B3A67',
              letterSpacing: 1,
              fontFamily: 'sans-serif',
            }}
          >
            DigiLex
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: '#2B3A67',
              textAlign: 'center',
              marginTop: 4,
              fontFamily: 'sans-serif',
            }}
          >
            Empowering Dyslexic Learners
          </Text>
        </View>

        {/* Image */}
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/images/wl.jpg')}
            style={{ width: 280, height: 280, borderRadius: 20 }}
            
          />
        </View>

        {/* Welcome Text */}
        <Text
          style={{
            fontSize: 26,
            textAlign: 'center',
            fontWeight: '600',
            color: '#2B3A67',
            fontFamily: 'sans-serif-light',
            marginTop: 10,
          }}
        >
          Welcome to Digilex, where learning is fun.
        </Text>

        {/* Buttons */}
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={{
              backgroundColor: '#4F7CAC',
              paddingVertical: 15,
              borderRadius: 12,
              marginHorizontal: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: '#FFF',
                fontWeight: 'bold',
                fontSize: 18,
                fontFamily: 'sans-serif',
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
            <Text style={{ color: '#2B3A67', fontWeight: '500', fontSize: 16 }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: '#4F7CAC', fontWeight: 'bold', marginLeft: 5, fontSize: 16 }}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
