import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";
import { AuthProvider } from "./contexts/authContext";

import './App.css';

function App() {

    const routesArray = [
        { path: "*", element: <Login /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/home", element: <Home /> },
    ];
    const routesElement = useRoutes(routesArray);

    return (
        <AuthProvider>
            <Header />
            {routesElement}

        </AuthProvider>
    );
}

export default App;
