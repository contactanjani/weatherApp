/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'reflect-metadata';
import {WeatherNavigator} from './src/navigation/WeatherNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <WeatherNavigator />
    </NavigationContainer>
  );
};
export default App;
