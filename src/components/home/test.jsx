import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext/index.jsx';
import SearchBar from '../SearchBar';
import WeatherDisplay from '../WeatherDisplay';
import ForecastDisplay from '../ForecastDisplay';
import ForecastDetailModal from '../ForecastDetailModal';
import ErrorMessage from '../ErrorMessage';
import { getBackgroundImage, getWeatherIcon } from '../utils/getWeatherAssets';
import { countryCodes } from '../utils/countryCodes';

const WEATHER_API_BASE = "https://api.openweathermap.org/data/2.5/";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Home = () => {
    const {currentUser} = useAuth();
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
                    const {latitude, longitude} = position.coords;
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

    const backgroundImage = weather.weather ? getBackgroundImage(weather.weather[0].main) : getBackgroundImage("Clear");
    const isNight = weather.sys && (Date.now() / 1000 > weather.sys.sunset || Date.now() / 1000 < weather.sys.sunrise);

    const countryName = weather.sys && weather.sys.country ? countryCodes[weather.sys.country] : weather.sys?.country || "Unknown Country";
    return (
        <div
            className={`relative bg-white bg-cover bg-center h-full pt-8 ${isNight ? "text-white" : "text-black"}`}
            style={{backgroundImage: `url(${backgroundImage})`}}
        >
            {isNight && (
                <div className="absolute inset-0 bg-black opacity-80"></div>
            )}
            <div className="relative z-10 p-5 overflow-y-auto h-full">
                <ErrorMessage error={error}/>
                <div className="m-5">
                    <SearchBar search={search} setSearch={setSearch} searchPressed={searchPressed}/>
                </div>

                <div className="flex justify-between h-full">
                    {weather.name && weather.sys && weather.main && weather.weather && weather.weather[0] && (
                        <div className="basis-1/2 my-4 flex flex-col items-start ml-4">
                            <p className="text-6xl">{weather.name}</p>
                            <p className="text-4xl">{countryName}</p>

                            <div className="mt-4">
                                <WeatherDisplay weather={weather}/>
                            </div>
                            <div className="w-full max-h-[300px] overflow-y-auto">
                                <ForecastDisplay forecast={forecast} handleItemClick={handleItemClick}/>
                            </div>
                        </div>
                    )}

                    <div className="basis-1/2 flex justify-end pr-4">
                            <div className="w-full max-h-[300px] overflow-y-auto"> Limit the height
                            <ForecastDisplay forecast={forecast} handleItemClick={handleItemClick}/>
                        </div>
                    </div>
                </div>

                {selectedItem && <ForecastDetailModal selectedItem={selectedItem} closeModal={closeModal}/>}
            </div>
        </div>
    );
};
export default Home;