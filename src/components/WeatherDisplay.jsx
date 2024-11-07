import React from 'react';
import PropTypes from 'prop-types';

const WeatherDisplay = ({ weather = {} }) => {
    if (!weather.weather || !weather.weather[0]) {
        return null;
    }

    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const day = date.toLocaleDateString(undefined, { weekday: 'long' });
        const time = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
        return `${day}, ${time}`;
    };

    return (
        <div className="pt-10">
            <div
                className="
                h-fit w-fit bg-gray-400 rounded-md bg-clip-padding
                backdrop-filter backdrop-blur-sm bg-opacity-60 border
                border-gray-100
            "
            >
                <img
                    className="h-40 w-fit"
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                />
            </div>

            <p className="text-6xl pt-10">{Math.round(weather.main.temp)}°C</p>

            {weather.dt && (
                <p className="text-lg pt-2">{formatDateTime(weather.dt)}</p>
            )}

            <p>{weather.weather[0].main}</p>
            <p>{weather.weather[0].description}</p>
            <div className="font-bold flex flex-row gap-4 mt-5">
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <p className="text-lg">Humidity</p>
                    <p>{weather.main.humidity}%</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <p className="text-lg">Visibility</p>
                    <p>{(weather.visibility / 1000).toFixed(1)} km</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <p className="text-lg">Wind Speed</p>
                    <p>{weather.wind.speed} m/s</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <p className="text-lg">Wind Direction</p>
                    <p>{weather.wind.deg}°</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <p className="text-lg">Cloud Coverage</p>
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
        }),
        wind: PropTypes.shape({
            speed: PropTypes.number,
            deg: PropTypes.number,
        }),
        clouds: PropTypes.shape({
            all: PropTypes.number,
        }),
        visibility: PropTypes.number,
        dt: PropTypes.number,
    }),
};

export default WeatherDisplay;
