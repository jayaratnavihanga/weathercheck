import React, {useState, useEffect} from 'react';
import {useAuth} from '../../contexts/authContext/index.jsx';
import SearchBar from '../SearchBar';
import WeatherDisplay from '../WeatherDisplay';
import ForecastDisplay from '../ForecastDisplay';
import ForecastDetailModal from '../ForecastDetailModal';
import ErrorMessage from '../ErrorMessage';
/*
import {getBackgroundImage} from '../utils/getWeatherAssets';
*/
import {countryCodes} from '../utils/countryCodes';
import WindyMap from "../WindyMap.jsx";
import ForecastGraph from "../ForecastGraph.jsx";

const WEATHER_API_BASE = "https://api.openweathermap.org/data/2.5/";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Home = () => {
    /*
        const {currentUser} = useAuth();
    */
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    const [forecast, setForecast] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [error, setError] = useState("");
    const [coordinates, setCoordinates] = useState({lat: 50.4, lon: 14.3});

    const fetchWeather = (url) => {
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                if (result.cod !== 200) {
                    setError(result.message);
                } else {
                    setWeather(result);
                    setCoordinates({lat: result.coord.lat, lon: result.coord.lon});
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
        /*
                setSearch("");
        */
    };

    const handleItemClick = (item) => setSelectedItem(item);
    const closeModal = () => setSelectedItem(null);

    /*
        const backgroundImage = weather.weather ? getBackgroundImage(weather.weather[0].main) : getBackgroundImage("Clear");
    */
    /*
        const isNight = weather.sys && (Date.now() / 1000 > weather.sys.sunset || Date.now() / 1000 < weather.sys.sunrise);
    */

    const countryName = weather.sys && weather.sys.country ? countryCodes[weather.sys.country] : weather.sys?.country || "Unknown Country";

    return (
        <div
            className="elative bg-white bg-cover bg-center h-full pt-8 text-black" /*${isNight ? "text-white" : "text-black"*/
            /*
                        style={{ backgroundImage: `url(${backgroundImage})` }}
            */
        >
            {/*
            {isNight && <div className="absolute inset-0 bg-black opacity-80"></div>}
*/}

            <div className="relative z-10 p-5 overflow-y-auto h-full flex flex-col md:flex-row">
                <div className="basis-1/2 pt-4 ">

                    <div className="flex flex-col items-start h-full">
                        {weather.name && weather.sys && weather.main && weather.weather && weather.weather[0] && (
                            <div className="my-4 flex flex-col items-start">
                                <p className="text-6xl">
                                    {weather.name}, <span className="text-6xl">{countryName}</span>
                                </p>

                                <div>
                                    <div className="my-4">
                                        <WeatherDisplay weather={weather}/>
                                    </div>

                                </div>

                                <p className="text-xl">5 Day Forecast</p>

                                <div className="mt-4 w-full max-h-[300px] overflow-y-auto">
                                    <ForecastDisplay forecast={forecast} handleItemClick={handleItemClick}/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="basis-1/2">
                    <div className="p-5 flex justify-end items-start">
                        <SearchBar search={search} setSearch={setSearch} searchPressed={searchPressed}/>
                    </div>
                    <div className="p-8">
                        <WindyMap lat={coordinates.lat} lon={coordinates.lon}/>
                        <ForecastGraph forecast={forecast}/>

                    </div>
                    <ErrorMessage error={error}/>

                </div>
            </div>

            {selectedItem && <ForecastDetailModal selectedItem={selectedItem} closeModal={closeModal}/>}
        </div>
    );

};

export default Home;
