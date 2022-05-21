const cleanForm = () => {
  document.getElementById('position').value = '';
  document.getElementById('place').value = '';

  document.getElementById('description').value = '';
  document.getElementById('endTime').value = '';
};

const readData = async () => {
  let login = document.getElementById('user__login').innerHTML;
  let response = await fetch(`users/login/${login}`).then((response) => {
    return response.json();
  });

  let endDate_data = document.getElementById('endTime').value;
  return {
    position: document.getElementById('position').value,
    place: document.getElementById('place').value,
    endDate: endDate_data === '' ? undefined : endDate_data,
    startDate: document.getElementById('startTime').value,
    description: document.getElementById('description').value,
    workerId: response.id,
  };
};

let createJobForm = document.getElementById('create__form');
createJobForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let data = readData();
  console.log(data);
  fetch('/jobs', {
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
      throw new Error(response.statusText);
    })
    .then((data) => {
      setServerTime(data);
      alert('job place successfully added');
      //window.location = 'jobs/id/' + data.id;
    })
    .catch((data) => {
      alert(data.toString());
      window.location.href = '/signup';
    });
});

document.getElementById('reset').onclick = () => {
  cleanForm();
};
