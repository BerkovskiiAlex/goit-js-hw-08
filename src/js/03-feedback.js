import throttle from 'lodash.throttle';

const form = document.querySelector('form');
form.addEventListener('input', throttle(onFormChange, 500));
form.addEventListener('submit', onSubmitForm);
window.addEventListener('load', returnLocalStorage);
const { email, message } = form;

function onFormChange(event) {
  const feedbackState = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackState));
}

function returnLocalStorage(event) {
  const savedFeedbackState = localStorage.getItem('feedback-form-state');
  if (savedFeedbackState) {
    const feedbackState = JSON.parse(savedFeedbackState);
    email.value = feedbackState.email;
    message.value = feedbackState.message;
  }
}

function onSubmitForm(event) {
  event.preventDefault();
  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset();
}
