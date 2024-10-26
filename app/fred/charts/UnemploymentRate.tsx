"use client"

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Range, getTrackBackground } from 'react-range';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Observation {
    date: string;
    value: number;
}

const UnemploymentRateChart = () => {
    const [data, setData] = useState<Observation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [range, setRange] = useState([0, 100]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data...');
                setLoading(true);
                const response = await axios.get('/api/unemploymentRate');
                console.log('API Response:', response.data);
                if (response.data && response.data.observations) {
                    const observations = response.data.observations.map((obs: any) => ({
                        date: obs.date,
                        value: parseFloat(obs.value),
                    }));
                    console.log('Processed Observations:', observations);
                    setData(observations);
                } else {
                    console.error('Invalid data structure:', response.data);
                    setError('Invalid data structure received from API');
                }
            } catch (error) {
                console.error('Error in fetchData:', error);
                if (axios.isAxiosError(error)) {
                    setError(`Error fetching data: ${error.message}`);
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                console.log('Setting loading to false');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleRangeChange = useCallback((values: number[]) => {
        setRange(values);
    }, []);

    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (data.length === 0) return <div>No data available</div>;

    // RANGE



    const startIndex = Math.floor(range[0] / 100 * (data.length - 1));
    const endIndex = Math.floor(range[1] / 100 * (data.length - 1));
    const filteredData = data.slice(startIndex, endIndex + 1);
    
    // CHART
    const chartData = {
        labels: filteredData.map(item => item.date),
        datasets: [
            {
                label: 'Unemployment Rate',
                data: filteredData.map(item => item.value),
                fill: false,
                backgroundColor: '#9fe870',
                borderColor: '#7fbf50',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Unemployment Rate Over Time',
            },
        },
    };

    return (
        <div style={{ width: '90%', height: '90vh' }}>
            <Line options={options} data={chartData} />
            <div style={{ marginTop: '20px' }}>
                <Range
                    step={1}
                    min={0}
                    max={100}
                    values={range}
                    onChange={handleRangeChange}
                    renderTrack={({ props, children }: { props: any, children: any }) => (
                        <div

                            {...props}
                            style={{
                                ...props.style,
                                height: '6px',
                                width: '100%',
                                backgroundColor: '#ddd'
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: '5px',
                                    width: '90%',
                                    borderRadius: '4px',
                                    background: getTrackBackground({
                                        values: range,
                                        colors: ['#ddd', '#7fbf50', '#ddd'],
                                        min: 0,
                                        max: 100
                                    }),
                                    alignSelf: 'center'
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props, index }: { props: any, index: number }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '20px',
                                width: '20px',
                                borderRadius: '50%',
                                backgroundColor: '#FFF',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 2px 6px #AAA',
                                cursor: 'pointer'
                            }}
                        />
                    )}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <span>{filteredData[0]?.date}</span>
                    <span>{filteredData[filteredData.length - 1]?.date}</span>
                </div>
            </div>
        </div>
    );
};

export default UnemploymentRateChart;