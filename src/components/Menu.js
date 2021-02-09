import * as React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default Menu = (Props) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Props.callback();
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#F4F4F5',
          padding: 30,
          borderRadius: 12,
          width: '100%',
          ...Props.style,
        }}>
        <Text style={{...Props.titleStyle}}>{Props.title}</Text>
        <Icon name="chevron-forward" color="#71717A" size={24} />
      </TouchableOpacity>
    );
  };