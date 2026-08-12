import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.RAPIDAPI_KEY;

export async function getCountry(userData) {
        const options = {
                method: 'GET',
                url: 'https://city-and-state-search-api.p.rapidapi.com/cities/search',
                params: {
                        q: userData.country,
                },
                headers: {
                        'x-rapidapi-key': apiKey,
                        'x-rapidapi-host': 'city-and-state-search-api.p.rapidapi.com',
                        'Content-Type': 'application/json'
                }
        };

        async function fetchData() {
                try {
                        const response = await axios.request(options);
                        console.log(response.data);
                } catch (error) {
                        console.error(error);
                }
        }
        fetchData();
};


