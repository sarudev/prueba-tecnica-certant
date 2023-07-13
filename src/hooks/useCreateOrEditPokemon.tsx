import { useEffect, useState } from 'react'
import { type Nullable, type PokemonResponse } from '../types/types'
import { getAll, getPokemonByName } from '../utils/pokemon'

interface useCreateOrEditPokemonProps {
  initialEvolution?: PokemonResponse
  initialSprite?: string
  initialAbilities?: Ability[]
}

interface Ability {
  id: number
  name: string
}

export default function useCreateOrEditPokemon ({ initialEvolution, initialSprite, initialAbilities }: useCreateOrEditPokemonProps = {}) {
  const [allPokemones, setAllPokemones] = useState<string[]>([])

  const [imageLink, setImageLink] = useState(initialSprite ?? '')
  const [abilities, setAbilities] = useState<Ability[]>(initialAbilities ?? [])
  const [selectedPokemon, selectPokemon] = useState(initialEvolution?.name ?? '')
  const [evolution, setEvolution] = useState<PokemonResponse | Nullable>(initialEvolution)

  useEffect(() => {
    void getAll().then(res => setAllPokemones(res!))
    return () => {
      setAllPokemones([])
    }
  }, [])

  useEffect(() => {
    if (selectedPokemon === '') {
      setEvolution(null)
      return
    }
    void getPokemonByName(selectedPokemon).then(res => setEvolution(res))
    return () => {
      setEvolution(null)
    }
  }, [selectedPokemon])

  const newAbilityField = () => setAbilities(prev => [...prev, { name: '', id: (prev.at(-1)?.id ?? 0) + 1 }])
  const deleteAbilityField = (id: number) => setAbilities(prev => prev.filter(a => a.id !== id))

  return {
    allPokemones,
    imageLink,
    setImageLink,
    abilities,
    selectPokemon,
    selectedPokemon,
    evolution,
    newAbilityField,
    deleteAbilityField
  }
}
