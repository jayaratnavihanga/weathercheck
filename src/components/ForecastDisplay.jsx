import React from 'react';
import PropTypes from 'prop-types';

const ForecastDisplay = ({ forecast, handleItemClick }) => (
    <div className="flex justify-center mt-6 mb-6 overflow-x-auto">
        <div className="flex space-x-4 px-4 bg" >
            {forecast.map((item, index) => (
                <button key={index} onClick={() => handleItemClick(item)} className="text-center bg-white rounded-lg shadow-lg p-4 focus:outline-none">
                    <p className="font-semibold">{new Date(item.dt * 1000).toLocaleDateString()}</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt={item.weather[0].description}
                        className="mx-auto w-20 h-20"
                    />
                    <p className="text-xl font-bold">{item.main.temp}°C</p>
                    <p className="text-sm text-gray-700">{item.weather[0].main}</p>
                    <p className="text-sm text-gray-500">{item.weather[0].description}</p>
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
