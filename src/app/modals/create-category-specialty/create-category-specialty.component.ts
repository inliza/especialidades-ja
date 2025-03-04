import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SpecialtiesService } from '../../services/specialties.service';
import Swal from 'sweetalert2';
import { ToastService } from '../../services/toast.service';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-create-category-specialty',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, CommonModule, NgxLoadingModule],
  templateUrl: './create-category-specialty.component.html',
  styleUrl: './create-category-specialty.component.css'
})
export class CreateCategorySpecialtyComponent implements OnInit {
  public selectCategories = new FormControl('', [Validators.required]);

  categories: any[] = [];
  public isCategory: boolean = false;
  public isEditing: boolean = false;
  idCategory!: number;
  name = '';
  public isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<CreateCategorySpecialtyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: SpecialtiesService,
    private readonly toast: ToastService,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.isEditing = this.data.isEditing;
    this.isCategory = this.data.isCategory;
    if (!this.isCategory) {
      this.categories = this.data.categories;
    }
  }
  public closeDialog(result: string) {
    this.dialogRef.close(result);
  }

  createOrUpdate() {
    this.isLoading = true;
    if (!this.isEditing) {
      if (this.isCategory) {
        this.service.createCategory({ name: this.name }).subscribe((data: any) => {
          this.toast.showToast('success', 'Datos guardados');
          this.closeDialog('Ok');
          this.isLoading = false;

        }, error => {
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Opps',
            text: error.error.message,
          });
        });
      } else {
        this.service.createSpeciality({ name: this.name, id_category: this.selectCategories.value }).subscribe((data: any) => {
          this.toast.showToast('success', 'Datos guardados');
          this.closeDialog('Ok');
          this.isLoading = false;

        }, error => {
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Opps',
            text: error.error.message,
          });
        });
      }
    }
  }

}
