const getSignUpData = () => {
  let password_first = document.getElementById('password').value;
  let password_repeat = document.getElementById('password-repeat').value;

  if (password_repeat === password_first) {
    return {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      login: document.getElementById('login').value,
      password: document.getElementById('password').value,
    };
  } else {
    alert('Пароли не совпадают');
  }
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
      window.location = '/';
    });
};

let signupForm = document.getElementById('auth_form');
signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let data = getSignUpData();
  console.log(data);
  try {
    _api.signUp(data.email, data.password).then((response) => {
      console.log('smth happened');
      if (response.ok) {
        console.log('all ok');
        window.location.href = '/';
        createUser(data);
      } else {
        alert('Данные введены не верно');
        var i = 0;
        while (response.data.formFields[String(i)] !== undefined) {
          alert(response.data.formFields[String(i)].error);
          i++;
        }
      }
    });
  } catch (e) {
    alert(e.toString());
  }
});
