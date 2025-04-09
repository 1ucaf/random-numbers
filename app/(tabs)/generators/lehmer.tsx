import { useState } from 'react';
import { StyleSheet, TextInput, Button, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import * as Clipboard from 'expo-clipboard';

export default function Lehmer() {
  const [seed, setSeed] = useState('');
  const [t, setT] = useState('');
  const [quantity, setQuantity] = useState('');
  const [numbers, setNumbers] = useState<number[]>([]);
  
  const onCopy = async () => {
    await Clipboard.setStringAsync(numbers.join(', '));
  };

  const generateNumbers = () => {
    setNumbers([]);
    let current = parseInt(seed, 10);
    const tValue = parseInt(t, 10);
    const quantityValue = parseInt(quantity, 10);
  
    if (isNaN(current) || isNaN(tValue) || isNaN(quantityValue)) {
      return;
    }
  
    const nDigits = current.toString().length;
    const kDigits = tValue.toString().length;
  
    const newNumbers: number[] = [];
  
    for (let i = 0; i < quantityValue; i++) {
      const product = current * tValue;
      const productStr = product.toString().padStart(nDigits + kDigits, '0');
  
      const left = parseInt(productStr.slice(0, kDigits), 10);
      const right = parseInt(productStr.slice(kDigits), 10);
  
      current = right - left;
  
      // Normaliza a n dígitos
      const normalized = current.toString().padStart(nDigits, '0').slice(0, nDigits);
      current = parseInt(normalized, 10);
  
      // u_i = 0.nᵢ
      const ui = parseFloat('0.' + normalized);
      newNumbers.push(ui);
    }
  
    setNumbers(newNumbers);
  };  

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <ThemedText style={styles.titleContainer} type="title">Generar números aleatorios</ThemedText>
      <ThemedText style={styles.subtitleContainer} type="subtitle">Lehmer</ThemedText>
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
        placeholder="t"
        value={t}
        onChangeText={setT}
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
