import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image, Button
} from 'react-native';
import { SinglePokemon } from '../interfaces/pokemonInterfaces';import ImageColors from 'react-native-image-colors';

interface Props {
  pokemon: SinglePokemon;
}

const windowWidth = Dimensions.get('window').width;

export const PokemonCard = ({ pokemon }: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation();

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, { fallback: 'grey' }).then(
      (colors:any) => {
        if (!isMounted.current) return;

        colors.platform === 'android'
          ? setBgColor(colors.lightVibrant || 'grey')
          : setBgColor(colors.lightMuted || 'grey');
      }
    );

    return () => {
      isMounted.current = false;
    };
  },[pokemon.picture]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailsPage', {simplePokemon: pokemon, color: bgColor})}
    >
      <View
        style={{
          backgroundColor: bgColor,
          marginHorizontal: 10,
          height: 170,
          marginBottom: 25,
          borderRadius: 10,
          width: windowWidth * 0.4,
          padding: 5,
         
        }}>
        
        <Image source={pokemon.picture}
          style={{
            width: 120,
            height: 120,
          }}
        />
        <View>
          <Text style={styles.name}>
           {'#' + pokemon.id}
          </Text>
          <Text style={styles.name}>
           {pokemon.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  name: {
    // color: '#404147',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign :"center"
  },

});
