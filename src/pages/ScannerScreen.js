import * as React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {InputText, MyButton} from '../components/Input';

import {useLazyQuery, gql} from '@apollo/client';

const DATA_SISWA = gql`
  query Data_Siswa($id: ID!) {
    student(id: $id) {
      id
      nama
      kamar
      kelas {
        id
        kelas
      }
    }
  }
`;

const BottomContent = (Props) => {
  const {input, setInput, onPress} = Props;
  return (
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
      <Text style={{color: '#52525B', marginBottom: 15}}>
        Atau input ID siswa manual
      </Text>
      <InputText
        value={input}
        setValue={setInput}
        labelStyle={{display: 'none'}}
        textStyle={{textAlign: 'center'}}
      />
      <MyButton
        onPress={onPress}
        style={{
          container: {
            marginTop: 10,
            marginBottom: 40,
            paddingVertical: 13,
          },
          title: {
            fontSize: 14,
          },
        }}
        title="Cari Siswa"
      />
    </View>
  );
};

export default ScannerScreen = (Props) => {
  console.warn(Props.route.params);
  const [input, setInput] = React.useState();
  const [scannerResult, setScannerResult] = React.useState();
  const {route, navigation} = Props;
  const [loadData, {called, loading, data}] = useLazyQuery(DATA_SISWA, {
    variables: {id: scannerResult},
  });

  console.warn(route.params);
  const camera = React.useRef();

  const readQR = (e) => {
    setScannerResult(e.data);
    loadData();
  };

  if (!loading && called) {
    if (data !== undefined) {
      if (data.student !== null) {
        const {
          id,
          nama,
          kamar,
          kelas: {kelas},
        } = data.student;

        if (route.params !== undefined) {
          if (route.params.hasOwnProperty('dataForm')) {
            navigation.replace(route.params.dataForm.toRoute, {
              student: {
                id: id,
                name: nama,
                class: kelas,
                asrama: kamar,
              },
              dataForm: route.params.dataForm,
            });
          }
        } else {
          navigation.replace('MenuScreen', {
            student: {
              id: id,
              name: nama,
              class: kelas,
              asrama: kamar,
            },
          });
        }
      }
    }
    camera.current.reactivate();
  }

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {called && loading ? (
        <ActivityIndicator
          style={{position: 'absolute', zIndex: 10}}
          size="large"
          color="#fff"
        />
      ) : null}
      <QRCodeScanner
        ref={(node) => {
          camera.current = node;
        }}
        onRead={readQR}
        cameraStyle={{height: Dimensions.get('window').height}}
        topViewStyle={{height: 0, flex: 0}}
        bottomViewStyle={{height: 0, flex: 0}}
      />
      <BottomContent
        onPress={() => {
          setScannerResult(input);
          loadData();
        }}
        input={input}
        setInput={setInput}
      />
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
