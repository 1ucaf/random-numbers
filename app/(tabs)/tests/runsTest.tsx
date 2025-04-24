import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Alert, Text, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRunsTest } from '@/hooks/useRunsTest';

export default function RunsTestScreen() {
  // Para almacenar el string de números pseudo-aleatorios separados por comas
  const [input, setInput] = useState('');
  // Valor crítico χ²_{α, n/2}
  const [chi2AlphaN2, setChi2AlphaN2] = useState('7.81');
  // Resultado de la prueba
  const [result, setResult] = useState<string | null>(null);

  const handleTest = () => {
    try {
      // Convertir el string en array de números
      const data = input
        .split(',')
        .map(num => parseFloat(num.trim()))
        .filter(n => !isNaN(n));

      if (!input.trim()) {
        throw new Error("Por favor, ingresa números pseudo-aleatorios separados por comas.");
      }
      if (data.length === 0) {
        throw new Error("El array de datos está vacío. Ingresa números separados por comas.");
      }
      if (data.length < 2) {
        throw new Error("Se requiere al menos dos números para ejecutar la prueba.");
      }

      // Convertir chi2AlphaN2 a número y validarlo
      const chi2AlphaN2Value = parseFloat(chi2AlphaN2);
      if (isNaN(chi2AlphaN2Value) || chi2AlphaN2Value <= 0) {
        throw new Error("El valor crítico χ²_{α, n/2} debe ser un número positivo.");
      }

      // Usar el hook para realizar la prueba de corridas
      const testResult = useRunsTest(data, chi2AlphaN2Value);
      setResult(testResult);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title" style={styles.whiteText}>
        Prueba de Corridas Arriba y Abajo de la Media
      </ThemedText>
      <Text style={[styles.description, styles.whiteText]}>
        Ingresa una lista de números pseudo-aleatorios separados por comas para convertirlos en una secuencia binaria y realizar la prueba.
        También ingresa el valor crítico χ²_alpha,n/2 para la prueba.
      </Text>

      {/* Input para la lista de números */}
      <TextInput
        style={[styles.input, styles.whiteText]}
        placeholder="Ejemplo: 0.12, 0.45, 0.78, 0.34, 0.56"
        placeholderTextColor="#ccc"
        value={input}
        onChangeText={setInput}
      />

      {/* Input para el valor crítico χ²_{α, n/2} */}
      <TextInput
        style={[styles.input, styles.whiteText]}
        placeholder="Valor crítico χ²_{α, n/2} (por defecto: 7.81)"
        placeholderTextColor="#ccc"
        value={chi2AlphaN2}
        onChangeText={setChi2AlphaN2}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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