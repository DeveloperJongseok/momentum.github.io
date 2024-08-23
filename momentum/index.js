//-----------clock-------------//
const clock = document.querySelector('.clock');

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);

//-----------login-------------//
const loginForm = document.querySelector('.login-form');
const loginInput = loginForm.querySelector('input');
const logoutBtn = document.querySelector('.logout-btn');
const greeting = document.querySelector('.greeting');

const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  localStorage.setItem(USERNAME_KEY, loginInput.value);
  paintGreetings();
}

function handleLinkClick(event) {
  event.preventDefault();
  console.dir(event);
}

function paintGreetings() {
  const username = localStorage.getItem(USERNAME_KEY);
  greeting.innerHTML = `Hello ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  logoutBtn.classList.remove(HIDDEN_CLASSNAME);
}

function onLogout() {
  localStorage.removeItem(USERNAME_KEY);
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  greeting.classList.add(HIDDEN_CLASSNAME);
  logoutBtn.classList.add(HIDDEN_CLASSNAME);
  loginInput.value = '';
}

const saveUsername = localStorage.getItem(USERNAME_KEY);

if (saveUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
} else {
  paintGreetings();
}

loginForm.addEventListener('submit', onLoginSubmit);
logoutBtn.addEventListener('click', onLogout);

//-----------todo-------------//
const todoForm = document.querySelector('.todo-form');
const todoList = document.querySelector('.todo-list');
const todoInput = todoForm.querySelector('.todo-form input');
let todos = [];

const TODOS_KEY = 'todos';

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  todos = todos.filter((todo) => todo.id != parseInt(li.id));
  saveTodos();
}

function paintTodo(newTodoObj) {
  const li = document.createElement('li');
  li.id = newTodoObj.id;

  const span = document.createElement('span');
  span.innerHTML = newTodoObj.text;

  const button = document.createElement('button');
  button.innerText = 'X';

  button.addEventListener('click', deleteTodo);

  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = '';
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };

  // add todo list
  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
}

todoForm.addEventListener('submit', handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  parsedTodos.forEach(paintTodo);
}

//-----------weather-------------//
const API_KEY = 'fcde8b4d61f68b05388586154ec9f650';

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector('.weather span:first-child');
      const city = document.querySelector('.weather span:last-child');

      city.innerHTML = data.name;
      weather.innerHTML = `${data.weather[0].main} / ${data.main.temp}`;
    });
}

function onGoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGoError);

//-----------background-------------//
const images = ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const backgroundImage = document.createElement('img');
backgroundImage.src = `img/${chosenImage}`;

document.body.appendChild(backgroundImage);
