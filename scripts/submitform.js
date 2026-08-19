async function submitForm() {

    // set formValues as an empty object
    const formValues = {};

    // get all inputs
    const inputs = document.querySelectorAll('input');
    const select = document.querySelectorAll('select');
    const latitude = localStorage.getItem('latitude');
    const longitude = localStorage.getItem('longitude');

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

    formValues.latitude = latitude;
    formValues.longitude = longitude;

    // for debuggind
    console.log(formValues);

   /*  */ /*  */ /*  */ /*  */ 

    // try {
    //     const response = await fetch('https://bna-backend-d057bbf0cede.herokuapp.com/submit-form', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(formValues)
    //         });
    //     if (response.ok) {
    //         window.location.href = '../success/';
    //     }
    //     else {
    //         alert('An error occurred while sending the email.');
    //     }; 
    // } catch (error) {
    //     console.error('Error:', error);
    //     alert('An error occurred while sending the email');
    // };
};

