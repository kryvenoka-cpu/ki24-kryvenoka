/* run.js — тестові об'єкти та виклик функцій із lab3.js.
   Результати дивіться в консолі браузера (DevTools → Console).
*/

// Форма з помилками: порожнє ім'я, email без "@", age < 18,
// короткий пароль, відсутня країна.
const invalidForm = {
    name: "",
    email: "johnexample.com",
    age: 15,
    password: "12345",
    address: {
        country: "",
        city: "Kyiv"
    }
};

// Коректно заповнена форма — помилок бути не повинно.
const validForm = {
    name: "John",
    email: "john@example.com",
    age: 20,
    password: "12345678",
    address: {
        country: "Ukraine",
        city: "Kyiv"
    }
};

// Завдання 1
console.log("Завдання 1. validateForm");

console.log(validateForm(invalidForm));
// очікується isValid: false і масив із 6 помилок

console.log(validateForm(validForm));
// очікується { isValid: true, errors: [] }

// Завдання 2
console.log("Завдання 2. validateFormByFields");

console.log(validateFormByFields(invalidForm));
// очікується isValid: false і помилки, згруповані за полями

console.log(validateFormByFields(validForm));
// очікується { isValid: true, errors: {} }
