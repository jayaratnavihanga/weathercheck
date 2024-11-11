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


The project uses the following environment variables. Configure these in your `.env` file before running the application.

| Variable Name                    | Description                                                     | Example Value                         |
|-----------------------------------|-----------------------------------------------------------------|---------------------------------------|
| `VITE_WEATHER_API_KEY`            | API key for accessing weather data.                            | `your_weather_api_key_here`           |
| `VITE_WINDY_API_KEY`              | API key for accessing Windy API for weather data.              | `your_windy_api_key_here`             |
| `VITE_FIREBASE_API_KEY`           | Firebase API key for accessing Firebase services.              | `your_firebase_api_key_here`         |
| `VITE_FIREBASE_AUTH_DOMAIN`       | Firebase Auth domain for Firebase authentication.              | `your_firebase_auth_domain_here`     |
| `VITE_FIREBASE_PROJECT_ID`        | Firebase Project ID.                                            | `your_firebase_project_id_here`      |
| `VITE_FIREBASE_STORAGE_BUCKET`    | Firebase Storage Bucket URL.                                   | `your_firebase_storage_bucket_here`  |
| `VITE_FIREBASE_MESSAGING_SENDER_ID`| Firebase Messaging Sender ID for push notifications.           | `your_firebase_messaging_sender_id_here` |
| `VITE_FIREBASE_APP_ID`            | Firebase App ID for identifying your Firebase app.             | `your_firebase_app_id_here`          |
| `VITE_FIREBASE_MEASUREMENT_ID`    | Firebase Measurement ID for analytics.                         | `your_firebase_measurement_id_here`  |

## Setup Instructions


### 4. Run the development server
Start the development server to view the app:

```bash
npm run dev
```

### 5. Enable Geolocation
   To use geolocation functionality in the app, you need to allow the app to access your location. When prompted by the browser, grant permission for the app to use your location. This is required for weather updates based on your current location.

## Key Learning Points

Throughout this project, I gained valuable experience and learned several important concepts:

- **React Functional Components and Hooks**: I strengthened my understanding of React by using functional components and React hooks such as `useState`, `useEffect` and `useContext` for state management and lifecycle methods.


- **API Integration**: I integrated various third-party APIs, including OpenWeather API, Firebase Authentication, and Windy API. This helped me improve my skills in working with external data and APIs.


- **User Authentication**: I learned how to implement Firebase Authentication for handling user sign-in and sign-out, enabling secure user management within the app.


- **Geolocation API**: I gained practical experience using the browser's geolocation API to get the user's location and display personalized weather data based on that location.


- **State Management**: I learned how to manage application state effectively in a React application, ensuring that data fetched from APIs was reflected in the UI.


- **Error Handling**: I improved my error-handling skills by gracefully managing errors from API calls and user permissions, ensuring the app provides a good user experience even in cases of failure.


These learning points helped me develop a stronger foundation in react development and work with real-time, location-based applications.


## Further Improvements

- **Create a Backend**: Protect the API key by creating a backend to proxy API requests, ensuring sensitive data like API keys are never exposed on the frontend. Configure CORS on the backend to allow secure communication between the frontend and backend.


- **Interactive Map**: Allow users to click on the map to get weather data for the relevant location. This could be achieved by integrating Windy's API with additional functionality that handles user clicks on the map.


- **Better Looking Icons**: Replace current icons with more visually appealing and informative icons to enhance the user experience.


- **Unit Tests**: Write unit tests for the application using Jest or a similar testing framework. Consider adding snapshot testing to ensure the UI remains consistent across updates.


- **Responsive Design**: Make the app fully responsive to improve the user experience across various devices, ensuring it adapts well to mobile and tablet screens.


- **Type Safety with TypeScript**: Introduce TypeScript to the project to enhance type safety, catching potential bugs early during development and improving code maintainability.


- **Error Reporting**: Integrate error tracking services like Sentry to monitor runtime errors and track issues in production, helping with faster debugging and a more stable application.

