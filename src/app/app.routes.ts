import { Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', component: TodosComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];
