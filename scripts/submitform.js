async function submitForm() {

    // get all elements by id of section1
    const section1 = document.getElementById('section1');

    // set formValues as an empty object
    const formValues = {};

    // get all required inputs by class
    const requiredInputClass = document.querySelectorAll('.inputRequired');

    // get all inputs
    const inputs = document.querySelectorAll('input');

    // get all textareas 
    const textareas = document.querySelectorAll('textarea');

    // set initial state of required emptyFields as false
    let emptyFields = false;

    // do the following for each required input 
    requiredInputClass.forEach(input => {

        // get all required labels with their respective ids
        const label = document.querySelector(`label[for="${input.id}"]`);

        // if input value equals nothing (.trim removes any empty space)
        if (input.value.trim() === '') {

            // add "missing" to the label class 
            label.classList.add('missing');

            // set emptyFields to true
            emptyFields = true;

            // scroll to the top of the page
            section1.scrollIntoView({ behavior: 'smooth' });
        }
        else { 

            // if there is text in required input, remove "missing" from label class
            label.classList.remove('missing')
        };
    });

    // if emptyFields is true, send alert and stop here
    if (emptyFields) {
        alert("Please fill in all required fields.");
        return;
    };

   /*  */ /*  */ /*  */ /*  */ 

    // do the following for each input 
    inputs.forEach(input => {

        // add value of all input type radio to formValues object if checked
        if (input.type === "radio" && input.checked) {
            formValues[input.name] = input.value;  
        } 

        // add value of all input to formValues object
        else if (input.name && input.type !== "radio") {
            formValues[input.name] = input.value;
        };
    });

    // do the following for each textarea 
    textareas.forEach(textarea => {

        // add value of all textarea to formValues object
        formValues[textarea.name] = textarea.value;
    });

    // for debuggind
    // console.log(formValues);

   /*  */ /*  */ /*  */ /*  */ 

    try {
        const response = await fetch('https://bna-backend-d057bbf0cede.herokuapp.com/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues)
            });
        if (response.ok) {
            window.location.href = '../success/';
        }
        else {
            alert('An error occurred while sending the email.');
        }; 
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending the email');
    };
};

