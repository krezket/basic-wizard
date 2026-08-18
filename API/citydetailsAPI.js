export async function getCityDetails(id) {
        // Point this to your new local Node.js server
        const url = `http://localhost:3000/api/citydetails/${id}`;
        console.log(url)
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
