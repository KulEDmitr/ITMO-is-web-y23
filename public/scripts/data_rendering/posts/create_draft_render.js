const cleanForm = () => {
  document.getElementById('draft').checked = true;
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
};

const readData = async () => {
  let login = document.getElementById('user__login').innerHTML;
  let response = await fetch(`users/login/${login}`).then((response) => {
    return response.json();
  });

  return {
    title: document.getElementById('title').value,
    content: document.getElementById('content').value,
    published: document.getElementById('publish').checked,
    authorId: response.id,
  };
};

let createPostForm = document.getElementById('create__form');
createPostForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  let data = await readData();

  fetch('/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'same-origin',
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    })
    .then((data) => {
      setServerTime(data);
      alert('post successfully added');
      handleSubmitNewPost(data);
      window.location.href = 'posts/id/' + data.id;
    })
    .catch((data) => {
      console.log(data);
      alert(data.toString());
    });
});

document.getElementById('reset').onclick = () => {
  cleanForm();
};
