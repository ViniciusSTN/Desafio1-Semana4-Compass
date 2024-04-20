const loopEmailField = document.querySelector('.form-email-wrap');
const loopEmailForm = document.getElementById('stay-in-the-loop-form');
const loopEmailInput = document.getElementById('stay-in-the-loop-input');
const toast = document.querySelector('.confirmation-message-toast');

loopEmailForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailValue = loopEmailInput.value;

  if (emailValidate(emailValue)) {
    if (addNewEmailLocalStorage(emailValue)) {
      sendToastMessage("Email saved successfully!", 'successful');
    } else {
      sendToastMessage("Your email already exists", 'warning');
    }
  } else {
    disableSubmitButton(loopEmailField);
    showErrorInvalidField(loopEmailField, 'Your email is invalid');
  }
});

loopEmailInput.addEventListener('input', () => {
  if (loopEmailField.classList.contains('inputError')) {
    loopEmailField.classList.remove('inputError');

    const errorMessage = loopEmailField.querySelector('.error-message');
    if (errorMessage) {
      loopEmailField.removeChild(errorMessage);
      enableSubmitButton(loopEmailField);
    }
  }
});

function emailValidate(email) {
  if (typeof email !== 'string') return false;

  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function addNewEmailLocalStorage(email) {
  if (typeof email !== 'string') return false;

  const allEmails = JSON.parse(localStorage.getItem('SubscribedEmails')) || [];

  if(!allEmails.includes(email)) {
    allEmails.push(email);
    localStorage.setItem('SubscribedEmails', JSON.stringify(allEmails));
    return true;
  }

  return false;
}

function sendToastMessage(message, info) {
  if (typeof message !== "string") return;

  const prevParagraph = toast.querySelector('p');
  if (prevParagraph !== null) toast.removeChild(prevParagraph);

  const p = document.createElement('p');
  p.innerText = message;
  toast.appendChild(p);

  const childElement = toast.children[0];

  if (info === 'successful') {
    toast.style.backgroundColor = '#1c8217';
    childElement.style.backgroundImage = "url('/src/public/images/done.svg')";
  } else if (info === 'warning') {
    toast.style.backgroundColor = '#ff3333';
    childElement.style.backgroundImage = "url('/src/public/images/warning.svg')";
  }

  toast.classList.add('confirmation-message-toast-active');

  setTimeout(() => {
    toast.classList.remove('confirmation-message-toast-active');
  }, 3000);
}

function showErrorInvalidField(field, message) {
  if (typeof message !== "string") return;

  field.classList.add('inputError');

  const errorMessage = document.createElement('p');
  errorMessage.innerText = message;
  errorMessage.classList.add('error-message');

  field.appendChild(errorMessage);
}

function disableSubmitButton(field) {
  const button = field.querySelector('button');
  button.disabled = true;
}

function enableSubmitButton(field) {
  const button = field.querySelector('button');
  button.disabled = false;
}
