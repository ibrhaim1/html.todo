const todoForm =  document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUl = document.getElementById('wrapper-todo_list');

let alltodos = getTodos();
updateToodList();

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addtodo();
})


function addtodo(){
    const todoText = todoInput.value.trim();
    if (todoText.length > 0){
        const todoObject = {
            text: todoText,
            complete: false
        }
        alltodos.push(todoObject);
        saveTodos();
        updateToodList();
        todoInput.value = "";
}

}

function updateToodList(){
    todoListUl.innerText = "";
    alltodos.forEach((todo, todoIndex) => {
    todoItem = createTodoItems(todo, todoIndex);
    todoListUl.append(todoItem);
    })
}

function createTodoItems(todo, todoIndex){
    const todoId = "todo-"+todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo-list";
    todoLI.innerHTML = `

                <input type="checkbox" id="${todoId}" />
                <label class="cutstome-input" for="${todoId}" >
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label for="$[todoId]" class="todo-list_txt">
                    ${todoText}
                </label>
                <button class="delet-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></i></button> 
            
    `;

    const deletButton = todoLI.querySelector(".delet-button")
    deletButton.addEventListener("click",  ()=>{
        deletTodoItem(todoIndex)
    })

    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=> {
        alltodos[todoIndex].complete = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.complete;
 return todoLI;

}
function deletTodoItem(todoIndex){
    alltodos = alltodos.filter((_, i)=> i !== todoIndex);
    saveTodos();
    updateToodList();
}

function saveTodos()
{ 
    const todoJons = JSON.stringify(alltodos);
    localStorage.setItem("todos", todoJons);
}

function getTodos(){
    const todos = localStorage.getItem("todos") || "[]" ;
    return JSON.parse(todos);
}





