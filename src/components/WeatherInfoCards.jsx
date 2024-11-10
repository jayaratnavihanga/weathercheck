import React from 'react';
import PropTypes from 'prop-types';
import { WiDaySunny, WiCloud, WiThermometer, WiStrongWind, WiSunrise, WiSunset, WiWindDeg, WiRaindrop, WiBarometer } from 'react-icons/wi';

const WeatherInfoCards = ({ weather }) => {
    const cardData = [
        { value: `${(weather.visibility / 1000).toFixed(1)} km`, icon: <WiDaySunny /> },
        { value: `${weather.main.pressure} hPa`, icon: <WiBarometer /> },
        { value: `${weather.clouds.all}%`, icon: <WiCloud /> },
        { value: `${(weather.main.temp - ((100 - weather.main.humidity) / 5)).toFixed(1)}°C`, icon: <WiThermometer /> },
        { value: new Date((weather.sys.sunrise + weather.timezone) * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }), icon: <WiSunrise /> },
        { value: new Date((weather.sys.sunset + weather.timezone) * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }), icon: <WiSunset /> },
        { value: `${weather.wind.deg}°`, icon: <WiWindDeg /> },
        { value: `${Math.round(weather.main.temp_max)}°C`, icon: <WiThermometer />, labelIcon: '↑' },
        { value: `${Math.round(weather.main.temp_min)}°C`, icon: <WiThermometer />, labelIcon: '↓' },
    ];

    return (
        <div className="grid grid-cols-3 gap-2 pt-1 pr-2">
            {cardData.map((card, index) => (
                <div key={index} className="h-[70px] bg-white bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 text-black p-2 rounded-lg shadow-sm text-center">
                    <div className="flex items-center justify-center mb-1">
                        <span className="text-2xl text-yellow-300">{card.icon}</span>
                        {card.labelIcon && (
                            <span className="text-lg text-black font-bold ml-1">{card.labelIcon}</span>
                        )}
                    </div>
                    <p className="text-sm font-bold text-gray-300">{card.value}</p>
                </div>
            ))}
        </div>
    );
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
        timezone: PropTypes.number,
        sys: PropTypes.shape({
            sunrise: PropTypes.number,
            sunset: PropTypes.number,
        }),
    }).isRequired,
};

export default WeatherInfoCards;
0