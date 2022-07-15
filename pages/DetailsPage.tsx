import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Animated,
} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/navigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'DetailsPage'> {}

export const DetailsPage = ({ navigation, route }: Props) => {
  const { simplePokemon, color } = route.params;
  const { id, name, picture } = simplePokemon;
  const { top } = useSafeAreaInsets();
  const { isLoading, pokemon } = usePokemon(id);

  return (
    <View style={{ flex: 1, backgroundColor: color }}>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          activeOpacity={0.8}
          style={{
            position: 'absolute',
            left: 20,
            top: top + 5,
          }}>
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>

        <Image source={picture} style={{ width: 250, height: 250 }} />

        <Text style={styles.name}>{'#' + pokemon.id}</Text>
        <Text style={styles.name}>{pokemon.name}</Text>
      </View>

      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    // color: '#404147',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
