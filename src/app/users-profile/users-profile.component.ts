import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsersService } from '../services/users.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import Swal from 'sweetalert2';
import { NgxLoadingModule } from 'ngx-loading';
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-users-profile',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, RouterModule, MatProgressSpinnerModule, MatSelectModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, CommonModule, NgxLoadingModule, MatExpansionModule],
  templateUrl: './users-profile.component.html',
  styleUrl: './users-profile.component.css'
})
export class UsersProfileComponent implements OnInit {
  grouped: any[] = [];
  panelOpenState: boolean[] = [];
  isLoading = false;

  public account: {
    firstName: string,
    lastName: string,
    alias: string,
    birthDate: Date,
    email: string,
    phone: string,
    zoneId: string,
    church: string,
    rankId: string
  }
  constructor(
    private service: UsersService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    this.account = {
      firstName: "",
      lastName: "",
      alias: "",
      birthDate: new Date(),
      email: "",
      phone: "",
      zoneId: "",
      church: "",
      rankId: ""
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    if (id) {
      this.isLoading = true;
      this.service.getSpecialtiesByUser(id).subscribe((data: any) => {
        this.account = data;
        this.grouped = this.groupByCategory(data.specialties);
        this.isLoading = false;
      }, error => {
        this.isLoading = false;

      });
    } else {
      this.router.navigate(['home/users'], { replaceUrl: true });
    }
  }

  private groupByCategory(specialties: any[]): any[] {
    const groupedMap = new Map<number, any>();

    specialties.forEach(specialty => {
      const categoryId = specialty.category.id;

      if (!groupedMap.has(categoryId)) {
        groupedMap.set(categoryId, {
          id: specialty.category.id,
          name: specialty.category.name,
          active: specialty.category.active,
          specialties: [],
        });
      }

      groupedMap.get(categoryId)?.specialties.push(specialty);
    });

    return Array.from(groupedMap.values());
  }

}
