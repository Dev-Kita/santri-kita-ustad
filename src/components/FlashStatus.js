import * as React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default FlashStatus = (Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        Props.onPress();
      }}
      style={{
        backgroundColor: '#D1FAE5',
        paddingVertical: 10,
        paddingHorizontal: 25,
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        borderRadius: 7,
        ...Props.style,
      }}>
      <Icon name="ios-checkmark-circle" size={16} color="#059669" />
      <Text style={{marginLeft: 5, color: '#059669', fontSize: 14}}>
        {Props.title || 'Data siswa ditemukan!'}
      </Text>
      <Icon
        name="close"
        style={{marginLeft: 'auto'}}
        size={16}
        color="#059669"
      />
    </TouchableOpacity>
  );
};