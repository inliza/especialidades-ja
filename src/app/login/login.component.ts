import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../services/users.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-login',
  imports: [SharedModule, MatInputModule, MatFormFieldModule, MatIconModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  correo = "";
  clave = "";

  constructor(
    private service: UsersService,
    private auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    if (this.auth.isUserBOLoggedIn) {
      this.router.navigate(['home/profile']);
    }
  }

  login() {
    this.spinner.show(); this.service.logIn({ email: this.correo, password: this.clave }).subscribe((data: any) => {
      localStorage.setItem('token', data.accessToken);
      this.auth.setLoginValue();
      this.router.navigate(['home/profile']);
      this.spinner.hide();
    }, error => {
      this.spinner.hide(); Swal.fire({
        icon: 'info',
        title: 'Notificación',
        text: error.error.message,
      });
    });

  }

}
