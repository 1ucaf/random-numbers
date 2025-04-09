import { Image, StyleSheet, Platform, Pressable, Text, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Href, Link } from 'expo-router';

export default function HomeScreen() {

  const options: {title: string, view: Href}[] = [
    {
      title: 'Parte central de un cuadrado',
      view: '/(tabs)/generators/squarecenter',
    },
    {
      title: 'Método de Lehmer',
      view: '/(tabs)/generators/lehmer',
    },
    {
      title: 'Método Congruencial Mixto',
      view: '/(tabs)/generators/mixedcongruential',
    },
    {
      title: 'Método Congruencial Multiplicativo',
      view: '/(tabs)/generators/multiplicativecongruential',
    },
    {
      title: 'Método Congruencial Aditivo',
      view: '/(tabs)/generators/additivecongruential',
    },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Generar números aleatorios</ThemedText>
      </ThemedView>

      <View style={styles.optionsContainer}>
        {options.map(({title, view}, index) => (
          <Pressable
            key={index}
            style={styles.optionButton}
          >
            <Link style={styles.optionText} href={view}>{title}</Link>
          </Pressable>
        ))}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  optionsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
