import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SpecialtiesService } from '../services/specialties.service';
import { ToastService } from '../services/toast.service';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-user-specialties-modal',
  imports: [SharedModule, MatInputModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatCheckboxModule, MatProgressSpinnerModule],
  templateUrl: './user-specialties-modal.component.html',
  styleUrl: './user-specialties-modal.component.css'
})
export class UserSpecialtiesModalComponent implements OnInit {
  public selectCategories = new FormControl('', [Validators.required]);
  categories: any[] = [];
  specialties: any[] = [];
  specialtiesMarked: any[] = [];
  isLoading = false;
  userSpecialties: any[] = [];

  idCategory!: number;

  constructor(
    public dialogRef: MatDialogRef<UserSpecialtiesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: SpecialtiesService,
    private readonly toast: ToastService,
    private spinner: NgxSpinnerService

  ) { }


  ngOnInit(): void {
    this.categories = this.data.categories;
    this.userSpecialties = this.data.userSpecialties;
    for (let c of this.categories) {
      for (let s of c.specialties) {
        if (this.userSpecialties.some(x => s?.id === x.specialtyId)) {
          this.specialtiesMarked.push(s);
        }
      }
    }

    console.log('Especialidades marcadas:', this.specialtiesMarked);
  }

  public closeDialog(result: string) {
    this.dialogRef.close(result);
  }

  onCheckboxChange(item: any) {
    if (item.checked) {
      if (!this.specialtiesMarked.some(marked => marked.id === item.id)) {
        this.specialtiesMarked.push(item);
      }
    } else {
      this.specialtiesMarked = this.specialtiesMarked.filter(marked => marked.id !== item.id);
    }

    console.log('Especialidades marcadas:', this.specialtiesMarked);
  }


  onCategoryChange(event: any) {
    this.specialties = this.categories.find(x => x.id === event.value).specialties;
    this.specialties = this.specialties.map(item => ({
      ...item,
      checked: this.userSpecialties.some(x => item?.id === x.specialtyId) ||
        this.specialtiesMarked.some(marked => item?.id === marked.id)
    }));

  }

  save() {
    this.isLoading = true
    const body = this.specialtiesMarked
      .map(item => ({
        specialtyId: item?.id,
      }));

    this.service.upsertUserSpecialties(body).subscribe((data: any) => {
      this.toast.showToast('success', 'Datos guardados');
      this.spinner.hide(); this.closeDialog('Ok');
    }, error => {
      console.log(error);
      this.spinner.hide(); Swal.fire({
        icon: 'error',
        title: 'Opps',
        text: error.error.message,
      });
    }
    );
  }


}
