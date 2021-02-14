import * as React from 'react';
import {Text, View, FlatList} from 'react-native';
import Item from '../components/Item';
import HeaderSantri from '../components/HeaderSantri';
import {MyButton} from '../components/Input';
import {gql, useQuery} from '@apollo/client';
import LoadingView from './LoadingView';
import ErrorScreen from './ErrorScreen';
import {TanggalIndo} from '../components/Helper';

const DATA_PELANGGARAN = gql`
  query Data_Pelanggaran($id: ID!) {
    student(id: $id) {
      violations {
        id
        pelanggaran
        keterangan
        tanggal
      }
    }
  }
`;

export default PelanggaranScreen = ({route, navigation}) => {
  const {loading, error, data} = useQuery(DATA_PELANGGARAN, {
    variables:{id: route.params.student.id},pollInterval: 500
  });
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
          name={route.params.student.name}
          class={route.params.student.class}
          asrama={route.params.student.asrama}
        />
        <Text style={{marginBottom: 15, fontSize: 16, color: '#52525B'}}>
          Pelanggaran
        </Text>
        <MyButton
          title="Tambah data"
          onPress={() => {
            navigation.navigate('PelanggaranFormScreen',{...route.params});
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
    const tanggal = TanggalIndo(item.tanggal)
    return (
      <Item
        title={item.pelanggaran}
        date={tanggal}
        description={item.keterangan}
        style={{marginVertical: 7}}

      />
    );
  };

  if (loading) return <LoadingView />;
  if (error) return <ErrorScreen />;

  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 25}}>
      <FlatList
        data={data.student.violations}
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
