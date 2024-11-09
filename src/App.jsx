import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from "./components/auth/login/index.jsx";
import Register from "./components/auth/register/index.jsx";
import Header from "./components/header/index.jsx";
import Home from "./components/home/index.jsx";
import { AuthProvider } from "./contexts/authContext/index.jsx";

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
            <div className="flex flex-col h-screen overflow-hidden">
                <Header />
                <main className="flex-grow overflow-hidden">
                    {routesElement}
                </main>
            </div>
        </AuthProvider>
    );
}

export default App;
