import * as React from 'react';
import {Text, View} from 'react-native';
import {MyButton} from '../components/Input';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../components/Context';
export default ProfileTab = () => {
  const {logoutAction} =React.useContext(AuthContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <MyButton onPress={()=>logoutAction()} title="Keluar" style={{container: {marginHorizontal: 50,width:100}}} />
      <View style={{ position:'absolute',alignItems: 'center',bottom:0,marginBottom: 15}}>
        <Text style={{color: '#71717A'}}>Made with</Text>
        <Icon name="ios-heart" size={15} color="#EB5757" />
      </View>
    </View>
  );
};
