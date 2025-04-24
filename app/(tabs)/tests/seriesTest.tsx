import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Alert, Text, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSeriesTest } from '@/hooks/useSeriesTest';

export default function SeriesTestScreen() {
  // Para almacenar el string de números separados por comas
  const [input, setInput] = useState('');
  // Número de divisiones por lado (x)
  const [divisions, setDivisions] = useState('5');
  // Valor crítico χ²α
  const [chi2Alpha, setChi2Alpha] = useState('16.92');
  // Resultado de la prueba
  const [result, setResult] = useState<string | null>(null);

  const handleTest = () => {
    try {
      // Convertir el string en array de números
      const numbers = input.split(',').map(num => parseFloat(num.trim())).filter(n => !isNaN(n));
      
      if (numbers.length === 0) {
        throw new Error("El array de datos está vacío. Ingresa números separados por comas.");
      }
      if (numbers.length < 2) {
        throw new Error("Se requieren al menos dos números para formar un par.");
      }
      if (numbers.length % 2 !== 0) {
        throw new Error("El número de elementos debe ser par para formar pares completos.");
      }

      // Crear el array de pares: [[u1, u2], [u3, u4], ...]
      const pairs: Array<[number, number]> = [];
      for (let i = 0; i < numbers.length; i += 2) {
        pairs.push([numbers[i], numbers[i + 1]]);
      }

      // Convertir divisions y chi2Alpha a números y validarlos
      const x = parseInt(divisions, 10);
      if (isNaN(x) || x <= 0) {
        throw new Error("El número de divisiones debe ser un entero positivo.");
      }
      const chi2AlphaValue = parseFloat(chi2Alpha);
      if (isNaN(chi2AlphaValue) || chi2AlphaValue <= 0) {
        throw new Error("El valor crítico χ²α debe ser un número positivo.");
      }

      // Usar el hook para realizar la prueba de la Serie
      const testResult = useSeriesTest(pairs, x, chi2AlphaValue);
      setResult(testResult);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title" style={styles.whiteText}>
        Prueba de la Serie
      </ThemedText>
      <Text style={[styles.description, styles.whiteText]}>
        Ingresa una lista de números pseudo-aleatorios separados por comas. Si no se copian ya en pares, se agruparán de a dos.
        Además, ingresa el número de divisiones (x) para crear x² celdas y el valor crítico χ²α.
      </Text>

      {/* Input para los números */}
      <TextInput
        style={[styles.input, styles.whiteText]}
        placeholder="Ejemplo: 0.12, 0.45, 0.78, 0.34, 0.56, 0.89"
        placeholderTextColor="#ccc"
        value={input}
        onChangeText={setInput}
      />

      {/* Input para el número de divisiones */}
      <TextInput
        style={[styles.input, styles.whiteText]}
        placeholder="Número de divisiones (por ejemplo: 5)"
        placeholderTextColor="#ccc"
        value={divisions}
        onChangeText={setDivisions}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
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
    backgroundColor: '#333',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    textAlign: 'center',
  },
  whiteText: {
    color: '#fff',
  },
});