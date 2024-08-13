const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
let editTodo = null;

const editTodoToLocal = (oldTodo, newTodo) => {
    let arr = JSON.parse(localStorage.getItem('arr'));
    let indexLocal = arr.indexOf(oldTodo);

    arr[indexLocal] = newTodo;
    localStorage.setItem('arr', JSON.stringify(arr));
}

const deleteLocalTodo = (todo) => {
    arr = JSON.parse(localStorage.getItem('arr'));

    let mainTodo = todo.children[0].innerHTML;
    let indexInLocal = arr.indexOf(mainTodo);

    arr.splice(indexInLocal, 1);

    localStorage.setItem('arr', JSON.stringify(arr));

}


const loadLocalTodos = () => {
    let arr = new Array();

    if (localStorage.getItem('arr') === null) {
        arr = [];
    }
    else {
        arr = JSON.parse(localStorage.getItem('arr'));
        arr.forEach(todo => {
            // <li><p>"inputText"</p></li>
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);

            // <li><p>"inputText"</p><button>Edit</button></li>
            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn");
            li.appendChild(editBtn);

            // <li><p>"inputText"</p> <button>Edit</button><button>Remove</button> </li>  
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("btn", "deleteBtn");
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        });
    }
}

const saveToLocal = (todo) => {
    let arr = new Array();

    if (localStorage.getItem('arr') === null) {
        arr = [];
    }
    else {
        arr = JSON.parse(localStorage.getItem('arr'));
    }
    arr.push(todo);
    localStorage.setItem('arr', JSON.stringify(arr));
}

const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("write something in to do");
        return false;
    }

    if (addBtn.value === "Edit") {
        let toodo = editTodo.target.previousElementSibling.innerHTML;
        editTodo.target.previousElementSibling.innerHTML = inputText;
        editTodoToLocal(toodo, inputText);
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else {
        // <li><p>"inputText"</p></li>
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);

        // <li><p>"inputText"</p><button>Edit</button></li>
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        // <li><p>"inputText"</p> <button>Edit</button><button>Remove</button> </li>  
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = "";

        saveToLocal(inputText);
    }
}

const updateTodo = (e) => {
    // console.log(e.target.innerHTML);
    if (e.target.innerHTML === "Remove") {
        // console.log(e.target.parentElement);
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodo(e.target.parentElement);
    }
    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
}

document.addEventListener('DOMContentLoaded', loadLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);