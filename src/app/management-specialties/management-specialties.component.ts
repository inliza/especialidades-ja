import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { SpecialtiesService } from '../services/specialties.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategorySpecialtyComponent } from '../modals/create-category-specialty/create-category-specialty.component';

@Component({
  selector: 'app-management-specialties',
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './management-specialties.component.html',
  styleUrl: './management-specialties.component.css'
})
export class ManagementSpecialtiesComponent implements OnInit {
  isAdmin = false;
  public submitted = false;
  panelOpenState = false;

  categories: any[] = [];

  constructor(
    private service: SpecialtiesService,
    private helperModal: MatDialog,

  ) { }

  ngOnInit(): void {
   this.getCategorySpecialties();
  }

  getCategorySpecialties() {
    this.service.getCategoriesWithSpecialties().subscribe((data: any) => {
      this.categories = data;
    });
  }


  openModal(editing: boolean, isCategory: boolean = false) {
    // event.stopPropagation();
    const levelModal = this.helperModal.open(CreateCategorySpecialtyComponent, {
      height: 'auto',
      width: '450px',
      maxWidth: '500px',
      maxHeight: '700px',
      disableClose: true,
      data: { isEditing: editing, isCategory, categories: this.categories },
      panelClass: 'custom-modal'  // Agrega tu clase personalizada

    });
    levelModal.afterClosed().subscribe((result) => {
      if (result) {
        if (result == 'Ok') {
          this.getCategorySpecialties();
         }

      }
    });
  }

  add() { }

  edit() { }
}
