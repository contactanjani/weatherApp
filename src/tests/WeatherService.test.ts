import {getStaticListOfCities} from '../services/WeatherService';

test('initial list populated', () => {
  expect(getStaticListOfCities()).toHaveLength(10);
});
