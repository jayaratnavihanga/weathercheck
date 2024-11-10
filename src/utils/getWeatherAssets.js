import clear from "../assets/clear.jpg";
import clouds from "../assets/clouds.jpg";
import drizzle from "../assets/drizzle.jpg";
import hail from "../assets/hail.jpg";
import mist from "../assets/mist.jpg";
import rain from "../assets/rain.jpg";
import snow from "../assets/snow.jpg";
import thunderstorm from "../assets/thunderstorm.jpg";

import clearIcon from "../assets/icons/clear.png";
import cloudsIcon from "../assets/icons/clouds.png";
import drizzleIcon from "../assets/icons/drizzle.png";
import hailIcon from "../assets/icons/hail.png";
import mistIcon from "../assets/icons/mist.png";
import rainIcon from "../assets/icons/rain.png";
import snowIcon from "../assets/icons/snow.png";
import thunderstormIcon from "../assets/icons/thunderstorm.png";

export const getBackgroundImage = (weatherType) => {
    const images = {
        Clear: clear,
        Clouds: clouds,
        Drizzle: drizzle,
        Hail: hail,
        Mist: mist,
        Rain: rain,
        Snow: snow,
        Thunderstorm: thunderstorm
    };
    return images[weatherType] || clear; // Fallback to 'clear' if weather type is not recognized
};

export const getWeatherIcon = (weatherType) => {
    const icons = {
        Clear: clearIcon,
        Clouds: cloudsIcon,
        Drizzle: drizzleIcon,
        Hail: hailIcon,
        Mist: mistIcon,
        Rain: rainIcon,
        Snow: snowIcon,
        Thunderstorm: thunderstormIcon
    };
    return icons[weatherType] || clearIcon; // Fallback to 'clearIcon' if weather type is not recognized
};
