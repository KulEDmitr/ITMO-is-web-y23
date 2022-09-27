let container = document.getElementById('loaded__jobs__wrapper');

const createTemplate = (data) => {
  let template = document
    .getElementById('template__loaded__job')
    .content.cloneNode(true);

  template
    .getElementById('job__href')
    .setAttribute('href', '/jobs/id/' + data.id);
  template.getElementById('job__position').innerHTML = data.position;
  template.getElementById('job__place').innerHTML = data.place;
  template.getElementById('job__start_time').innerHTML = data.startDate;
  template.getElementById('job__end_time').innerHTML =
    data.endDate == null ? 'now' : data.endDate;

  return template;
};

let lastJob = 0;
const checkData = (data) => {
  lastJob += data.jobs.length;
  if (data.jobs.length === 0) {
    document.getElementById('load_more').remove();
    alert('Загружены все имеющиеся карточки');
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
      throw new Error(response.statusText);
    })
    .then((data) => {
      setServerTime(data);
      return data;
    })
    .then((data) => {
      data.jobs.forEach((item) => {
        container.appendChild(createTemplate(item));
      });
      return data;
    })
    .then((data) => {
      checkData(data, params);
    })
    .catch(() => {
      window.location.href = '/signup';
    });
};

const getParams = () => {
  return {
    take: 3,
    skip: lastJob,
  };
};

getData('/jobs/page/with_query', getParams());

document.getElementById('load_more').onclick = () => {
  getData('/jobs/page/with_query', getParams());
};
