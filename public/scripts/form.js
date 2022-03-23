const addTaskBtn = document.getElementById('add');
const taskInput = document.getElementById('task__text');
const formResult = document.querySelector('.form__result');
const templateItem = document.getElementById('template__todo__item');

let tasks;
let todoItemElements = [];

function Task(description) {
  this.description = description;
  this.completed = false;
}

localStorage.tasks
  ? (tasks = JSON.parse(localStorage.getItem('tasks')))
  : (tasks = []);

const createTemplate = (task, index) => {
  let template = templateItem.content.cloneNode(true);

  template.getElementById('task__text').innerText = task.description;

  let checkbox__done = template.getElementById('checkbox__done');
  checkbox__done.onclick = () => {
    completeTask(index);
  };
  template.getElementById('button__delete').onclick = () => {
    deleteTask(index);
  };

  if (task.completed) {
    checkbox__done.checked = true;
    template.getElementById('todo__item').classList.add('checked');
  }

  return template;
};

const filterTasks = () => {
  const activeTasks =
    tasks.length && tasks.filter((item) => item.completed === false);
  const completedTasks =
    tasks.length && tasks.filter((item) => item.completed === true);
  tasks = [...activeTasks, ...completedTasks];
};

const fillHtmlList = () => {
  formResult.innerHTML = '';
  if (tasks.length > 0) {
    filterTasks();
    tasks.forEach((item, index) => {
      formResult.appendChild(createTemplate(item, index));
    });
    todoItemElements = document.querySelectorAll('.todo__item');
  }
};

fillHtmlList();

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const updateData = () => {
  updateLocal();
  fillHtmlList();
};

addTaskBtn.addEventListener('click', () => {
  let text = taskInput.value;
  if (text.length === 0) {
    taskInput.classList.add('wrong');
  } else {
    taskInput.classList.remove('wrong');
    tasks.push(new Task(text));
    updateData();
    taskInput.value = '';
  }
});

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoItemElements[index].classList.add('checked');
  } else {
    todoItemElements[index].classList.remove('checked');
  }
  updateData();
};

const deleteTask = (index) => {
  todoItemElements[index].classList.add('delition');
  setTimeout(() => {
    tasks.splice(index, 1);
    updateData();
  }, 500);
};
