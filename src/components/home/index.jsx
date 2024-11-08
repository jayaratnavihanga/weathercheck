import React, {useState, useEffect} from 'react';
import {useAuth} from '../../contexts/authContext/index.jsx';
/*import rainVideo from "../../assets/cloud.mp4";
import rainImage from "../../assets/rain.jpg";*/
import clear from "../../assets/clear.jpg";
import clouds from "../../assets/clouds.jpg";
import drizzle from "../../assets/drizzle.jpg";
import hail from "../../assets/hail.jpg";
import mist from "../../assets/mist.jpg";

import rain from "../../assets/rain.jpg";
import snow from "../../assets/snow.jpg";
import thunderstorm from "../../assets/thunderstorm.jpg";


const api = {
    key: import.meta.env.VITE_WEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
};

const Home = () => {
    const {currentUser} = useAuth();
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    const [forecast, setForecast] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); // State to track the selected forecast item

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
    const getBackgroundImage = (weatherType) => {
        switch (weatherType) {
            case 'Clear':
                return clear;
            case 'Clouds':
                return clouds;
            case 'Drizzle':
                return drizzle;
            case 'Hail':
                return hail;
            case 'Mist':
                return mist;
            case 'Rain':
                return rain;
            case 'Snow':
                return snow;
            case 'Thunderstorm':
                return thunderstorm;
            default:
                return clear; // Default background if no match is found
        }
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
                    const weatherUrl = `${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`;
                    const forecastUrl = `${api.base}forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`;
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

        const weatherUrl = `${api.base}weather?q=${search}&units=metric&APPID=${api.key}`;
        const forecastUrl = `${api.base}forecast?q=${search}&units=metric&APPID=${api.key}`;
        fetchWeather(weatherUrl);
        fetchForecast(forecastUrl);
    };
    const handleItemClick = (item) => {
        setSelectedItem(item); // Set the selected item to display more details
    };
    /*

        const getBackgroundImage = (weatherType) => {
            switch (weatherType) {
                case 'Clear':
                    return clear;
                case 'Clouds':
                    return clouds;
                case 'Drizzle':
                    return drizzle;
                case 'Hail':
                    return hail;
                case 'Mist':
                    return mist;
                case 'Rain':
                    return rain;
                case 'Snow':
                    return snow;
                case 'Thunderstorm':
                    return thunderstorm;
                default:
                    return clear; // Default background if no match is found
            }
        };

        const backgroundImage = getBackgroundImage(weather.weather[0].main);



    */

    return (
        <div className="">
            <p className="">
            </p>
            <div>

                {/*
                style={{backgroundImage: `url(${rainBg})`}}
*/}
                {/* <video
                    className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                    src={rainVideo}
                    autoPlay
                    loop
                    muted
                                        onLoadedMetadata={(e) => e.target.playbackRate = 0.25}
                />*/}


                <div className="">

                    {/*
                    <h2 className="">Today's Weather</h2>
*/}
                    {error && <p className="">{error}</p>}

                    <div className="flex flex-col md:flex-row">
                        <div className="flex-1">
                            {weather.name && weather.sys && (
                                <>
                                    <p className="text-6xl">{weather.name}, {weather.sys.country}</p>
                                    <p className="text-6xl">{weather.main.temp}°C</p>
                                </>
                            )}
                        </div>
                        <div className="flex-1 flex justify-center items-center">
                            <input
                                className="input input-bordered input-primary w-full max-w-xs"
                                type="text"
                                placeholder="Enter city/town..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button
                                className="btn btn-outline btn-info ml-2"
                                onClick={searchPressed}
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    <div className="">{/*
                    {weather.name && weather.sys && (
                        <>
                            <p className="text-6xl">{weather.name}, {weather.sys.country}</p>
                            <p className="text-6xl">{weather.main.temp}°C</p>
                        </>
                    )}*/}
                        {forecast.length > 0 ? (
                            <div className="flex justify-center mt-6 mb-6 overflow-x-auto">
                                <div className="flex space-x-4 px-4">
                                    {forecast.map((item, index) => (
                                        <button key={index} onClick={() => handleItemClick(item)}
                                                className="text-center bg-white rounded-lg shadow-lg p-4 focus:outline-none">
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
                        ) : (
                            <p>No forecast data available.</p>
                        )}

                        {selectedItem && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                <div className="bg-white p-5 rounded-lg">
                                    <h1 className="text-xl font-bold">{selectedItem.weather[0].main} Details</h1>
                                    <p>Date: {new Date(selectedItem.dt * 1000).toLocaleString()}</p>
                                    <p>Temperature: {selectedItem.main.temp}°C</p>
                                    <p>Feels Like: {selectedItem.main.feels_like}°C</p>
                                    <p>Humidity: {selectedItem.main.humidity}%</p>
                                    <button onClick={() => setSelectedItem(null)}
                                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow">
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {typeof weather.main !== "undefined" && weather.weather && (
                        <div className="pt-10">
                            <img
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt={weather.weather[0].description}
                                className=""
                            />
                            <p className="">{weather.weather[0].main}</p>
                            <p className="">{weather.weather[0].description}</p>
                            <div className="">
                                <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
                                <p><strong>Visibility:</strong> {weather.visibility / 1000} km</p>
                                <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
                                <p><strong>Wind Direction:</strong> {weather.wind.deg}°</p>
                                <p><strong>Cloud Coverage:</strong> {weather.clouds.all}%</p>
                            </div>
                        </div>
                    )}
                </div>


            </div>
        </div>
    );
};

export default Home;
