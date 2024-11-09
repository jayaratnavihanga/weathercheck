import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext/index.jsx';
import SearchBar from '../SearchBar';
import WeatherDisplay from '../WeatherDisplay';
import ForecastDisplay from '../ForecastDisplay';
import ForecastDetailModal from '../ForecastDetailModal';
import WindyMap from "../WindyMap.jsx";
import ForecastGraph from "../ForecastGraph.jsx";

const WEATHER_API_BASE = "https://api.openweathermap.org/data/2.5/";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Home = () => {
    const { currentUser } = useAuth();
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    const [forecast, setForecast] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [coordinates, setCoordinates] = useState({ lat: 50.4, lon: 14.3 });

    const fetchWeather = (url) => {
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                setWeather(result);
                setCoordinates({ lat: result.coord.lat, lon: result.coord.lon });
            });
    };

    const fetchForecast = (url) => {
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                const dailyForecast = result.list.filter(item => item.dt_txt.includes("12:00:00"));
                setForecast(dailyForecast);
            });
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                const weatherUrl = `${WEATHER_API_BASE}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${WEATHER_API_KEY}`;
                const forecastUrl = `${WEATHER_API_BASE}forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=${WEATHER_API_KEY}`;
                fetchWeather(weatherUrl);
                fetchForecast(forecastUrl);
            });
        }
    }, []);

    const searchPressed = () => {
        const weatherUrl = `${WEATHER_API_BASE}weather?q=${search}&units=metric&APPID=${WEATHER_API_KEY}`;
        const forecastUrl = `${WEATHER_API_BASE}forecast?q=${search}&units=metric&APPID=${WEATHER_API_KEY}`;
        fetchWeather(weatherUrl);
        fetchForecast(forecastUrl);
    };

    const handleItemClick = (item) => setSelectedItem(item);
    const closeModal = () => setSelectedItem(null);

    return (
        <div className="relative bg-white bg-cover bg-center h-full pt-8 text-black">
            <div className="relative z-10 p-5 overflow-y-auto h-full flex flex-col md:flex-row">
                <div className="basis-1/2 pt-4 ">
                    <div className="flex flex-col items-start h-full">
                        {weather.name && (
                            <div className="my-4 flex flex-col items-start">
                                <p className="text-6xl">
                                    {weather.name}, <span className="text-6xl">{weather.sys?.country}</span>
                                </p>
                                <div className="my-4">
                                    <WeatherDisplay weather={weather} />
                                </div>
                                <p className="text-xl">5 Day Forecast</p>
                                <div className="mt-4 w-full max-h-[300px] overflow-y-auto">
                                    <ForecastDisplay forecast={forecast} handleItemClick={handleItemClick} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="basis-1/2">
                    <div className="p-5 flex justify-end items-start">
                        <SearchBar search={search} setSearch={setSearch} searchPressed={searchPressed} />
                    </div>
                    <div className="p-8">
                        <WindyMap lat={coordinates.lat} lon={coordinates.lon} />
                        <ForecastGraph forecast={forecast} />
                    </div>
                </div>
            </div>
            {selectedItem && <ForecastDetailModal selectedItem={selectedItem} closeModal={closeModal} />}
        </div>
    );
};

export default Home;
