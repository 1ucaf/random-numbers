import { useMemo } from 'react'

/**
 * Hook para realizar la Prueba de la Serie
 * @param pairs Array de pares de números pseudo-aleatorios [[u_i, u_{i+1}], …]
 * @param x Número de divisiones por lado (se crean x² celdas)
 * @param chi2Alpha Valor crítico χ²α para la prueba
 * @returns Mensaje con el resultado de la prueba
 */
export function useSeriesTest(
  pairs: Array<[number, number]>,
  x: number,
  chi2Alpha: number
): string {
  return useMemo(() => {
    // 1. Calcular el número de pares n
    const n = pairs.length

    // 2. Calcular la frecuencia esperada en cada celda del cuadrado unitario:
    //    Fe = n / x²
    const totalCells = x * x
    const Fe = n / totalCells

    // 3. Inicializar la matriz de frecuencias observadas Fojk de tamaño x×x
    const observed: number[][] = Array.from({ length: x }, () =>
      Array<number>(x).fill(0)
    )

    //    Para cada par (u,v), determinar en qué celda cae y contar:
    pairs.forEach(([u, v]) => {
      const j = Math.min(Math.floor(u * x), x - 1) // fila
      const k = Math.min(Math.floor(v * x), x - 1) // columna
      observed[j][k] += 1
    })

    // 4. Calcular el estadístico χ²:
    //    χ² = (x² / n) * Σ_{j=1..x} Σ_{k=1..x} (Fojk − Fe)²
    let sumSquaredDiffs = 0
    for (let j = 0; j < x; j++) {
      for (let k = 0; k < x; k++) {
        const diff = observed[j][k] - Fe
        sumSquaredDiffs += diff * diff
      }
    }
    const chi2 = (totalCells / n) * sumSquaredDiffs

    // 5. Comparar con χ²α:
    //    Si χ² < χ²α → no se rechaza la hipótesis de uniformidad
    const result =
      chi2 < chi2Alpha
        ? 'No se rechaza la hipótesis de que los números provienen de un universo uniformemente distribuido'
        : 'Se rechaza la hipótesis de que los números provienen de un universo uniformemente distribuido'

    return result
  }, [pairs, x, chi2Alpha])
}
