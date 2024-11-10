import React from 'react';
import PropTypes from 'prop-types';
import { getWeatherIcon } from '../utils/getWeatherAssets';
import WeatherInfoCards from './WeatherInfoCards';

const WeatherDisplay = ({ weather = {} }) => {
    if (!weather.weather || !weather.weather[0]) {
        return null;
    }

    const timezoneOffset = weather.timezone || 0;
    const localTime = new Date(Date.now() + timezoneOffset * 1000 - new Date().getTimezoneOffset() * 60000);
    const formattedTime = localTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
    const weatherIcon = getWeatherIcon(weather.weather[0].main);

    return (
        <div className="flex flex-col sm:flex-row py-8">
            <div className="lg:basis-1/2 pt-3 lg:pr-4 lg:pl-6 ">
                <div className="bg-white bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-10000 p-6 lg:rounded-lg shadow-lg max-w-sm mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-white">Current weather</p>
                        </div>
                    </div>

                    <div className="sm:flex items-center justify-center mt-4">
                        <img src={weatherIcon} alt={weather.weather[0].description} className="w-16 h-16" />
                        <div className="ml-4">
                            <p className="text-5xl font-bold text-yellow-300">{Math.round(weather.main.temp)}°C</p>
                            <p className="text-lg text-white">{weather.weather[0].main}</p>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 gap-4 mt-6 text-sm text-gray-300">
                        <div><p>Wind</p><p>{weather.wind.speed} m/s</p></div>
                        <div><p>Humidity</p><p>{weather.main.humidity}%</p></div>
                        <div><p>Feels like</p><p>{Math.round(weather.main.feels_like)}°C</p></div>
                    </div>
                </div>
            </div>
            <div className="lg:basis-1/2 p-2">
                <WeatherInfoCards weather={weather} />
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

export default WeatherDisplay;
