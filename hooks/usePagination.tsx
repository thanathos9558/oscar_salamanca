import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import {
  SinglePokemon,
  PaginatedResponse,
  Result,
} from '../interfaces/pokemonInterfaces';

export const usePagination = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [singlePokemonList, setSinglePokemonList] = useState<SinglePokemon[]>(
    []
  );
  
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=1200');
  
  const loadPokemons = async () => {
    setIsLoading(true);
    const resp = await axios.get<PaginatedResponse>(nextPageUrl.current);
    nextPageUrl.current = resp.data.next;
    mapPokemonList(resp.data.results);
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SinglePokemon[] = pokemonList.map(({ name, url }) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return { id, picture, name };
    });

    setSinglePokemonList([...singlePokemonList, ...newPokemonList]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemons();
  });

  return {
    isLoading,
    singlePokemonList,
    loadPokemons,
  };
};
