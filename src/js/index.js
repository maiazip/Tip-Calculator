const inputValue = document.querySelector('#inputValue');
// botões de porcentagem
const btnPercentage = document.querySelectorAll('.btnPercent');
const customPercentageInput = document.querySelector('#btnCustomPercent');
// input do número de pessoas
const inputPeople = document.querySelector('#inputPeople');
// botão de resetar a calculadora
const btnReset = document.getElementById('btnReset');
// span do valor da gorjeta por pessoa
const spanTipAmount = document.getElementById('spanTip');
// span do valor total da conta com a gorjeta por pessoa
const spanTotalValue = document.getElementById('spanValue');

// valor da conta
let value = 0;
// porcentagem da conta
let percentage = 0;
// número de pessoas
let people = 0;
// total de gorjeta
let tip = 0;
// total da conta
let total = 0;

function activeButton(button) {
    // Remove a classe 'active' de todos os botões
    var buttons = document.querySelectorAll('.btnPercent');
    buttons.forEach(function(btn) {
        btn.classList.remove('active');
    });

    // Adiciona a classe 'active' apenas ao botão clicado
    button.classList.add('active');
}

function setPercentage(button, isCustom) {
    let buttonValue = parseFloat(button.textContent);
    if (!isNaN(buttonValue)) {
        percentage = buttonValue;
    } else if (isCustom) {
        let customPercentage = parseFloat(customPercentageInput.textContent);
        if (!isNaN(customPercentage)) {
            percentage = customPercentage;
        } else {
            alert("Insira uma porcentagem válida em número");
        }
    }
}

function setValue() {
    value = parseFloat(inputValue.value);
    if (isNaN(value)) {
        value = 0;
    }
    spanTotalValue.textContent = "$" + value.toFixed(2);
}

function calculateTip() {
    let billAmount = parseFloat(inputValue.value);
    let numPeople = parseInt(inputPeople.value);

    if (isNaN(billAmount) || isNaN(numPeople) || billAmount <= 0 || numPeople <= 0 || percentage === 0) {
        return;
    }

    let tipPerPerson = (billAmount * percentage) / (100 * numPeople);
    let totalPerPerson = (billAmount / numPeople) + tipPerPerson;

    spanTipAmount.textContent = "$" + tipPerPerson.toFixed(2);
    spanTotalValue.textContent = "$" + totalPerPerson.toFixed(2);
}

function resetValues() {
    inputValue.value = "";
    inputPeople.value = "";
    customPercentageInput.value = ""; // Limpa o input de porcentagem customizada
    percentage = 0;
    value = 0;
    people = 0;
    tip = 0;
    total = 0;
    spanTipAmount.textContent = "$0.00";
    spanTotalValue.textContent = "$0.00";
    document.querySelector('.btnPercent.active').classList.remove('active');
}

btnPercentage.forEach(function(button) {
    button.addEventListener('click', function() {
        activeButton(this);
        setPercentage(this, false); // Indica que a porcentagem não é customizada
        calculateTip();
    });
});

customPercentageInput.addEventListener('change', function() {
    setPercentage(null, true); // Indica que a porcentagem é customizada
    calculateTip();
});

inputValue.addEventListener('input', function() {
    setValue();
    calculateTip();
});

inputPeople.addEventListener('input', function() {
    calculateTip();
});

btnReset.addEventListener('click', function() {
    resetValues();
    calculateTip();
});