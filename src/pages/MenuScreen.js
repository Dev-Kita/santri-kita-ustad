import * as React from 'react';
import {View} from 'react-native';
import Menu from '../components/Menu';
import FlashStatus from '../components/FlashStatus';
import HeaderSantri from '../components/HeaderSantri';

export default MenuScreen = ({route, navigation}) => {
  route.params =
    route.params === undefined
      ? {name: 'Rizki', class: 'Kelas 6', asrama: 'Asrama 1'}
      : route.params;
  const [isFlash, setIsflash] = React.useState(true);
  const closeFlash = () => {
    setTimeout(() => {
      setIsflash(false);
    }, 500);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 25,
        alignItems: 'center',
      }}>
      {isFlash ? (
        <FlashStatus onPress={closeFlash} style={{marginVertical: 10}} />
      ) : null}
      <HeaderSantri name={route.params.name || ''} class={2} asrama="sdds" />
      <Menu
        title="Buku Setoran"
        callback={() => {
          navigation.navigate('PilihSetoranScreen', {...route.params});
        }}
        style={{marginVertical: 5}}
      />
      <Menu
        title="Prestasi"
        callback={() => {
          navigation.navigate('PrestasiScreen', {...route.params});
        }}
        style={{marginVertical: 5}}
      />
      <Menu
        title="Pelanggaran"
        callback={() => {
          navigation.navigate('PelanggaranScreen', {...route.params});
        }}
        style={{marginVertical: 5}}
      />
    </View>
  );
};
