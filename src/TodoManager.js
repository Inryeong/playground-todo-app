import { Todo } from "./Todo.js";

class TodoManager {
  constructor(todos = []) {
    this._todos = [];
    todos.forEach((todo) => {
      this.addTodo(todo.contents, todo.done);
    });
  }

  addTodo(contents, done = false) {
    const newTodo = new Todo(contents, done);
    this._todos.push(newTodo);
    return newTodo;
  }

  getList() {
    return this._todos;
  }

  get leftTodoCount() {
    return this._todos.reduce((previous, current) => {
      if (current.done === false) {
        return ++previous;
      } else {
        return previous;
      }
    }, 0);
  }
}

export { TodoManager };
