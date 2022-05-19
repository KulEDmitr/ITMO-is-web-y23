function onLogOut() {
  event.preventDefault();
  fetch('/auth/signout', {
    method: 'POST',
  }).then((response) => {
    if (response.ok) {
      window.location.href = '/';
    } else {
      alert('Не удалось осуществить выход. Пожалуйста, попробуйте снова');
    }
  });
}
