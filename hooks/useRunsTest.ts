import { useMemo } from 'react'

/**
 * Hook para realizar la Prueba de corrida arriba y abajo de la media
 * @param data Array de números pseudo-aleatorios (uᵢ)
 * @param chi2AlphaN2 Valor crítico χ²_{α, n/2} para la prueba
 * @returns Mensaje con el veredicto de la prueba
 */
export function useRunsTest(
  data: number[],
  chi2AlphaN2: number
): string {
  return useMemo(() => {
    // 1. Calcular el tamaño de la muestra n
    const n = data.length

    // 2. Convertir a secuencia binaria S:
    //    Si uᵢ ≤ 0.5 → 0; si uᵢ > 0.5 → 1
    const bits = data.map(u => (u > 0.5 ? 1 : 0))

    // 3. Determinar las longitudes de corrida (runs) consecutivas
    const runs: number[] = []
    let current = bits[0]
    let length = 1
    for (let i = 1; i < bits.length; i++) {
      if (bits[i] === current) {
        length++
      } else {
        runs.push(length)
        current = bits[i]
        length = 1
      }
    }
    runs.push(length) // añadir la última corrida

    // Frecuencia observada Foᵢ para cada longitud i
    const observed: Record<number, number> = {}
    runs.forEach(len => {
      observed[len] = (observed[len] ?? 0) + 1
    })

    // 4. Calcular la frecuencia esperada para cada longitud i:
    //    Feᵢ = (n - i + 3) / 2^(i+1)
    const maxLen = Math.max(...runs)
    let chi2 = 0
    for (let i = 1; i <= maxLen; i++) {
      const Fo = observed[i] ?? 0
      const Fe = (n - i + 3) / Math.pow(2, i + 1)
      chi2 += Math.pow(Fo - Fe, 2) / Fe
    }

    // 5–6. Comparar χ² con χ²_{α,n/2}:
    //     Si χ² < χ²_{α,n/2}, no se rechaza la hipótesis de uniformidad
    const result =
      chi2 < chi2AlphaN2
        ? 'No se rechaza la hipótesis de que los números provienen de un universo uniformemente distribuido'
        : 'Se rechaza la hipótesis de que los números provienen de un universo uniformemente distribuido'

    return result
  }, [data, chi2AlphaN2])
}
