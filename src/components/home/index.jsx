import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext/index.jsx';
import rainVideo from "../../assets/cloud.mp4";
import rainImage from "../../assets/rain.jpg";

import rainBg from "../../assets/rain.jpg";

const api = {
    key: import.meta.env.VITE_WEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
};

const Home = () => {
    const { currentUser } = useAuth();
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    const [forecast, setForecast] = useState([]);
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

    return (
        <div className="">
            <p className="">
            </p>

            <div className="relative flex h-screen bg-cover bg-center" style={{backgroundImage: `url(${rainBg})`}}>

                {/* <video
                    className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                    src={rainVideo}
                    autoPlay
                    loop
                    muted
                                        onLoadedMetadata={(e) => e.target.playbackRate = 0.25}
                />*/}

                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 -z-10"/>

                <div className="basis-1/5 h-screen  bg-black bg-opacity-30 backdrop-blur-md">
                    <div className="mt-20">

                        <input
                            className="input input-bordered input-primary  max-w-xs"

                            type="text"
                            placeholder="Enter city/town..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button onClick={searchPressed} className="btn btn-outline btn-info">Search</button>
                        {/*
                        <button onClick={searchPressed} className="">
                            Search
                        </button>*/}
                    </div>
                    <h2 className="">Today's Weather</h2>
                    {error && <p className="">{error}</p>}

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

                <div className="basis-4/5  bg-black bg-opacity-20 rounded-lg backdrop-blur-md">
                    {weather.name && weather.sys && (
                        <>
                            <p className="text-6xl">{weather.name}, {weather.sys.country}</p>
                            <p className="text-6xl">{weather.main.temp}°C</p>
                        </>
                    )}
                    {forecast.length > 0 ? (
                        <div className="flex justify-center space-x-4">
                            {forecast.map((item, index) => (
                                <div key={index} className="text-center">
                                    <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                        alt={item.weather[0].description}
                                    />
                                    <p>{item.main.temp}°C</p>
                                    <p>{item.weather[0].main}</p>
                                    <p>{item.weather[0].description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No forecast data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
