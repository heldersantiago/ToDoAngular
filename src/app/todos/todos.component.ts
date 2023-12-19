import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HeaderComponent } from '../partials/header/header.component';
import { StateService } from '../Shared/state.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import * as XLSX from 'xlsx'


@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, HttpClientModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})

export class TodosComponent implements OnInit {

  ExcelData: any
  loading: boolean = false

  data: any;
  name: string = "";
  description: string = "";
  completed: boolean = false;
  feedbackMessageSuccess: string = '';
  feedbackMessageError: string = '';
  title: string = "Encontre aqui a sua lista de tarefas";

  todos: any = [];
  todoData: any;

  showValidationsErrors: boolean = false;

  // Injection StateService
  constructor(private http: StateService, private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true
    this.http.get("")
      .subscribe((response: any) => {
        this.todos = response.data;
        console.warn(response)
        this.loading = false
      });
  }

  OnFormSubmit(form: NgForm): any {
    this.name = String(form.value.name);
    this.description = String(form.value.description);

    if (this.ExcelData) {
      const confirmCreation = window.confirm("Adicionar arquivos importados à base de dados?");

      if (confirmCreation) {
        this.ExcelData.forEach((row: any) => {
          this.sendData(row)
        });
      }
      if (!confirmCreation) {
        return this.feedbackMessageError = "Operacão cancelada"
      }

      return;
    }

    if (form.value.completed !== "" && form.value.completed == true) {
      this.completed = true;
    }

    if (form.invalid) {
      return (this.showValidationsErrors = true, this.feedbackMessageError = "Verifique os campos ou adicione um arquivo Excel!");
    }

    this.data = {
      'Name': this.name,
      "Description": this.description,
      'OwnerId': 1,
      'Complete': this.completed
    }

    this.loading = true

    this.http.post("", this.data).subscribe((response) => {
      this.feedbackMessageSuccess = "Tarefa adicionada com sucesso!";
      // Additional success logic like clearing fields
      console.log(response)
    });

    this.showValidationsErrors = false;
    form.reset();
  }

  OnUpdate(id: number) {

  }

  OnDelete(id: number) {
    const confirmDeletion = window.confirm("Confirmar a exclusão da tarefa?");
    if (confirmDeletion) {
      this.http.delete("/" + id).subscribe((resp) => {

        this.feedbackMessageSuccess = "Tarefa excluída com sucesso!";
        console.warn(resp)
      });
    }
  }

  ReadExcel(event: any): any {
    const file = event.target.files[0];

    // Check if a file is selected
    if (!file) {
      console.error('No file selected.');
      return;
    }

    // Check if the selected file is an Excel file
    if (!this.isValidExcelFile(file)) {

      return (
        console.error('Invalid file format. Please upload a valid Excel file.'),
        this.feedbackMessageError = "Fomato inválido, por favor carregue um arquivo Excel"
      );
    }

    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;

      this.ExcelData = sheetNames = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

      this.feedbackMessageSuccess = "Arquivo Excel* carregado com sucesso!"

      // this.ExcelData.forEach((row: any) => {
      //   this.sendData(row)
      // });
    };
  }

  private isValidExcelFile(file: File): boolean {
    // Check if the file type is correct (XLSX) || ODS
    return (
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || // XLSX
      file.type === 'application/vnd.oasis.opendocument.spreadsheet' // ODS
    );
  }


  private sendData(row: any) {
    this.data = {
      'Name': row.Name,
      "Description": row.Description,
      'OwnerId': row.Owner,
      'Complete': row.Completed
    }
    console.log("Coming from SendData")

    this.http.post("", this.data).subscribe((response) => {
      this.feedbackMessageSuccess = "Tarefa(s) adicionada com sucesso!";
      // Additional success logic like clearing fields
      console.log(response)
    });

    console.log(this.data)
  }
}
