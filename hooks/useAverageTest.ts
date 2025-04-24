import { useMemo } from 'react';

/**
 * Hook para realizar la Prueba de los Promedios
 * @param data Array de números pseudo-aleatorios (ui)
 * @param alpha Valor crítico Zα para la prueba
 * @returns Mensaje con el resultado de la prueba
 */
export function useAverageTest(data: number[], alpha: number): string {
  return useMemo(() => {
    console.log("data",data)
    console.log("alphaValue",alpha)
    // Validar que el array no esté vacío
    if (data.length === 0) {
      console.error('El array de datos está vacío.');
      return 'El array de datos está vacío. Por favor, ingresa números válidos.';
    }

    // Validar que alpha sea un número válido
    if (isNaN(alpha)) {
      console.error('El valor de alpha no es válido.');
      return 'El valor de alpha no es válido. Por favor, ingresa un número válido.';
    }

    // 1. Calcular el tamaño de la muestra n
    const n = data.length;

    // 2. Calcular el promedio aritmético de los números
    const sum = data.reduce((acc, val) => acc + val, 0);
    const mean = sum / n;
    console.log(sum,mean)

    // 3. Calcular el estadístico Z0 usando la fórmula:
    const numerator = mean - 0.5;
    const denominator = Math.sqrt(1 / 12);
    const z0 = (numerator * Math.sqrt(n)) / denominator;

    // 4. Comparar |Z0| con alpha:
    const result =
      Math.abs(z0) < alpha
        ? 'No se rechaza la hipótesis de que los números provienen de un universo uniformemente distribuido'
        : 'Se rechaza la hipótesis de que los números provienen de un universo uniformemente distribuido';

    return result;
  }, [data, alpha]);
}