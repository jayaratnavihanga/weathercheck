import React from 'react';
import PropTypes from 'prop-types';
import { getWeatherIcon } from './utils/getWeatherAssets'; // Adjust path if necessary

const WeatherDisplay = ({ weather = {} }) => {
    if (!weather.weather || !weather.weather[0]) {
        return null;
    }

    const timezoneOffset = weather.timezone || 0;
    const localTime = new Date(Date.now() + timezoneOffset * 1000 - new Date().getTimezoneOffset() * 60000);
    const formattedTime = localTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
    const weatherIcon = getWeatherIcon(weather.weather[0].main); // Fetch the icon based on the weather type

    return (
        <div className="bg-yellow-400 text-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm">Current weather</p>
                    <p className="text-xs">{formattedTime}</p>
                </div>
            </div>

            <div className="flex items-center justify-center mt-4">
                <img
                    src={weatherIcon}
                    alt={weather.weather[0].description}
                    className="w-16 h-16"
                />
                <div className="ml-4">
                    <p className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</p>
                    <p className="text-lg">{weather.weather[0].main}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
                <div>
                    <p>Wind</p>
                    <p>{weather.wind.speed} m/s</p>
                </div>
                <div>
                    <p>Humidity</p>
                    <p>{weather.main.humidity}%</p>
                </div>
                <div>
                    <p>Feels like</p>
                    <p>{Math.round(weather.main.feels_like)}°C</p>
                </div>
                <div>
                    <p>Visibility</p>
                    <p>{(weather.visibility / 1000).toFixed(1)} km</p>
                </div>
                <div>
                    <p>Pressure</p>
                    <p>{weather.main.pressure} hPa</p>
                </div>
                <div>
                    <p>Cloud Coverage</p>
                    <p>{weather.clouds.all}%</p>
                </div>
            </div>
        </div>
    );
};

WeatherDisplay.propTypes = {
    weather: PropTypes.shape({
        weather: PropTypes.arrayOf(
            PropTypes.shape({
                main: PropTypes.string,
                description: PropTypes.string,
                icon: PropTypes.string,
            })
        ),
        main: PropTypes.shape({
            temp: PropTypes.number,
            humidity: PropTypes.number,
            feels_like: PropTypes.number,
            pressure: PropTypes.number,
        }),
        wind: PropTypes.shape({
            speed: PropTypes.number,
        }),
        clouds: PropTypes.shape({
            all: PropTypes.number,
        }),
        visibility: PropTypes.number,
        timezone: PropTypes.number,
    }),
};

export default WeatherDisplay;
