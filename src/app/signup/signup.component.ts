import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, RouterModule, MatSelectModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, NgxSpinnerModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  public selectZones = new FormControl('', [Validators.required]);
  public selectRanks = new FormControl('', [Validators.required]);
  public selectChurchs = new FormControl('', [Validators.required]);

  public zones: any[] = [];
  public ranks: any[] = [];
  public churchs: any[] = [];

  isLoading = false;


  public account: {
    firstName: string,
    lastName: string,
    secondLastName: string,
    alias: string,
    birthDate: Date,
    email: string,
    password: string,
    phone: string,
    zoneId: string,
    churchId: string,
    rankId: string
  }

  constructor(
    private userService: UsersService,
    private router: Router,
    private spinner: NgxSpinnerService

  ) {
    this.account = {
      firstName: "",
      lastName: "",
      secondLastName: "",
      alias: "",
      birthDate: new Date(),
      email: "",
      password: "",
      phone: "",
      zoneId: "",
      churchId: "",
      rankId: ""
    }

  }


  ngOnInit(): void {
    this.userService.getZones().subscribe((data: any) => {
      this.zones = data;
    });
    this.userService.getRanks().subscribe((data: any) => {
      this.ranks = data;
    });
  }

  getChurchsByZone(zoneId: number) {
    this.userService.getChurchsByZone(zoneId).subscribe((data: any) => {
      this.churchs = data;
    });
  }

  signup() {
    this.spinner.show(); this.userService.signUp(this.account).subscribe((data: any) => {
      Swal.fire({
        icon: 'info',
        title: 'Notificación',
        text: 'Usuario creado correctamente, por favor inicie sesión',
      }); this.router.navigate(['login']);
      this.spinner.hide();
    }, error => {
      this.spinner.hide(); console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Opps',
        text: error.error.message,
      });
    });
  }

}
