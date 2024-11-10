import React from 'react';
import PropTypes from 'prop-types';

const ForecastDetailModal = ({ selectedItem, closeModal }) => (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
        <div className="bg-gray-800 rounded-lg shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
            <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors duration-200 focus:outline-none"
                aria-label="Close"
            >
                ✕
            </button>

            <div className="text-center mb-6">
                <h1 className="text-3xl font-semibold text-white">{selectedItem.weather[0].main}</h1>
                <p className="text-sm text-gray-400">{new Date(selectedItem.dt * 1000).toLocaleString()}</p>
            </div>

            <div className="space-y-4 text-white">
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg shadow-inner">
                    <span className="font-semibold">Temperature:</span>
                    <span className="text-lg font-medium">{selectedItem.main.temp}°C</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg shadow-inner">
                    <span className="font-semibold">Feels Like:</span>
                    <span className="text-lg font-medium">{selectedItem.main.feels_like}°C</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg shadow-inner">
                    <span className="font-semibold">Humidity:</span>
                    <span className="text-lg font-medium">{selectedItem.main.humidity}%</span>
                </div>
            </div>

            <button
                onClick={closeModal}
                className="mt-8 w-full py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition duration-200 shadow-md focus:outline-none"
            >
                Close
            </button>
        </div>
    </div>
);

ForecastDetailModal.propTypes = {
    selectedItem: PropTypes.shape({
        dt: PropTypes.number.isRequired,
        main: PropTypes.shape({
            temp: PropTypes.number.isRequired,
            feels_like: PropTypes.number.isRequired,
            humidity: PropTypes.number.isRequired,
        }).isRequired,
        weather: PropTypes.arrayOf(
            PropTypes.shape({
                main: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default ForecastDetailModal;
