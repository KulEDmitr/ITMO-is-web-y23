let url_id = window.location.href.split('/').pop();
let url = '/jobs/' + url_id;

function error() {
  return {
    position: '⚠ Что-то пошло не так',
  };
}

const createTemplate = (data) => {
  setCard(data);
  setForm(data);
};

const setCard = (data) => {
  document.getElementById('job__position').innerHTML = data.position;
  document.getElementById('job__place').innerHTML = data.place;

  document.getElementById('job__start_time').innerHTML = data.startDate;

  document.getElementById('job__end_time').innerHTML =
    data.endDate == null ? 'now' : data.endDate;

  if (data.description != null) {
    document.getElementById('job__description').innerHTML = data.description;
  }
};

const setForm = (data) => {
  document.getElementById('position').value = data.position;
  document.getElementById('place').value = data.place;
  document.getElementById('description').value = data.description;
  if (data.endDate != null) {
    document.getElementById('endTime').value = data.endDate;
  }
};

const resetForm = () => {
  document.getElementById('position').value =
    document.getElementById('job__position').innerHTML;
  document.getElementById('place').value =
    document.getElementById('job__place').innerHTML;

  document.getElementById('description').value =
    document.getElementById('job__description').innerHTML;

  let end_time = document.getElementById('job__end_time').innerHTML;
  if (end_time !== 'now') {
    document.getElementById('endTime').value = end_time;
  }
};

const cleanPage = () => {
  document.getElementById('job__position').innerHTML =
    'Data successfully deleted';
  document.getElementById('job__place').innerHTML = '';
  document.getElementById('job__start_time').innerHTML = '';
  document.getElementById('job__end_time').innerHTML = '';
  document.getElementById('job__description').innerHTML = '';

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
    createTemplate(data);
  })
  .catch((data) => {
    alert(data.toString());
  });

const readData = () => {
  let endDate_data = document.getElementById('endTime').value;
  return {
    position: document.getElementById('position').value,
    place: document.getElementById('place').value,
    endDate: endDate_data === '' ? undefined : endDate_data,
    description: document.getElementById('description').value,
  };
};

let editJobForm = document.getElementById('edit__form');
editJobForm.addEventListener('submit', (event) => {
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
    .then(() => {
      cleanPage();
      alert('data successfully deleted');
    })
    .catch((data) => {
      alert(data.toString());
    });
};
