let url_id = window.location.href.split('/').pop();
let url = '/posts/' + url_id;

function error() {
  return {
    position: '⚠ Что-то пошло не так',
  };
}

const setServerTime = (data) => {
  document.getElementById('server__time').textContent = data.server_time;
};

const createTemplate = (data) => {
  setCard(data);
  setForm(data);
};

const setCard = (data) => {
  document.getElementById('post__title').innerHTML = data.title;
  document.getElementById('post_content').innerHTML = data.content;
  document.getElementById('author__login').innerHTML = data.authorId;
};

const setForm = (data) => {
  console.log(data);
  document.getElementById('title').innerHTML = data.title;
  document.getElementById('content').innerHTML = data.content;
  if (data.published) {
    document.getElementById('publish').checked = true;
  } else {
    document.getElementById('draft').checked = true;
  }
};

const resetForm = () => {
  document.getElementById('title').value =
    document.getElementById('post__title').innerHTML;
  document.getElementById('content').value =
    document.getElementById('post_content').innerHTML;
};

const cleanPage = () => {
  document.getElementById('post__title').innerHTML =
    'Data successfully deleted';
  document.getElementById('post_content').innerHTML = '';
  document.getElementById('post_info').innerHTML = '';

  document.getElementById('edit__form').remove();
};

fetch(url, { method: 'GET' })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return error();
    }
  })
  .then((data) => {
    setServerTime(data);
    createTemplate(data);
  })
  .catch((data) => {
    alert(data.toString());
  });

const readData = () => {
  return {
    title: document.getElementById('title').value,
    content: document.getElementById('content').value,
    published: document.getElementById('publish').checked,
  };
};

let editPostForm = document.getElementById('edit__form');
editPostForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let data = readData();
  fetch(url, {
    method: 'PUT',
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
      setServerTime(data);
      setCard(data);
    })
    .catch((data) => {
      alert(data.toString());
    });
});

document.getElementById('reset').onclick = () => {
  resetForm();
};

document.getElementById('delete').onclick = () => {
  fetch(url, { method: 'DELETE' })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return error();
      }
    })
    .then((data) => {
      setServerTime(data);
      cleanPage();
      alert('data successfully deleted');
    })
    .catch((data) => {
      alert(data.toString());
    });
};
