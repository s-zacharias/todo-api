const url = 'https://jsonplaceholder.typicode.com/todos/';
const todos = document.querySelector(".todos");
const show = document.querySelector(".show-button");
const clear = document.querySelector(".clear-button");

// create an unordered list
// create a string to hold all of the todos
// go through each todo in the todo object that is produced by fetching it from the api
// select the title and the completed status from the object and add them to a list element
// make the inner html of the unordered list equal to the content string
// append the new unordered list to the todos div

function createList(todoObj) {
    const todoUl = document.createElement("ul");
    todoUl.className = "todo-list";
    document.querySelector(".todos").appendChild(todoUl);
    let content = "";
    for (let todo in todoObj) {
        const todoItem = document.createElement("li");
        let id = todoObj[todo].id;
        let item = todoObj[todo].title;
        let completed = todoObj[todo].completed;
        content =  `${id}: ${item}
                    <p> 
                    completed: ${completed} 
                    </p>
                    `;
        todoItem.innerHTML = content;
        const deleteButton = document.createElement("BUTTON");
        deleteButton.innerHTML = "Delete";
        todoItem.appendChild(deleteButton);
        document.querySelector(".todo-list").appendChild(todoItem);
        deleteButton.addEventListener("click", () => {
            console.log(url+id)
            fetch(url + id, {
                method: "DELETE"
            }).then(res => res.json()).then(result => console.log(result)).catch(err => console.error('oops'));
            todoItem.remove();
    })
}
}

// getting the data from the api...
function getToDos() {
  return fetch(url)
  .then(res => res.json())
  .then(json => createList(json)); // use the json object that is returned to create the list
  // add a catch to cover the possibility of it failing ... 
}

// add functionality to the buttons
// want to use addEventListener to make the show button invoke getToDos
// want to also use addEventListener and removeChild to make the clear button remove the ul I made
// when getToDos was invoked

show.addEventListener("click", getToDos);

clear.addEventListener("click", () => {
    todos.removeChild(todos.children[0]); // remove the entire ul
})

