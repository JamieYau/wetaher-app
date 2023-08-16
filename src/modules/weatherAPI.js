const weatherAPI = (() => {
  const API_ROOT = process.env.API_ROOT;
  const API_KEY = process.env.API_KEY;

  async function fetchData(city) {
    const response = await fetch(
      `${API_ROOT}forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`
    );
    const data = await response.json();
    return data;
  }

  function getCurrentData(data) {
    const currentJSON = data.current;
    return {
      conditionText: currentJSON.condition.text,
      conditionIcon: currentJSON.condition.icon,
      temperatureCelsius: currentJSON.temp_c,
      temperatureFahrenheit: currentJSON.temp_f,
      feelsLikeCelsius: currentJSON.feelslike_c,
      feelsLikeFahrenheit: currentJSON.feelslike_f,
      humidity: currentJSON.humidity,
      windSpeedKph: currentJSON.wind_kph,
      windSpeedMph: currentJSON.wind_mph,
      windDirection: currentJSON.wind_dir,
      uvIndex: currentJSON.uv,
      visibilityKm: currentJSON.vis_km,
      visibilityMiles: currentJSON.vis_miles,
    };
  }

  function getForecastData(data) {
    const forecastJSON = data.forecast.forecastday;
    return forecastJSON.map((day) => {
      return {
        date: day.date,
        conditionText: day.day.condition.text,
        conditionIcon: day.day.condition.icon,
        temperatureCelsius: day.day.avgtemp_c,
        temperatureFahrenheit: day.day.avgtemp_f,
        humidity: day.day.avghumidity,
        windSpeedKph: day.day.maxwind_kph,
        windSpeedMph: day.day.maxwind_mph,
        windDirection: day.day.wind_dir,
        uvIndex: day.day.uv,
        visibilityKm: day.day.avgvis_km,
        visibilityMiles: day.day.avgvis_miles,
      };
    });
  }

  return {
    fetchData,
    getCurrentData,
    getForecastData,
  };
})();

export default weatherAPI;
