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
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-user-specialties',
  imports: [CommonModule, MatCheckboxModule, FormsModule, MatExpansionModule],
  templateUrl: './user-specialties.component.html',
  styleUrl: './user-specialties.component.css'
})
export class UserSpecialtiesComponent implements OnInit {
  specialties: any[] = [];
  grouped: any[] = [];
  userSpecialties: any[] = [];
  categories: any[] = [];
  panelOpenState: boolean[] = [];

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




groupByCategory(data: any[]) {
    const grouped = data.reduce((acc, item) => {
      const categoryId = item.category.id;
      const categoryName = item.category.name;

      if (!acc[categoryId]) {
        acc[categoryId] = {
          id: categoryId,
          name: categoryName,
          active: item.category.active,
          specialties: [],
        };
      }

      acc[categoryId].specialties.push({
        id: item.id,
        name: item.name,
        url: item.url,
        active: item.active,
      });

      return acc;
    }, {});

    return Object.values(grouped);
  }


  getSpecialties() {
    this.service.getSpecialties().subscribe((data: any) => {
      this.specialties = data;
      this.specialties = this.specialties.filter(item =>
        this.userSpecialties.some(x => item?.id === x.specialtyId)
      );
      this.grouped = this.groupByCategory(this.specialties);
      console.log('Especialidades:', this.grouped);
      this.getCategorySpecialties();

    });
  }

}
