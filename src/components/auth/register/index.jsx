import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext/index.jsx';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth.js';
import background from '../../../assets/bg.jpg';

const Register = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                navigate('/home');
            } catch (error) {
                setErrorMessage("Failed to create an account. Please try again.");
            } finally {
                setIsRegistering(false);
            }
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
            className="w-full h-screen flex items-center justify-center"
        >
            {userLoggedIn && <Navigate to={'/home'} replace={true} />}

            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 bg-opacity-90 shadow-2xl rounded-xl">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-white">WeatherCheck</h1>
                    <h3 className="text-gray-300 text-xl font-semibold">Create a New Account</h3>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-300 font-bold">Email</label>
                        <input
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-white bg-gray-700 border border-gray-600 focus:border-blue-500 shadow-sm rounded-lg transition duration-300 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-300 font-bold">Password</label>
                        <input
                            disabled={isRegistering}
                            type="password"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-white bg-gray-700 border border-gray-600 focus:border-blue-500 shadow-sm rounded-lg transition duration-300 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-300 font-bold">Confirm Password</label>
                        <input
                            disabled={isRegistering}
                            type="password"
                            autoComplete="off"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-white bg-gray-700 border border-gray-600 focus:border-blue-500 shadow-sm rounded-lg transition duration-300 outline-none"
                        />
                    </div>

                    {errorMessage && <span className="text-red-500 font-bold">{errorMessage}</span>}

                    <button
                        type="submit"
                        disabled={isRegistering}
                        className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-lg'}`}
                    >
                        {isRegistering ? 'Signing Up...' : 'Sign Up'}
                    </button>

                    <p className="text-center text-sm text-gray-300">
                        Already have an account?{' '}
                        <Link to={'/login'} className="text-blue-500 font-bold hover:underline">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
