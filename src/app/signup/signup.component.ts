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

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, RouterModule, MatSelectModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  public selectZones = new FormControl('', [Validators.required]);
  public selectRanks = new FormControl('', [Validators.required]);

  public zones: any[] = [];
  public ranks: any[] = [];

  public account: {
    firstName: string,
    lastName: string,
    alias: string,
    birthDate: Date,
    email: string,
    password: string,
    phone: string,
    zoneId: string,
    church: string,
    rankId: string
  }

  constructor(
    private userService: UsersService,
    private router: Router,

  ) {
    this.account = {
      firstName: "",
      lastName: "",
      alias: "",
      birthDate: new Date(),
      email: "",
      password: "",
      phone: "",
      zoneId: "",
      church: "",
      rankId: ""
    }

  }


  ngOnInit(): void {
    this.userService.getZones().subscribe((data: any) => {
      this.zones = data;
    });
    this.userService.getRanks().subscribe((data: any) => {
      this.ranks = data;
    }
    );
  }

  signup() {
    this.userService.signUp(this.account).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['login']);
    }, error => { });
  }

}
