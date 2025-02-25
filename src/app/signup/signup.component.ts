import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  public account: {
    firstName: string,
    lastName: string,
    alias: string,
    birthDate: Date,
    email: string,
    password: string,
    phone: string,
    zone: string,
    church: string,
    rank: string
  }

  constructor() {
    this.account = {
      firstName: "",
      lastName: "",
      alias: "",
      birthDate: new Date(),
      email: "",
      password: "",
      phone: "",
      zone: "",
      church: "",
      rank: ""
    }

  }


  signup() {
    console.log(this.account);
  }

}
