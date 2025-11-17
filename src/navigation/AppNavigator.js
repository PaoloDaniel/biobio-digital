import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';

// Main Screens
import HomeScreen from '../screens/HomeScreen';

// Telemedicine Screens
import TelemedicineScreen from '../screens/telemedicine/TelemedicineScreen';
import AppointmentBookingScreen from '../screens/telemedicine/AppointmentBookingScreen';

// Courses Screens
import CoursesScreen from '../screens/courses/CoursesScreen';
import CourseDetailScreen from '../screens/courses/CourseDetailScreen';

// WiFi Screens
import WiFiScreen from '../screens/wifi/WiFiScreen';

// Tramites Screens
import TramitesScreen from '../screens/tramites/TramitesScreen';
import TramiteDetailScreen from '../screens/tramites/TramiteDetailScreen';

// Admin Screens
import AdminScreen from '../screens/admin/AdminScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />

            {/* Telemedicine Stack */}
            <Stack.Screen name="Telemedicine" component={TelemedicineScreen} />
            <Stack.Screen name="AppointmentBooking" component={AppointmentBookingScreen} />

            {/* Courses Stack */}
            <Stack.Screen name="Courses" component={CoursesScreen} />
            <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />

            {/* WiFi Stack */}
            <Stack.Screen name="WiFi" component={WiFiScreen} />

            {/* Tramites Stack */}
            <Stack.Screen name="Tramites" component={TramitesScreen} />
            <Stack.Screen name="TramiteDetail" component={TramiteDetailScreen} />

            {/* Admin Stack */}
            <Stack.Screen name="Admin" component={AdminScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
