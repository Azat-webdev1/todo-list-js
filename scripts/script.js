'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

const todoData = [];

const render = () => {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach((item) => {
    let li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = `
    <span class="text-todo">${item.value}</span>
    <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
    </div>
    `;
    
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector('.todo-complete');

    btnTodoComplete.addEventListener('click', () => {
      item.completed = !item.completed;
      render();
    })
  });
};

todoControl.addEventListener('submit', (event) => {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false
  };
  
  if (!newTodo.value) {
    return;
  }
  
  todoData.push(newTodo);
  
  headerInput.value = '';
  
  render();
});

render();