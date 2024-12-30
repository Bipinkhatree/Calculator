let number1;
let number2;
let op;

let numbers = document.querySelectorAll(".number");

let operators = document.querySelectorAll(".operator");

let clear = document.querySelector(".clear");

let input = document.querySelector("#input");

let result = document.querySelector(".result");

let backspace = document.querySelector(".backspace")



backspace.addEventListener('click', () => {
    input.value = input.value.slice(0, -1);
})
clear.addEventListener('click', () => {
    input.value = '';
    number1 = ''
    number2 = ''
    op = ''
})
function add(num1, num2) {
    return num1 + num2;
}

function sub(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function division(num1, num2) {
    if (num2 == 0) {
        return "Error: Division by Zero";         //Handle division by zero
    }
    return num1 / num2;
}
numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        input.value += e.target.value;        //Append the clicked number into input
    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        if (input.value === "") {
            return;      // Prevent operator selection without input value
        }
        number1 = parseInt(input.value); //parse the first number
        op = e.target.value;   //store the operator
        input.value = " ";     //clear the input for the second value
    });
});

result.addEventListener('click', () => {
    if (input.value === "") {
        return; //prevent calculation if there's no second number entered
    }
    number2 = parseInt(input.value); //parse the second number
    finalResult = operate(number1, number2, op); //perform the calculation

    if (finalResult === "Error: Division by Zero" || finalResult === "Invalid Operator") {
        input.value = ''; //clear the input after the error
    } else {
        input.value = finalResult;     //Display the result in the input field
    }

})


// Handle keyboard input
document.addEventListener('keydown', (e) => {
    // Handle number keys (0-9)
    if (e.key >= '0' && e.key <= '9') {
        input.value += e.key;
    }

    // Handle operator keys (+, -, *, /)
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        if (input.value === "") return; // Prevent operator selection without input value
        number1 = parseInt(input.value);
        op = e.key;
        input.value = "";
    }

    // Handle equal key (=)
    if (e.key === 'Enter') {
        if (input.value === "") return;
        number2 = parseInt(input.value);
        let finalResult = operate(number1, number2, op);

        if (finalResult === "Error: Division by Zero" || finalResult === "Invalid Operator") {
            input.value = "";
        } else {
            input.value = finalResult;
        }
    }

    // Handle backspace key (Backspace)
    if (e.key === 'Backspace') {
        input.value = input.value.slice(0, -1);
    }

    // Handle clear key (C)
    if (e.key === 'c' || e.key === 'C') {
        input.value = "";
    }
});
function operate(number1, number2, operator) {

    switch (operator) {
        case '+':
            return add(number1, number2);

        case '-':
            return sub(number1, number2);

        case '*':
            return multiply(number1, number2);

        case '/':
            return division(number1, number2);

        default:
            return "Invalid Operator"      //Handle invalid operator
    }
}
