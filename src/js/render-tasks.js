import { refs } from './refs';

// 3.1 - створюємо функцію для рендера тасок
export const renderTasks = tasks => {
  // можна додати перевірку і якщо масив пустий - рендерити якийсь текст-заглушку
  if (tasks.length === 0) {
    refs.taskList.innerHTML = 'Sory, you have no tasks yet ';
    return;
  }

  const markup = tasks
    .map(
      ({ title, description }) => `<li class="task-list-item">
    <button class="task-list-item-btn">Delete</button>
    <h3>${title}</h3>
    <p>${description}</p>
</li>`
    )
    .join('');
  refs.taskList.innerHTML = markup;
};
