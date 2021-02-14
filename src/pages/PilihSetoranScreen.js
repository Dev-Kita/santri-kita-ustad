import * as React from 'react';
import {View, FlatList} from 'react-native';
import HeaderSantri from '../components/HeaderSantri';
import {gql,useQuery} from '@apollo/client';
import LoadingView from './LoadingView';
import ErrorScreen from './ErrorScreen';

const DATA_SETORAN = gql`
query {
	lessons(where:{isBukuSetoran:true}){
    id
    nama
  }
}
`

export default PilihSetoranScreen = ({route, navigation}) => { 
  const {loading,data,error} = useQuery(DATA_SETORAN,{pollInterval:500});

  if(loading) return <LoadingView/>
  if(error) return <ErrorScreen/>

  const renderItem = ({item}) => (
    <Menu
      title={item.nama}
      callback={() => {
        navigation.navigate('SetoranScreen', {
          setoranId: item.id,
          namaSetoran: item.nama,
          ...route.params,
        });
      }}
      style={{marginVertical: 5, paddingVertical: 20}}
    />
  );
  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 25}}>
      <FlatList
        data={data.lessons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={(Props) => (
          <HeaderSantri
            name={route.params.student.name}
            class={route.params.student.class}
            asrama={route.params.student.asrama}
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
