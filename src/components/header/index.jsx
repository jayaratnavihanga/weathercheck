import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext/index.jsx'
import { doSignOut } from '../../firebase/auth.js'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()

    return (
        <nav className="flex justify-between items-center w-full z-20 fixed top-0 left-0 h-16 px-8 bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md">
            <div className="text-2xl font-bold">
                <Link to="/" className="text-white hover:text-gray-200 transition duration-300">
                    WeatherCheck
                </Link>
            </div>

            <div className="flex gap-x-4">
                {userLoggedIn ? (
                    <button
                        onClick={() => {
                            doSignOut().then(() => {
                                navigate('/login')
                            })
                        }}
                        className="text-sm font-medium px-4 py-2 bg-white text-indigo-600 rounded-full hover:bg-gray-100 transition duration-300"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="text-sm font-medium px-4 py-2 bg-white text-indigo-600 rounded-full hover:bg-gray-100 transition duration-300"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="text-sm font-medium px-4 py-2 bg-white text-indigo-600 rounded-full hover:bg-gray-100 transition duration-300"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Header
