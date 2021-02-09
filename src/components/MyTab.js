import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAWS from 'react-native-vector-icons/FontAwesome';

export default MyTab = (Props) => {
  const {navigation, state} = Props;
  const activeColor = '#10B981';
  const inActiveColor = '#A1A1AA';
  const fontSize = 10;
  const iconSize = 28;
  const styles = StyleSheet.create({
    qr: {
      height: 66,
      width: 66,
      backgroundColor: '#10B981',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 33,
      marginHorizontal: 70,
    },
  });
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderColor: '#E5E7EB',
        borderTopWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 7,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Main');
        }}
        style={{alignItems: 'center'}}>
        <IconAWS
          name="home"
          style={{color: state.index == 0 ? activeColor : inActiveColor}}
          size={iconSize}
        />
        <Text
          style={{
            fontSize: fontSize,
            color: state.index == 0 ? activeColor : inActiveColor,
          }}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ScannerScreen');
        }}
        style={styles.qr}>
        <IconMaterial name="qrcode-scan" size={36} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
        }}
        style={{alignItems: 'center'}}>
        <IconAWS
          name="user"
          style={{color: state.index == 1 ? activeColor : inActiveColor}}
          size={iconSize}
        />
        <Text
          style={{
            fontSize: fontSize,
            color: state.index == 1 ? activeColor : inActiveColor,
          }}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};
