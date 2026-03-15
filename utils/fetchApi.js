import axios from "axios"

export const baseUrl = 'https://unofficial-redfin.p.rapidapi.com'

export const fetchApi = async (url, retries = 2) => {
    if (!url) return null

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await axios.get(url,{
                headers: {
                    'x-rapidapi-key': '64bc93994emsh7473d88f1f87767p198a6ajsn71e5e16c3386',
                    'x-rapidapi-host': 'unofficial-redfin.p.rapidapi.com',
                    'Content-Type': 'application/json'
                }
            });
            return response?.data;
        } catch (error) {
            console.error(`Attempt ${attempt + 1} failed:`, error.message);

            // If rate limited (429), wait and retry with exponential backoff
            if (error.response?.status === 429 && attempt < retries - 1) {
                const waitTime = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
                console.log(`Rate limited. Retrying in ${waitTime}ms...`);
                await delay(waitTime);
                continue;
            }

            // For other errors or final attempt, return null
            if (attempt === retries - 1) {
                console.error('All retries failed:', error);
                return null;
            }
        }
    }
    return null;
};
