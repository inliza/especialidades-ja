import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../services/users.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  correo = "";
  clave = "";
  isLoading = false;

  constructor(
    private service: UsersService, 
    private auth: AuthService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    if (this.auth.isUserBOLoggedIn) {
      this.router.navigate(['home/profile']);
    }
  }

  login() {
    this.isLoading = true;
    this.service.logIn({ email: this.correo, password: this.clave }).subscribe((data: any) => {
      localStorage.setItem('token', data.accessToken);
      this.auth.setLoginValue();
      this.router.navigate(['home/profile']);
      this.isLoading = false;
    }, error =>{
      this.isLoading = false;
      console.log(error);
    });

  }

}
