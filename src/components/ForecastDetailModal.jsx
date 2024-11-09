import React from 'react';
import PropTypes from 'prop-types';

const ForecastDetailModal = ({ selectedItem, closeModal }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
                aria-label="Close"
            >
                ✕
            </button>

            <h1 className="text-2xl font-bold text-gray-800 mb-3">{selectedItem.weather[0].main} Details</h1>
            <p className="text-gray-600">
                <span className="font-semibold">Date:</span> {new Date(selectedItem.dt * 1000).toLocaleString()}
            </p>
            <p className="text-gray-600 mt-2">
                <span className="font-semibold">Temperature:</span> {selectedItem.main.temp}°C
            </p>
            <p className="text-gray-600 mt-2">
                <span className="font-semibold">Feels Like:</span> {selectedItem.main.feels_like}°C
            </p>
            <p className="text-gray-600 mt-2">
                <span className="font-semibold">Humidity:</span> {selectedItem.main.humidity}%
            </p>

            <button
                onClick={closeModal}
                className="mt-6 w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
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
