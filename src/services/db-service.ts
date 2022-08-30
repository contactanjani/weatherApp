import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {Weather} from '../models/Weather';

const tableName = 'weatherData';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'weather-data.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        city TEXT UNIQUE NOT NULL,
        temperature INTEGER,
        humidity INTEGER,
        visibility INTEGER,
        weatherDescription TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getWeatherItems = async (
  db: SQLiteDatabase,
): Promise<Weather[]> => {
  try {
    const weatherItems: Weather[] = [];
    const results = await db.executeSql(
      `SELECT city, temperature, humidity, visibility, weatherDescription FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        weatherItems.push(result.rows.item(index));
      }
    });
    return weatherItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const saveWeatherItems = async (
  db: SQLiteDatabase,
  weatherItem: Weather,
) => {
  // first try to update row if it exists
  // otherwise, use insert command to add row
  const result = await db.executeSql(`UPDATE ${tableName} SET
  temperature=${weatherItem.temperature},
  humidity=${weatherItem.humidity},
  visibility=${weatherItem.visibility},
  weatherDescription='${weatherItem.weatherDescription}'
  WHERE city='${weatherItem.city}'`);
  if (result[0].rowsAffected === 0) {
    // indicates that update operation failed
    const insertQuery = `INSERT OR REPLACE INTO ${tableName}(city, temperature, humidity, visibility, weatherDescription)
    VALUES ('${weatherItem.city}', ${weatherItem.temperature}, ${weatherItem.humidity}, ${weatherItem.visibility}, '${weatherItem.weatherDescription}')`;
    return db.executeSql(insertQuery);
  } else {
    return Promise.resolve();
  }
};
