import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default MyHeader = (Props) => {
  return (
    <View
      style={{
        paddingVertical: 19,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        visible: 'false',
      }}>
      <View style={{marginLeft: 20}}>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 20,
            fontWeight: 'bold',
            color: '#828282',
          }}>
          Santri Kita
        </Text>
        <Text style={{fontSize: 12, color: '#71717A'}}>{ Props.ustadName }</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          alert('hai');
        }}
        style={{
          position: 'relative',
          marginRight: 20,
          overflow: 'visible',
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            backgroundColor: '#EB5757',
            zIndex: 11,
            position: 'absolute',
            right: 0,
            top: 0,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginRight: 10,
            height: 15,
            width: 15,
            borderRadius: 10,
          }}>
          <Text
            style={{
              minWidth: 20,
              fontSize: 6,
              textAlign: 'center',
              color: '#fff',
              padding: 2,
            }}>
            1
          </Text>
        </View>
        <Icon name="notifications" size={29} color="#71717A" />
      </TouchableOpacity>
    </View>
  );
};
