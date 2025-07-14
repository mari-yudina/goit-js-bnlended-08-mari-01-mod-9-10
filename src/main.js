/*
  Створи список справ.
  На сторінці є два інпути які має вводиться назва і текст задачі.
  Після натискання на кнопку "Add" завдання додається до списку #task-list.

  У кожної картки має бути кнопка "Delete", щоб можна було
  прибрати завдання зі списку.
  Список із завданнями має бути доступним після перезавантаження сторінки.

  Розмітка картки задачі
  <li class="task-list-item">
      <button class="task-list-item-btn">Delete</button>
      <h3>Заголовок</h3>
      <p>Текст</p>
  </li>
*/
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { refs } from './js/refs';
import { addTask, deleteTask, getAllTasks } from './js/tasks';
import { getFromLS, saveInLS } from './js/local-storage-api';
import { themeSwitcher } from './js/theme-switcher';

// 2 - додаємо слухача на форму, забираємо значення з інпутів з перевіркою на пустий рядок
refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const [taskName, taskDescription] = e.target.elements;
  const title = taskName.value.trim();
  const description = taskDescription.value.trim();

  if (title === '' || description === '') {
    iziToast.warning({ position: 'center', message: 'Fill all fields please' });
    return;
  }
  // створюємо обʼєкт таски для додавання до масива
  const task = { title, description };
  //   3 - додаємо таску
  addTask(task);

  refs.form.reset();
});

// 4 - дістаємо таски з ЛС при завантаженні сторінки
getAllTasks();

// 5 - додаємо слухача на список для видалення таски
refs.taskList.addEventListener('click', e => {
  // перевіряємо що клікаємо саме на кнопку
  if (e.target.nodeName !== 'BUTTON') return;
  // забираємо заголовок таски де клікнули для видалення
  const titleForDelete = e.target.nextElementSibling.textContent;
  //   передаємо заголовок в функцію видалення
  deleteTask(titleForDelete);
});

// 6 - перевіряємо тему при завантаженні сторінки
const theme = getFromLS('theme');
if (theme === 'theme-light') {
  document.body.classList.add('theme-light');
  document.body.classList.remove('theme-dark');
} else {
  saveInLS('theme', 'theme-dark');
}

// 7 - додаємо слухача на кнопку для перемикання теми
refs.themeSwitcher.addEventListener('click', themeSwitcher);
