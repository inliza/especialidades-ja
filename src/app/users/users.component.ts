import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule, MatSelectModule, MatInputModule, MatIconModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];

  ngOnInit(): void {
    this._userService.getAll().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  constructor(
    private _userService: UsersService
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
        case 'especialidad':
          this.filteredUsers = this.users.filter((user:any) =>
            user.specialties.some((specialty:any) =>
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


  viewUser(id:string){

  }



  selectedFilter: string = 'nombre';
  searchCriteria: string = '';

  filters = [
    { label: 'Nombre', value: 'nombre' },
    { label: 'Apellido', value: 'apellido' },
    { label: 'Especialidad', value: 'especialidad' },
    { label: 'Zona', value: 'zona' },
  ];

}
