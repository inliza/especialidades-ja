import { Component, OnInit } from '@angular/core';
import { SpecialtiesService } from '../services/specialties.service';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-user-specialties',
  imports: [CommonModule, MatCheckboxModule, FormsModule],
  templateUrl: './user-specialties.component.html',
  styleUrl: './user-specialties.component.css'
})
export class UserSpecialtiesComponent implements OnInit {
  specialties: any[] = [];
  userSpecialties: any[] = [];
  private userId!: number;
  edit() { }

  constructor(
    private service: SpecialtiesService,
    private auth: AuthService,
    private readonly toast: ToastService

  ) { }

  ngOnInit(): void {
    this.getUserSpecialties();
    this.auth.loggedUser$.subscribe(user => {
      this.userId = user?.id;
    });
  }
  getUserSpecialties() {
    this.service.getUserSpecialties().subscribe((data: any) => {
      this.userSpecialties = data;
      this.getSpecialties();

    });
  }


  getSpecialties() {
    this.service.getSpecialties().subscribe((data: any) => {
      this.specialties = data;
      this.specialties = this.specialties.map(item => ({
        ...item,
        checked: this.userSpecialties.find((x => item?.id === x.specialtyId)) ? true : false
      }));

    });
  }

  save() {

    const body = this.specialties
      .filter(item => item.checked)  // Filtra solo las especialidades que están seleccionadas (checked)
      .map(item => ({
        specialtyId: item?.id,  // Usamos 'id' de la especialidad como specialtyId
      }));

    this.service.upsertUserSpecialties(body).subscribe((data: any) => {
      console.log(data);
      this.toast.showToast('success', 'Datos guardados');
    }, error => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Opps',
        text: error.error.message,
      });
    }
    );
  }

}
