import { useMemo } from 'react';

 /**
  * Hook para realizar la Prueba de los Promedios
  * @param data Array de números pseudo-aleatorios (ui)
  * @param alpha Valor crítico Zα para la prueba
  * @returns Mensaje con el resultado de la prueba
  */
export function useAverageTest(data: number[], alpha: number): string {
  return useMemo(() => {
    // 1. Calcular el tamaño de la muestra n
    const n = data.length;

    // 2. Calcular el promedio aritmético de los números
    //    \bar{X} = (u1 + u2 + ... + un) / n
    const sum = data.reduce((acc, val) => acc + val, 0);
    const mean = sum / n;

    // 3. Calcular el estadístico Z0 usando la fórmula:
    //    Z0 = (mean - 1/2) * sqrt(n) / sqrt(1/12)
    const numerator = mean - 0.5;
    const denominator = Math.sqrt(1 / 12);
    const z0 = (numerator * Math.sqrt(n)) / denominator;

    // 4. Comparar |Z0| con alpha:
    //    Si |Z0| < alpha, no se rechaza que vengan de U(0,1)
    const result =
      Math.abs(z0) < alpha
        ? 'No se rechaza la hipótesis de que los números provienen de un universo uniformemente distribuido'
        : 'Se rechaza la hipótesis de que los números provienen de un universo uniformemente distribuido';

    return result;
  }, [data, alpha]);
}
