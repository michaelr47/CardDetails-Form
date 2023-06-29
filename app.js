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

If all validation functions return true, allow the form submission or proc
eed with further processing.
*/
// input fields
const cardName = document.getElementById('fname');
const cardNumber = document.getElementById('cardNumber');
const expMonth = document.getElementById('expDateMM');
const expYear = document.getElementById('expDateYY');
const cvc = document.querySelector('.CVCInput');
// button in form
const confirmButton = document.getElementById('confirmBtn');
// contine button 
const continueButton = document.getElementById('continueBtn');
// accessing DOM card elements to change on input event
const cardSixteen = document.getElementById('sixteen');
const cardNameText = document.getElementById('cardName');
const cardMonth = document.getElementById('month');
const cardYear = document.getElementById('year');
const securityCode = document.getElementById('cvcCode');
// card elements^ in array
const allCardInfo = [cardSixteen, cardNameText, cardMonth, cardYear, securityCode];
// all input elements
const inputs = [cardName, cardNumber, expMonth, expYear, cvc];

const removeErrorMessage = container => {
    const errorMsg = container.querySelector('.errorMessage');
    if (errorMsg) {
      container.removeChild(errorMsg);
    }
  };
  

const cardNameValidation = name => {
    const nameContainer = document.querySelector('.cardNameContainer')
    const errorMsg = nameContainer.querySelector('.errorMessage');

    if (name.length === 0 || !/^[A-Za-z\s]+$/.test(name) || !name.includes(' ') && !errorMsg) { 
        const newErrorMsg = document.createElement('p');
        newErrorMsg.classList.add('errorMessage');
        newErrorMsg.innerText = 'Full name please';

        nameContainer.appendChild(newErrorMsg);
        cardName.classList.add('errorBorder');  
        

    } else {
        removeErrorMessage(nameContainer);
        cardName.classList.remove('errorBorder'); 
        return true;
    }

    // want to prevent errorMsg from stacking up upon multiple 'confirm' clicks
    // if (errorMsg && cardName.classList.contains('errorBorder')) {
    //     return;
    // }
 
 
}

const cardNumberValidation = number => {
    const numberContainer =  document.querySelector('.cardNumberContainer')
    const errorMsg = numberContainer.querySelector('.errorMessage'); // checks if present
    let stringNumber = String(number);

    if (stringNumber.length !== 19 || isNaN(number) || stringNumber.length === 0 && !errorMsg)  {//add spaces between 4 numbers if true
    
        const newErrorMsg = document.createElement('p');
        newErrorMsg.classList.add('errorMessage');
        newErrorMsg.innerText = 'Wrong format, numbers only';

        numberContainer.appendChild(newErrorMsg);
        cardNumber.classList.add('errorBorder');
        
    } else {
        removeErrorMessage(numberContainer);
        cardNumber.classList.remove('errorBorder');
        return true; 
    } 
}

const cardExpDateValidation = (month, year) => {
    const cardDateContainer = document.querySelector('.dateContainer');
    const errorMsg = cardDateContainer.querySelector('.errorMsg');

    const newErrorMsg = document.createElement('p');
    newErrorMsg.classList.add('errorMessage');
    newErrorMsg.innerText = 'Cant\'t be blank';

    if (month === '' || year === '' && !errorMsg) { 
       
        cardDateContainer.appendChild(newErrorMsg);
        expMonth.classList.add('errorBorder');
        expYear.classList.add('errorBorder');

    } else if (month.length < 2 || year.length < 2 || month < 1 || month > 12) {
        newErrorMsg.innerText = 'Wrong format';

        expMonth.classList.add('errorBorder');
        expYear.classList.add('errorBorder');
        cardDateContainer.appendChild(newErrorMsg);
    } else {
        removeErrorMessage(cardDateContainer);
        expMonth.classList.remove('errorBorder');
        expYear.classList.remove('errorBorder');
        return true;
    }
}

const cvcValidation = code => {
    const cvcContainer = document.querySelector('.cvcContainer')
    const errorMsg = cvcContainer.querySelector('.errorMsg');
    let tempCode = String(code);

    if (!Number(code) || tempCode.length !== 3 && !errorMsg) {
        const newErrorMsg = document.createElement('p');
        newErrorMsg.classList.add('errorMessage');
        newErrorMsg.innerText = 'Can\'t be blank';

        cvcContainer.appendChild(newErrorMsg);
        cvc.classList.add('errorBorder');
       
    } else {
        removeErrorMessage(cvcContainer);
        cvc.classList.remove('errorBorder');
        return true;
    }
}

const checkValidity = () => {
    if (cardNameValidation(cardName.value) &&
            cardNumberValidation(cardNumber.value) &&
                cardExpDateValidation(expMonth.value, expYear.value) &&
                    cvcValidation(cvc.value)
        ) 
    {

        document.getElementById('form').setAttribute('class', 'hidden');  // check if all input fields are true then make it hidden
        document.querySelector('.thankYou').classList.remove('hidden');
        return true;

    } else return false;
} 


const changeCardName = () => {
    inputs[0].addEventListener('input', () => {
            cardNameText.innerText = inputs[0].value;
        })
}
const changeCardNumber = () => {
    let inputVal = inputs[1].value;
    inputs[1].addEventListener('input', () => {
            cardSixteen.innerText = inputs[1].value;
            
            // for (let i = 0; i < inputs[1].value.length; i++) { // add space after four numbers
                // console.log(inputs[1].value);
                if (inputs[1].value.length % 4 === 0 && inputs[1].value.length > 0) {
                    console.log(inputs[1].value.concat(' '));
                    inputs[1].value.concat(' ');

                }
            })
      
            // if (inputs[1].value.length === 16) {
            //     console.log(cardSixteen.innerText);
            // }
            
}

       
    //     let val = this.value; //card number input
  
    //     for (let i = 0; i < val.length; i++) { // add space after four numbers
    //       if (i % 4 && i > 0) {
    //         val.concat(' ')
       
    //     }
       
    //   }
      
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

const inputFieldsRestart = () => {
    for (const input of inputs) {
        input.value = '';
    }
}

confirmButton.addEventListener('click', event => {
    event.preventDefault();
    checkValidity();
});

const displayForm = (button) => {
    button.addEventListener('click', () => {
        inputFieldsRestart();
        document.getElementById('form').removeAttribute('class', 'hidden');
        document.querySelector('.thankYou').classList.add('hidden');
         
    });
}

inputFieldsRestart();
changeCardName();
changeCardNumber();
changeCardMonth();
changeCardYear();
changeCardSecurityCode();
displayForm(continueButton);