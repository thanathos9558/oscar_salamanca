import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PokemonFull } from '../interfaces/pokemonInterfaces';

interface Props {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({ pokemon }: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      >
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 5,
        }}>

        <Text style={styles.title}>Tipo</Text>
        <View style={{ flexDirection: 'row' }}>
          {pokemon.types.map(({ type }) => (
            <Text
              style={{
                fontSize: 19,
                marginRight: 10,
              }}
              key={type.name}>
              {type.name}
            </Text>
          ))}
        </View>

        <Text style={styles.title}>Peso</Text>
        <Text style={styles.regularText}>{pokemon.weight} kg</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>sprites</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

       

        <Image source={pokemon.sprites.front_default}
          style={{ width: 80, height: 80 }}
        />

        <Image source={pokemon.sprites.back_default}
          style={{ width: 80, height: 80 }}
        />

        <Image source={pokemon.sprites.front_shiny}
          style={{ width: 80, height: 80 }}
        />

        <Image source={pokemon.sprites.back_shiny}
          style={{ width: 80, height: 80 }}
        />
      </ScrollView>

      <View style={styles.container}>
        <Text style={styles.title}>Movimientos</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {pokemon.moves.map(({ move }) => (
            <Text
              style={{
                fontSize: 19,
                marginRight: 10,
              }}
              key={move.name}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  regularText: {
    fontSize: 19,
  }
});
