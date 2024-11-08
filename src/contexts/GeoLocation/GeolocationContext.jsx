// src/contexts/GeoLocation/GeolocationContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const GeolocationContext = createContext();

export const GeolocationProvider = ({ children }) => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            error => console.error("Error getting location", error)
        );
    }, []);

    return (
        <GeolocationContext.Provider value={{ location }}>
            {children}
        </GeolocationContext.Provider>
    );
};
