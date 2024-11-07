import React from 'react';
import PropTypes from 'prop-types';

const ForecastDetailModal = ({ selectedItem, closeModal }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-gray-600 p-5 rounded-lg opacity-95">
            <h1 className="text-xl font-bold">{selectedItem.weather[0].main} Details</h1>
            <p>Date: {new Date(selectedItem.dt * 1000).toLocaleString()}</p>
            <p>Temperature: {selectedItem.main.temp}°C</p>
            <p>Feels Like: {selectedItem.main.feels_like}°C</p>
            <p>Humidity: {selectedItem.main.humidity}%</p>
            <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow">
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