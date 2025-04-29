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
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-users-profile',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, RouterModule, MatProgressSpinnerModule, MatSelectModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, CommonModule, NgxSpinnerModule, MatExpansionModule],
  templateUrl: './users-profile.component.html',
  styleUrl: './users-profile.component.css'
})
export class UsersProfileComponent implements OnInit {
  grouped: any[] = [];
  panelOpenState: boolean[] = [];

  public account: {
    firstName: string,
    lastName: string,
    secondLastName: string,
    alias: string,
    birthDate: Date,
    email: string,
    phone: string,
    zone: any,
    church: any,
    rank: any
  }
  constructor(
    private service: UsersService,
    private route: ActivatedRoute,
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
      phone: "",
      zone: "",
      church: "",
      rank: ""
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    if (id) {
      this.spinner.show();
      this.service.getSpecialtiesByUser(id).subscribe((data: any) => {
        this.account = data;
        this.account.church = data.church?.name;
        this.grouped = this.groupByCategory(data.specialties);
        this.spinner.hide();
      }, error => {
        this.spinner.hide();

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

  isAdult(birthDate: string | Date): boolean {
    if (!birthDate) {
      return false;
    }
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
  
    return age >= 18;
  }
  

}
