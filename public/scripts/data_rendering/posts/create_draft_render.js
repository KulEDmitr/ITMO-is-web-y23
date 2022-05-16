function error() {
  return {
    title: '⚠ Что-то пошло не так',
  };
}

const setServerTime = (data) => {
  document.getElementById('server__time').textContent = data.server_time;
};

const cleanForm = () => {
  document.getElementById('draft').checked = true;
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
};

const readData = () => {
  return {
    title: document.getElementById('title').value,
    content: document.getElementById('content').value,
    published: document.getElementById('publish').checked,
    authorId: 'ee606583-462f-4e21-9143-2c0de6a13326',
  };
};

let createPostForm = document.getElementById('create__form');
createPostForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let data = readData();
  console.log(data);
  console.log(JSON.stringify(data));
  fetch('/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return error();
      }
    })
    .then((data) => {
      console.log(data);
      setServerTime(data);
      alert('post successfully added');
      window.location = 'posts/id/' + data.id;
    })
    .catch((data) => {
      alert(data.toString());
    });
});

document.getElementById('reset').onclick = () => {
  cleanForm();
};
