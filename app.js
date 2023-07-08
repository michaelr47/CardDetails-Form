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
  
const childCount = container => container.children.length;

const cardNameValidation = name => {
    const nameContainer = document.querySelector('.cardNameContainer');
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
    // checks if newErrorMsg is present then dont append more error messages onscreen, prevent text stacking
    if (childCount(nameContainer) === 5) {
        nameContainer.removeChild(nameContainer.lastChild);
    }
 
}

const cardNumberValidation = number => {
    const numberContainer =  document.querySelector('.cardNumberContainer');
    const errorMsg = numberContainer.querySelector('.errorMessage'); // checks if present
    let stringNumber = String(number);

    if (stringNumber.length !== 19 || stringNumber.length === 0 && !errorMsg)  {//add spaces between 4 numbers if true
    
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

    if (childCount(numberContainer) === 5) {
        numberContainer.removeChild(numberContainer.lastChild);
    }
}

const cardExpDateValidation = (month, year) => {
    let date = new Date();
    let getMonth = `${0}${date.getMonth() + 1}`;
    let getYear = String(date.getFullYear()).split('').slice(2,4).join('');
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

    } else if (getYear > year || (year === getYear && getMonth >= month)) {
        newErrorMsg.innerText = 'Card is expired';

        expMonth.classList.add('errorBorder');
        expYear.classList.add('errorBorder');
        cardDateContainer.appendChild(newErrorMsg);


    } else {
        removeErrorMessage(cardDateContainer);
        expMonth.classList.remove('errorBorder');
        expYear.classList.remove('errorBorder');
        return true;
    }

    if (childCount(cardDateContainer) === 6) {  // 6
        cardDateContainer.removeChild(cardDateContainer.lastChild);
    }
}

const cvcValidation = code => {
    const cvcContainer = document.querySelector('.cvcContainer');
    const errorMsg = cvcContainer.querySelector('.errorMsg');
    let tempCode = String(code);
    
    const newErrorMsg = document.createElement('p');
    newErrorMsg.classList.add('errorMessage');

    if (!Number(code) || tempCode.length === 0 && !errorMsg) {
        newErrorMsg.innerText = 'Can\'t be blank';
        cvcContainer.appendChild(newErrorMsg);
        cvc.classList.add('errorBorder');
       
    } else if (tempCode.length > 0 && tempCode.length < 3) {

        newErrorMsg.innerText = 'Needs to a be a 3 digit code';
        cvcContainer.appendChild(newErrorMsg);
        cvc.classList.add('errorBorder');
    
    }  else {
        removeErrorMessage(cvcContainer);
        cvc.classList.remove('errorBorder');
        return true;
    }
    
    if (childCount(cvcContainer) === 5) {// 4
        cvcContainer.removeChild(cvcContainer.lastChild);
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
            cardNameText.style.textTransform = 'uppercase';
        })
       
        
}

const changeCardNumber = () => { 
    inputs[1].addEventListener('input', () => {
        let inputVal = inputs[1].value.replace(/[A-Za-z\s]/g, '');
        cardSixteen.innerText = inputs[1].value;
        let formatVal = '';

        for (let i = 0; i < inputVal.length; i++) { // add space after four numbers
            if (i % 4 === 0 && i > 0) {
                formatVal += ' ';
            }
            formatVal += inputVal[i];
        }

        inputs[1].value = formatVal;
       
    });
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

let originalText = [...allCardInfo].map(el => el.innerText);
const cardInfoRestart = () => {
    allCardInfo.forEach((info, i) => {
        info.innerText = originalText[i];
    });
}

const inputFieldsRestart = () => {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

const displayForm = (button) => {
    button.addEventListener('click', () => {
        cardInfoRestart();
        inputFieldsRestart();
        document.getElementById('form').removeAttribute('class', 'hidden');
        document.querySelector('.thankYou').classList.add('hidden');
         
    });
}

confirmButton.addEventListener('click', event => {
    event.preventDefault();
    checkValidity();
});


changeCardName();
changeCardNumber();
changeCardMonth();
changeCardYear();
changeCardSecurityCode();
displayForm(continueButton);