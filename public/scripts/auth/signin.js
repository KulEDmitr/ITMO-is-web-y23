console.log(window.location.origin);

let element1 = document.getElementById('loggedout_template');
let element2 = document.getElementById('loggedin_template');
if (element1) {
  element1.hidden = true;
}
if (element2) {
  element2.hidden = true;
}

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

  try {
    let data = getSignInData();
    console.log(data);
    _api
      .signIn(data.email, data.password)
      .then((response) => {
        console.log('signin');
        if (response.ok) {
          console.log('signin');
          alert('Вход выполнен успешно');
          window.location.href = '/';
        } else {
          console.error('Данные введены не верно');
          alert('Данные введены не верно');
          response.formFields.forEach((item) => {
            alert(item.error);
          });
          console.log('all done');
          let i = 0;
          while (response.formFields[String(i)] !== undefined) {
            alert(response.formFields[String(i)].error);
            i++;
          }
          return response.formFields.json();
        }
      })
      .then((response) => {
        data.superTokenId = response.user.id;
        console.log(data);
        //window.location.href = '/';
        createUser(data);
      });
  } catch (e) {
    alert(e.toString());
  }
});
