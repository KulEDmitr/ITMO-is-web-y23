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

const getSignUpData = () => {
  let password_first = document.getElementById('password').value;
  let password_repeat = document.getElementById('password-repeat').value;

  if (password_repeat !== password_first) {
    throw new Error('Пароли не совпадают');
  }

  return {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    login: document.getElementById('login').value,
    password: document.getElementById('password').value,
    superTokenId: '',
  };
};

const createUser = (data) => {
  fetch('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'same-origin',
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return error();
      }
    })
    .then((response) => {
      setServerTime(response);
      alert('You are successfully registered in system');
      window.location.href = '/';
    });
};

let signupForm = document.getElementById('auth_form');
signupForm.addEventListener('submit', (event) => {
  try {
    event.preventDefault();
    let data = getSignUpData();

    fetch('/auth/signup', {
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
          throw new Error(`Failed to sign un user: ${response.statusText}`);
        }
      })
      .then((response) => {
        if (response.status === 'OK') {
          data.superTokenId = response.user.id;
          createUser(data);
          window.location.href = '/';
        } else {
          let i = 0;
          while (response.formFields[String(i)] !== undefined) {
            console.error(response.formFields[String(i)].error);
            i++;
          }
          throw new Error(`Данные в форме введены с ошибками`);
        }
      });
  } catch (e) {
    console.error(e);
  }
});
