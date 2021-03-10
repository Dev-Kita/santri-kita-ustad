import * as React from 'react';
import {Text, View, FlatList} from 'react-native';
import Item from '../components/Item';
import HeaderSantri from '../components/HeaderSantri';
import {MyButton} from '../components/Input';
import {gql, useQuery} from '@apollo/client';
import LoadingView from './LoadingView';
import ErrorScreen from './ErrorScreen';
import {TanggalIndo} from '../components/Helper';

const LIST_SETORAN = gql`
  query List_Setoran($idStudent: ID!, $idLesson: ID!) {
    student(id: $idStudent) {
      student_aktivities(where: {lesson: $idLesson},sort:"tanggal:DESC") {
        id
        siswa_title
        keterangan
        tanggal
      }
    }
  }
`;

export default SetoranScreen = ({route, navigation}) => {
  const {loading, data, error} = useQuery(LIST_SETORAN, {
    variables: {
      idStudent: route.params.student.id,
      idLesson: route.params.setoranId,
    },
    poolInterval:500
  });
  if (loading) return <LoadingView />;
  if (error) return <ErrorScreen />;
  const HeaderListSantri = () => {
    console.warn(route.params)
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
          {route.params.namaSetoran}
        </Text>
        <MyButton
          title="Tambah data"
          onPress={() => {
            navigation.navigate('SetoranFormScreen', {...route.params});
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
    const tanggal = TanggalIndo(item.tanggal);
    return(
    <Item
      title={item.siswa_title}
      date={tanggal}
      description={item.keterangan}
      style={{marginVertical: 7}}
    />
  )};
  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 25}}>
      <FlatList
        data={data.student.student_aktivities}
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
