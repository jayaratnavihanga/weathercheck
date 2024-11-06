import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext/index.jsx';
import rainBg from '../../assets/rain.jpg'


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

            <div
                className="flex h-screen bg-cover bg-center"
                style={{backgroundImage: `url(${rainBg})`}}
            >
                <div className="basis-1/5 h-screen  ">
                    <div className="">
                        <div className="mt-20">
                            <input
                                type="text"
                                className=""
                                placeholder="Enter city/town..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button
                                onClick={searchPressed}
                                className=""
                            >
                                Search
                            </button>
                        </div>
                    </div>
                    <h2 className="">Today's Weather</h2>

                    {error && <p className="">{error}</p>}

                    {typeof weather.main !== "undefined" && weather.weather ? (
                        <div className="pt-10">
                            {/*   <p className="">{weather.name}, {weather.sys.country}</p>
                            <p className="">{weather.main.temp}°C</p>*/}

                            <img
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt={weather.weather[0].description}
                                className=""
                            />

                            <p className="">{weather.weather[0].main}</p>
                            <p className="">{weather.weather[0].description}</p>

                            <div className="">
                                {/*<p><strong>Feels Like:</strong> {weather.main.feels_like}°C</p>
                                <p><strong>Min Temperature:</strong> {weather.main.temp_min}°C</p>
                                <p><strong>Max Temperature:</strong> {weather.main.temp_max}°C</p>
                                <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
                                */}<p><strong>Humidity:</strong> {weather.main.humidity}%</p>
                                <p><strong>Visibility:</strong> {weather.visibility / 1000} km</p>
                                <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
                                <p><strong>Wind Direction:</strong> {weather.wind.deg}°</p>
                                <p><strong>Cloud Coverage:</strong> {weather.clouds.all}%</p>
                            </div>
                        </div>
                    ) : null}
                </div>

                <div className="basis-4/5 mt-20">
                    <p className="text-6xl">{weather.name}, {weather.sys.country}</p>
                    <p className="text-6xl">{weather.main.temp}°C</p>

                    {forecast.length > 0 ? (
                        <div className="flex justify-center space-x-4">
                            {forecast.map((item, index) => (
                                <div key={index} className="text-center">
                                    <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>

                                    {/* Forecast Icon */}
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
