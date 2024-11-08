import React from 'react';
import Header from "./header/index.jsx";
import { WeatherProvider } from '../contexts/weatherContext/WeatherContext.jsx';
import CurrentWeather from "./CurrentWeather.jsx";
import MapView from "./MapView.jsx";
import {GeolocationProvider} from "../contexts/GeoLocation/GeolocationContext.jsx"; // Import the MapView component

function WeatherApp() {
    return (
        <div className="bg-white">
            <GeolocationProvider>

            <WeatherProvider>
                <div className="h-screen w-screen">
                    <Header />
                    <div className="flex flex-row">
                        <div className=" basis-1/2 mt-8">
                            <CurrentWeather/>
                        </div>
                        <div className="basis-1/2 pt-24">
                            <MapView/>
                        </div>
                    </div>

                </div>
            </WeatherProvider>
            </GeolocationProvider>
        </div>
    );
}

export default WeatherApp;
