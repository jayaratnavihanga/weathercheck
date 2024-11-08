// src/contexts/weatherContext/WeatherContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { GeolocationContext } from '../GeoLocation/GeolocationContext.jsx';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [weather, setWeather] = useState({
        name: "",
        sys: { country: "" },
        main: { temp: null, humidity: null },
        weather: [{ description: "" }],
        wind: { speed: null }
    });
    const [searchWeather, setSearchWeather] = useState(null);
    const { location } = useContext(GeolocationContext);

    const api = {
        key: import.meta.env.VITE_WEATHER_API_KEY,
        base: "https://api.openweathermap.org/data/2.5/"
    };

    useEffect(() => {
        const fetchWeather = async (lat, lon) => {
            try {
                const url = `${api.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`;
                const response = await fetch(url);
                const data = await response.json();
                setWeather(data);
            } catch (error) {
                console.error("Error fetching weather data", error);
            }
        };

        if (location.latitude && location.longitude) {
            fetchWeather(location.latitude, location.longitude);
        }
    }, [location, api.base, api.key]);

    // Fetch weather data based on city name
    const fetchWeatherByCity = async (city) => {
        try {
            const url = `${api.base}weather?q=${city}&units=metric&appid=${api.key}`;
            const response = await fetch(url);
            const data = await response.json();
            setSearchWeather(data);
        } catch (error) {
            console.error("Error fetching weather data for city", error);
        }
    };

    // Fetch weather data based on coordinates (for map clicks)
    const fetchWeatherByCoords = async (lat, lon) => {
        try {
            const url = `${api.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`;
            const response = await fetch(url);
            const data = await response.json();
            setSearchWeather(data);
        } catch (error) {
            console.error("Error fetching weather data for coordinates", error);
        }
    };

    return (
        <WeatherContext.Provider value={{ weather, searchWeather, fetchWeatherByCity, fetchWeatherByCoords }}>
            {children}
        </WeatherContext.Provider>
    );
};
