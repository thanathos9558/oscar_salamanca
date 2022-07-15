import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomePage } from '../pages/HomePage';
import { DetailsPage } from '../pages/DetailsPage';
import { SinglePokemon } from '../interfaces/pokemonInterfaces';

 export type RootStackParams = {
   HomePage: undefined,
   DetailsPage: { singlePokemon: SinglePokemon, color: string }
 }

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name="HomePage" component={ HomePage } />
      <Stack.Screen name="DetailsPage" component={ DetailsPage } />
    </Stack.Navigator>
  );
}
