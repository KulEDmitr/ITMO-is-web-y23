function onLogOut() {
  fetch('/auth/signout', {
    method: 'POST',
  }).then((response) => {
    if (response.ok) {
      alert('Успешный выход из системы');
      window.location.href = '/';
    } else {
      alert(
        `Не удалось осуществить выход. Пожалуйста, попробуйте снова. ${response.statusText}`,
      );
    }
  });
}
