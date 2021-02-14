import React from 'react';
import {View,Text} from 'react-native';

export default ErrorScreen = (Props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
          <Text>Maaf Terjadi Error</Text>
      </View>
  );
};
