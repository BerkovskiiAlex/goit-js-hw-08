import throttle from 'lodash.throttle';

const form = document.querySelector('form');
form.addEventListener('input', throttle(onFormChange, 500));
form.addEventListener('submit', onSubmitForm);
// window.addEventListener('load', returnLocalStorage);

let feedbackState =
  JSON.parse(localStorage.getItem('feedback-form-state')) || {};

function onFormChange(event) {
  const { name, value } = event.target;
  feedbackState[name] = value;
  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackState));
}

function returnLocalStorage() {
  const { email, message } = form;
  email.value = feedbackState.email || '';
  message.value = feedbackState.message || '';
}

returnLocalStorage();

function onSubmitForm(event) {
  event.preventDefault();
  console.log(feedbackState);
  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset();
  feedbackState = {};
}
