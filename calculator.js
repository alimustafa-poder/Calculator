let screen = document.getElementById("screen");
let firstArg = document.querySelector(".firstArg");
let operator = document.querySelector(".operator");
let secondArg = document.querySelector(".secondArg");
let numberBtns = document.querySelectorAll(".data-number");
let acBtn = document.querySelector(".ac");
let clearBtn = document.querySelector(".clear");
let backBtn = document.querySelector(".back");
let decimalBtn = document.querySelector(".decimal");
let equalBtn = document.querySelector(".equal");
let operationBtn = document.querySelectorAll(".operation");
let regex = /[+-/*]/;
let digits = /[0-9]/;
let solution = false;

numberBtns.forEach(n => n.addEventListener("click", e => {
    if (firstArg.innerHTML === "0" || (!!solution && operator.textContent === "")) {
        firstArg.innerHTML = "";
        solution = false;
    }
    if (operator.textContent === "" && firstArg.clientWidth + 40 < screen.offsetWidth) {
        firstArg.append(n.textContent);
    } else if (operator.textContent && secondArg.clientWidth + 40 < screen.offsetWidth) {
        secondArg.append(n.textContent);
    }
}));

decimalBtn.addEventListener("click", e => {
    if (!firstArg.textContent.includes(".") && operator.textContent === "") {
        firstArg.append(decimalBtn.textContent);
    } else if (!secondArg.textContent.includes(".") && operator.textContent) {
        secondArg.append(decimalBtn.textContent);
    }
});

operationBtn.forEach(n => n.addEventListener("click", e => {
    if (!regex.test(operator.textContent)) {
        operator.append(n.textContent);
        firstArg.append(" ");
        firstArg.append(operator.textContent);
    } else if (n.textContent) {
        let firstParam = firstArg.textContent.split(" ")[0];
        let oper = operator.textContent;
        let secondParam = secondArg.textContent;
        if (secondParam == "") return;
        solve(firstParam, oper, secondParam);
        operator.append(n.textContent);
        firstArg.append(" ");
        firstArg.append(n.textContent);
    }
}))

equalBtn.addEventListener("click", e => {
    let firstParam = firstArg.textContent.split(" ")[0];
    let oper = operator.textContent;
    let secondParam = secondArg.textContent;
    if (secondParam == "") return;
    solve(firstParam, oper, secondParam);
})

function solve(first, oper, second) {
    switch (oper) {
        case "-":
            if (first < 1 || second < 1) {
                firstArg.innerHTML = `${((Number(first) - Number(second)).toFixed(2))}`;
                operator.textContent = "";
                secondArg.textContent = "";
            } else {
                firstArg.innerHTML = `${((Number(first) - Number(second)).toPrecision(2))}`;
                operator.textContent = "";
                secondArg.textContent = "";
            }
            solution = true;
            break;
        case "+":
            if (first < 1 || second < 1) {
                firstArg.innerHTML = `${((Number(first) + Number(second)).toFixed(2))}`;
                operator.textContent = "";
                secondArg.textContent = "";
            } else {
                firstArg.innerHTML = `${((Number(first) + Number(second)))}`;
                operator.textContent = "";
                secondArg.textContent = "";
            }
            solution = true;
            break;
        case "/":
            if (first < 1 || second < 1) {
                firstArg.innerHTML = `${((Number(first) / Number(second)).toFixed(2))}`;
                operator.textContent = "";
                secondArg.textContent = "";
            } else {
                firstArg.innerHTML = `${((Number(first) / Number(second)).toPrecision(5))}`;
                operator.textContent = "";
                secondArg.textContent = "";
            }
            solution = true;
            break;
        case "*":
            if (first < 1 || second < 1) {
                firstArg.innerHTML = `${((Number(first) * Number(second)).toFixed(2))}`;
                operator.textContent = "";
                secondArg.textContent = "";
            } else {
                firstArg.innerHTML = `${((Number(first) * Number(second)))}`;
                operator.textContent = "";
                secondArg.textContent = "";
            }
            solution = true;
            break;
    }
}

backBtn.addEventListener("click", e => {
    if ((operator.textContent || firstArg.textContent.length > 1) && secondArg.textContent == "") {
        operator.innerHTML = "";
        let remaining = firstArg.textContent.slice(0, firstArg.textContent.length - 1).trim();
        firstArg.innerHTML = "";
        firstArg.innerHTML = remaining;
    } else if (firstArg.textContent.length === 1 && secondArg.textContent == "") {
        firstArg.innerHTML = "0";
    } else if (secondArg.textContent) {
        let remaining = secondArg.textContent.slice(0, secondArg.textContent.length - 1).trim();
        secondArg.innerHTML = "";
        secondArg.innerHTML = remaining;
    }
})

clearBtn.addEventListener("click", e => {
    firstArg.textContent = 0;
    secondArg.innerHTML = "";
    operator.innerHTML = "";
})

window.onload = function () {
    firstArg.innerHTML = 0;
}
acBtn.addEventListener("click", function () {
    firstArg.innerHTML = 0;
    secondArg.innerHTML = "";
    operator.textContent = "";
})

//Keyborad Functionaly: allows user to type rather than clicking button

document.addEventListener("keydown", e => {
    if (regex.test(e.key)) {
        if (!regex.test(operator.textContent)) {
            operator.append(e.key);
            firstArg.append(" ");
            firstArg.append(operator.textContent);
        }
    }
    if (e.key === ".") {
        if (!firstArg.textContent.includes(".") && operator.textContent === "") {
            firstArg.append(decimalBtn.textContent);
        } else if (!secondArg.textContent.includes(".") && operator.textContent) {
            secondArg.append(decimalBtn.textContent);
        }
    }
    if (digits.test(e.key)) {
        if (firstArg.innerHTML === "0" || (solution && operator.textContent === "")) {
            firstArg.innerHTML = "";
            solution = false;
        }
        if (operator.textContent === "" && firstArg.clientWidth + 40 < screen.offsetWidth) {
            firstArg.append(e.key);
        } else if (operator.textContent && secondArg.clientWidth + 40 < screen.offsetWidth) {
            secondArg.append(e.key);
        }
    }
    if (e.code === "Enter") {
        let firstParam = firstArg.textContent.split(" ")[0];
        let oper = operator.textContent;
        let secondParam = secondArg.textContent;
        if (secondParam == "") return;
        solve(firstParam, oper, secondParam);
    }

    if (e.code === "Backspace") {
        if ((operator.textContent || firstArg.textContent.length > 1) && secondArg.textContent == "") {
            operator.innerHTML = "";
            let remaining = firstArg.textContent.slice(0, firstArg.textContent.length - 1).trim();
            firstArg.innerHTML = "";
            firstArg.innerHTML = remaining;
        } else if (firstArg.textContent.length === 1 && secondArg.textContent == "") {
            firstArg.innerHTML = "0";
        } else if (secondArg.textContent) {
            let remaining = secondArg.textContent.slice(0, secondArg.textContent.length - 1).trim();
            secondArg.innerHTML = "";
            secondArg.innerHTML = remaining;
        }
    }
})