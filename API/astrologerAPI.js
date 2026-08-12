import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.RAPIDAPI_KEY;

export async function getChart(userData) {
        const options = {
                method: 'POST',
                url: 'https://astrologer.p.rapidapi.com/api/v4/birth-chart',
                headers: {
                        'x-rapidapi-key': apiKey,
                        'x-rapidapi-host': 'astrologer.p.rapidapi.com',
                        'Content-Type': 'application/json'
                },
                data: {
                        subject: {
                                year: userData.year,
                                month: userData.month,
                                day: userData.day,
                                hour: userData.hour,
                                minute: userData.minute,
                                longitude: userData.long,
                                latitude: userData.lat,
                                city: userData.city,
                                nation: userData.nation,
                                timezone: userData.timezone,
                                name: userData.name,
                                zodiac_type: 'Tropic',
                                sidereal_mode: null,
                                perspective_type: 'Apparent Geocentric',
                                houses_system_identifier: 'P'
                        },
                        theme: 'classic',
                        language: 'EN',
                        wheel_only: false
                }
        };

        try {
                const response = await axios.request(options);
                // console.log(response.data.data);
                return response;

        } catch (error) {
                console.error(error);
        };
};
