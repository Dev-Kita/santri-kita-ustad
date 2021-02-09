import * as React from 'react';
import {View, FlatList} from 'react-native';
import HeaderSantri from '../components/HeaderSantri';

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

export default PilihSetoranScreen = ({route, navigation}) => {
  const setoran = [{id: 1}];
  route.params =
    route.params === undefined
      ? {name: 'Rizki', class: 'Kelas 6', asrama: 'Asrama 1'}
      : route.params;
  const renderItem = ({item}) => (
    <Menu
      title={item.title}
      callback={() => {
        navigation.navigate('SetoranScreen', {
          setoranId: item.id,
          ...route.params,
        });
      }}
      style={{marginVertical: 5, paddingVertical: 20}}
    />
  );
  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 25}}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={(Props) => (
          <HeaderSantri
            name={route.params.name}
            class={route.params.class}
            asrama={route.params.asrama}
          />
        )}
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
