import React, {useState, useEffect} from 'react';
import {useAuth} from '../../contexts/authContext/index.jsx';
import SearchBar from '../SearchBar';
import WeatherDisplay from '../WeatherDisplay';
import ForecastDisplay from '../ForecastDisplay';
import ForecastDetailModal from '../ForecastDetailModal';
import ErrorMessage from '../ErrorMessage';
import bg from '../../assets/bg.jpg'
/*
import {getBackgroundImage} from '../utils/getWeatherAssets';
*/
import {countryCodes} from '../../utils/countryCodes';
import WindyMap from "../WindyMap.jsx";
import ForecastGraph from "../ForecastGraph.jsx";
import {FaMapMarkerAlt} from "react-icons/fa";

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
            className="bg-cover bg-center bg-no-repeat bg-fixed h-full"
            style={{backgroundImage: `url(${bg})`}}
        >
            {/*
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-3xl"></div>
*/}

            {/*
            <div
                className=${isNight ? "text-white" : "text-black"}
                            style={{ backgroundImage: `url(${backgroundImage})` }}
            >
            {isNight && <div className="absolute inset-0 bg-black opacity-80"></div>}
            */}
            <div className="pt-16 ">

                {weather.name && weather.sys && weather.main && weather.weather && weather.weather[0] && (
                    <div>
                        <div className="lg:flex justify-between items-center p-4">
                            <div className="lg:pl-16">
                                <SearchBar search={search} setSearch={setSearch} searchPressed={searchPressed}/>
                                <ErrorMessage error={error}/>


                            </div>
                            <p className="lg:text-6xl sm:text-5xl pr-10 flex items-center space-x-2 ">
                                <FaMapMarkerAlt className="pt-2 text-4xl text-red-500"/>
                                <div className="text-white">                         <span>
        {weather.name}, <span>{countryName}</span>
    </span></div>
                            </p>

                        </div>

                    </div>
                )}

                <div className="lg:grid grid-cols-2 lg:px-0 sm:px-4">
                    <div className="lg:flex flex-col space-y-4 lg:ml-14">
                        <WeatherDisplay weather={weather}/>
                        <ForecastDisplay forecast={forecast} handleItemClick={handleItemClick}/>
                    </div>
                    <div className="lg:flex flex-col pt-7">
                        <WindyMap lat={coordinates.lat} lon={coordinates.lon}/>
                        <ForecastGraph forecast={forecast}/>
                    </div>
                </div>


            </div>
            {selectedItem && <ForecastDetailModal selectedItem={selectedItem} closeModal={closeModal}/>}
        </div>
    );

};

export default Home;
