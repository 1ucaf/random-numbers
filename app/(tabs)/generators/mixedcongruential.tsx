import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { StyleSheet,FlatList, TextInput, Button, ScrollView, View } from "react-native";
import * as Clipboard from 'expo-clipboard';

const CongruentialMixedGenerator = () => {
  const [seed, setSeed] = useState("");
  const [a, setA] = useState("");
  const [c, setC] = useState("");
  const [m, setM] = useState("");
  const [quantity, setQuantity] = useState("");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [normalizedNumbers, setNormalizedNumbers] = useState<number[]>([]);
  
  const onCopy = async () => {
    await Clipboard.setStringAsync(normalizedNumbers.join(', '));
  };

  const generateNumbers = () => {
    setNumbers([]);
    setNormalizedNumbers([]);

    let current = parseInt(seed, 10);
    const aValue = parseInt(a, 10);
    const cValue = parseInt(c, 10);
    const mValue = parseInt(m, 10);
    const quantityValue = parseInt(quantity, 10);

    if (
      isNaN(current) ||
      isNaN(aValue) ||
      isNaN(quantityValue) ||
      isNaN(cValue) ||
      isNaN(mValue) ||
      mValue <= 0
    ) {
      return;
    }

    const generatedNumbers: number[] = [];
    const generatedNormalizedNumbers: number[] = [];

    for (let i = 0; i < quantityValue; i++) {
      current = (aValue * current + cValue) % mValue;
      generatedNumbers.push(current);
      generatedNormalizedNumbers.push(current / mValue);
      console.log(current);
    }

    setNumbers(generatedNumbers);
    setNormalizedNumbers(generatedNormalizedNumbers);
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <ThemedText style={styles.titleContainer} type="title">Generar números aleatorios</ThemedText>
      <ThemedText style={styles.subtitleContainer} type="subtitle">Generador Congruencial Mixto</ThemedText>

      <TextInput
        placeholder="Semilla (n₀)"
        keyboardType="numeric"
        value={seed}
        onChangeText={setSeed}
        style={styles.input}
      />
      <TextInput
        placeholder="Constante multiplicativa (a)"
        keyboardType="numeric"
        value={a}
        onChangeText={setA}
        style={styles.input}
      />
      <TextInput
        placeholder="Constante aditiva (c)"
        keyboardType="numeric"
        value={c}
        onChangeText={setC}
        style={styles.input}
      />
      <TextInput
        placeholder="Módulo (m)"
        keyboardType="numeric"
        value={m}
        onChangeText={setM}
        style={styles.input}
      />
      <TextInput
        placeholder="Cantidad de números"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
        style={styles.input}
      />

      <Button title='Generar' onPress={generateNumbers}/>

      {normalizedNumbers.length > 0 && (
        <>
          <View style={styles.resultContainer}>
            <ThemedText style={styles.resultLabel}>Números generados:</ThemedText>
            <ThemedText>{normalizedNumbers.join(', ')}</ThemedText>
          </View>
          <View>
            <Button title="copiar" onPress={onCopy} />
          </View>
        </>
      )}
      
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    gap: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 64,
  },
  titleContainer: {
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitleContainer: {
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  button: {
    marginVertical: 12,
    width: '60%',
  },
  resultContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  resultLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default CongruentialMixedGenerator;