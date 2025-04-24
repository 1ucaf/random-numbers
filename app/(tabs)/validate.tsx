import { Image, StyleSheet, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TestsScreen() {
  const router = useRouter();

  const tests: { title: string; view: string }[] = [
    {
      title: 'Prueba de Promedios',
      view: '/(tabs)/tests/averageTest',
    },
    {
      title: 'Prueba de Frecuencia',
      view: '/(tabs)/tests/frecuencyTest',
    },
    {
      title: 'Prueba KS',
      view: '/(tabs)/tests/ksTest',
    },
    {
      title: 'Prueba de Series',
      view: '/(tabs)/tests/seriesTest',
    },
    {
      title: 'Prueba de Corridas',
      view: '/(tabs)/tests/runsTest',
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
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Validar números aleatorios</ThemedText>
      </ThemedView>

      <View style={styles.optionsContainer}>
        {tests.map(({ title, view }, index) => (
          <Pressable
            key={index}
            style={styles.optionButton}
            onPress={() => router.push(view)} // Navega a la ruta correspondiente
          >
            <Text style={styles.optionText}>{title}</Text>
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