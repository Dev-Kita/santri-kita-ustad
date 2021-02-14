import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';
import MyTab from '../components/MyTab';
const Tab = createBottomTabNavigator();
export default MainTab = ({route}) => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      tabBar={(Props) => <MyTab {...Props} />}
      tabBarOptions={{
        activeTintColor: '#10B981',
      }}>
      <Tab.Screen
        name="Main"
        component={HomeTab}
        initialParams={{ ...route.params }}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
