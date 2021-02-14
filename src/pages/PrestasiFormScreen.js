import * as React from 'react';
import {Text, View} from 'react-native';
import {
  InputText,
  InputDate,
  InputMultiLine,
  MyButton,
} from '../components/Input';
import {useMutation,gql} from '@apollo/client';

const INSERT_PRESTASI = gql`
mutation INSERT_PRESTASI(
  $id:ID!,
  $kegiatan:String,
  $juara:String,
  $lingkup:String
  $tahun:Int
  $keterangan:String
){
  createAchievement(input:{
    data:{
      student:$id
      kegiatan_lomba:$kegiatan
      prestasi:$juara
      lingkup:$lingkup
      tahun:$tahun
      keterangan:$keterangan
    }
  }){
    achievement{
      id
    }
  }
}
`

export default PrestasiFormScreen = ({route, navigation}) => {
  const [FlashSaved, setFlashSaved] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const [isSantriLain, setIsSantriLain] = React.useState(false);
  const [flashSantriLain, setFlashSantriLain] = React.useState(true);

  const [submitForm,{data,loading,error}] = useMutation(INSERT_PRESTASI)

  const [inputError, setInputError] = React.useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [title, setTitle] = React.useState();
  const [champion, setChampion] = React.useState();
  const [scope, setScope] = React.useState();
  const [date, setDate] = React.useState();
  const [description, setDescription] = React.useState();

  React.useEffect(() => {
    if (route.params.dataForm !== undefined) {
      if (route.params.hasOwnProperty('dataForm')) {
        const {dataForm} = route.params;
        setIsSantriLain(true);
        setTitle(dataForm.title);
        setChampion(dataForm.champion);
        setScope(dataForm.scope);
        setDate(dataForm.date);
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
    try{
      const {data} = await submitForm({
        variables:{
          id:route.params.student.id,
          kegiatan:title,
          juara:champion,
          lingkup:scope,
          tahun:Number(date),
          keterangan:description     
        }
      })
      setSaved(true);
      setFlashSaved(true);

    }catch(e){
      console.log(e);
      alert('Maaf terjadi error');
    }
  }

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
        Tambah Data Prestasi
      </Text>
      <InputText
        value={title}
        setValue={setTitle}
        isError={inputError[0]}
        title="Judul :"
        style={{marginBottom: 15}}
      />
      <InputText
        value={champion}
        setValue={setChampion}
        isError={inputError[1]}
        title="Juara / Peringkat :"
        style={{marginBottom: 15}}
      />
      <InputText
        value={scope}
        setValue={setScope}
        isError={inputError[2]}
        title="Lingkup :"
        style={{marginBottom: 15}}
      />
      <InputText
        value={date}
        setValue={setDate}
        title="Tahun :"
        isError={inputError[3]}
        keyboardType="number-pad"
        style={{marginBottom: 15}}
      />
      <InputMultiLine
        value={description}
        setValue={setDescription}
        isError={inputError[4]}
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
            disabled={loading ? true : false}
            style={{container: {flex: 1, marginHorizontal: 10}}}
            onPress={() => {
              const valid = isEmpty(title, champion, scope, date, description);
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
                  toRoute : 'PrestasiFormScreen',
                  title,
                  champion,
                  scope,
                  date,
                  description,
                };
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
                setChampion('');
                setScope('');
                setDate('');
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
