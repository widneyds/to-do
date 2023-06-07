const formAddTodo = document.querySelector('.form-add-todo');
const formSearchTodo = document.querySelector('.form-search input');
const todosContainer = document.querySelector('.todos-container');


const insertTodo = event => {
    event.preventDefault();

    const inputValue = event.target.add.value.trim();

    if(inputValue.length) {
        todosContainer.innerHTML += 
        `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${inputValue}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>`;

        event.target.reset();
    }
};

const removeTodo = event => {
    if (Array.from(event.target.classList).includes('delete')) {
        event.target.parentElement.dataset.name = 'todo';
        const todo = document.querySelector('li[data-name="todo"]');
        todo.remove();
    };
};

const showValidTodos = (inputValue, array) => {
    array
        .filter(todo => todo.textContent.toLowerCase().includes(inputValue))
        .forEach(todo => todo.classList.replace('d-none', 'd-flex'));
} 

const hideInvalidTodos = (inputValue, array) => {
    array
        .filter(todo => !todo.textContent.toLowerCase().includes(inputValue))
        .forEach(todo => todo.classList.replace('d-flex', 'd-none'));
}

const handleUserSearching =  event => {
    const inputValue = event.target.value.trim().toLowerCase();
    const todosContainerArray = Array.from(todosContainer.children);

    showValidTodos(inputValue, todosContainerArray);
    hideInvalidTodos(inputValue, todosContainerArray);
}


formAddTodo.addEventListener('submit', insertTodo);
todosContainer.addEventListener('click', removeTodo);
formSearchTodo.addEventListener('input', handleUserSearching);