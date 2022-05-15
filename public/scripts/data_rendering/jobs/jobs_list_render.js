let container = document.getElementById('loaded__jobs__wrapper');

const createTemplate = (data) => {
  console.log(data);
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

function error() {
  return {
    position: '⚠ Что-то пошло не так',
  };
}

fetch('/jobs')
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
  })
  .catch(() => {
    container.appendChild(createTemplate(error()));
  });
