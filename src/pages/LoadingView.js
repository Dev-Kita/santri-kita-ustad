import React from 'react';
import {View,ActivityIndicator} from 'react-native'
export default LoadingScreen = (Props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        ...Props.containerStyle
      }}>
      <ActivityIndicator size="small" color="#10B981" style={{ ...Props.loadingStyle }}/>
    </View>
  );
};
