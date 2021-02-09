import * as React from 'react';
import {Text, View} from 'react-native';
import {
  InputText,
  InputDate,
  InputMultiLine,
  MyButton,
} from '../components/Input';

export default PelanggaranFormScreen = ({route, navigation}) => {
  route.params =
    route.params === undefined
      ? {name: 'Rizki', class: 'Kelas 6', asrama: 'Asrama 1'}
      : route.params;
  const [FlashSaved, setFlashSaved] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const [isSantriLain, setIsSantriLain] = React.useState(false);
  const [flashSantriLain, setFlashSantriLain] = React.useState(true);

  const [inputError, setInputError] = React.useState([
    false,
    false,
    false,
  ]);

  const [title, setTitle] = React.useState();
  const [date, setDate] = React.useState(new Date());
  const [description, setDescription] = React.useState();

  React.useEffect(() => {
    if (route.params !== undefined) {
      if (route.params.hasOwnProperty('dataForm')) {
        const dataForm = JSON.parse(route.params.dataForm);
        setIsSantriLain(true);
        setTitle(dataForm.title);
        setDate(new Date(dataForm.date));
        setDescription(dataForm.description);
      }
    }
  }, [route]);

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
      <HeaderSantri name={route.params.name} class={route.params.class} asrama={route.params.asrama}/>
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
            onPress={() => {
              const valid = isEmpty(title, date);
              const canSubmit = valid.every((e) => !e);
              setInputError(valid);
              if (canSubmit) {
                setTimeout(() => {
                  setSaved(true);
                  setFlashSaved(true);
                }, 500);
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
                const dataForm = JSON.stringify({
                  title,
                  date,
                  description,
                });
                navigation.navigate('ScannerScreen', {dataForm});
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
