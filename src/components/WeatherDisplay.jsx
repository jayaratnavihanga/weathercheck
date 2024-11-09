import React from 'react';
import PropTypes from 'prop-types';
import { getWeatherIcon } from './utils/getWeatherAssets';
const WeatherDisplay = ({ weather = {} }) => {
    if (!weather.weather || !weather.weather[0]) {
        return null;
    }

    const timezoneOffset = weather.timezone || 0;
    const localTime = new Date(Date.now() + timezoneOffset * 1000 - new Date().getTimezoneOffset() * 60000);
    const formattedTime = localTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
    const weatherIcon = getWeatherIcon(weather.weather[0].main);

    return (
        <div className="flex">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-300">Current weather</p>
                        <p className="text-xs text-gray-400">{formattedTime}</p>
                    </div>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <img src={weatherIcon} alt={weather.weather[0].description} className="w-16 h-16" />
                    <div className="ml-4">
                        <p className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</p>
                        <p className="text-lg">{weather.weather[0].main}</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 text-sm text-gray-300">
                    <div><p>Wind</p><p>{weather.wind.speed} m/s</p></div>
                    <div><p>Humidity</p><p>{weather.main.humidity}%</p></div>
                    <div><p>Feels like</p><p>{Math.round(weather.main.feels_like)}°C</p></div>
                </div>
            </div>

            <WeatherInfoCards weather={weather} />
        </div>
    );
};

const WeatherInfoCards = ({ weather }) => {
    const cardData = [
        { label: "Visibility", value: `${(weather.visibility / 1000).toFixed(1)} km` },
        { label: "Pressure", value: `${weather.main.pressure} hPa` },
        { label: "Cloud Coverage", value: `${weather.clouds.all}%` },
        { label: "Dew Point", value: `${(weather.main.temp - ((100 - weather.main.humidity) / 5)).toFixed(1)}°C` },
        { label: "Sunrise", value: new Date((weather.sys.sunrise + weather.timezone) * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) },
        { label: "Sunset", value: new Date((weather.sys.sunset + weather.timezone) * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) },
        { label: "Wind Direction", value: `${weather.wind.deg}°` },
        { label: "Max Temp", value: `${Math.round(weather.main.temp_max)}°C` },
        { label: "Min Temp", value: `${Math.round(weather.main.temp_min)}°C` },
    ];

    return (
        <div className="grid grid-cols-3 gap-2 ml-4">
            {cardData.map((card, index) => (
                <div key={index} className="bg-gray-200 text-gray-800 p-2 rounded shadow-sm text-center">
                    <p className="text-xs font-semibold text-gray-600">{card.label}</p>
                    <p className="text-sm font-bold">{card.value}</p>
                </div>
            ))}
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
            temp_max: PropTypes.number,
            temp_min: PropTypes.number,
        }),
        wind: PropTypes.shape({
            speed: PropTypes.number,
            deg: PropTypes.number,
        }),
        clouds: PropTypes.shape({
            all: PropTypes.number,
        }),
        visibility: PropTypes.number,
        timezone: PropTypes.number,
        sys: PropTypes.shape({
            sunrise: PropTypes.number,
            sunset: PropTypes.number,
        }),
    }),
};

WeatherInfoCards.propTypes = {
    weather: PropTypes.shape({
        visibility: PropTypes.number,
        main: PropTypes.shape({
            pressure: PropTypes.number,
            temp: PropTypes.number,
            humidity: PropTypes.number,
            temp_max: PropTypes.number,
            temp_min: PropTypes.number,
        }),
        clouds: PropTypes.shape({
            all: PropTypes.number,
        }),
        wind: PropTypes.shape({
            deg: PropTypes.number,
        }),
        timezone: PropTypes.number, // Added timezone to PropTypes
        sys: PropTypes.shape({
            sunrise: PropTypes.number,
            sunset: PropTypes.number,
        }),
    }).isRequired,
};

export default WeatherDisplay;
