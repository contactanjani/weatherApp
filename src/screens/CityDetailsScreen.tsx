import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Weather} from '../models/Weather';

const CityDetailsScreen = ({route}) => {
  const {item}: {item: Weather} = route.params;
  return (
    <View style={styles.container}>
      <Text>
        {'city ----> '}
        {item.city}
      </Text>
      <Text>
        {'temperature ----> '}
        {item.temperature}
      </Text>
      <Text>
        {'humidity ----> '}
        {item.humidity}
      </Text>
      <Text>
        {'visibility ----> '}
        {`${item.visibility} metres`}
      </Text>
      <Text>
        {'Weather Description ----> '}
        {item.weatherDescription}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    backgroundColor: '#FF7F50',
  }
});

export {CityDetailsScreen};
