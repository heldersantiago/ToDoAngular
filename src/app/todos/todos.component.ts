import { CommonModule, NgFor } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Todo } from '../Shared/Todo.model';
import { DataService } from '../Shared/data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {

  name: string = ""
  description: string = ""
  completed: boolean = false
  _text: string = ""
  todos: Todo[] = [];
  constructor(private dataservice: DataService) {
    this.todos = this.dataservice.getAllTodos()
  }



  OnFormSubmit(form: NgForm) {

    this.name = String(form.value.name)
    this.description = String(form.value.description)
    // this._description = String(form.description)
    if (form.invalid) return alert("Invalid parametres")

    // alert(this.name + "/" + this.description)

    this.dataservice.addTodo(new Todo(5, this.name, this.description, this.completed))
  }
}
