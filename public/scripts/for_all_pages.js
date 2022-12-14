let start_time = new Date().getTime();

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

const setServerTime = (data) => {
  document.getElementById('server__time').textContent = data.server_time;
};
