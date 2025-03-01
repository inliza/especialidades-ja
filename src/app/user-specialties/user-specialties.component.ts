import { Component, OnInit } from '@angular/core';
import { SpecialtiesService } from '../services/specialties.service';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { ToastService } from '../services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { UserSpecialtiesModalComponent } from '../user-specialties-modal/user-specialties-modal.component';

@Component({
  selector: 'app-user-specialties',
  imports: [CommonModule, MatCheckboxModule, FormsModule],
  templateUrl: './user-specialties.component.html',
  styleUrl: './user-specialties.component.css'
})
export class UserSpecialtiesComponent implements OnInit {
  specialties: any[] = [];
  specialtiesOriginal: any[] = [];
  userSpecialties: any[] = [];
  categories: any[] = [];

  constructor(
    private service: SpecialtiesService,
    private auth: AuthService,
    private readonly toast: ToastService,
    private helperModal: MatDialog,

  ) { }

  ngOnInit(): void {
    this.getUserSpecialties();
    this.auth.loggedUser$.subscribe(user => {
    });
  }
  getUserSpecialties() {
    this.service.getUserSpecialties().subscribe((data: any) => {
      this.userSpecialties = data;
      this.getSpecialties();

    });
  }

  getCategorySpecialties() {
    this.service.getCategoriesWithSpecialties().subscribe((data: any) => {
      this.categories = data;
    });
  }

  openModal() {
    const levelModal = this.helperModal.open(UserSpecialtiesModalComponent, {
      height: 'auto',
      width: '450px',
      maxWidth: '500px',
      maxHeight: '700px',
      disableClose: true,
      data: { categories: this.categories, userSpecialties: this.userSpecialties },
      panelClass: 'custom-modal'  // Agrega tu clase personalizada

    });

    levelModal.afterClosed().subscribe((result) => {
      if (result) {
        if (result == 'Ok') {
          this.getUserSpecialties();
        }

      }
    });
  }


  getSpecialties() {
    this.service.getSpecialties().subscribe((data: any) => {
      this.specialtiesOriginal = data;
      this.specialties = data;
      this.specialties = this.specialties.filter(item =>
        this.userSpecialties.some(x => item?.id === x.specialtyId)
      );
      this.getCategorySpecialties();

    });
  }

}
