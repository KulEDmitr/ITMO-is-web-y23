let container = document.getElementById('jobs__row');

const setServerTime = (data) => {
  document.getElementById('server__time').textContent = data.server_time;
};

function error() {
  return {
    position: '⚠ Что-то пошло не так',
  };
}

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

fetch('/main_jobs')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return error();
    }
  })
  .then((data) => {
    data.jobs.forEach((item) => {
      container.appendChild(createTemplate(item));
    });
    return data;
  })
  .then((data) => {
    setServerTime(data);
  })
  .catch(() => {
    alert(error());
  });
