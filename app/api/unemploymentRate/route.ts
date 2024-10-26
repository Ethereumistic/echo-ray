import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    try {
        const response = await axios.get(`https://api.stlouisfed.org/fred/series/observations?series_id=UNRATE&api_key=2cce83225cee1fcdf081b02839a3d260&file_type=json`);
        console.log('FRED API Response:', response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
    }
}