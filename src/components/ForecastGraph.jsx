import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import chartBg from '../assets/chart-bg.jpg';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const ForecastGraph = ({ forecast }) => {
    const labels = forecast.map(item =>
        new Date(item.dt_txt).toLocaleTimeString('en-GB', { hour: '2-digit', hour12: false })
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
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleFont: { size: 14, color: '#ffffff' },
                bodyFont: { size: 12, color: '#ffffff' },
                padding: 10,
                callbacks: { label: tooltipItem => `${tooltipItem.raw}°C` },
            },
        },
        scales: {
            x: {
                title: { display: true, text: 'Time', color: '#ffffff', font: { size: 12, weight: '500' } },
                grid: { display: false },
                ticks: { color: '#ffffff', font: { size: 10 } },
            },
            y: {
                title: { display: true, text: 'Temperature (°C)', color: '#ffffff', font: { size: 12, weight: '500' } },
                grid: { color: 'rgba(200, 200, 200, 0.1)' },
                ticks: { color: '#ffffff', font: { size: 10 }, beginAtZero: false },
            },
        },
        elements: {
            line: { borderJoinStyle: 'round', borderCapStyle: 'round' },
        },
    };

    return (
        <div
            className="my-4 shadow-lg bg-white rounded-lg p-5 w-[600px] h-[300px] mx-auto bg-cover bg-center bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100"
         /*   style={{
                backgroundImage: `url(${chartBg})`,
            }}*/
        >
            <h3 className="text-lg font-semibold text-white">5-Day Temperature Forecast</h3>
            <div className="w-[500px] h-[220px] ml-6 px-5 pt-5 rounded-xl">
                <Line data={data} options={options} />
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
