let allTodos = JSON.parse(localStorage.getItem("todos")) || [];

document.getElementById("add-task-btn").addEventListener("click", function () {
    const todoValue = document.getElementById("todo-input").value;
    if (todoValue) {
        allTodos.push({ content: todoValue, isCompleted: false });
        document.getElementById("todo-input").value = "";

        localStorage.setItem("todos", JSON.stringify(allTodos));
        renderTodos();
    }
});

document
    .getElementById("todo-input")
    .addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const todoValue = document.getElementById("todo-input").value;
            if (todoValue) {
                allTodos.push({ content: todoValue, isCompleted: false });
                document.getElementById("todo-input").value = "";

                localStorage.setItem("todos", JSON.stringify(allTodos));
                renderTodos();
            }
        }
    });

function renderTodos() {
    const activeTodoList = document.getElementById("active-todo-list");
    activeTodoList.innerHTML = ""; // Clear the current list

    allTodos.forEach((todo) => {
        if (!todo.isCompleted) {
            let todoItem = document.createElement("li");
            todoItem.innerHTML = `<span class="todo-text">${todo.content}</span>
                                <span class="todo-actions">
                                    <button id="mark-as-complete">✅</button>
                                    <button id="remove">❌</button>
                                </span>`;

            activeTodoList.appendChild(todoItem);
        }
    });

    // completed todos
    const completedTodoList = document.getElementById("completed-todo-list");
    completedTodoList.innerHTML = ""; // Clear the current list

    allTodos.forEach((todo) => {
        if (todo.isCompleted) {
            let todoItem = document.createElement("li");
            todoItem.innerHTML = `<span class="todo-text">${todo.content}</span>`;

            completedTodoList.appendChild(todoItem);
        }
    });

    let completedTodos = allTodos.filter((todo) => todo.isCompleted).length > 0;
    if (completedTodos) {
        document.getElementById("clear-completed-todos").style.display =
            "block";
    } else {
        document.getElementById("clear-completed-todos").style.display = "none";
    }
}

// Initial render of active todos
renderTodos();

// mark as complete button - working
document
    .getElementById("active-todo-list")
    .addEventListener("click", function (e) {
        if (e.target.id === "mark-as-complete") {
            const todoText =
                e.target.parentElement.parentElement.querySelector(
                    ".todo-text"
                ).innerText;
            allTodos = allTodos.map((todo) => {
                if (todo.content === todoText) {
                    return { ...todo, isCompleted: true };
                }
                return todo;
            });
            localStorage.setItem("todos", JSON.stringify(allTodos));
            renderTodos();
        }
    });

// remove todos - working
document
    .getElementById("active-todo-list")
    .addEventListener("click", function (e) {
        if (e.target.id === "remove") {
            const todoText =
                e.target.parentElement.parentElement.querySelector(
                    ".todo-text"
                ).innerText;
            allTodos = allTodos.filter((todo) => todo.content !== todoText);
            localStorage.setItem("todos", JSON.stringify(allTodos));
        }
        renderTodos();
    });

document
    .getElementById("clear-completed-todos")
    .addEventListener("click", function () {
        allTodos = allTodos.filter((todo) => !todo.isCompleted);
        localStorage.setItem("todos", JSON.stringify(allTodos));
        renderTodos();
    });
