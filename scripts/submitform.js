async function submitForm() {

    // set formValues as an empty object
    const formValues = {};

    // get all inputs
    const inputs = document.querySelectorAll('input');
    const select = document.querySelectorAll('select');
    const latitude = localStorage.getItem('latitude');
    const longitude = localStorage.getItem('longitude');
    const nation = localStorage.getItem('country_code');
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (!inputs || !select || !latitude || !longitude) {
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
        // const response = await fetch('http://localhost:3000/api/astrologer', {
        const response = await fetch(`${H_URL}`, {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const svg = data.chart;
            document.getElementById('svg-container').innerHTML = svg;
            // console.log(data.sun);
            // console.log(data.moon);
            // console.log(data.mercury);
            // console.log(data.venus);
            // console.log(data.mars);
            // console.log(data.jupiter);
            // console.log(data.saturn);
            // console.log(data.uranus);
            // console.log(data.neptune);
            // console.log(data.pluto);
            // console.log(data.ascendant);
            // console.log(data.descendant);
            // console.log(data.medium_coeli);
            // console.log(data.imum_coeli);
            // console.log(data.chiron);
            // console.log(data.mean_lilith);
        }
        else {
            alert('An error occurred while sending.');
        }; 
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending.');
    };
};

