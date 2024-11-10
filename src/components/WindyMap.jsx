import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const WINDY_API_KEY = import.meta.env.VITE_WINDY_API_KEY;

const WindyMap = ({ lat, lon }) => {
    useEffect(() => {
        const leafletScript = document.createElement('script');
        leafletScript.src = 'https://unpkg.com/leaflet@1.4.0/dist/leaflet.js';
        leafletScript.async = true;

        const windyScript = document.createElement('script');
        windyScript.src = 'https://api.windy.com/assets/map-forecast/libBoot.js';
        windyScript.async = true;

        document.body.appendChild(leafletScript);
        document.body.appendChild(windyScript);

        windyScript.onload = () => {
            const options = {
                key: WINDY_API_KEY,
                verbose: true,
                lat: lat || 50.4,
                lon: lon || 14.3,
                zoom: 8,
            };

            window.windyInit(options, (windyAPI) => {
                const { map } = windyAPI;
                map.setView([lat, lon], 8);
            });
        };

        return () => {
            document.body.removeChild(leafletScript);
            document.body.removeChild(windyScript);
        };
    }, [lat, lon]);

    return <div id="windy" className="lg:w-[640px] h-[250px]  lg:rounded-xl lg:ml-16 "></div>;
};

WindyMap.propTypes = {
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
};

export default WindyMap;
