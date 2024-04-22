const getInForm = document.getElementById('say-hello-form');
const firstNameInput = document.getElementById('first-name-input');
const lastNameInput = document.getElementById('last-name-input');
const emailInput = document.getElementById('email-input');
const textAreaInput = document.getElementById('message-text-area');

getInForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const errors = [];

  nameValidate(firstNameInput, errors);
  nameValidate(lastNameInput, errors);
  fieldEmailValidate(emailInput, errors);
  textAreaValidate(textAreaInput, errors);

  if (errors.length === 0) {
    const wasSaved = addDataLocalStorage(firstNameInput.value, lastNameInput.value, emailInput.value, textAreaInput.value);

    if (wasSaved) {
      sendToastMessage("Data was saved successfully!", 'successful');
    } else {
      sendToastMessage("This email already exists", 'warning')
    }

  } else {
    showErrorMessages(errors);
    disableSubmitButton(getInForm);
  }
});

getInForm.addEventListener('input', () => {
  const paragraphElements = getInForm.querySelectorAll('p');

  paragraphElements.forEach(paragraph => {
    paragraph.remove();
  });

  enableSubmitButton(getInForm);
});

function nameValidate(input, errors) {
  if (input.value.length === 0) errors.push({ input: input.id, error: 'Field is empty' });

  if (input.value.length >= 25) errors.push({ input: input.id, error: 'Field must be less than 25 characters' });

  if (/\d/.test(input.value)) errors.push({ input: input.id, error: 'Field has numbers' });
}

function fieldEmailValidate(input, errors) {
  if (input.value.trim().length === 0) {
    errors.push({ input: input.id, error: 'Field is empty' });
  }

  const email = input.value.toLowerCase();

  if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    errors.push({ input: input.id, error: 'Email is not valid'});
  }
}

function textAreaValidate(input, errors) {
  if (input.value.length === 0) errors.push({ input: input.id, error: 'Field is empty' });

  if (input.value.length >= 150) errors.push({ input: input.id, error: 'Field must be less than 150 characters' });
}

function addDataLocalStorage(name, lastName, email, textArea) {
  const allData = JSON.parse(localStorage.getItem('GetInData')) || [];

  if (!allData.some((data) => data.email === email)) {
    allData.push({ name, lastName, email, textArea });
    localStorage.setItem('GetInData', JSON.stringify(allData));
    return true;
  }

  return false;
}

function showErrorMessages(errors) {
  errors.forEach(error => {
    const input = document.getElementById(error.input);
    const errorMessage = document.createElement('p');
    errorMessage.innerText = error.error;
    errorMessage.classList.add('get-in-message-error');
    input.insertAdjacentElement('afterend', errorMessage);
  });
}

function disableSubmitButton(field) {
  const button = field.querySelector('button');
  button.disabled = true;
}

function enableSubmitButton(field) {
  const button = field.querySelector('button');
  button.disabled = false;
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
