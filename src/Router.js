import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyHeader from './components/MyHeader';
import {createStackNavigator} from '@react-navigation/stack';
import MainTab from './pages/MainTab';
import ScannerScreen from './pages/ScannerScreen';
import MenuScreen from './pages/MenuScreen';
import SetoranScreen from './pages/SetoranScreen';
import PilihSetoranScreen from './pages/PilihSetoranScreen';
import SetoranFormScreen from './pages/SetoranFormScreen';
import PrestasiScreen from './pages/PrestasiScreen';
import PrestasiFormScreen from './pages/PrestasiFormScreen';
import PelanggaranScreen from './pages/PelanggaranScreen';
import PelanggaranFormScreen from './pages/PelanggaranFormScreen';

/**
 *
 * MainScreen
 * MainStack -> MainTab -> HomeScreen || ProfileScreen
 * ScannerStack -> ScannerScreen
 * MenuStack -> MenuScreen
 *
 */
const MainStack = createStackNavigator();
const MainScreen = () => {
  return (
    <MainStack.Navigator initialRouteName="ScannerScreen" headerMode="screen">
      <MainStack.Screen
        name="MainScreen"
        options={{headerShown: true, header: (Props) => <MyHeader />}}
        component={MainTab}
      />
      <MainStack.Screen
        name="ScannerScreen"
        options={{headerShown: false}}
        component={ScannerScreen}
      />
      <MainStack.Screen
        name="MenuScreen"
        options={{headerShown: true, header: (Props) => <MyHeader />}}
        component={MenuScreen}
      />
      <MainStack.Screen
        name="SetoranScreen"
        options={{headerShown: true, header: (Props) => <MyHeader />}}
        component={SetoranScreen}
      />
      <MainStack.Screen
        name="PilihSetoranScreen"
        options={{headerShown: true, header: (Props) => <MyHeader />}}
        component={PilihSetoranScreen}
      />
      <MainStack.Screen
        name="SetoranFormScreen"
        options={{headerShown: true, header: (Props) => <MyHeader />}}
        component={SetoranFormScreen}
      />
      <MainStack.Screen
        name="PrestasiScreen"
        options={{headerShown: true, header: (Props) => <MyHeader />}}
        component={PrestasiScreen}
      />
      <MainStack.Screen
        name="PrestasiFormScreen"
        options={{headerShown: true, header: (Props) => <MyHeader />}}
        component={PrestasiFormScreen}
      />
      <MainStack.Screen
        name="PelanggaranScreen"
        options={{headerShown: true, header: (Props) => <MyHeader />}}
        component={PelanggaranScreen}
      />
      <MainStack.Screen
        name="PelanggaranFormScreen"
        options={{headerShown: true, header: (Props) => <MyHeader />}}
        component={PelanggaranFormScreen}
      />
    </MainStack.Navigator>
  );
};

export default Router = () => {
  return (
    <NavigationContainer>
      <MainScreen />
    </NavigationContainer>
  );
};
