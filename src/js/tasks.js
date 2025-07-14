import { getFromLS, saveInLS } from './local-storage-api';
import { renderTasks } from './render-tasks';

// дістали з ЛС існуючі таски за межами функцій, вони доступні в функціях при виклику завдяки замиканню (способність функцій запамʼятовувати змінні свого оточення по місту створення)
let tasks = getFromLS('tasks') || [];

// 3.3 - функція додавання таски на сторінку і в ЛС
export const addTask = task => {
  //   додали нову таску
  tasks.push(task);
  //   зарендерили всі таски
  renderTasks(tasks);
  //   зберігли всі таски в ЛС
  saveInLS('tasks', tasks);
};

// 4.1 - функція для рендеру наявних тасок в ЛС
export const getAllTasks = () => {
  renderTasks(tasks);
};

// 5.1 - видаляємо таску при натисканні на Delete
export const deleteTask = text => {
  // фільтруємо таски щоб видалити потрібну по заголовку (text)
  tasks = tasks.filter(task => task.title !== text);
  //   одразу перерендер
  renderTasks(tasks);
  //   і зберігаємо в ЛС без видаленої таски
  saveInLS('tasks', tasks);
};
