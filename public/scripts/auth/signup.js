let element1 = document.getElementById('loggedout_template');
let element2 = document.getElementById('loggedin_template');
if (element1) {
  element1.hidden = true;
}
if (element2) {
  element2.hidden = true;
}

const getSignUpData = () => {
  let password_first = document.getElementById('password').value;
  let password_repeat = document.getElementById('password-repeat').value;

  if (password_repeat === password_first) {
    return {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      login: document.getElementById('login').value,
      password: document.getElementById('password').value,
      superTokenId: '',
    };
  } else {
    throw new Error('Пароли не совпадают');
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
      //window.location = '/';
    });
};

let signupForm = document.getElementById('auth_form');
signupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let data = getSignUpData();
  console.log(data);
  console.log('start signup');

  _api.signUp(data.email, data.password).then((response) => {
    console.log('post started');
    console.log(response.ok);
    if (response.data) {
      console.log(response);
      data.superTokenId = response.user.id;
      console.log(data);
      createUser(data);
      window.location.href = '/';
    } else {
      alert('Данные введены не верно');
    }
  });

  // _api
  //   .signUp(data.email, data.password)
  // .then((response) => {
  //   console.log('api signup');
  //   if (response.ok) {
  //     console.log('api signup success');
  //   } else {
  //     alert('Данные введены не верно');
  //     console.log('all done');
  //   }
  //   return response.json();
  // }).then((response) => {
  //     let i = 0;
  //     while (response.formFields[String(i)] !== undefined) {
  //       alert(response.formFields[String(i)].error);
  //       i++;
  //     }
  //     return response.formFields.json();
  //   }
  // })
  // .then((response) => {
  //   console.log(response);
  //   data.superTokenId = response.user.id;
  //   console.log(data);
  //   //window.location.href = '/';
  // })
  // .then(() => {
  //   createUser(data);
  // });
});
