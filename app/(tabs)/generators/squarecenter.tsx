import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAverageTest } from '@/hooks/useAverageTest';

export default function AverageTestScreen() {
  const [input, setInput] = useState(''); // Para almacenar el string de números
  const [alpha, setAlpha] = useState('1.96'); // Valor crítico Zα por defecto
  const [result, setResult] = useState<string | null>(null); // Resultado de la prueba

  const handleTest = () => {
    try {
      // Convertir el string de números en un array de números
      const data = input.split(',').map((num) => parseFloat(num.trim()));
      if (data.some(isNaN)) {
        throw new Error('Todos los valores deben ser números válidos.');
      }

      // Convertir alpha a número
      const alphaValue = parseFloat(alpha);
      if (isNaN(alphaValue)) {
        throw new Error('El valor de alpha debe ser un número válido.');
      }

      // Usar el hook para realizar la prueba
      const testResult = useAverageTest(data, alphaValue);
      setResult(testResult);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.whiteText}>Prueba de Promedios</ThemedText>
      <Text style={[styles.description, styles.whiteText]}>
        Ingresa una lista de números pseudo-aleatorios separados por comas y el valor crítico Zα para realizar la prueba.
      </Text>

      {/* Input para los números */}
      <TextInput
        style={[styles.input, styles.whiteText]}
        placeholder="Ejemplo: 0.12, 0.45, 0.78, 0.34"
        placeholderTextColor="#ccc"
        value={input}
        onChangeText={setInput}
      />

      {/* Input para el valor crítico alpha */}
      <TextInput
        style={[styles.input, styles.whiteText]}
        placeholder="Valor crítico Zα (por defecto: 1.96)"
        placeholderTextColor="#ccc"
        value={alpha}
        onChangeText={setAlpha}
        keyboardType="numeric"
      />

      {/* Botón para realizar la prueba */}
      <Button title="Realizar Prueba" onPress={handleTest} />

      {/* Mostrar el resultado */}
      {result && (
        <View style={styles.resultContainer}>
          <Text style={[styles.resultText, styles.whiteText]}>{result}</Text>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Fondo oscuro para resaltar el texto blanco
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#333', // Fondo oscuro para el resultado
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    textAlign: 'center',
  },
  whiteText: {
    color: '#fff', // Color blanco para los textos
  },
});