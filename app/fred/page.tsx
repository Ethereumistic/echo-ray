// app/page.tsx
"use client"
import dynamic from 'next/dynamic';

const UnemploymentRateChart = dynamic(() => import('./charts/UnemploymentRate'), { ssr: false });


const Fred = () => {
    return (
        <div >
            <h1>Unemployment Rate</h1>
            <UnemploymentRateChart />
        </div>
    );
};

export default Fred;