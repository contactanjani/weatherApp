import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CityDetailsScreen} from '../screens/CityDetailsScreen';
import {CityListScreen} from '../screens/CityListScreen';

const Stack = createNativeStackNavigator();

const WeatherNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CityListScreen">
      <Stack.Screen name="CityListScreen" component={CityListScreen} />
      <Stack.Screen name="CityDetailsScreen" component={CityDetailsScreen} />
    </Stack.Navigator>
  );
};
export {WeatherNavigator};
