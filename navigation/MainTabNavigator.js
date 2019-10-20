import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TipScreen from '../screens/TipScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TabBarIcon from "../components/TabBarIcon";

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const TipStack = createStackNavigator(
  {
    Tip: TipScreen,
  },
  config
);

TipStack.navigationOptions = {
  tabBarLabel: 'StudyBud',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

TipStack.path = '';


const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  TipStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
