import * as React from 'react';
import {Text, View, FlatList} from 'react-native';
import Item from '../components/Item';
import HeaderSantri from '../components/HeaderSantri';
import {MyButton} from '../components/Input'
const DATA = [
  {id: '1', title: 'Mengajar ngaji', date: '18:00 18/02/2021'},
  {id: '2', title: 'Mengajar ngaji', date: '18:00 18/02/2021'},
  {id: '3', title: 'Mengajar ngaji', date: '18:00 18/02/2021'},
  {id: '4', title: 'Mengajar ngaji', date: '18:00 18/02/2021'},
  {id: '5', title: 'Mengajar ngaji', date: '18:00 18/02/2021'},
  {id: '6', title: 'Mengajar ngaji', date: '18:00 18/02/2021'},
  {id: '7', title: 'Mengajar ngaji', date: '18:00 18/02/2021'},
  {id: '8', title: 'Mengajar ngaji', date: '18:00 18/02/2021'},
  {id: '9', title: 'Mengajar ngaji', date: '18:00 18/02/2021'},
  {id: '10', title: 'Mengajar ngaji', date: '18:00 18/02/2021'},
];

export default PrestasiScreen = ({route, navigation}) => {
    route.params =
    route.params === undefined
      ? {name: 'Rizki', class: 'Kelas 6', asrama: 'Asrama 1'}
      : route.params;
  const HeaderListSantri = () => {
    return (
      <View
        style={{
          width: '100%',
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
        }}>
        <HeaderSantri
          name={route.params.name}
          class={route.params.class}
          asrama={route.params.asrama}
        />
        <Text style={{marginBottom: 15, fontSize: 16, color: '#52525B'}}>
          Prestasi
        </Text>
        <MyButton
          title="Tambah data"
          onPress={() => {
            navigation.navigate('PrestasiFormScreen');
          }}
        />
        <Text
          style={{
            color: '#52525B',
            fontSize: 16,
            marginTop: 20,
            marginBottom: 15,
          }}>
          Riwayat
        </Text>
      </View>
    );
  };
  const renderItem = ({item}) => (
    <Item title={item.title} date={item.date} style={{marginVertical: 7}} />
  );
  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 25}}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={(Props) => <HeaderListSantri />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      />
    </View>
  );
};
