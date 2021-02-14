import * as React from 'react';
import {ActivityIndicator, Text, View, FlatList} from 'react-native';
import Item from '../components/Item';
import {useQuery, gql} from '@apollo/client';
import ErrorScreen from './ErrorScreen';
import LoadingView from './LoadingView';
import {DataUstadContext} from '../components/Context';
import {TanggalIndo} from '../components/Helper';

const GET_ACTIVITY = gql`
  query Get_Activity($id: ID!) {
    user(id: $id) {
      teacher {
        student_aktivities {
          id
          guru_title
          tanggal
          keterangan
        }
      }
    }
  }
`;

const GET_DATA_USTAD = gql`
  query Get_Data_Ustad($id: ID!) {
    user(id: $id) {
      teacher {
        id
        nama
      }
    }
  }
`;

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

export default HomeTab = ({route, navigation}) => {
  const id = route.params.ustadID;
  const {dataUstad, setDataUstad} = React.useContext(DataUstadContext);
  const {data, loading, error} = useQuery(GET_ACTIVITY, {
    variables: {id: id},
    pollInterval: 500,
  });

  // console.warn();
  const ustadState = useQuery(GET_DATA_USTAD, {
    variables: {id: id},
    onCompleted(dt) {
      setDataUstad(dt.user.teacher);
    },
  });

  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    console.warn(error);
    return <ErrorScreen />;
  }

  const renderItem = ({item}) => (
    <Item
      title={item.guru_title}
      date={TanggalIndo(item.tanggal)}
      description={item.keterangan}
      style={{marginVertical: 7}}
    />
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 21,
      }}>
      <FlatList
        data={data.user.teacher.student_aktivities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={(Props) => <ListHeaderUstad />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Item
            title="Tidak ada data"
            wrapper={{alignItems: 'center', justifyContent: 'center'}}
          />
        )}
        ListHeaderComponentStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      />
    </View>
  );
};
