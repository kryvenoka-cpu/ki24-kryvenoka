/* run.js — виклик функцій із lab2.js та вивід результатів у консоль.
   Результати дивіться в консолі браузера (DevTools → Console).
*/

const birthDay = 15; // день народження, число від 1 до 31

// Завдання 0
console.log("Завдання 0. containsBirthDay");

const firstDecade  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const secondDecade = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const thirdDecade  = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

console.log(containsBirthDay(firstDecade, birthDay));
console.log(containsBirthDay(secondDecade, birthDay));
console.log(containsBirthDay(thirdDecade, birthDay));

// Завдання 1
console.log("Завдання 1. myIndexOf");

const indexTest = [3, 7, 12, 7, 20];

console.log(myIndexOf(indexTest, 12)); // очікується 2
console.log(myIndexOf(indexTest, 7));  // очікується 1 (перше входження)
console.log(myIndexOf(indexTest, 99)); // очікується -1

// Завдання 2
console.log("Завдання 2. myFilter");

const filterTest = [5, 10, 15, 20, 25, 30];

const evens = myFilter(filterTest, function (number) {
    return number % 2 === 0;
});
console.log(evens); // очікується [10, 20, 30]

const bigNumbers = myFilter(filterTest, function (number) {
    return number > 15;
});
console.log(bigNumbers); // очікується [20, 25, 30]

// Завдання 3
console.log("Завдання 3. shift() та pop()");

const shiftPopResult = getShiftAndPopResult();
console.log(shiftPopResult); // { first: 10, last: 50, numbers: [20, 30, 40] }

// Завдання 4
console.log("Завдання 4. getNonCommonElements");

console.log(getNonCommonElements([1, 2, 3, 4], [3, 4, 5, 6])); // очікується [1, 2, 5, 6]
console.log(getNonCommonElements([7, 8], [8, 9, 10]));         // очікується [7, 9, 10]
