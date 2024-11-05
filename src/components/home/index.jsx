import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext/index.jsx';

const api = {
    key: import.meta.env.VITE_WEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
};

const Home = () => {
    const { currentUser } = useAuth();
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    const [error, setError] = useState("");

    const searchPressed = () => {
        if (!search.trim()) {
            setError("Please enter a city or town.");
            return;
        }

        fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                if (result.cod !== 200) {
                    setError(result.message);
                } else {
                    setWeather(result);
                    setError("");
                }
            })
            .catch((error) => {
                setError("An error occurred while fetching the weather data.");
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-800 text-white p-6">
            <p className="text-2xl font-bold mb-6">
                Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.
            </p>

            <div className="w-full max-w-md p-8 bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg">
                <h1 className="text-3xl font-bold text-center mb-4">Weather App</h1>

                {/* Search Box */}
                <div className="flex items-center mb-4">
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

                {/* Error Message */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Weather Data */}
                {typeof weather.main !== "undefined" && weather.weather ? (
                    <div className="text-center">
                        <p className="text-2xl font-semibold">{weather.name}</p>
                        <p className="text-5xl font-bold mb-2">{weather.main.temp}°C</p>
                        <p className="text-xl font-medium">{weather.weather[0].main}</p>
                        <p className="italic">({weather.weather[0].description})</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Home;
