'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('#todo'),
  todoCompleted = document.querySelector('#completed');

let todoData = [];

const getLocal = () => {
  localStorage.setItem('todoLists', JSON.stringify(todoData));
};

const render = () => {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData = JSON.parse(localStorage.getItem('todoLists')) || [];

  todoData.forEach((item, index) => {

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

    let btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', () => {
      item.completed = !item.completed;

      getLocal();
      render();
    });

    let btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click', () => {
      todoData.splice(index, 1);

      getLocal();
      render();
    });

  });

};

todoControl.addEventListener('submit', (event) => {
  event.preventDefault();
  if (headerInput.value !== '') {
    const newTodo = {
      value: headerInput.value,
      completed: false,
    };

    headerInput.value = '';

    todoData.push(newTodo);
    getLocal();
    render();
  }
});

render();