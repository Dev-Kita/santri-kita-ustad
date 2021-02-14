import * as React from 'react';
import {Text, View, FlatList} from 'react-native';
import Item from '../components/Item';
import HeaderSantri from '../components/HeaderSantri';
import {MyButton} from '../components/Input';
import {gql, useQuery} from '@apollo/client';
import LoadingView from './LoadingView';
import ErrorScreen from './ErrorScreen';

const DATA_PRESTASI = gql`
  query Data_Prestasi($id: ID!) {
    student(id: $id) {
      achievements {
        id
        kegiatan_lomba
        prestasi
        lingkup
        keterangan
        tahun
      }
    }
  }
`;

export default PrestasiScreen = ({route, navigation}) => {
  const {loading, data, error} = useQuery(DATA_PRESTASI, {
    variables: {id: route.params.student.id},
    pollInterval: 500,
  });

  if (loading) return <LoadingView />;
  if (error) return <ErrorScreen />;

  const HeaderListSantri = (Props) => {
    return (
      <View
        style={{
          width: '100%',
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
        }}>
        <HeaderSantri
          name={route.params.student.name}
          class={route.params.student.class}
          asrama={route.params.student.asrama}
        />
        <Text style={{marginBottom: 15, fontSize: 16, color: '#52525B'}}>
          Prestasi
        </Text>
        <MyButton
          title="Tambah data"
          onPress={() => {
            navigation.navigate('PrestasiFormScreen',{...route.params});
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
  const renderItem = ({item}) => {
    const keterangan = `${item.kegiatan_lomba}, ${item.prestasi}, pada tahun ${item.tahun}, tingkat ${item.lingkup}`;
    return (
      <Item
        title={item.prestasi}
        date={item.tahun}
        description={keterangan}
        style={{marginVertical: 7}}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 25}}>
      <FlatList
        data={data.student.achievements}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={(Props) => <HeaderListSantri />}
        ListEmptyComponent={()=><Item title="Tidak ada data" wrapper={{ alignItems: 'center',justifyContent:'center' }}/>}
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
