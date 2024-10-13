//Const


//First Input
const inputFirstCurrency = document.getElementById('input-first-currency');

//First Currency dropDown
const firstCurrency = document.querySelectorAll('.first-currency');

const buttonFirstCurrency = document.querySelector('.button-first-currency');

//Second currency dropDown
const secondCurrency = document.querySelectorAll('.second-currency');

const buttonSecondCurrency = document.querySelector('.button-second-currency');

const resultParagraph = document.getElementById('result');

const convertButton = document.querySelector('.convert-button');

//API
const API_KEY = "f7b054e08f9045c68e3766fd2c461692";

const BASE_URL = "https://openexchangerates.org/api/latest.json";


//functions

/*
function showMenu(id) {
    if(id == 1) {
        document.getElementById('list-first-currency').classList.toggle('show');
    } else if (id == 2) {
        document.getElementById('list-second-currency').classList.toggle('show');
    }
}

*/

/*
function closeMenu() {
    document.getElementById('list-first-currency').classList.toggle('close');
}
*/


//First Drop-Down update textContent
firstCurrency.forEach(button => {
    button.addEventListener('click', function(){
        buttonFirstCurrency.textContent = button.textContent;
    });
});

//Second Drop-Down update textContent
secondCurrency.forEach(button => {
    button.addEventListener('click', function(){
        buttonSecondCurrency.textContent = button.textContent;
    });
});

//Result Button 
convertButton.addEventListener('click', function() {
    calcResult(
        inputFirstCurrency.value,
        buttonFirstCurrency.textContent.substring(0,3),
        buttonSecondCurrency.textContent.substring(0,3)
    ).then(result => {
        resultParagraph.textContent = "Result: " + result;
    }).catch(error => {
        resultParagraph.textContent = "Error while converting";
    })
});

//Calc Result
async function calcResult(firstInput, firstCurrency, secondCurrency) {
    return firstInput * await getExchangeRate(firstCurrency, secondCurrency)
}

//Get Exchange Rate
async function getExchangeRate (firstCurrency, secondCurrency) {
    const urlString = `${BASE_URL}?app_id=${API_KEY}&symbols=${firstCurrency},${secondCurrency}`
    try {
        const response = await fetch(urlString);
        if (!response.ok) {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }
        
        const jsonResponse = await response.json();
        const rates = jsonResponse.rates;
        
        const fromRate = rates[firstCurrency];
        const toRate = rates[secondCurrency];

        if (fromRate === undefined || toRate === undefined) {
            throw new Error("Ungültige Währungen");
        }
        
        console.log("To Rate:", toRate);
        console.log("From Rate:", fromRate);
        
        return toRate / fromRate;
    } catch (error) {
        console.error('Fehler beim Abrufen des Wechselkurses:', error);
        throw error;
    }
}