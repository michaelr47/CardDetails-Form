const confirmButton = document.getElementById('confirmBtn');

const cardNameValidation = name => {
    return name.length < 0 && isNaN(name);
}

const cardNumberValidation = number => {
    return number.length < 16 ? 'Card number should be 16 numbers long' : true;
}

const cardExpDateValidation = date => {
    return date.length < 2 || date.length === 0 ? 'invalid exp date' : 'valid exp date';
}


const checkValidity = () => {
    const cardName = document.getElementById('fname').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expMonth = document.getElementById('expDateMM').value;
    const expYear = document.getElementById('expDateYY').value;
    const cvc = document.getElementById('CVCInput').value;
    // console.log(cardName);

    // if (cardNameValidation(cardName)) {
    //     console.log('invalid name');
    // } else {
    //     console.log('good to go :)');
    //  }


    //  if (cardNumberValidation(cardNumber)) {
    //     console.log('invalid card');
    //  } else {
    //     console.log('valid card number')
    //  }

    //  if (cardExpDateValidation(expMonth)) {
    //     console.log('invalid exp month')
    //  } else {
    //     console.log('valid month');
    //  }

    //  if (cardExpDateValidation(expYear)) {
    //     console.log('invalid exp year');
    //  } else {
    //     console.log('valid year');
    //  }


} 




confirmButton.addEventListener('click', event => {
    event.preventDefault();
    checkValidity();

})