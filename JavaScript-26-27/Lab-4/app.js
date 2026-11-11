// Знаходимо елементи сторінки та задаємо класи підсвічування відповідей.
const quizForm = document.querySelector('#quiz-form');
const questionsContainer = document.querySelector('#quiz-questions');
const questionCount = document.querySelector('#question-count');
const submitButton = quizForm.querySelector('button[type="submit"]');
const retryButton = document.querySelector('#retry-button');
const quizMessage = document.querySelector('#quiz-message');
const quizResult = document.querySelector('#quiz-result');
const answerStyleClasses = [
  'fw-semibold',
  'bg-success-subtle',
  'text-success-emphasis',
  'bg-danger-subtle',
  'text-danger-emphasis'
];

// Створює HTML питань і варіантів відповідей із даних тесту.
function renderQuestions(questions) {
  questionsContainer.replaceChildren();

  questions.forEach(function (question, questionIndex) {
    if (questionIndex > 0) {
      const separator = document.createElement('hr');
      separator.className = 'my-4';
      questionsContainer.append(separator);
    }

    const fieldset = document.createElement('fieldset');
    fieldset.className = 'mb-4';
    fieldset.dataset.correctAnswer = question.correctAnswer;

    const legend = document.createElement('legend');
    legend.className = 'fs-5 fw-semibold mb-3';
    legend.textContent = `${questionIndex + 1}. ${question.text}`;
    fieldset.append(legend);

    question.answers.forEach(function (answer, answerIndex) {
      const wrapper = document.createElement('div');
      wrapper.className = 'form-check rounded py-2 px-5 mb-2';

      const input = document.createElement('input');
      input.className = 'form-check-input';
      input.type = 'radio';
      input.name = question.id;
      input.id = `${question.id}-${answerIndex}`;
      input.value = answer.value;

      const label = document.createElement('label');
      label.className = 'form-check-label';
      label.htmlFor = input.id;
      label.textContent = answer.text;

      wrapper.append(input, label);
      fieldset.append(wrapper);
    });

    questionsContainer.append(fieldset);
  });

  questionCount.textContent = `${questions.length} questions`;
}

// Прибирає підсвічування всіх відповідей одного питання.
function clearAnswerStyles(question) {
  question.querySelectorAll('.form-check').forEach(function (answer) {
    answer.classList.remove(...answerStyleClasses);
  });

  question.querySelectorAll('.form-check-input').forEach(function (input) {
    input.classList.remove('is-valid', 'is-invalid');
  });
}

// Підсвічує відповідь зеленим для correct, інакше — червоним.
function highlightAnswer(input, status) {
  const answer = input.closest('.form-check');
  const colorClasses = status === 'correct'
    ? ['bg-success-subtle', 'text-success-emphasis']
    : ['bg-danger-subtle', 'text-danger-emphasis'];

  answer.classList.add('fw-semibold');
  answer.classList.add(...colorClasses);
  input.classList.add(status === 'correct' ? 'is-valid' : 'is-invalid');
}

// Показує текст у блоці повідомлення чи результату.
function showBlock(element, text) {
  element.textContent = text;
  element.classList.remove('d-none');
}

// Ховає й очищає блок повідомлення чи результату.
function hideBlock(element) {
  element.textContent = '';
  element.classList.add('d-none');
}

// Завдання 1: перевіряє, чи в кожному питанні вибрано відповідь.
function isQuizComplete(questions) {
  let complete = true;
  questions.forEach(function (question) {
    if (question.querySelector('input[type="radio"]:checked') === null) {
      complete = false;
    }
  });
  return complete;
}

// Перевіряємо відповіді при надсиланні форми та блокуємо завершений тест.
quizForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const questions = quizForm.querySelectorAll('fieldset');

  if (!isQuizComplete(questions)) {
    showBlock(quizMessage, 'Дайте відповідь на всі питання');
    return;
  }
  hideBlock(quizMessage);

  // Завдання 2: рахуємо правильні відповіді.
  let correctCount = 0;
  questions.forEach(function (question) {
    clearAnswerStyles(question);

    const selectedAnswer = question.querySelector('input[type="radio"]:checked');
    const correctAnswer = question.dataset.correctAnswer;
    const correctInput = question.querySelector(
      `input[value="${correctAnswer}"]`
    );

    if (selectedAnswer.value === correctAnswer) {
      correctCount++;
      highlightAnswer(selectedAnswer, 'correct');
    } else {
      highlightAnswer(selectedAnswer, 'incorrect');
      highlightAnswer(correctInput, 'correct');
    }
  });

  showBlock(quizResult, `Правильних відповідей: ${correctCount} із ${questions.length}.`);

  quizForm.querySelectorAll('input[type="radio"]').forEach(function (input) {
    input.disabled = true;
  });

  submitButton.disabled = true;
});

// Завдання 3: Retry повертає тест у початковий стан без перезавантаження сторінки.
retryButton.addEventListener('click', function () {
  quizForm.querySelectorAll('fieldset').forEach(function (question) {
    clearAnswerStyles(question);
  });

  quizForm.querySelectorAll('input[type="radio"]').forEach(function (input) {
    input.checked = false;
    input.disabled = false;
  });

  hideBlock(quizMessage);
  hideBlock(quizResult);
  submitButton.disabled = false;
});

// Отримуємо дані з мока, відображаємо питання та вмикаємо кнопку.
const quizQuestions = fetchQuizQuestions();
renderQuestions(quizQuestions);
submitButton.disabled = false;
