import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext/index.jsx';
import SearchBar from '../SearchBar';
import WeatherDisplay from '../WeatherDisplay';
import ForecastDisplay from '../ForecastDisplay';
import ForecastDetailModal from '../ForecastDetailModal';
import ErrorMessage from '../ErrorMessage';
import clear from "../../assets/clear.jpg";
import clouds from "../../assets/clouds.jpg";
import drizzle from "../../assets/drizzle.jpg";
import hail from "../../assets/hail.jpg";
import mist from "../../assets/mist.jpg";
import rain from "../../assets/rain.jpg";
import snow from "../../assets/snow.jpg";
import thunderstorm from "../../assets/thunderstorm.jpg";
import { countryCodes } from '../utils/countryCodes';

const getBackgroundImage = (weatherType) => {
    switch (weatherType) {
        case 'Clear': return clear;
        case 'Clouds': return clouds;
        case 'Drizzle': return drizzle;
        case 'Hail': return hail;
        case 'Mist': return mist;
        case 'Rain': return rain;
        case 'Snow': return snow;
        case 'Thunderstorm': return thunderstorm;
        default: return clear;
    }
};

const WEATHER_API_BASE = "https://api.openweathermap.org/data/2.5/";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Home = () => {
    const { currentUser } = useAuth();
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    const [forecast, setForecast] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [error, setError] = useState("");

    const fetchWeather = (url) => {
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                if (result.cod !== 200) {
                    setError(result.message);
                } else {
                    setWeather(result);
                    setError("");
                }
            })
            .catch(() => {
                setError("An error occurred while fetching the weather data.");
            });
    };

    const fetchForecast = (url) => {
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                if (result.cod !== "200") {
                    setError(result.message);
                } else {
                    const dailyForecast = result.list.filter(item => item.dt_txt.includes("12:00:00"));
                    setForecast(dailyForecast);
                    setError("");
                }
            })
            .catch(() => {
                setError("An error occurred while fetching the forecast data.");
            });
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const weatherUrl = `${WEATHER_API_BASE}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${WEATHER_API_KEY}`;
                    const forecastUrl = `${WEATHER_API_BASE}forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=${WEATHER_API_KEY}`;
                    fetchWeather(weatherUrl);
                    fetchForecast(forecastUrl);
                },
                () => {
                    setError("Unable to access your location. Please enter a city.");
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    }, []);

    const searchPressed = () => {
        if (!search.trim()) {
            setError("Please enter a city or town.");
            return;
        }

        const weatherUrl = `${WEATHER_API_BASE}weather?q=${search}&units=metric&APPID=${WEATHER_API_KEY}`;
        const forecastUrl = `${WEATHER_API_BASE}forecast?q=${search}&units=metric&APPID=${WEATHER_API_KEY}`;
        fetchWeather(weatherUrl);
        fetchForecast(forecastUrl);
    };

    const handleItemClick = (item) => setSelectedItem(item);
    const closeModal = () => setSelectedItem(null);

    const backgroundImage = weather.weather ? getBackgroundImage(weather.weather[0].main) : clear;
    const isNight = weather.sys && (Date.now() / 1000 > weather.sys.sunset || Date.now() / 1000 < weather.sys.sunrise);

    const countryName = weather.sys && weather.sys.country ? countryCodes[weather.sys.country] : weather.sys?.country || "Unknown Country";

    return (
        <div
            className="relative bg-cover bg-center h-screen rounded-3xl"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {isNight && (
                <div className="absolute inset-0 bg-black opacity-80 rounded-3xl"></div>
            )}
            <div className="relative z-10 p-5">
                <ErrorMessage error={error} />
                <div className="m-5">
                    <SearchBar search={search} setSearch={setSearch} searchPressed={searchPressed}/>
                </div>
                {weather.name && weather.sys && weather.main && (
                    <div className="text-center my-4">
                        <p className="text-6xl">{weather.name}, {countryName}</p>
                    </div>
                )}
                <div className="flex flex-row">
                    <div className="flex basis-1/4 justify-center items-center">
                        <div className="flex flex-col">
                            <WeatherDisplay weather={weather} />
                        </div>
                    </div>
                    <div className="basis-3/4">
                        <ForecastDisplay forecast={forecast} handleItemClick={handleItemClick}/>
                    </div>
                </div>
                {selectedItem && <ForecastDetailModal selectedItem={selectedItem} closeModal={closeModal} />}
            </div>
        </div>
    );
};

export default Home;
