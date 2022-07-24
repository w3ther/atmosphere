type weatherData = {
  temperature?: number;
  humidity?: number;
  windSpeed?: number;
  windDirection?: number;
};
type weatherNode = {
  id: string;
  zipCode: string;
  country: string;
  city: string;
  state: string;
  team: string;
};
// export const weatherCreate = (weatherNodeID: string) => {
//   // create new weatherData
//   const weatherData = {
//     temperature: Math.floor(Math.random() * (100 - -100 + 1)) + -100,
//     humidity: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
//     windSpeed: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
//     windDirection: Math.floor(Math.random() * (360 - 0 + 1)) + 0,
//     updatedAt: new Date().getTime(),
//   };
//   const weatherDataString = `${new Date().getTime()}-${weatherNodeID}`;
//   return gun.get(weatherDataString).put(weatherData);
// };
