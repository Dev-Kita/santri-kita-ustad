import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const MyButton = (Props) => {
  let {style} = Props;
  if (style === undefined) style = {container: [], title: []};
  return (
    <TouchableOpacity
      onPress={() => {
        Props.onPress();
      }}
      style={{
        width: '100%',
        paddingVertical: 20,
        backgroundColor: '#10B981',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        ...style.container,
      }}>
      <Text style={{color: '#FAFAFA', fontSize: 18, ...style.title}}>
        {Props.title}
      </Text>
    </TouchableOpacity>
  );
};

export const InputText = (Props) => {
  const {value, setValue} = Props;
  const borderColor = Props.isError ? '#EB5757' : '#A1A1AA';
  
  return (
    <View style={{width: '100%', ...Props.style}}>
      <Text style={{fontSize: 14, color: '#52525B', marginBottom: 5}}>
        {Props.title}
      </Text>
      <TextInput
        style={{
          borderColor: borderColor,
          borderWidth: 1,
          color: '#52525B',
          paddingHorizontal: 15,
          paddingVertical: 7,
          borderRadius: 4,
          ...Props.textStyle
        }}
        onChangeText={(text) => setValue(text)}
        value={value}
        keyboardType={Props.keyboardType || "default"}
      />
    </View>
  );
};

export const InputDate = (Props) => {
  const {value, setValue} = Props;
  const [showDate, setShowDate] = React.useState(false);
  const borderColor = Props.isError ? '#EB5757' : '#A1A1AA';

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setValue(currentDate);
  };

  const addZero = (i) => {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  };

  const text = (mode) => {
    switch (mode) {
      case 'date':
        return `${value.getDate()}/${
          value.getMonth() + 1
        }/${value.getFullYear()}`;
      case 'time':
        return `${addZero(value.getHours())}:${addZero(value.getMinutes())}`;
      default:
        return '';
    }
  };

  return (
    <View style={{width: '100%', ...Props.style}}>
      <Text
        style={{
          fontSize: 14,
          color: '#52525B',
          marginBottom: 5,
          alignSelf: 'flex-start',
        }}>
        {Props.title}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setShowDate(true);
        }}
        style={{
          width: '100%',
          borderColor: borderColor,
          borderWidth: 1,
          borderRadius: 4,
          width: '100%',
        }}>
        <Text
          style={{
            color: '#52525B',
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}>
          {text(Props.mode)}
        </Text>

        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={value}
            mode={Props.mode}
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const InputTextMulti = (props) => {
  return <TextInput {...props} editable maxLength={40} />;
};

export const InputMultiLine = (Props) => {
  const {value, setValue} = Props;
  const borderColor = Props.isError ? '#EB5757' : '#A1A1AA';
  return (
    <View style={{width: '100%', ...Props.style}}>
      <Text style={{fontSize: 14, color: '#52525B', marginBottom: 5}}>
        {Props.title}
      </Text>
      <InputTextMulti
        multiline
        numberOfLines={4}
        onChangeText={(text) => setValue(text)}
        value={value}
        style={{
          borderColor: borderColor,
          borderWidth: 1,
          color: '#52525B',
          paddingHorizontal: 15,
          borderRadius: 4,
        }}
      />
    </View>
  );
};

