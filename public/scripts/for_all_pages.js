let start_time = new Date().getTime();


// const checkSession = () => {
//   fetch('/auth/session')
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error(
//           `Failed to define a user session: ${response.statusText}`,
//         );
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       alert(`Невозможно определить сессию пользователя\n${err}`);
//     });
// };

//checkSession();

window.onload = () => {
  document.getElementById('load__time').textContent = (
    new Date().getTime() - start_time
  ).toString();

  let refs = document.getElementsByClassName('nav__link');
  for (let i = 0; i < refs.length; i++) {
    if (refs[i].href === document.location) {
      refs[i].classList.add('active');
    }
  }
};
