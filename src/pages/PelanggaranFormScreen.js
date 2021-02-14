import * as React from 'react';
import {Text, View} from 'react-native';
import {
  InputText,
  InputDate,
  InputMultiLine,
  MyButton,
} from '../components/Input';
import {useMutation, gql} from '@apollo/client';
import {TanggalLuar} from '../components/Helper';

const INSERT_PELANGGARAN = gql`
  mutation INSERT_PELANGGARAN(
    $id: ID
    $pelanggaran: String
    $tanggal: Date
    $keterangan: String
  ) {
    createViolation(
      input: {
        data: {
          student: $id
          pelanggaran: $pelanggaran
          tanggal: $tanggal
          keterangan: $keterangan
        }
      }
    ) {
      violation {
        id
        keterangan
        tanggal
      }
    }
  }
`;

export default PelanggaranFormScreen = ({route, navigation}) => {
  const [submitForm, {loading, data, error}] = useMutation(INSERT_PELANGGARAN);

  const [FlashSaved, setFlashSaved] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const [isSantriLain, setIsSantriLain] = React.useState(false);
  const [flashSantriLain, setFlashSantriLain] = React.useState(true);

  const [inputError, setInputError] = React.useState([false, false, false]);

  const [title, setTitle] = React.useState();
  const [date, setDate] = React.useState(new Date());
  const [description, setDescription] = React.useState();

  React.useEffect(() => {
    if (route.params.dataForm !== undefined) {
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

  const handleSubmit = async () => {
    const {data} = await submitForm({
      variables: {
        id: 5,
        pelanggaran: title,
        tanggal: TanggalLuar(date),
        keterangan: description,
      },
    });
    setSaved(true);
    setFlashSaved(true);
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
        Tambah Data Pelanggaran
      </Text>
      <InputText
        value={title}
        setValue={setTitle}
        isError={inputError[0]}
        title="Pelanggaran :"
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
        isError={inputError[2]}
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
              const valid = isEmpty(title, date, description);
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
                  toRoute:'PelanggaranFormScreen',
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
