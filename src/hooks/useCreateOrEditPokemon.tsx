import { useEffect, useState } from 'react'
import { type Nullable, type PokemonResponse } from '../types/types'
import { getAll, getPokemonByName, getSavedPokemon } from '../utils/pokemon'
import { type Ability, type useCreateOrEditPokemonProps } from '../types/componentProps'

export default function useCreateOrEditPokemon ({ pokemonName, initialEvolution, initialSprite, initialAbilities }: useCreateOrEditPokemonProps = {}) {
  const [allPokemones, setAllPokemones] = useState<Array<{ id: number, name: string }>>([])

  const [imageLink, setImageLink] = useState(initialSprite ?? '')
  const [abilities, setAbilities] = useState<Ability[]>(initialAbilities ?? [])
  const [selectedPokemon, selectPokemon] = useState(initialEvolution?.name ?? '')
  const [evolution, setEvolution] = useState<PokemonResponse | Nullable>(initialEvolution)

  useEffect(() => {
    void getAll().then(res => {
      const list = getSavedPokemon().map(p => ({ name: p.pokemon.name, id: p.pokemon.id }))

      if (res != null) {
        for (const poke of res) {
          if (!list.some(p => p.id === poke.id)) list.push(poke)
        }
      }

      setAllPokemones(list.filter(p => p.name !== (pokemonName ?? '')))
    })
    return () => {
      setAllPokemones([])
    }
  }, [])

  useEffect(() => {
    if (selectedPokemon === '') {
      setEvolution(null)
      return
    }
    void getPokemonByName(selectedPokemon).then(res => {
      let poke: PokemonResponse | Nullable = res
      if (poke == null) {
        poke = getSavedPokemon().find(p => p.pokemon.name === selectedPokemon)?.pokemon
      }
      setEvolution(poke)
    })
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
