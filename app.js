const formAddTodo = document.querySelector('.form-add-todo');
const formSearchTodo = document.querySelector('.form-search input')
const todosContainer = document.querySelector('.todos-container');

formAddTodo.addEventListener('submit', event => {
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
})

todosContainer.addEventListener('click', event => {
    if (Array.from(event.target.classList).includes('delete')) {
        event.target.parentElement.remove();
    }
})

formSearchTodo.addEventListener('input', event => {
    const inputValue = event.target.value.trim().toLowerCase();
    
    const validValues = Array.from(todosContainer.children)
        .filter(userTodo => 
            userTodo.textContent.toLowerCase().includes(inputValue))
        .forEach(value => value.classList.replace('d-none', 'd-flex'));
    
    const invalidValues = Array.from(todosContainer.children)
        .filter(userTodo => 
            !userTodo.textContent.toLowerCase().includes(inputValue))
        .forEach(value => value.classList.replace('d-flex', 'd-none'));
})