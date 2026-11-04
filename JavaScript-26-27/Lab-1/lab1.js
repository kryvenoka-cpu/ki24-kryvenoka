/* Практична робота: змінні, оператори, умови та цикли
 У цьому файлі немає виводу в консоль.
 Кожна функція повинна повертати результат через return.
*/

/* Завдання 1.
    Загальна вартість = ціна * кількість.
*/
function calculateProductTotalPrice(price, quantity) {
    return price * quantity;
}


/* Завдання 2.
    Перетворюємо мілісекунди в години, хвилини, секунди та мілісекунди.
    1 секунда = 1000 мс, 1 хвилина = 60 000 мс, 1 година = 3 600 000 мс.
    Math.floor відкидає дробову частину, а % дає залишок.
*/
function convertMsToTimeSpan(totalMs) {
    let hours, minutes, seconds, milliseconds;

    const msInSecond = 1000;
    const msInMinute = 60 * msInSecond;
    const msInHour = 60 * msInMinute;

    hours = Math.floor(totalMs / msInHour);
    minutes = Math.floor((totalMs % msInHour) / msInMinute);
    seconds = Math.floor((totalMs % msInMinute) / msInSecond);
    milliseconds = totalMs % msInSecond;

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds
    };
}

/* Завдання 3.
    Від'ємне число -> "-", інакше -> "+".
*/
function getNumberSignStr(number) {
    if (number < 0) {
        return "-";
    }
    return "+";
}

/* Завдання 4.
    Спочатку перевіряємо некоректні значення, потім діапазони від більшого до меншого.
*/
function getGradeResult(score) {
    if (score < 0 || score > 100) {
        return "#ERR";
    } else if (score >= 90) {
        return "excellent";
    } else if (score >= 75) {
        return "good";
    } else if (score >= 60) {
        return "satisfactory";
    } else {
        return "unsatisfactory";
    }
}

/* Завдання 5.
    Edge-cases:
    - n < 0  -> факторіал не визначений, повертаємо -1;
    - n = 0  -> 0! = 1 (цикл не виконається, result залишиться 1).
*/
function calculateFactorial(n) {
    if (n < 0) {
        return -1;
    }

    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }

    return result;
}

/* Завдання 6.
    Проходимо циклом for по кожному товару і додаємо price * quantity до total.
*/
function calculateCartTotal(cartItems) {
    let total = 0;
    const itemCount = cartItems.length;

    for (let i = 0; i < itemCount; i++) {
        const price = cartItems[i].price;
        const quantity = cartItems[i].quantity;
        total += price * quantity;
    }

    return total;
}

/* Завдання 7.
    Відповіді (усі три функції повертають 222111):

    1) Який цикл найзручніше використовувати? 
       Цикл for. Кількість повторень відома заздалегідь (від 1 до 666),
       а for збирає в одному рядку і початкове значення лічильника, і умову,
       і крок (let i = 1; i <= 666; i++). Код коротший, а змінна i
       існує тільки всередині циклу.

    2) Чим відрізняється while від do while?
       while спочатку перевіряє умову, а потім виконує тіло, тому тіло
       може не виконатися жодного разу.
       do while спочатку виконує тіло, а потім перевіряє умову, тому тіло
       виконається хоча б один раз, навіть якщо умова одразу false.
*/
function getBeastNumberSum1() {
    const beastNumber = 666;
    let total = 0;

    for (let i = 1; i <= beastNumber; i++) {
        total += i;
    }

    return total;
}
function getBeastNumberSum2() {
    const beastNumber = 666;
    let total = 0;
    let i = 1;

    while (i <= beastNumber) {
        total += i;
        i++;
    }

    return total;
}
function getBeastNumberSum3() {
    const beastNumber = 666;
    let total = 0;
    let i = 1;

    do {
        total += i;
        i++;
    } while (i <= beastNumber);

    return total;
}

/* 
    getBeastNumberSum2, переписана через while (true) і break:
    умова виходу тепер перевіряється всередині тіла циклу.
*/
function getBeastNumberSum2_AnotherApproach() {
    const beastNumber = 666;
    let total = 0;
    let i = 1;

    while (true) {
        if (i > beastNumber) {
            break;
        }
        total += i;
        i++;
    }

    return total;
}

/* Завдання 8.
    Помилка: рядок `i + 1;` обчислює значення, але нікуди його не зберігає,
    тому i завжди дорівнює 1, умова i > limit ніколи не виконується,
    і цикл стає нескінченним. У DevTools (вкладка Sources -> breakpoint
    всередині while) видно, що на кожній ітерації i = 1.
    Виправлення: i++ (або i += 1).
*/
function getDivisibleNumbers(limit, divisor) {
    const result = [];
    let i = 1;

    while (true) {
        if (i > limit) {
            break;
        }

        if (i % divisor === 0) {
            result.push(i);
        }

        i++;
    }

    return result;
}

/* Завдання 9 (з зірочкою).
    Проходимо по кожному числу від 10 до limit, перетворюємо його в строку
    і порівнюємо кожен символ з першим. Якщо всі однакові, додаємо в results.
    (Починаємо з 10, бо одноцифрові числа нам не потрібні: у прикладі список починається з 11.)
    Також виправлено: results = [] без let/const створювало глобальну змінну.
*/
function getSameDigitNumbers(limit) {
    const results = [];

    for (let currentNumber = 10; currentNumber <= limit; currentNumber++) {
        const str = String(currentNumber);
        let allSame = true;

        for (let j = 1; j < str.length; j++) {
            if (str[j] !== str[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            results.push(currentNumber);
        }
    }

    return results;
}
