import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-users',
  imports: [SharedModule, MatSelectModule, MatInputModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  isLoading: boolean = false;
  loggedUser: any;

  ngOnInit(): void {
    this.spinner.show(); this._userService.getAll().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });

    this.auth.loggedUser$.subscribe((data: any) => {
      if (data) {
        this.loggedUser = data;
      }
    });
  }

  constructor(
    private _userService: UsersService,
    private router: Router,
    private readonly toast: ToastService,
    private auth: AuthService,
    private spinner: NgxSpinnerService

  ) { }

  filterUsers() {
    if (this.selectedFilter && this.searchCriteria) {
      switch (this.selectedFilter) {
        case 'nombre':
          this.filteredUsers = this.users.filter(user =>
            user.firstName.toLowerCase().includes(this.searchCriteria.toLowerCase())
          );
          break;
        case 'apellido':
          this.filteredUsers = this.users.filter(user =>
            user.lastName.toLowerCase().includes(this.searchCriteria.toLowerCase())
          );
          break;
        case 'apellido2':
          this.filteredUsers = this.users.filter(user =>
            user.secondLastName.toLowerCase().includes(this.searchCriteria.toLowerCase())
          );
          break;
        case 'especialidad':
          this.filteredUsers = this.users.filter((user: any) =>
            user.specialties.some((specialty: any) =>
              specialty.name.toLowerCase().includes(this.searchCriteria.toLowerCase())
            )
          );
          break;
        case 'zona':
          this.filteredUsers = this.users.filter(user =>
            user.zone.name.toLowerCase().includes(this.searchCriteria.toLowerCase())
          );
          break;
        default:
          this.filteredUsers = this.users;
      }
    } else {
      this.filteredUsers = this.users; // Si no hay filtro o criterio, muestra todos los usuarios
    }
  }

  onFilterChange() {
    this.filterUsers();
  }

  onSearchChange() {
    this.filterUsers();
  }


  blockUnblockUser(id: string, firstName: string, block: boolean) {
    Swal.fire({
      icon: 'warning',
      title: `¿Seguro que deseas ${block ? 'bloquear' : 'desbloquear'} a ${firstName}?`,
      confirmButtonText: 'Si',
      showCancelButton: true,
      cancelButtonText: 'No',
      customClass: {
        confirmButton: 'my-confirm-button'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show(); this._userService.updateStatus({ userId: id, active: !block }).subscribe((data: any) => {
          this.spinner.hide(); this.toast.showToast('success', `Usuario ${block ? 'bloqueado' : 'desbloqueado'} correctamente.`);
          this.ngOnInit();
        }, (err: any) => {
          this.spinner.hide(); Swal.fire({
            icon: 'error',
            title: 'Opps',
            text: err.error.message,
          });
        });
      }
    });
  }

  viewUser(id: string) {
    this.router.navigate(['home/users/profile', id]);
  }



  selectedFilter: string = 'nombre';
  searchCriteria: string = '';

  filters = [
    { label: 'Nombre', value: 'nombre' },
    { label: 'Primer Apellido', value: 'apellido' },
    { label: 'Segundo Apellido', value: 'apellido2' },
    { label: 'Especialidad', value: 'especialidad' },
    { label: 'Zona', value: 'zona' },
  ];

}
