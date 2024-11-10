# WeatherCheck

A dynamic, location-based weather application that provides users with real-time weather updates and an interactive map experience. This project helped me improve my skills in React, API integration, authentication and responsive design.

## Overview

This application uses the OpenWeather API to fetch current weather conditions and displays them in a user-friendly interface built with React.
Firebase authentication enables secure user sign-in and sign-out functionality, while Windy's map API provides an interactive weather map.
Additionally, the app uses geolocation to show the user’s local weather upon loading.

## Key Features

- **User Authentication** - Firebase authentication supports secure sign-in and sign-out.
- **Current Location Weather** - Fetches and displays weather data based on the user's geolocation.
- **Global Weather Data** - Users can search for weather conditions in various locations using the OpenWeather API.
- **Interactive Weather Map** - A Windy-powered map provides visual, real-time weather data.

## Technology Stack

- **React** - Frontend JavaScript library for building interactive user interfaces.
- **Vite** - A fast, modern build tool for web applications.
- **Tailwind CSS** - Utility-first CSS framework for responsive design.
- **Firebase** - Used for secure user authentication and app hosting.
- **OpenWeather API** - Provides real-time, location-based weather information.
- **Windy API** - Renders an interactive, real-time weather map.
- **Geolocation API** - Retrieves the user's current location for accurate weather data.

## Getting Started

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** or **Yarn** for dependency management


## How to Run the WeatherCheck Locally

Follow these steps to run the Weather App locally on your machine:

### 1. Clone the repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/jayaratnavihanga/weathercheck.git
```
### 2. Install dependencies
```bash
npm install
```
### 3. Set up the .env file
Save the .env file in the root directory of the project.

### 4. Enable Geolocation
   To use geolocation functionality in the app, you need to allow the app to access your location. When prompted by the browser, grant permission for the app to use your location. This is required for weather updates based on your current location.

### 5. Run the development server
Start the development server to view the app:

```bash
npm run dev
```

## Key Learning Points

Throughout this project, I gained valuable experience and learned several important concepts:

- **React Functional Components and Hooks**: I strengthened my understanding of React by using functional components and React hooks such as `useState`, `useEffect` and `useContext` for state management and lifecycle methods.


- **API Integration**: I integrated various third-party APIs, including OpenWeather API, Firebase Authentication, and Windy API. This helped me improve my skills in working with external data and APIs.


- **User Authentication**: I learned how to implement Firebase Authentication for handling user sign-in and sign-out, enabling secure user management within the app.


- **Geolocation API**: I gained practical experience using the browser's geolocation API to get the user's location and display personalized weather data based on that location.


- **State Management**: I learned how to manage application state effectively in a React application, ensuring that data fetched from APIs was reflected in the UI.


- **Error Handling**: I improved my error-handling skills by gracefully managing errors from API calls and user permissions, ensuring the app provides a good user experience even in cases of failure.


These learning points helped me develop a stronger foundation in react development and work with real-time, location-based applications.









