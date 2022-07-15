import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePagination } from '../hooks/usePagination';
import { PokemonCard } from '../components/pokemonCard';
import { SearchInput } from '../components/SearchInput';
import { SinglePokemon } from '../interfaces/pokemonInterfaces';

export const HomePage = () => {
  const { top } = useSafeAreaInsets();
  const { isLoading, singlePokemonList, loadPokemons } = usePagination();
  const [term, setTerm] = useState('');
  const [pokeFiltered, setPokeFiltered] = useState<SinglePokemon[]>([]);

  useEffect(() => {
    if (term.length === 0) {
      return setPokeFiltered(singlePokemonList);
    }
    if (isNaN(Number(term))) {
      setPokeFiltered(
        singlePokemonList.filter((poke) =>
          poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        )
      );
    } else {
      const pokemonById = singlePokemonList.find((poke) => poke.id === term);
      setPokeFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [term, singlePokemonList]);

  return (
    <View>
      <Text style={styles.title}>Listado de Pokemon </Text>
      <SearchInput onSearch={(value) => setTerm(value)} />
        <FlatList
          data={pokeFiltered}
          keyExtractor={(pokemon) => pokemon.id}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 20 }}
          numColumns={2}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
        />
  
    </View>
  );
};

const styles = StyleSheet.create({
 
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop:20,
    marginHorizontal:20,
    marginBottom:10
  }

});
