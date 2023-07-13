import { type Nullable, type PokemonTypes } from '../types/types'

export function generateBackgroundColor (types: PokemonTypes[] | Nullable) {
  if (types == null)
    return 'white'

  if (types.length < 2)
    return toCSSVar(types[0])

  let gradient = 'linear-gradient(135deg, '
  const percentageCutter = 100 / types.length

  for (let i = 0; i < types.length; i++) {
    const color = toCSSVar(types[i])
    const stopPercentage = i * percentageCutter

    gradient += `${color} ${stopPercentage}%, `

    if (i < types.length - 1) {
      gradient += `${color} ${stopPercentage + percentageCutter}%, `
    } else {
      gradient = gradient.slice(0, -2) // Elimina la coma y el espacio extra al final
    }
  }

  gradient += ')'

  return gradient
}

export function toCSSVar (str: string) {
  return `var(--${str})`
}
