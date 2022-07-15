import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../hooks/useDebouncedValue';


interface Props {
    onDebounce: ( value: string ) => void;
    style?: StyleProp<ViewStyle>
}

export const SearchInput = ({ style, onSearch }:Props) => {
   const [textValue, setTextValue] = useState('');

    const deboncedValue = useDebouncedValue( textValue );
    
    useEffect(() => {
        onSearch(deboncedValue);
    }, [deboncedValue, onSearch])

  return (
    <View style={styles.container}>
      <View style={styles.textBackground}>
        <Icon name="search-outline" color="grey" size={30} />
        <TextInput
          placeholder="Buscar"
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textBackground: {
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    borderColor: 'none',
    marginLeft: 5,
    padding: 5,
  },
});
