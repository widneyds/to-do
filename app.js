const formAddTodo = document.querySelector('.form-add-todo');
const formSearchTodo = document.querySelector('.form-search input');
const todosContainer = document.querySelector('.todos-container');


const insertTodo = event => {
    event.preventDefault();

    const inputValue = event.target.add.value.trim();

    if(inputValue.length) {
        todosContainer.innerHTML += 
        `<li 
        class="list-group-item list-group-item-warning d-flex justify-content-between align-items-center" 
        data-todo="${inputValue}">
            <span>${inputValue}</span>
            <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
        </li>`;

        event.target.reset();
    }
};

const removeTodo = event => {
    const clickedElement = event.target;
    const trashDataValue = clickedElement.dataset.trash;
    const todo = document.querySelector(`li[data-todo="${trashDataValue}"]`)
    
    if (trashDataValue) {
        todo.remove();
    }
};

const filterTodos = (inputValue, todos, returnMatchedTodos) => todos
    .filter(todo => {
        const matchedTodos = todo.textContent.toLowerCase().includes(inputValue);
        return returnMatchedTodos ? matchedTodos : !matchedTodos;
    });

const manipulateClasses = (todos, classToAdd, classToRemove) => {
    todos.forEach(todo => {
        todo.classList.remove(classToRemove);
        todo.classList.add(classToAdd);
    });
}

const showValidTodos = (inputValue, todos) => {
    const todosToShow = filterTodos(inputValue, todos, true);

    manipulateClasses(todosToShow, 'd-flex', 'd-none');
}

const hideInvalidTodos = (inputValue, todos) => {
    const todosToHide = filterTodos(inputValue, todos, false);
    
    manipulateClasses(todosToHide, 'd-none', 'd-flex');
}

const handleUserSearching =  event => {
    const inputValue = event.target.value.trim().toLowerCase();
    const todos = Array.from(todosContainer.children);

    showValidTodos(inputValue, todos);
    hideInvalidTodos(inputValue, todos);
}


formAddTodo.addEventListener('submit', insertTodo);
todosContainer.addEventListener('click', removeTodo);
formSearchTodo.addEventListener('input', handleUserSearching);