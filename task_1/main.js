(function () {
    let avva_boo = document.querySelector(".h1");
    avva_boo.addEventListener("click", () => {
       alert("hello!");
    });

    class Calculator {
        constructor() {}

        sum(a,b) {
            return a + b;
        }

        minus(a,b) {
            return a - b;
        }

        multiplication(a,b) {
            return a * b;
        }

        division(a,b) {
            return b !== 0 ? a / b : "Нельзя делить на ноль!";
        }

        surplus(a,b) {
            return  a % b;
        }
    }

    let calculator = new Calculator();

    console.log("Сумма 5 + 5 = " + calculator.sum(5,5));
    console.log("Вычетание 5 - 5 = " + calculator.minus(5,5));
    console.log("Умножение 5 * 5 = " + calculator.multiplication(5,5));
    console.log("Деление 5 / 5 = " + calculator.division(5,5));
    console.log("Остаток от деления 10 % 9 = " + calculator.surplus(10, 9));
})();