import React from 'react';
import renderer from 'react-test-renderer';
import PokemonCard from '../components/pokemonCard';

test('renders correctly', () => {
  const tree = renderer.create(<PokemonCard />).toJSON();
  expect(tree).toMatchSnapshot();
});