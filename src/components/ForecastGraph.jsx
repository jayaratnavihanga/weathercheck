import React from 'react';
import {Line} from 'react-chartjs-2';
import PropTypes from 'prop-types';
import {Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ForecastGraph = ({forecast}) => {
    const labels = forecast.map(item =>
        new Date(item.dt_txt).toLocaleTimeString('en-GB', {hour: '2-digit', hour12: false})
    );
    const temperatures = forecast.map(item => item.main.temp);

    const data = {
        labels,
        datasets: [
            {
                label: 'Temperature (°C)',
                data: temperatures,
                fill: true,
                backgroundColor: 'rgba(56,128,255,0.2)',
                borderColor: 'rgba(56,128,255,1)',
                pointBackgroundColor: 'rgba(56,128,255,1)',
                pointBorderColor: 'white',
                pointHoverBackgroundColor: 'white',
                pointHoverBorderColor: 'rgba(56,128,255,1)',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {display: false},
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleFont: {size: 14},
                bodyFont: {size: 12},
                padding: 10,
                displayColors: false,
                callbacks: {label: tooltipItem => `${tooltipItem.raw}°C`},
            },
        },
        scales: {
            x: {
                title: {display: true, text: 'Time', color: '#999', font: {size: 12, weight: '500'}},
                grid: {display: false},
                ticks: {color: '#666', font: {size: 10}},
            },
            y: {
                title: {display: true, text: 'Temperature (°C)', color: '#999', font: {size: 12, weight: '500'}},
                grid: {color: 'rgba(200, 200, 200, 0.1)'},
                ticks: {color: '#666', font: {size: 10}, beginAtZero: false},
            },
        },
        elements: {
            line: {borderJoinStyle: 'round', borderCapStyle: 'round'},
        },
    };

    return (
        <div className="my-4 bg-black shadow-lg rounded-lg p-5 max-w-3xl mx-auto" style={{height: '300px'}}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">5-Day Temperature Forecast</h3>
            <div style={{height: '200px'}}>
                <Line data={data} options={options}/>
            </div>
        </div>
    );
};

ForecastGraph.propTypes = {
    forecast: PropTypes.arrayOf(
        PropTypes.shape({
            dt_txt: PropTypes.string.isRequired,
            main: PropTypes.shape({
                temp: PropTypes.number.isRequired,
            }).isRequired,
        })
    ).isRequired,
};

export default ForecastGraph;
