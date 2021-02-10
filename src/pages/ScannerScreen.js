import * as React from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {InputText, MyButton} from '../components/Input';

import {Svg, Defs, Rect, Mask} from 'react-native-svg';

const ViewMask = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const maskerHeight = 270;
  const maskerWidth = 270;
  const borderHeight = 240;
  const borderWidth = 240;
  const marginY = 140;
  const rounded = 10;

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox={`0 0 ${windowWidth} ${windowHeight}`}>
      <Defs>
        <Mask id="mask" x="0" y="0" height="100%" width="100%">
          {/* under white is mask */}
          <Rect height="100%" width="100%" fill="#fff" />
          <Rect
            x={windowWidth / 2 - maskerWidth / 2}
            y={marginY}
            height={maskerHeight}
            width={maskerWidth}
            rx={rounded}
            fill="black"
          />
        </Mask>
      </Defs>

      <Rect
        x={windowWidth / 2 - borderWidth / 2}
        y={marginY + (maskerHeight - borderHeight) / 2}
        width={borderWidth}
        height={borderHeight}
        rx={rounded}
        stroke="white"
        strokeWidth="6"
        // strokeMiterlimit="2.09003"
        // strokeLinecap="round"
        // strokeLinejoin="round"
        // strokeDasharray="70 70"
      />

      <Rect
        x="0"
        y="0"
        height="100%"
        width="100%"
        fill="rgba(0, 0, 0, 1)"
        mask="url(#mask)"
      />
    </Svg>
  );
};

export default ScannerScreen = (Props) => {
  const [input, setInput] = React.useState();
  const [dataFound, setDataFound] = React.useState(false);
  const {route, navigation} = Props;
  let hasDataForm = route.params === undefined ? false : true;

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 255, 0, 1)',
          width: '100%',
        }}>
        <ViewMask />
      </View>
      <View
        style={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#fff',
          paddingHorizontal: 42,
          alignItems: 'center',
        }}>
        <View style={styles.line} />
        <Text style={{color: '#52525B', marginBottom: 10}}>
          Atau input ID siswa manual
        </Text>
        <InputText
          value={input}
          setValue={() => setInput}
          textStyle={{textAlign: 'center'}}
        />
        <MyButton
          onPress={() => {
            navigation.navigate('MenuScreen');
          }}
          style={{
            container:{
              marginTop: 10,
              marginBottom: 40,
              paddingVertical: 13,
            },
            title:{ 
              fontSize: 14
            }
          }}
          title="Cari Siswa"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 5,
    width: '15%',
    borderRadius: 5,
    backgroundColor: '#D1D5DB',
    marginTop: 5,
    marginBottom: 20,
  },
});
