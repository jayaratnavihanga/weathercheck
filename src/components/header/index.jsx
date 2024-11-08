// src/components/Header.jsx
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext/index.jsx';
import { doSignOut } from '../../firebase/auth.js';
import { WeatherContext } from '../../contexts/weatherContext/WeatherContext.jsx';
import { countryCodes } from '../../utils/countryCodes';

const Header = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    const { weather, fetchWeatherByCity } = useContext(WeatherContext);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchWeatherByCity(searchQuery); // Trigger search based on city name
        setSearchQuery(''); // Clear the search input after submission
    };

    // Get the full country name from countryCodes
    const countryName = weather.sys && weather.sys.country
        ? countryCodes[weather.sys.country]
        : "Unknown Country";

    return (
        <nav className='flex flex-row gap-x-2 h-20 w-full z-20 fixed top-0 left-0 border-b place-content-center items-center bg-gray-200'>
            {userLoggedIn ? (
                <>
                    <p className="text-6xl">{weather.name}, {countryName}</p>
                    <button
                        onClick={() => {
                            doSignOut().then(() => navigate('/login'));
                        }}
                        className='text-sm text-blue-600 underline'
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
                    <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
                </>
            )}

            {/* Search bar */}
            <form onSubmit={handleSearchSubmit} className="ml-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="px-2 py-1 border rounded"
                />
                <button type="submit" className="text-sm text-blue-600 underline ml-2">Search</button>
            </form>
        </nav>
    );
}

export default Header;
