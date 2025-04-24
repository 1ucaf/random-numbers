import { useMemo } from 'react'

/**
 * Hook para realizar la Prueba de Kolmogorov–Smirnov (K-S)
 * @param data Array de números pseudo-aleatorios (uᵢ)
 * @param dAlphaN Valor crítico d_{α,n} de la tabla K-S
 * @returns Mensaje con el resultado de la prueba
 */
export function useKSTest(
  data: number[],
  dAlphaN: number
): string {
  
    // 1. Calcular el tamaño de la muestra n
    const n = data.length

    // 2. Ordenar los datos en forma ascendente
    const sorted = [...data].sort((a, b) => a - b)

    // 3–4. Calcular Dₙ = max |Fₙ(xᵢ) – uᵢ|, donde Fₙ(xᵢ) = i/n
    let dMax = 0
    sorted.forEach((u, idx) => {
      const i = idx + 1
      const Fi = i / n
      const diff = Math.abs(Fi - u)
      if (diff > dMax) dMax = diff
    })

    // 5. Comparar Dₙ con d_{α,n}: si Dₙ < d_{α,n}, no se rechaza la hipótesis  :contentReference[oaicite:2]{index=2}&#8203;:contentReference[oaicite:3]{index=3}
    const result =
      dMax < dAlphaN
        ? 'No se rechaza la hipótesis de que los números provienen de un universo uniformemente distribuido'
        : 'Se rechaza la hipótesis de que los números provienen de un universo uniformemente distribuido'

    return result
}
