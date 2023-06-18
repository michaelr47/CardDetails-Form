/*
Attach an event listener to the form submission event.

Inside the event listener, prevent the default form submission behavior to handle the validation manually.

Get references to each input field by accessing their DOM elements.

Create validation functions for each input field to check their respective requirements.

a. For the cardholder name field:

Ensure that the field is not empty.
You can optionally validate the format if needed (e.g., only allow alphabets and spaces).
b. For the card number field:

Remove any non-digit characters (e.g., spaces, dashes) from the input value.
Validate the length of the card number (typically 13-16 digits for most card types).
You can use the Luhn algorithm to perform additional validation if necessary.
c. For the exp date month field:

Validate that the value is a number between 1 and 12.
d. For the exp date year field:

Validate that the value is a valid two-digit year (e.g., between 00 and 99).
Optionally, you can check if the year is not in the past.
e. For the CVC field:

Validate that the value is a three-digit number.
Create an array to store the validation results for each input field.

Loop through the array of validation functions and execute each one for the corresponding input field.

If any validation function returns false, mark the respective input field as invalid and display an error message.

If all validation functions return true, allow the form submission or proceed with further processing.
*/
const confirmButton = document.getElementById('confirmBtn');

let errorMsg = document.createElement('p');
errorMsg.classList.add('errorMessage');
errorMsg.innerText = `Can't be blank`;

const cardNameValidation = name => {
    errorMsg.innerText = `Full name please`;

    if (name.length === 0 || !isNaN(name) ||!Array.from(name).includes(' ')) { 
        document.querySelector('.cardNameContainer').appendChild(errorMsg) 
        document.getElementById('fname').classList.add('errorBorder');   
    } else return true;
    
   
}
console.log(cardNameValidation('MichaelKroger'));

const cardNumberValidation = number => {
    return number.length < 16 ? 'Card number should be 16 numbers long' : true;
}

const cardExpDateValidation = date => {
    return date.length < 2 || date.length === 0 ? 'invalid exp date' : 'valid exp date';
}

const cvcValidation = code => {
    let tempCode = String(code);
   
    if (Number(code) && tempCode.length === 3) {
        return true;
    } else {
        document.querySelector('.cvcContainer').appendChild(errorMsg);
        document.getElementById('CVCInput').classList.add('errorBorder');
        return false;
    }
}

const checkValidity = () => {
    const cardName = document.getElementById('fname').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expMonth = document.getElementById('expDateMM').value;
    const expYear = document.getElementById('expDateYY').value;
    const cvc = document.getElementById('CVCInput').value;
    

    cardNameValidation(cardName);
    cardNumberValidation(cardNumber);
    cardExpDateValidation(expMonth)
    cardExpDateValidation(expYear);


} 



confirmButton.addEventListener('click', event => {
    event.preventDefault();
    checkValidity();

})