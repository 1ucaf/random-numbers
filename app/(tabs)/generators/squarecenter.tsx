import { useState } from 'react';
import { StyleSheet, TextInput, Button, View, ScrollView, ToastAndroid } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import * as Clipboard from 'expo-clipboard';

export default function SquareCenter() {
  const [seed, setSeed] = useState('');
  const [digits, setDigits] = useState('');
  const [quantity, setQuantity] = useState('');
  const [numbers, setNumbers] = useState<number[]>([]);

  const onCopy = async () => {
    await Clipboard.setStringAsync(numbers.join(', '));
  };

  const generateNumbers = () => {
    setNumbers([]);
    let seedValue = parseInt(seed, 10);
    const digitsValue = parseInt(digits, 10);
    const quantityValue = parseInt(quantity, 10);

    if (isNaN(seedValue) || isNaN(digitsValue) || isNaN(quantityValue)) {
      return;
    }
    for(let i = 0; i < quantityValue; i++) {
      let X = seedValue * seedValue;
      const lengthOfX = X.toString().length;
      const substraction = lengthOfX - digitsValue;
      //if substraction is odd, multiply X by 10
      if(substraction % 2 === 1) {
        X *= 10;
      }
      //get 3 center digits of X
      const center = X.toString().slice(lengthOfX / 2 - 1, lengthOfX / 2 + 2);
      seedValue = parseInt(center, 10);
      //u is seedValue/1000 with 3 decimals
      const u = seedValue / 1000;
      console.log(seedValue, substraction, X, center);
      setNumbers(numbers => [...numbers, u]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <ThemedText style={styles.titleContainer} type="title">Generar números aleatorios</ThemedText>
      <ThemedText style={styles.subtitleContainer} type="subtitle">Parte Central del Cuadrado</ThemedText>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Semilla"
        value={seed}
        onChangeText={setSeed}
      />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Dígitos"
        value={digits}
        onChangeText={setDigits}
      />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Cantidad de números"
        value={quantity}
        onChangeText={setQuantity}
      />

      <View style={styles.button}>
        <Button title="Generar" onPress={generateNumbers} />
      </View>

      {numbers.length > 0 && (
        <>
          <View style={styles.resultContainer}>
            <ThemedText style={styles.resultLabel}>Números generados:</ThemedText>
            <ThemedText>{numbers.join(', ')}</ThemedText>
          </View>
          <View>
            <Button title="copiar" onPress={onCopy} />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    gap: 8,
    padding: 16,
    paddingTop: 64,
    justifyContent: 'center',
    alignItems: 'center',
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
