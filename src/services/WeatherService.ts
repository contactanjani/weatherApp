import axios from 'axios';
import {
  getDBConnection,
  getWeatherItems,
  saveWeatherItems,
  createTable,
} from '../services/db-service';
import {Weather} from '../models/Weather';

export interface ILatlong {
  latitude: Number;
  longitude: Number;
}

export interface IWeatherRequestPayload {
  latlongList: ILatlong[];
  callback: (payload: any | null) => void;
}

type GetWeatherResponse = {
  data: Weather[];
};

function getStaticListOfCities(): ILatlong[] {
  return [
    {latitude: 43.7181302, longitude: -79.6651325},
    {latitude: 49.2578263, longitude: -123.1939435},
    {latitude: 40.6976637, longitude: -74.119764},
    {latitude: 45.2502975, longitude: -76.0804354},
    {latitude: 47.6131746, longitude: -122.4821468},
    {latitude: 46.8572913, longitude: -71.4849978},
    {latitude: 38.8938672, longitude: -77.0846157},
    {latitude: 49.8539176, longitude: -97.2929219},
    {latitude: 51.0277555, longitude: -114.2279169},
    {latitude: 44.970797, longitude: -93.3315181},
  ];
}

class WeatherService {
  public fetchWeatherInfoForLocationsFromAPI = async (
    payload: IWeatherRequestPayload,
  ): Promise<void> => {
    const {callback} = payload;
    try {
      payload.latlongList.map(latlong => {
        axios
          .get<GetWeatherResponse>(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latlong.latitude.toString()}&lon=${latlong.longitude.toString()}&appid=08dbab0eeefe53317d2e0ad7c2a2e060&units=metric`,
          )
          .then(response => {
            callback(response.data);
          });
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
      } else {
        console.log('unexpected error: ', error);
      }
    }
}
  public loadDataFromDB = async (): Promise<Weather[]> => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const storedWeatherItems = await getWeatherItems(db);
      if (storedWeatherItems.length) {
        return storedWeatherItems;
      }
      return [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  public fetchWeatherUpdate = async (callback: any): Promise<void> => {
    getDBConnection().then(db => {
      const latlongList = getStaticListOfCities();
      const internalCallBack = (data: any | null) => {
        const weather = new Weather(data);
        saveWeatherItems(db, weather).then(() => {
          getWeatherItems(db).then(items => {
            callback(items);
          });
        });
      };
      this.fetchWeatherInfoForLocationsFromAPI({
        latlongList,
        callback: internalCallBack,
      });
    });
  };
}
const weatherService = new WeatherService();
export {weatherService as WeatherService, getStaticListOfCities};
