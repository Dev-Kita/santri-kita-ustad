import * as React from 'react';
import {
  Text,
  View,
} from 'react-native';

export default HeaderSantri = (Props) => {
  return (
    <View
      style={{
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: '#D1D5DB',
        width: '100%',
        marginBottom: 20,
        ...Props.style,
      }}>
      <Text style={{fontSize: 18, color: '#52525B'}}>{Props.name}</Text>
      <Text style={{fontSize: 12, color: '#52525B'}}>
        {Props.class} | {Props.asrama}
      </Text>
    </View>
  );
};
