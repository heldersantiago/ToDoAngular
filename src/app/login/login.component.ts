import { Component } from '@angular/core';
import { HeaderComponent } from '../partials/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { StateService } from '../Shared/state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  title: string = "Login"

  constructor(private state: StateService) { }
}

