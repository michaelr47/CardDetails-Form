/*
Attach an event listener to the form submission event.

Inside the event listener, prevent the default form submission behavior to handle the validation manually.

Get references to each input field by accessing their DOM elements.

Create validation functions for each input field to check their respective requirements.
✅
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

const cardName = document.getElementById('fname');
const cardNumber = document.getElementById('cardNumber');
const expMonth = document.getElementById('expDateMM');
const expYear = document.getElementById('expDateYY');
const cvc = document.getElementById('CVCInput');
const confirmButton = document.getElementById('confirmBtn');

let errorMsg = document.createElement('p');
errorMsg.classList.add('errorMessage');
errorMsg.innerText = '';

const cardNameValidation = name => {
    errorMsg.innerText = 'Full name please';

    if (name.length === 0 || !isNaN(name) || !Array.from(name).includes(' ')) { 
        document.querySelector('.cardNameContainer').appendChild(errorMsg);
        cardName.classList.add('errorBorder');   
    } else {
        removeErrorMessage();
        return true;
    }
}

const cardNumberValidation = number => {
    
    let stringNumber = String(number);
    errorMsg.innerText = 'Wrong format, numbers only';

    if (stringNumber.length < 16 || isNaN(number))  {//add spaces between 4 numbers if true
        document.querySelector('.cardNumberContainer').appendChild(errorMsg);
        cardNumber.classList.add('errorBorder');
    } else {
        removeErrorMessage();
        return true; 
    } 
}

const cardExpDateValidation = date => {
   
    errorMsg.innerText = 'Cant\'t be blank';
    if (date.length < 2 || date === '') { 
        document.querySelector('.dateContainer').appendChild(errorMsg);
        expMonth.classList.add('errorBorder');
        expYear.classList.add('errorBorder');
    } else {
        removeErrorMessage();
        return true;
    }
}

const cvcValidation = code => {
    let tempCode = String(code);
    errorMsg.innerText = 'Can\'t be blank';
    if (!Number(code) && tempCode.length !== 3) {
        document.querySelector('.cvcContainer').appendChild(errorMsg);
        cvc.classList.add('errorBorder');
    } else {
        removeErrorMessage();
        return true;
    }
}

const removeErrorMessage = () => {
    if (errorMsg.parentNode) {
        errorMsg.parentNode.removeChild(errorMsg);
    }
}


const checkValidity = () => {

    cardNameValidation(cardName.value);
    cardNumberValidation(cardNumber.value);
    cardExpDateValidation(expMonth.value)
    cardExpDateValidation(expYear.value);
    cvcValidation(cvc.value);
} 


confirmButton.addEventListener('click', event => {
    event.preventDefault();
    checkValidity();
})

// DOM card elements
const cardSixteen = document.getElementById('sixteen');
const cardNameText = document.getElementById('cardName');
const cardMonth = document.getElementById('month');
const cardYear = document.getElementById('year');
const securityCode = document.getElementById('cvcCode');
// card el. in array
const allItems = [cardSixteen, cardNameText, cardMonth, cardYear, securityCode];
// all input elements
const inputs = document.getElementsByTagName('input');

const changeCardName = () => {
    inputs[0].addEventListener('input', () => {
            cardNameText.innerText = inputs[0].value;
        })
}
const changeCardNumber = () => {
    inputs[1].addEventListener('input', () => {
            cardSixteen.innerText = inputs[1].value;
        })
    //     let val = this.value; //card number input
  
    //     for (let i = 0; i < val.length; i++) { // add space after four numbers
    //       if (i % 4 && i > 0) {
    //         val.concat(' ')
       
    //     }
       
    //   }
      
}
const changeCardMonth = () => {
    inputs[2].addEventListener('input', () => {
            cardMonth.innerText = inputs[2].value;
        })
}
const changeCardYear = () => {
    inputs[3].addEventListener('input', () => {
            cardYear.innerText = inputs[3].value;
        })
}
const changeCardSecurityCode = () => {
    inputs[4].addEventListener('input', () => {
            securityCode.innerText = inputs[4].value;
        })
}

changeCardName();
changeCardNumber();
changeCardMonth();
changeCardYear();
changeCardSecurityCode();
