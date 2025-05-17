// shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    NgxSpinnerModule,
    FormsModule
  ]
})
export class SharedModule {}
