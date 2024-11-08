import React, { useState, useEffect } from 'react';

const api = {
    key: import.meta.env.VITE_WEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
};

const Home = () => {
    const [weather, setWeather] = useState({});

    // Fetch weather data for a default location
    useEffect(() => {
        const fetchWeather = async () => {
            const city = 'London'; // Example city, change as needed
            const url = `${api.base}weather?q=${city}&units=metric&APPID=${api.key}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch weather');
            const data = await response.json();
            setWeather(data);
        };

        fetchWeather().catch(console.error);
    }, []);

    // Displaying some basic weather information
    return (
        <div>
            {weather.main ? (
                <div>
                    <h1>{weather.name}</h1>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].main}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                </div>
            ) : (
                <p>Loading weather...</p>
            )}
        </div>
    );
};

export default Home;
