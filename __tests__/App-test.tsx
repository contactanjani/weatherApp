/**
 * @format
 */

import 'react-native';
import {getStaticListOfCities} from '../src/services/WeatherService';

test('initial list populated', () => {
  expect(getStaticListOfCities()).toHaveLength(10);
});
