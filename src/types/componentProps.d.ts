import 'vite/client'
import type { Nullable, PokemonResponse, PokemonTypes } from './types.d.ts'
import { type Params } from 'react-router-dom'
import type useCreateOrEditPokemon from '../hooks/useCreateOrEditPokemon.js'
import type React from 'react'

export interface PokemonItemWithoutTypeTextProps {
  children?: JSX.Element // me gustaría que solo permite aceptar PokemonTypeName, pero no pude lograrlo
  textTypesRef?: React.RefObject<HTMLDivElement>
  types: PokemonTypes[]
  name: string
  baseExperience: number | string
  sprite?: string
}

export interface PokedexProps {
  title: string
  element: JSX.Element
  bottomPanel?: JSX.Element
}

export interface PokemonLoaderData {
  pokemon: PokemonResponse | null
  evolutions: PokemonResponse[]
}

export interface PokemonContainerInputsProps {
  pokemon: PokemonResponse | Nullable
  createOrEdit: ReturnType<typeof useCreateOrEditPokemon>
}

export interface useCreateOrEditPokemonProps {
  pokemonName?: string
  initialEvolution?: PokemonResponse
  initialSprite?: string
  initialAbilities?: Ability[]
}

export interface Ability {
  id: number
  name: string
}

export interface PokemonItemSearchProps {
  pokemon: PokemonResponse | Nullable
  allPokemones: Array<{ name: string, id: number }>
  selectPokemon: React.Dispatch<React.SetStateAction<string>>
}

export interface PokemonSearchListProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  allPokemones: Array<{ name: string, id: number }>
  selectPokemon: React.Dispatch<React.SetStateAction<string>>
}

interface AnchorData {
  type: 'anchor'
  text: string
  goto: (_: Params<string>) => string
}

interface ButtonData {
  type: 'button'
  text: string
  onClick: unknown
}

export type BottomPanelData = AnchorData | ButtonData
