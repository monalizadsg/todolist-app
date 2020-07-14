//Selectors
const input = document.querySelector('#item');
const addButton = document.querySelector('#add-button');
const todoList = document.querySelector(".todo-list");
const tab = document.querySelectorAll('.tab button');
//get todos from localStorage
let todoItems;
if(localStorage.getItem('todos')) {
  todoItems = JSON.parse(localStorage.getItem('todos'))
} else {
  todoItems = [];
}

//Event Listeners
document.addEventListener('DOMContentLoaded', displayAllTodo)
addButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

//add item
function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();
  let inputValue  = input.value;
  let validInput = validateInput();
  if(validInput) {
    //store input data in localStorage
    todoItems.push(inputValue);
    localStorage.setItem('todos', JSON.stringify(todoItems));
    console.log(JSON.parse(localStorage.getItem('todos')));
    //display item
    displayTodo(inputValue)
    //reset input field
    input.value = '';
  }
}

//validate input
function validateInput() {
  let minInput = 3;
  let maxInput = 30;
  let inputValue = input.value;

  if(inputValue === '') {
    alert('Please enter a todo');
  } else if(inputValue.length > maxInput || inputValue.length < minInput) {
    alert(`Allowed text  Min:${minInput} & Max:${maxInput}`);
  } else {
    return true;
  }
}

//display item to the container
function displayTodo(todo) {
  //create todo DIV element
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  //create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todo;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  //create check button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  //create delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
  deleteButton.classList.add('delete-btn');
  todoDiv.appendChild(deleteButton);
  //append to LIST
  todoList.appendChild(todoDiv);
}

//display all items in the container
function displayAllTodo() {
  if(todoItems === null) {
    return;
  }
  console.log(todoItems);
  todoItems.forEach(todo => {
    displayTodo(todo);
  })
}

//mark as completed and delete an item
function deleteCheck(e) {
    const item = e.target;
    //delete todo 
    if(item.classList[0] === 'delete-btn') {
      const todo = item.parentElement;
      todo.remove();
      //update localStorage
      removeLocalTodo(todo);
    }
    //check mark
    if(item.classList[0] === 'complete-btn') {
      const todo = item.parentElement;
      todo.classList.toggle('completed');
    }
}

//remove deleted item from localStorage
function removeLocalTodo(todo) {
  const todoIndex = todo.children[0].innerText;
  todoItems.splice(todoItems.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todoItems));
  console.log(todoItems);
}

//filter todo by all, active and completed
tab.forEach(button => {
  button.addEventListener('click', (event) => {
    // console.log(button);
    // event.target.classList.add('active');
    // console.log(event.target);
    // const btn = event.target.value;
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
      switch(event.target.value) {
        case 'all': 
          todo.style.display = 'flex';
          break;
        case 'complete': 
          if(todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
        case 'uncompleted': 
          if(!todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
      }
    })
  })
});
