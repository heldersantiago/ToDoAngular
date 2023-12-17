import { Injectable } from '@angular/core';
import { Todo } from './Todo.model';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  todos: Todo[] = [
    new Todo(1,"Vida boa","Vida boa com os amigos e muito mais", true),
    new Todo(2,"Vida boa","Vida boa com os man e muito mais", false),
    new Todo(3,"Vida boa","Vida boa com os amigos e muito mais", true),
    new Todo(4,"Vida boa","Vida boa com os amigos e muito mais", true),
  ];
  constructor() { }

  getAllTodos() {
    return this.todos
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  updateTodo(index: number, updateTodo: Todo) {
    this.todos[index] = updateTodo;
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }
}

