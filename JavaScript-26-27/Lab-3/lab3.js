/* Лабораторна робота №3: Об'єкти
   У цьому файлі немає виводу в консоль.
   Кожна функція повинна повертати результат через return.
*/

/* Завдання 1. Валідація даних форми.

   Користувач заповнив форму реєстрації та натиснув кнопку Submit.
   Дані форми передаються у функцію у вигляді об'єкта, наприклад:

   {
       name: "John",
       email: "john@example.com",
       age: 20,
       password: "12345678", 
       address: {
            country: "Ukraine"
            city: "Kyiv",
       }
   }

   Реалізуйте функцію validateForm(formData), яка перевіряє дані
   за такими правилами:

   - name не може бути порожнім;
   - name повинен містити щонайменше 2 символи;
   - email не може бути порожнім;
   - email повинен містити символ "@";
   - age повинен бути не менше 18 і не більше 150;
   - password повинен містити щонайменше 8 символів;
   - address.country не повинен бути порожнім
   - address.city не повинен бути порожнім

   Функція повинна повернути об'єкт з двома властивостями:

   - isValid — true, якщо всі дані коректні, і false, якщо знайдено
     хоча б одну помилку;
   - errors — масив рядків з описами всіх знайдених помилок.

   Приклад результату для некоректних даних:

   {
       isValid: false,
       errors: [
           "Name is required",
           "Name must contain at least 2 characters",
           "Email must contain @",
           "Age must be at least 18",
           "Password must contain at least 8 characters",
           "Country is required"
       ]
   }

   Якщо всі дані коректні:

   {
       isValid: true,
       errors: []
   }
*/
function validateForm(formData) {
    const fieldErrors = getFormFieldErrors(formData);
    const errors = [];

    // згортаємо помилки з усіх полів в один загальний масив
    for (const field in fieldErrors) {
        for (let i = 0; i < fieldErrors[field].length; i++) {
            errors.push(fieldErrors[field][i]);
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}


/* Завдання 2. Групування помилок за полями.

   Доповніть логіку валідації з попереднього завдання.

   Реалізуйте функцію validateFormByFields(formData), яка перевіряє
   ті самі поля за тими самими правилами, але повертає помилки
   в іншому форматі.

   Замість одного масиву властивість errors повинна містити об'єкт,
   у якому:

   - назва властивості відповідає назві поля форми;
   - значення властивості — масив помилок, знайдених для цього поля.

   Наприклад:

   {
       isValid: false,
       errors: {
           name: [
               "Name is required",
               "Name must contain at least 2 characters"
           ],
           email: [
               "Email must contain @"
           ],
           age: [
               "Age must be at least 18"
           ],
           password: [
               "Password must contain at least 8 characters"
           ],
           country: [
                country is required
           ]
       }
   }

   Якщо для певного поля помилок немає, це поле не потрібно
   додавати до об'єкта errors.

   Якщо всі дані коректні, функція повинна повернути:

   {
       isValid: true,
       errors: {}
   }
*/
function validateFormByFields(formData) {
    const errors = getFormFieldErrors(formData);

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}


/* Допоміжна функція: перевіряє всі поля форми та повертає об'єкт
   із помилками, згрупованими за полями. Використовується в обох
   функціях валідації, щоб не дублювати правила.
*/
function getFormFieldErrors(formData) {
    const errors = {}; // поле потрапляє сюди, лише якщо для нього є помилки

    const nameErrors = [];
    if (!formData.name) {
        nameErrors.push("Name is required");
    }
    if (!formData.name || formData.name.length < 2) {
        nameErrors.push("Name must contain at least 2 characters");
    }
    if (nameErrors.length > 0) {
        errors.name = nameErrors;
    }

    const emailErrors = [];
    if (!formData.email) {
        emailErrors.push("Email is required");
    }
    if (!formData.email || formData.email.indexOf("@") === -1) {
        emailErrors.push("Email must contain @");
    }
    if (emailErrors.length > 0) {
        errors.email = emailErrors;
    }

    const ageErrors = [];
    if (formData.age === undefined || formData.age === null) {
        ageErrors.push("Age is required");
    } else {
        if (formData.age < 18) {
            ageErrors.push("Age must be at least 18");
        }
        if (formData.age > 150) {
            ageErrors.push("Age must be at most 150");
        }
    }
    if (ageErrors.length > 0) {
        errors.age = ageErrors;
    }

    const passwordErrors = [];
    if (!formData.password) {
        passwordErrors.push("Password is required");
    }
    if (!formData.password || formData.password.length < 8) {
        passwordErrors.push("Password must contain at least 8 characters");
    }
    if (passwordErrors.length > 0) {
        errors.password = passwordErrors;
    }

    // якщо address не передали — підставляємо порожній об'єкт
    const address = formData.address || {};

    const countryErrors = [];
    if (!address.country) {
        countryErrors.push("Country is required");
    }
    if (countryErrors.length > 0) {
        errors.country = countryErrors;
    }

    const cityErrors = [];
    if (!address.city) {
        cityErrors.push("City is required");
    }
    if (cityErrors.length > 0) {
        errors.city = cityErrors;
    }

    return errors;
}
