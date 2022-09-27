let container = document.getElementById('posts__wrapper');

let lastPostId = undefined;
const createTemplate = (data) => {
  lastPostId = data.id;
  let template = document
    .getElementById('template__post')
    .content.cloneNode(true);

  template
    .getElementById('post__link')
    .setAttribute('href', '/posts/id/' + data.id.toString());
  template.getElementById('post__title').innerHTML = data.title;
  template.getElementById('author__login').innerHTML = data.authorId;
  let length = data.content.length;
  template.getElementById('post__short_content').innerHTML =
    data.content.substring(0, length > 100 ? 100 : length);

  return template;
};

function error() {
  return {
    title: '⚠ Что-то пошло не так',
  };
}

const checkData = (data) => {
  if (data.posts.length === 0) {
    document.getElementById('load_more').remove();
    alert('Загружены все имеющиеся посты');
  }
};

const getUrl = (url, params) => {
  let queryParams = new URLSearchParams(Object.entries(params));
  return url + '?' + queryParams;
};

const getData = (url, params) => {
  fetch(getUrl(url, params))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    })
    .then((data) => {
      setServerTime(data);
      return data;
    })
    .then((data) => {
      data.posts.forEach((item) => {
        container.appendChild(createTemplate(item));
      });
      return data;
    })
    .then((data) => {
      checkData(data, params);
    })
    .catch(() => {
      alert(error());
    });
};

getData('/posts', { take: 1, published: 'true' });

const getParams = () => {
  return {
    take: 1,
    skip: 1,
    cursor: lastPostId,
    published: 'true',
  };
};

document.getElementById('load_more').onclick = () => {
  getData('/posts/page/with_query', getParams());
};
