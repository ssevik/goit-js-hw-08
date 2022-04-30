import throttle from 'lodash/throttle';

const KEY = "feedback-form";

const form = document.querySelector('form');
const email = document.querySelector('input');
const message = document.querySelector('textArea');



let feedbackForm = {
  email: '',
  message: '',
};

function inputData() {
  let existingData = localStorage.getItem(KEY);
  if (existingData) {
    existingData = JSON.parse(existingData);
    Object.entries(existingData).forEach(([name, value]) => {
      feedbackForm[name] = value;
      form.elements[name].value = value;
    })
  };
}
inputData();

const formInput = (event) => {
  feedbackForm[event.target.name] = event.target.value;
  localStorage.setItem(KEY, JSON.stringify(feedbackForm))
}

const submit = (evt) => {
  evt.preventDefault();
  const elements = { email: email.value, message: message.value }
  console.log(elements);
  email.value = '';
  message.value = '';
  feedbackForm = {};
  localStorage.removeItem(KEY);

  evt.currentTarget.reset();
}
form.addEventListener('input', throttle((formInput), 500));
form.addEventListener('submit', submit);




// const KEY = 'feedback';

// const form = document.querySelector('.feedback-form');
// const textarea = document.querySelector('.feedback-form textarea');

// form.addEventListener('submit', onForm);
// textarea.addEventListener('input', throttle(onTextarea, 500));

// populateTextarea();

// function onForm(evt) {
//   evt.preventDefault();

//   evt.currentTarget.reset();
//   localStorage.removeItem(KEY)
// }

// function onTextarea(evt) {
//   const massege = evt.target.value;

//   localStorage.setItem(KEY, massege)
//   console.log('value :>> ', massege);

// }

// function populateTextarea() {
//   const messageSave = localStorage.getItem(KEY)

//   if (messageSave) {
//     textarea.value = messageSave;
//     console.log('message :>> ', messageSave);
//   }
// }