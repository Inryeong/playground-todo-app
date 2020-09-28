import { Todo } from "./Todo.js";
import { TodoManager } from "./TodoManager.js";

class TodoApp {
  constructor(todos) {
    this.todosManager = new TodoManager(todos);
    this.todosContainer = document.querySelector(".todo-container");
    this.h2 = document.querySelector(".title h2");
    this.h3 = document.querySelector(".title h3");
    this.addButton = document.querySelector(".add-todo button");

    // 할 일 데이터 보이기
    this.showTodos();
    //버튼 이벤트 리스너 및 입력에 따른 이벤트
    this.eventsListener();
  }

  showTodos() {
    this.todosContainer.innerHTML = "";

    this.todosManager.getList().forEach((todo, i) => {
      const todos = this.createTodo(todo, i);
      this.todosContainer.appendChild(todos);
    });
    this.showTitle();
  }

  createTodo(todo, id) {
    const todos = document.createElement("div");
    todos.dataset.id = id;
    todos.classList.add("todo");
    todos.className = "todo";
    todos.innerHTML = `<input type="checkbox" ${todo.done ? "checked" : ""}>
                          <label>${todo.contents}</label>`;
    todos.addEventListener("click", (event) => {
      if (event.target.type === "checkbox") {
        const index = todos.dataset.id;
        this.todosManager.getList()[index].toggle();
        this.showTitle();
      }
    });
    return todos;
  }

  showTitle() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    if (this.h2) {
      this.h2.innerHTML = `${month}월 ${date}일`;
    }
    if (this.h3) {
      this.h3.innerHTML = `<span class="todo-count">
      ${this.todosManager.leftTodoCount}개</span>`;
    }
  }

  eventsListener() {
    this.addButton.addEventListener("click", (event) => {
      const text = document.querySelector('.add-todo input[type="text"]');
      this.todosManager.addTodo(text.value);
      text.value = "";
      this.showTodos();
    });
  }
}
export { TodoApp };
