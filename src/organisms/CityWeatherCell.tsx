import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Weather} from '../models/Weather';

export interface CityWeatherCellPayload {
  item: Weather;
  callback: (item: Weather) => void;
}

const CityWeatherCell = ({payload}) => {
  const onPress = () => {
    payload.callback(payload.item);
  };
  return (
    <TouchableHighlight onPress={onPress} style={styles.cellContainer}>
      <View style={styles.horizontalContainer}>
        <View style={styles.details}>
          <Text>{`city: ${payload.item.city}`}</Text>
          <Text>{`temperature: ${payload.item.temperature}° C`}</Text>
          <Text>{`humidity: ${payload.item.humidity}%`}</Text>
        </View>
        <Text style={styles.chevron}>{'>'}</Text>
      </View>
    </TouchableHighlight>
  );
};

export {CityWeatherCell};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#40E0D0',
    padding: 0,
    marginVertical: 0,
    marginHorizontal: 0,
  },
  details: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  cellContainer: {
    flexDirection: 'column',
    height: 70,
  },
  horizontalContainer: {
    flexDirection: 'row',
    backgroundColor: '#CCCCFF',
    alignItems: 'center',
  },
  chevron: {
    fontWeight: 'bold',
    position: 'absolute',
    right: 20,
  },
});
