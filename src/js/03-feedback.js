import throttle from 'lodash.throttle';

const form = document.querySelector('form');
form.addEventListener('input', throttle(onFormChange, 500));
form.addEventListener('submit', onSubmitForm);
window.addEventListener('load', returnLocalStorage);

const feedbackState = {};

function onFormChange(event) {
  const { name, value } = event.target;
  feedbackState[name] = value;
  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackState));
}

function returnLocalStorage(event) {
  const { email, message } = form;
  const savedFeedbackState = localStorage.getItem('feedback-form-state');
  const feedbackState = JSON.parse(savedFeedbackState) || {};
  email.value = feedbackState.email || '';
  message.value = feedbackState.message || '';
}

function onSubmitForm(event) {
  event.preventDefault();
  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset();
}
