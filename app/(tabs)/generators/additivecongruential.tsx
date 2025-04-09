import { ThemedText } from "@/components/ThemedText";
import React, { useState } from "react";
import { StyleSheet, TextInput, Button, ScrollView, View, NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";
import * as Clipboard from 'expo-clipboard';

type seedType = number | undefined;

const checkIfAnyIsNaN = (list: number[]) => {
  for (let i = 0; i < list.length; i++) {
    if (isNaN(list[i])) {
      return true;
    }
  }
  return false;
}

const CongruentialMixedGenerator = () => {
  const [m, setM] = useState("");
  const [quantity, setQuantity] = useState("");
  const [seed0Text, setSeed0Text] = useState<string>('');
  const [seed1Text, setSeed1Text] = useState<string>('');
  const [seed2Text, setSeed2Text] = useState<string>('');
  const [seed3Text, setSeed3Text] = useState<string>('');
  const [normalizedNumbers, setNormalizedNumbers] = useState<string[]>([]);
  
  const onCopy = async () => {
    await Clipboard.setStringAsync(normalizedNumbers.join(', '));
  };

  const generateNumbers = () => {
    const seed0 = parseInt(seed0Text, 10);
    const seed1 = parseInt(seed1Text, 10);
    const seed2 = parseInt(seed2Text, 10);
    const seed3 = parseInt(seed3Text, 10);
    const mValue = parseInt(m, 10);
    const quantityValue = parseInt(quantity, 10);

    const newNumbers = [seed0, seed1, seed2, seed3];
    setNormalizedNumbers([]);

    if (
      checkIfAnyIsNaN(newNumbers) ||
      isNaN(quantityValue) ||
      isNaN(mValue) ||
      mValue <= 0
    ) {
      return;
    }

    const generatedNormalizedNumbers: string[] = [];

    for (let i = 0; i < quantityValue; i++) {
      let higherIndex = newNumbers.length - 4;
      let currentIndex = newNumbers.length - 1;
  
      let current = newNumbers[currentIndex];
      current = (current + newNumbers[higherIndex]) % mValue;
      newNumbers.push(current);
      generatedNormalizedNumbers.push((current / mValue).toFixed(3));
    }
    setNormalizedNumbers(generatedNormalizedNumbers);
  };

  const preventNotNumbers = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    const key = e.nativeEvent.key;
    if (!/^[0-9\b]+$/.test(key)) {
      e.preventDefault();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <ThemedText style={styles.titleContainer} type="title">Generar números aleatorios</ThemedText>
      <ThemedText style={styles.subtitleContainer} type="subtitle">Generador Congruencial Aditivo</ThemedText>

      <TextInput
        placeholder="Semilla (n₋₃)"
        keyboardType="numeric"
        id='0'
        value={seed0Text}
        onChangeText={setSeed0Text}
        onKeyPress={preventNotNumbers}
        style={styles.input}
      />
      <TextInput
        placeholder="Semilla (n₋₂)"
        id='1'
        keyboardType="numeric"
        value={seed1Text}
        onChangeText={setSeed1Text}
        onKeyPress={preventNotNumbers}
        style={styles.input}
      />
      <TextInput
        placeholder="Semilla (n₋₁)"
        id='2'
        keyboardType="numeric"
        value={seed2Text}
        onChangeText={setSeed2Text}
        onKeyPress={preventNotNumbers}
        style={styles.input}
      />
      <TextInput
        placeholder="Semilla (n₀)"
        id='3'
        keyboardType="numeric"
        value={seed3Text}
        onChangeText={setSeed3Text}
        onKeyPress={preventNotNumbers}
        style={styles.input}
      />
      <TextInput
        placeholder="Módulo (m)"
        keyboardType="numeric"
        value={m}
        onChangeText={setM}
        onKeyPress={preventNotNumbers}
        style={styles.input}
      />
      <TextInput
        placeholder="Cantidad de números"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
        onKeyPress={preventNotNumbers}
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