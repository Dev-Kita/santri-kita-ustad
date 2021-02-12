import React from 'react';
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
import SplashScreen from './pages/SplashScreen';
import LoginScreen from './pages/LoginScreen';
import {AuthContext} from './components/Context';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setContext} from '@apollo/client/link/context';

// endpoint api
const httpLink = createHttpLink({
  uri: `https://santrikita-api.herokuapp.com/graphql`,
});

const authLink = setContext(async (_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('userToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

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
  const [userToken, setUserToken] = React.useState();
  const [userID, setUserID] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  const authActions = React.useMemo(() => ({
    loginAction: async (token, id) => {
      try {
        setUserToken(token);
        setUserID(id);
      } catch (error) {
        console.log(error);
      }
    },
    logoutAction: async () => {
      try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('id');
        setUserToken(null);
        setUserID(null);
        console.warn(userToken);
      } catch (error) {
        console.log(error);
      }
    },
    checkToken: async () => {
      try {
        token = await AsyncStorage.getItem('token');
        id = await AsyncStorage.getItem('id');
        setUserToken(token);
        setUserID(id);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
  }));

  React.useEffect(() => {
    // authActions.logout()
    setTimeout(authActions.checkToken, 3000);
  });

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authActions}>
        <MainStack.Navigator initialRouteName="LoginScreen" headerMode="screen">
          {userToken === undefined || userToken === null ? (
            <MainStack.Screen
              name="LoginScreen"
              options={{headerShown: false}}
              component={LoginScreen}
            />
          ) : (
            <>
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
            </>
          )}
        </MainStack.Navigator>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default Router = () => {
  return (
    <NavigationContainer>
      <MainScreen />
    </NavigationContainer>
  );
};
