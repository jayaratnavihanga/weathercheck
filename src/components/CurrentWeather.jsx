// src/components/CurrentWeather.jsx
import React, { useContext } from 'react';
import { WeatherContext } from '../contexts/weatherContext/WeatherContext.jsx';
import { countryCodes } from '../utils/countryCodes';

function CurrentWeather() {
    const { weather, searchWeather } = useContext(WeatherContext);
    const currentWeather = searchWeather || weather; // Use search data if available

    // Construct icon URL if icon code is available
    const iconUrl = currentWeather.weather && currentWeather.weather[0].icon
        ? `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`
        : null;

    // Get full country name from countryCodes
    const countryName = currentWeather.sys && currentWeather.sys.country
        ? countryCodes[currentWeather.sys.country]
        : "Unknown Country";

    return (
        <div className="w-full h-64 bg-blue-500 mt-8 flex flex-col items-center justify-center text-white">
            {currentWeather.name && countryName ? (
                <>
                    <p className="text-4xl font-bold">
                        {currentWeather.name}, {countryName}
                    </p>
                    {iconUrl && (
                        <img src={iconUrl} alt="weather icon" className="w-20 h-20 mt-2" />
                    )}
                    <p className="text-2xl mt-2">
                        {currentWeather.main && currentWeather.main.temp !== null ? `${currentWeather.main.temp}°C` : "N/A"}
                    </p>
                    <p className="text-lg mt-1">
                        {currentWeather.weather && currentWeather.weather[0].description
                            ? currentWeather.weather[0].description
                            : "N/A"}
                    </p>
                    <p className="text-sm mt-2">
                        Humidity: {currentWeather.main && currentWeather.main.humidity !== null ? `${currentWeather.main.humidity}%` : "N/A"}
                    </p>
                    <p className="text-sm">
                        Wind Speed: {currentWeather.wind && currentWeather.wind.speed !== null ? `${currentWeather.wind.speed} m/s` : "N/A"}
                    </p>
                </>
            ) : (
                <p>Click on the map to view weather data for that location.</p>
            )}
        </div>
    );
}

export default CurrentWeather;
