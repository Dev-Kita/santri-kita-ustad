import * as React from 'react';
import {Text, View, FlatList} from 'react-native';
import Item from '../components/Item';

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

const ListHeaderUstad = () => {
  return (
    <Text
      style={{
        color: '#52525B',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 15,
        fontWeight: '500',
      }}>
      Aktivitas
    </Text>
  );
};

export default HomeTab = ({navigation}) => {
  const renderItem = ({item}) => (
    <Item title={item.title} date={item.date} style={{marginTop: 7}} canOpen={false}/>
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 21,
      }}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={(Props) => <ListHeaderUstad />}
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
