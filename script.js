document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const dateElement = document.getElementById('date');
    const totalCountElement = document.getElementById('total-count');
    const completedCountElement = document.getElementById('completed-count');
    const remainingCountElement = document.getElementById('remaining-count');
    const showAllBtn = document.getElementById('show-all');
    const showCompletedBtn = document.getElementById('show-completed');
    const showRemainingBtn = document.getElementById('show-remaining');

    // Set the current date and day
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString('en-US', options);

    todoForm.addEventListener('submit', addTodo);
    showAllBtn.addEventListener('click', showAllTasks);
    showCompletedBtn.addEventListener('click', showCompletedTasks);
    showRemainingBtn.addEventListener('click', showRemainingTasks);

    function addTodo(event) {
        event.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const todoItem = document.createElement('li');
        const todoTextSpan = document.createElement('span');
        todoTextSpan.classList.add('text');
        todoTextSpan.textContent = todoText;

        const tickButton = document.createElement('button');
        tickButton.textContent = '✓';
        tickButton.classList.add('tick');
        tickButton.addEventListener('click', completeTodo);

        const removeButton = document.createElement('button');
        removeButton.textContent = '✗';
        removeButton.classList.add('remove');
        removeButton.addEventListener('click', removeTodo);

        todoItem.appendChild(tickButton);
        todoItem.appendChild(todoTextSpan);
        todoItem.appendChild(removeButton);

        todoList.appendChild(todoItem);
        todoInput.value = '';
        updateTaskCount();
    }

    function completeTodo() {
        const todoItem = this.parentNode;
        todoItem.classList.toggle('completed');
        updateTaskCount();
    }

    function removeTodo() {
        const todoItem = this.parentNode;
        todoList.removeChild(todoItem);
        updateTaskCount();
    }

    function updateTaskCount() {
        const totalTasks = todoList.children.length;
        const completedTasks = todoList.querySelectorAll('.completed').length;
        const remainingTasks = totalTasks - completedTasks;

        totalCountElement.textContent = totalTasks;
        completedCountElement.textContent = completedTasks;
        remainingCountElement.textContent = remainingTasks;
    }

    function showAllTasks() {
        const items = todoList.children;
        for (let item of items) {
            item.style.display = 'flex';
        }
    }

    function showCompletedTasks() {
        const items = todoList.children;
        for (let item of items) {
            if (item.classList.contains('completed')) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        }
    }

    function showRemainingTasks() {
        const items = todoList.children;
        for (let item of items) {
            if (!item.classList.contains('completed')) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        }
    }
});