function error() {
  return {
    position: '⚠ Что-то пошло не так',
  };
}

const cleanForm = () => {
  document.getElementById('position').value = '';
  document.getElementById('place').value = '';

  document.getElementById('description').value = '';
  document.getElementById('endTime').value = '';
};

const readData = () => {
  let endDate_data = document.getElementById('endTime').value;
  return {
    position: document.getElementById('position').value,
    place: document.getElementById('place').value,
    endDate: endDate_data === '' ? undefined : endDate_data,
    startDate: document.getElementById('startTime').value,
    description: document.getElementById('description').value,
    workerId: 'ee606583-462f-4e21-9143-2c0de6a13326',
  };
};

let createJobForm = document.getElementById('create__form');
createJobForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let data = readData();
  fetch('/jobs', {
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
      setServerTime(data);
      alert('job place successfully added');
      window.location = 'jobs/id/' + data.id;
    })
    .catch((data) => {
      alert(data.toString());
    });
});

document.getElementById('reset').onclick = () => {
  cleanForm();
};
