const H_URL = "https://basic-wizard-backend-04b2d718d7ba.herokuapp.com/api/cities?q="
const L_URL = `http://localhost:3000/api/cities?q=${searchQuery}`;

export async function getCity(searchQuery) {
        // Point this to your new local Node.js server
        const url = `${H_URL}${searchQuery}`;

        try {
                const response = await fetch(url);

                if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                return data;

        } catch (error) {
                console.error("Error fetching country data from backend:", error);
                return [];
        }
}
