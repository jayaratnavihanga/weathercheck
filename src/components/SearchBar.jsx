/*
import React, { useState, useContext } from 'react';
import { WeatherContext } from '../contexts/weatherContext/WeatherContext';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const { fetchWeatherByCity } = useContext(WeatherContext);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            fetchWeatherByCity(searchTerm);
        }
    };

    return (
        <div className="flex items-center justify-center mt-4">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter country or city name"
                className="border rounded px-4 py-2 mr-2"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar;
*/
