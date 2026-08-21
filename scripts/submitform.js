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
        // const response = await fetch('http://localhost:3000/api/astrologer', {
        const response = await fetch(`${H_URL}`, {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            // console.log(data.chart_data.subject);
            const svg = data.chart;
            const sun = (data.chart_data.subject.sun);
            const moon = (data.chart_data.subject.moon);
            const mercury = (data.chart_data.subject.mercury);
            const venus = (data.chart_data.subject.venus);
            const mars = (data.chart_data.subject.mars);
            const jupiter = (data.chart_data.subject.jupiter);
            const saturn = (data.chart_data.subject.saturn);
            const uranus = (data.chart_data.subject.uranus);
            const neptune = (data.chart_data.subject.neptune);
            const pluto = (data.chart_data.subject.pluto);
            const ascendant = (data.chart_data.subject.ascendant);
            const descendant = (data.chart_data.subject.descendant);
            const chiron = (data.chart_data.subject.chiron);
            const mean_lilith = (data.chart_data.subject.mean_lilith);

            // TODO fix 
            console.log(sun);
            console.log(moon);
            console.log(mercury);
            console.log(venus);
            console.log(mars);
            console.log(jupiter);
            console.log(saturn);
            console.log(uranus);
            console.log(neptune);
            console.log(pluto);
            console.log(ascendant);
            console.log(descendant);
            console.log(chiron);
            console.log(mean_lilith);

            document.getElementById('sun').innerHTML = sun.sign;
            document.getElementById('moon').innerHTML = moon.sign;
            document.getElementById('mercury').innerHTML = mercury.sign;
            document.getElementById('venus').innerHTML = venus.sign;
            document.getElementById('mars').innerHTML = mars.sign;
            document.getElementById('jupiter').innerHTML = jupiter.sign;
            document.getElementById('saturn').innerHTML = saturn.sign;
            document.getElementById('uranus').innerHTML = uranus.sign;
            document.getElementById('neptune').innerHTML = neptune.sign;
            document.getElementById('pluto').innerHTML = pluto.sign;
            document.getElementById('ascendant').innerHTML = ascendant.sign;
            document.getElementById('descendant').innerHTML = descendant.sign;
            document.getElementById('chiron').innerHTML = chiron.sign;
            document.getElementById('mean_lilith').innerHTML = mean_lilith.sign;

            document.getElementById('svg-container').innerHTML = svg;
        }
        else {
            alert('An error occurred while sending.');
        }; 
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending.');
    };
};

