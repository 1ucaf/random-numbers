import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useFrequencyTest } from '@/hooks/useFrecuencyTest';

export default function FrequencyTestScreen() {
  const [input, setInput] = useState(''); // Para almacenar el string de números
  const [subintervals, setSubintervals] = useState('10'); // Número de sub-intervalos (por defecto 10)
  const [chi2Alpha, setChi2Alpha] = useState('16.92'); // Valor crítico χ²α por defecto
  const [result, setResult] = useState<string | null>(null); // Resultado de la prueba

  const handleTest = () => {
    try {
      // Convertir el string de números en un array de números
      const data = input.split(',').map((num) => parseFloat(num.trim()));
      if (data.some(isNaN)) {
        throw new Error('Todos los valores deben ser números válidos.');
      }

      // Convertir subintervals y chi2Alpha a números
      const subintervalsValue = parseInt(subintervals, 10);
      const chi2AlphaValue = parseFloat(chi2Alpha);

      if (isNaN(subintervalsValue) || subintervalsValue <= 0) {
        throw new Error('El número de sub-intervalos debe ser un número entero positivo.');
      }

      if (isNaN(chi2AlphaValue)) {
        throw new Error('El valor crítico χ²α debe ser un número válido.');
      }

      // Usar el hook para realizar la prueba
      const testResult = useFrequencyTest(data, subintervalsValue, chi2AlphaValue);
      setResult(testResult);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.whiteText}>Prueba de Frecuencia</ThemedText>
      <Text style={[styles.description, styles.whiteText]}>
        Ingresa una lista de números pseudo-aleatorios separados por comas, el número de sub-intervalos y el valor crítico χ²α para realizar la prueba.
      </Text>

      {/* Input para los números */}
      <TextInput
        style={[styles.input, styles.whiteText]}
        placeholder="Ejemplo: 0.12, 0.45, 0.78, 0.34"
        placeholderTextColor="#ccc"
        value={input}
        onChangeText={setInput}
      />

      {/* Input para el número de sub-intervalos */}
      <TextInput
        style={[styles.input, styles.whiteText]}
        placeholder="Número de sub-intervalos (por defecto: 10)"
        placeholderTextColor="#ccc"
        value={subintervals}
        onChangeText={setSubintervals}
        keyboardType="numeric"
      />

      {/* Input para el valor crítico χ²α */}
      <TextInput
        style={[styles.input, styles.whiteText]}
        placeholder="Valor crítico χ²α (por defecto: 16.92)"
        placeholderTextColor="#ccc"
        value={chi2Alpha}
        onChangeText={setChi2Alpha}
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