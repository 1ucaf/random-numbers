import { useMemo } from 'react'

/**
 * Hook para realizar la Prueba de Frecuencia
 * @param data Array de números pseudo-aleatorios (ui)
 * @param subintervals Número de sub-intervalos x
 * @param chi2Alpha Valor crítico χ²α para la prueba
 * @returns Mensaje con el resultado de la prueba
 */
export function useFrequencyTest(
  data: number[],
  subintervals: number,
  chi2Alpha: number
): string {
  return useMemo(() => {
    // 1. Calcular el tamaño de la muestra n
    const n = data.length

    // 2. Frecuencia esperada en cada sub-intervalo:
    //    Fe = n / x  
    const x = subintervals
    const Fe = n / x

    // 3. Determinar la frecuencia observada Fo_j en cada sub-intervalo
    //    Creamos un array de ceros de longitud x
    const observed = Array(x).fill(0)
    data.forEach((u) => {
      // Ubica el valor en el índice correspondiente [0..x-1]
      const idx = Math.min(Math.floor(u * x), x - 1)
      observed[idx] += 1
    })

    // 4. Calcular el estadístico χ²:
    //    χ² = (x / n) * Σ_{j=1..x} (Fo_j − Fe)²
    const sumSquaredDiffs = observed.reduce(
      (acc, Fo) => acc + Math.pow(Fo - Fe, 2),
      0
    )
    const chi2 = (x / n) * sumSquaredDiffs

    // 5. Si χ² < χ²α … no se rechaza la hipótesis de uniformidad
    const result =
      chi2 < chi2Alpha
        ? 'No se rechaza la hipótesis de que los números provienen de un universo uniformemente distribuido'
        : 'Se rechaza la hipótesis de que los números provienen de un universo uniformemente distribuido'

    return result
  }, [data, subintervals, chi2Alpha])
}
