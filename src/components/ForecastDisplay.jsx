import React from 'react';
import PropTypes from 'prop-types';
import { getWeatherIcon } from './utils/getWeatherAssets.js';

const ForecastDisplay = ({ forecast, handleItemClick }) => (
    <div className="flex justify-center mt-2 mb-6 overflow-x-auto font-sourGummy">
        <div className="flex space-x-4 ">
            {forecast.map((item, index) => (
                <button
                    key={index}
                    onClick={() => handleItemClick(item)}
                    className="text-center bg-blue-900 text-white rounded-lg py-4 focus:outline-none min-w-[100px] shadow-md"
                >
                    <p className="text-sm font-semibold">{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}</p>
                    <img
                        src={getWeatherIcon(item.weather[0].main)}
                        alt={item.weather[0].description}
                        className="mx-auto w-10 h-10 mt-2 mb-1"
                    />
                    <p className="text-lg font-bold">{Math.round(item.main.temp)}°</p>
                    <div className="text-xs text-gray-300 mt-1">
                        <p>Min: {Math.round(item.main.temp_min)}°</p>
                        <p>Max: {Math.round(item.main.temp_max)}°</p>
                    </div>
                </button>
            ))}
        </div>
    </div>
);

ForecastDisplay.propTypes = {
    forecast: PropTypes.arrayOf(
        PropTypes.shape({
            dt: PropTypes.number.isRequired,
            main: PropTypes.shape({
                temp: PropTypes.number.isRequired,
                temp_min: PropTypes.number,
                temp_max: PropTypes.number,
            }).isRequired,
            weather: PropTypes.arrayOf(
                PropTypes.shape({
                    main: PropTypes.string.isRequired,
                    description: PropTypes.string.isRequired,
                    icon: PropTypes.string.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    handleItemClick: PropTypes.func.isRequired,
};

export default ForecastDisplay;
