// Повертає готові питання та відповіді замість запиту до сервера.
function fetchQuizQuestions() {
  return [
    {
      id: 'question1',
      text: 'Which keyword declares a variable that can be reassigned?',
      correctAnswer: 'let',
      answers: [
        { value: 'const', text: 'const' },
        { value: 'let', text: 'let' },
        { value: 'static', text: 'static' }
      ]
    },
    {
      id: 'question2',
      text: 'Which operator checks both value and type?',
      correctAnswer: 'triple-equals',
      answers: [
        { value: 'equals', text: '=' },
        { value: 'double-equals', text: '==' },
        { value: 'triple-equals', text: '===' }
      ]
    },
    {
      id: 'question3',
      text: 'Which method writes a message to the browser console?',
      correctAnswer: 'console-log',
      answers: [
        { value: 'console-log', text: 'console.log()' },
        { value: 'document-write', text: 'document.write()' },
        { value: 'window-alert', text: 'window.alert()' }
      ]
    }
  ];
}
