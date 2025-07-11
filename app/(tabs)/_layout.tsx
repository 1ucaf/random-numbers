import { Tabs } from 'expo-router';
import React from 'react';
import { OpaqueColorValue, Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Generar',
          tabBarIcon: ({ color }: { color: string | OpaqueColorValue }) => <MaterialIcons size={28} name="add" color={color} />,
        }}
      />
      <Tabs.Screen
        name="validate"
        options={{
          title: 'Validar',
          tabBarIcon: ({ color }: { color: string | OpaqueColorValue }) => <MaterialIcons size={28} name="published-with-changes" color={color} />,
        }}
      />
    </Tabs>
  );
}
