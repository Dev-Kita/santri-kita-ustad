import * as React from 'react';
import {Text, View} from 'react-native';
import {
  InputText,
  InputDate,
  InputMultiLine,
  MyButton,
} from '../components/Input';
import {gql, useMutation} from '@apollo/client';

const INSERT_SETORAN = gql`
  mutation Insert_Setoran(
    $siswa_id: [ID]
    $ustad_id: ID
    $lesson_id: ID
    $siswa_title: String
    $guru_title: String
    $tanggal: DateTime
    $keterangan: String
  ) {
    createStudentAktivity(
      input: {
        data: {
          students: $siswa_id
          teacher: $ustad_id
          lesson: $lesson_id
          siswa_title: $siswa_title
          guru_title: $guru_title
          tanggal: $tanggal
          keterangan: $keterangan
          
        }
      }
    ) {
      studentAktivity {
        id
      }
    }
  }
`;

export default SetoranFormScreen = ({route, navigation}) => {
  console.warn(route.params);
  const [submitForm, {data,loading, error}] = useMutation(INSERT_SETORAN);

  const [FlashSaved, setFlashSaved] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const [isSantriLain, setIsSantriLain] = React.useState(false);
  const [flashSantriLain, setFlashSantriLain] = React.useState(true);

  const [inputError, setInputError] = React.useState([false, false]);

  const [title, setTitle] = React.useState();
  const [date, setDate] = React.useState(new Date());
  const [description, setDescription] = React.useState();

  React.useEffect(() => {
    if (route.params !== undefined) {
      if (route.params.hasOwnProperty('dataForm')) {
        const {dataForm} = route.params;
        setIsSantriLain(true);
        setTitle(dataForm.title);
        setDate(new Date(dataForm.date));
        setDescription(dataForm.description);
      }
    }
  }, [route.params]);

  const isEmpty = (...items) => {
    const result = items.map((item, index) => {
      if (item === undefined || item === '') {
        return true;
      }
      return false;
    });
    return result;
  };

  const handleSubmit = async () => {
    try {
      const guru_title = `Menerima setoran dari ${route.params.student.name}`;
      const {data} = await submitForm({
        variables: {
          siswa_id: [route.params.student.id],
          ustad_id: route.params.ustadID,
          lesson_id: route.params.setoranId,
          siswa_title: title,
          guru_title: guru_title,
          tanggal: date,
          keterangan: description,
        },
      });
      console.log(data);
      setSaved(true);
      setFlashSaved(true);
    } catch (e) {
      console.warn(e);
      alert('Maaf terjadi error');
    }
  };

  const closeFlashSaved = () => {
    setTimeout(() => {
      setFlashSaved(false);
    }, 500);
  };

  const closeFlashSantri = () => {
    setTimeout(() => {
      setFlashSantriLain(false);
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
      {saved && FlashSaved ? (
        <FlashStatus
          title="Data berhasil ditambah !"
          onPress={() => {
            closeFlashSaved();
          }}
          style={{marginVertical: 10}}
        />
      ) : null}
      {isSantriLain && flashSantriLain ? (
        <FlashStatus
          onPress={() => {
            closeFlashSantri();
          }}
          style={{marginVertical: 10}}
        />
      ) : null}
      <HeaderSantri
        name={route.params.student.name}
        class={route.params.student.class}
        asrama={route.params.student.asrama}
      />
      <Text style={{color: '#52525B', fontSize: 16, marginBottom: 15}}>
        Tambah Data - {route.params.namaSetoran}
      </Text>
      <InputText
        value={title}
        setValue={setTitle}
        isError={inputError[0]}
        title="Judul :"
        style={{marginBottom: 15}}
      />
      <InputDate
        value={date}
        setValue={setDate}
        title="Tanggal :"
        isError={inputError[1]}
        mode="date"
        style={{marginBottom: 15}}
      />
      <InputMultiLine
        value={description}
        setValue={setDescription}
        isError={false}
        title="Keterangan : "
        style={{marginBottom: 15}}
      />
      <View
        style={{
          marginTop: 'auto',
          marginBottom: 20,
          width: '100%',
          flexDirection: 'row',
        }}>
        {!saved ? (
          <MyButton
            title="Simpan"
            style={{container: {flex: 1, marginHorizontal: 10}}}
            disabled={loading ? true : false}
            onPress={() => {
              const valid = isEmpty(title, date);
              const canSubmit = valid.every((e) => !e);
              setInputError(valid);
              if (canSubmit) {
                handleSubmit();
              }
            }}
          />
        ) : (
          <>
            <MyButton
              title="Santri Lain"
              style={{
                container: {
                  flex: 1,
                  marginHorizontal: 10,
                  backgroundColor: '#D1FAE5',
                },
                title: {
                  color: '#10B981',
                },
              }}
              onPress={() => {
                const dataForm = {
                  toRoute:'SetoranFormScreen',
                  title,
                  date,
                  description,
                };
                navigation.navigate('ScannerScreen', {...route.params,dataForm});
                setSaved(false);
                setIsSantriLain(true);
                setFlashSantriLain(false);
              }}
            />
            <MyButton
              title="Selesai"
              style={{container: {flex: 1, marginHorizontal: 10}}}
              onPress={() => {
                setTitle('');
                setDate(new Date());
                setDescription('');
                navigation.navigate('MainScreen');
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};
