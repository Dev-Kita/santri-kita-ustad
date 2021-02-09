import * as React from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {InputText} from '../components/Input';

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

  React.useEffect(() => {
    // setTimeout(() => {
    //   // simulasi jika terscan
    //   if (hasDataForm) {
    //     // console.warn(route.params);
    //     navigation.navigate('SetoranFormScreen', {
    //       id: Math.random(),
    //       name: 'rizki',
    //       class: '6 SD',
    //       asrama: 'putri 1',
    //       ...route.params,
    //     });
    //   } else {
    //     navigation.navigate('MenuScreen', {
    //       name: 'rizki',
    //       class: '6 SD',
    //       asrama: 'putri 1',
    //     });
    //   }
    // }, 500);
  });
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
        <View
          style={{
            height: 5,
            width: '15%',
            borderRadius: 5,
            backgroundColor: '#D1D5DB',
            marginTop: 5,
            marginBottom: 20,
          }}
        />
        <Text style={{color: '#52525B', marginBottom: 10}}>
          Atau input ID siswa manual
        </Text>
        <InputText
          value={input}
          setValue={() => setInput}
          textStyle={{textAlign: 'center'}}
        />
        {/* <View
          style={{
            borderColor: '#A1A1AA',
            borderWidth: 1,
            borderRadius: 8,
            height: 47,
            width: '100%',
          }}
        /> */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MenuScreen');
          }}
          style={{
            backgroundColor: '#10B981',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 13,
            marginTop: 10,
            marginBottom: 40,
            borderRadius: 8,
          }}>
          <Text style={{color: '#fff'}}>Cari Siswa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
