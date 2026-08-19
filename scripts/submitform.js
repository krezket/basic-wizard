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
    console.log(formValues);

   /*  */ /*  */ /*  */ /*  */ 

    try {
        const response = await fetch('http://localhost:3000/api/astrologer', {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log(response);
        }
        else {
            alert('An error occurred while sending.');
        }; 
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending.');
    };
};

