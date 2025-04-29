import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UsersService } from '../services/users.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import Swal from 'sweetalert2';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, RouterModule, MatProgressSpinnerModule, MatSelectModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, CommonModule, NgxSpinnerModule],

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  public selectZones = new FormControl('', [Validators.required]);
  public selectRanks = new FormControl('', [Validators.required]);
  public selectChurchs = new FormControl('', [Validators.required]);
  public password = "******";
  public zones: any[] = [];
  public ranks: any[] = [];
  public churchs: any[] = [];
  public isLoading = false;
  public isEditing = false;


  public account: {
    firstName: string,
    lastName: string,
    secondLastName: string,
    alias: string,
    birthDate: Date,
    email: string,
    phone: string,
    zoneId: string,
    churchId: string,
    rankId: string
  }

  constructor(
    private userService: UsersService,
    private auth: AuthService,
    private spinner: NgxSpinnerService

  ) {
    this.account = {
      firstName: "",
      lastName: "",
      secondLastName: "",
      alias: "",
      birthDate: new Date(),
      email: "",
      phone: "",
      zoneId: "",
      churchId: "",
      rankId: ""
    }

    this.selectRanks.disable();
    this.selectZones.disable();
    this.selectChurchs.disable();

  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.selectRanks.enable();
      this.selectZones.enable();
      this.selectChurchs.enable();

    } else {
      this.selectRanks.disable();
      this.selectZones.disable();
      this.selectChurchs.disable();
    }
  }

  editFunction() {

    if (this.isEditing) {
      this.spinner.show(); let body = this.account;
      if (this.password !== "******") {
        body = Object.assign(this.account, { password: this.password });
      }
      this.userService.update(body).subscribe((data: any) => {
        this.toggleEdit();
        Swal.fire('Success', 'Tu usuario ha sido actualizado correctamente.', 'success');
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Opps',
          text: error.error.message,
        });
      });
    } else {
      this.toggleEdit();
    }
  }

  getChurchsByZone(zoneId: number) {
    this.userService.getChurchsByZone(zoneId).subscribe((data: any) => {
      this.churchs = data;
    });
  }

  ngOnInit(): void {
    this.userService.getZones().subscribe((data: any) => {
      this.zones = data;
    });
    this.userService.getRanks().subscribe((data: any) => {
      this.ranks = data;
    }
    );


    this.auth.loggedUser$.subscribe((data: any) => {
      if (data) {
        this.account = data;
        this.account.rankId = data?.rank?.id;
        this.account.zoneId = data?.zone?.id;
        this.account.churchId = data?.church?.id;

        this.getChurchsByZone(data?.zone?.id);
      }

    });
  }


}
