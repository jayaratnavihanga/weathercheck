import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext/index.jsx';

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-800 text-white p-6">
            <p className="text-2xl font-bold mb-6">
                Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.
            </p>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg">
                <div>
                    <h2 className="text-3xl font-bold text-center mb-4">Today's Weather</h2>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    {typeof weather.main !== "undefined" && weather.weather ? (
                        <div className="text-center">
                            <p className="text-2xl font-semibold">{weather.name}, {weather.sys.country}</p>
                            <p className="text-5xl font-bold mb-2">{weather.main.temp}°C</p>

                            {/* Weather Icon */}
                            <img
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt={weather.weather[0].description}
                                className="mx-auto mb-2"
                            />

                            <p className="text-xl font-medium">{weather.weather[0].main}</p>
                            <p className="italic mb-4">({weather.weather[0].description})</p>

                            <div className="text-lg">
                                <p><strong>Feels Like:</strong> {weather.main.feels_like}°C</p>
                                <p><strong>Min Temperature:</strong> {weather.main.temp_min}°C</p>
                                <p><strong>Max Temperature:</strong> {weather.main.temp_max}°C</p>
                                <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
                                <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
                                <p><strong>Visibility:</strong> {weather.visibility / 1000} km</p>
                                <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
                                <p><strong>Wind Direction:</strong> {weather.wind.deg}°</p>
                                <p><strong>Cloud Coverage:</strong> {weather.clouds.all}%</p>
                            </div>
                        </div>
                    ) : null}
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-center mb-4">5-Day Forecast</h2>

                    {forecast.length > 0 ? (
                        <div className="grid gap-4">
                            {forecast.map((item, index) => (
                                <div key={index} className="bg-white bg-opacity-20 p-4 rounded-lg text-center">
                                    <p className="font-semibold">{new Date(item.dt * 1000).toLocaleDateString()}</p>

                                    {/* Forecast Icon */}
                                    <img
                                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                        alt={item.weather[0].description}
                                        className="mx-auto mb-2"
                                    />

                                    <p className="text-2xl font-bold">{item.main.temp}°C</p>
                                    <p className="text-lg">{item.weather[0].main}</p>
                                    <p className="italic">({item.weather[0].description})</p>
                                </div>
                            ))}
                        </div>
                    ) : <p className="text-center">No forecast data available.</p>}
                </div>
            </div>

            <div className="w-full max-w-md mt-8 p-4 bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg">
                <div className="flex items-center">
                    <input
                        type="text"
                        className="w-full px-4 py-2 rounded-l-lg outline-none text-gray-900"
                        placeholder="Enter city/town..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={searchPressed}
                        className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-r-lg transition duration-200"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
