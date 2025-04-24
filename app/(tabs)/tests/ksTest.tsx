import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Alert, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useKSTest } from '@/hooks/useKSTest';

export default function KSTestScreen() {
  const [input, setInput] = useState(''); // Para almacenar el string de números separados por comas
  const [dAlphaN, setDAlphaN] = useState('0.2'); // Valor crítico dₐₗₚₕₐₙ por defecto
  const [result, setResult] = useState<string | null>(null); // Resultado de la prueba

  const handleTest = () => {
    try {
      // Convertir el string a un array de números
      const data = input.split(',').map(num => parseFloat(num.trim()));
      if (data.length === 0 || (data.length === 1 && input.trim() === '')) {
        throw new Error("El array de datos está vacío. Ingresa números separados por comas.");
      }
      if (data.some(isNaN)) {
        throw new Error("Todos los valores deben ser números válidos.");
      }

      // Convertir dAlphaN a número y validarlo
      const dAlphaNValue = parseFloat(dAlphaN);
      if (isNaN(dAlphaNValue) || dAlphaNValue <= 0) {
        throw new Error("El valor crítico dₐₗₚₕₐₙ debe ser un número positivo.");
      }

      // Llamar al hook para realizar la prueba de Kolmogorov–Smirnov
      const testResult = useKSTest(data, dAlphaNValue);
      setResult(testResult);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.whiteText}>
        Prueba de Kolmogorov–Smirnov (K-S)
      </ThemedText>
      <Text style={[styles.description, styles.whiteText]}>
        Ingresa una lista de números pseudo-aleatorios separados por comas y el valor crítico dₐₗₚₕₐₙ para realizar la prueba.
      </Text>

      {/* Input para la lista de números */}
      <TextInput
        style={[styles.input, styles.whiteText]}
        placeholder="Ejemplo: 0.12, 0.45, 0.78, 0.34"
        placeholderTextColor="#ccc"
        value={input}
        onChangeText={setInput}
      />

      {/* Input para el valor crítico dₐₗₚₕₐₙ */}
      <TextInput
        style={[styles.input, styles.whiteText]}
        placeholder="Valor crítico dₐₗₚₕₐₙ (por defecto: 0.2)"
        placeholderTextColor="#ccc"
        value={dAlphaN}
        onChangeText={setDAlphaN}
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
    backgroundColor: '#fff',
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
    color: '#fff', // Color blanco para todos los textos
  },
});