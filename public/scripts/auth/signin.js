console.log(window.location.origin);

const getSignInData = () => {
  return {
    password: document.getElementById('password').value,
    email: document.getElementById('email').value,
  };
};

let signinForm = document.getElementById('signin_form');
signinForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let data = getSignInData();
  console.log(data);

  let spData = {
    formFields: [
      {
        id: 'email',
        value: data.email,
      },
      {
        id: 'password',
        value: data.password,
      },
    ],
  };

  fetch('/auth/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'same-origin',
    body: JSON.stringify(spData),
  }).then((response) => {
    console.log('signin');
    if (response.ok) {
      console.log('signin');
      alert('Вход выполнен успешно');
      window.location.href = '/';
    } else {
      console.error('Данные введены не верно');
    }
  });
});
