const hideSignContainer = () => {
  let element1 = document.getElementById('loggedout_template');
  let element2 = document.getElementById('loggedin_template');
  if (element1) {
    element1.hidden = true;
  }
  if (element2) {
    element2.hidden = true;
  }
};

hideSignContainer();

const getSignInData = () => {
  return {
    password: document.getElementById('password').value,
    email: document.getElementById('email').value,
  };
};

let signinForm = document.getElementById('signin_form');
signinForm.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    let data = getSignInData();
    fetch('/auth/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'same-origin',
      body: JSON.stringify({
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
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Failed to sign in user: ${response.statusText}`);
        }
      })
      .then((response) => {
        if (response.status === 'OK') {
          alert('Вход выполнен успешно');
          window.location.href = '/';
        } else {
          alert('Данные введены не верно');
          throw new Error('wrong data for sign in');
        }
      });
  } catch (e) {
    console.error(e);
  }
});
