import {FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Weather} from '../models/Weather';
import {WeatherService} from '../services/WeatherService';
import {CityWeatherCell} from '../organisms/CityWeatherCell';

const kFetchInterval = 60000;

const CityListScreen = ({navigation}) => {
  const [weatherItems, setWeatherItems] = useState<Weather[]>([]);
  const weatherRef = useRef([]);

  useEffect((): any => {
    // load data from db
    WeatherService.loadDataFromDB().then(weatherItemsResult => {
      if (weatherItems.length) {
        weatherRef.current = weatherItemsResult;
        setWeatherItems(weatherRef.current);
      }
    });
    // load data from api on app launch
    WeatherService.fetchWeatherUpdate((weatherItemsResult: Weather[]) => {
      console.log('finished api call with data', weatherItemsResult);
      weatherRef.current = weatherItemsResult;
      setWeatherItems(weatherRef.current);
    });

    //load data from api after every interval
    setInterval(function () {
      WeatherService.fetchWeatherUpdate((weatherItemsResult: Weather[]) => {
        weatherRef.current = weatherItemsResult;
        setWeatherItems(weatherRef.current);
      });
    }, kFetchInterval);
  }, []); //to call this block only once

  const renderItem = ({item}) => {
    return <CityWeatherCell payload={{item, callback: onPress}} />;
  };

  const onPress = (item: Weather) => {
    navigation.navigate('CityDetailsScreen', {item});
  };

  return <FlatList data={weatherRef.current} renderItem={renderItem} />;
};

export {CityListScreen};
