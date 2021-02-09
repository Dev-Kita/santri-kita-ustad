import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

export default Item = (Props) => {
  let canOpen = Props.canOpen;
  if(Props.canOpen === undefined) canOpen = true;

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        if (canOpen) setIsOpen(!isOpen);
      }}
      style={{backgroundColor: '#FAFAFA', borderRadius: 7, ...Props.style}}>
      <View
        style={{
          justifyContent: 'space-between',
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#F4F4F5',
          paddingVertical: 16,
          paddingHorizontal: 25,
          borderRadius: 7,
        }}>
        <Text style={{fontSize: 12, color: '#71717A'}}>{Props.title}</Text>
        <Text style={{fontSize: 10, color: '#A1A1AA'}}>{Props.date}</Text>
      </View>
      {isOpen ? (
        <View style={{paddingVertical: 10}}>
          <Text style={{fontSize: 10, color: '#52525B', alignSelf: 'center'}}>
            Keterangan
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: '#52525B',
              alignSelf: 'center',
              paddingVertical: 10,
            }}>
            {Props.description}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
