const confirmButton = document.getElementById('confirmBtn');
const checkValidity = () => {
    const cardName = document.getElementById('fname').value;
    const cardNumber = document.getElementById('cardNumber');
    const expMonth = document.getElementById('expDateMM');
    const expYear = document.getElementById('expDateYY');
    const cvc = document.getElementById('CVCInput');


    if (nameValid(cardName)) {
        console.log('once again, did not run!');
    } else {
        console.log('good to go :)');
     }
} 


function nameValid(name) {
    if (name.length === '') {
        console.log('did not run!');
    }
}


confirmButton.addEventListener('click', event => {
    event.preventDefault();
    checkValidity();

})