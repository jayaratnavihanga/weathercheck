// src/components/MapView.jsx
import React, { useEffect, useRef, useContext } from 'react';
import { GeolocationContext } from '../contexts/GeoLocation/GeolocationContext.jsx';
import { WeatherContext } from '../contexts/weatherContext/WeatherContext.jsx';

function MapView() {
    const { location } = useContext(GeolocationContext);
    const { fetchWeatherByCoords } = useContext(WeatherContext);
    const mapInitialized = useRef(false); // Track if map has been initialized

    useEffect(() => {
        const latitude = location.latitude;
        const longitude = location.longitude;

        if (latitude && longitude && !mapInitialized.current) {
            mapInitialized.current = true; // Set as initialized on first load

            const options = {
                key: import.meta.env.VITE_WINDY_API_KEY,
                verbose: true,
                lat: latitude,
                lon: longitude,
                zoom: 5,
            };

            const leafletScript = document.createElement('script');
            leafletScript.src = 'https://unpkg.com/leaflet@1.4.0/dist/leaflet.js';
            leafletScript.async = true;

            const windyScript = document.createElement('script');
            windyScript.src = 'https://api.windy.com/assets/map-forecast/libBoot.js';
            windyScript.async = true;

            document.body.appendChild(leafletScript);
            document.body.appendChild(windyScript);

            windyScript.onload = () => {
                window.windyInit(options, (windyAPI) => {
                    const { map } = windyAPI;

                    // Add click event listener to update weather data
                    map.on('click', (e) => {
                        const { lat, lng } = e.latlng;
                        fetchWeatherByCoords(lat, lng);
                        map.setView([lat, lng], 5); // Center map on clicked location
                    });
                });
            };

            return () => {
                document.body.removeChild(leafletScript);
                document.body.removeChild(windyScript);
            };
        }
    }, [location, fetchWeatherByCoords]);

    return (
        <div className="w-full h-full" id="windy"></div>
    );
}

export default MapView;
