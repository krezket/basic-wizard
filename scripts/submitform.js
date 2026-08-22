async function submitForm() {

    // set formValues as an empty object
    const formValues = {};

    // get all inputs
    const inputs = document.querySelectorAll('input');
    const select = document.querySelectorAll('select');
    const astrocon = document.querySelector('.astro-form-con');
    const resultcon = document.querySelector('.results-con');
    const latitude = localStorage.getItem('latitude');
    const longitude = localStorage.getItem('longitude');
    const nation = localStorage.getItem('country_code');
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (!latitude || !longitude) {
        alert("Silly Goose Alert")
        return;
    }

    // do the following for each input 
    inputs.forEach(input => {

        // add value of all input to formValues object
        formValues[input.name] = input.value;
    });
    select.forEach(select => {

        // add value of all input to formValues object
        formValues[select.name] = select.value;
    });

    formValues.latitude = Math.floor(latitude);
    formValues.longitude = Math.floor(longitude);
    formValues.timezone = timezone;
    formValues.nation = nation;

    // for debuggind
    // console.log(formValues);

    /*  */ /*  */ /*  */ /*  */ 
const H_URL = "https://basic-wizard-backend-04b2d718d7ba.herokuapp.com/api/astrologer"

    try {
        const response = await fetch(`${H_URL}`, {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const data = await response.json();
            const subject = data.chart_data.subject;

            // 1. Create an array of all the exact keys used in your API and HTML IDs
            const bodies = [
                'sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 
                'saturn', 'uranus', 'neptune', 'pluto', 'ascendant', 
                'descendant', 'chiron', 'mean_lilith'
            ];

            // 2. Optional: If you specifically need an array of the actual objects for later use
            const planetObjectsArray = bodies.map(body => subject[body]);

            // 3. Loop through the array to log data and update the DOM
            bodies.forEach(body => {
                const celestialObject = subject[body];

                // Log the object
                console.log(`${body}:`, celestialObject);

                // Find the HTML element by its ID and update it
                const element = document.getElementById(body);
                if (element && celestialObject) {
                    // Use textContent instead of innerHTML for better performance and security
                    element.textContent = `${celestialObject.sign} ${celestialObject.emoji}`; 
                }
            });

            // Set the SVG
            document.getElementById('svg-container').innerHTML = data.chart;
            astrocon.classList.add('gone')
            resultcon.classList.add('active')
        } else {
            alert('An error occurred while sending.');
        } 
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending.');
    }
};

