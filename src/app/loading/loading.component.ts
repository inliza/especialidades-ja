// loading.component.ts
import { Component } from '@angular/core';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-loading',
  standalone: true,
  template: ``,
  imports: [NgxLoadingModule],
})
export class LoadingComponent {
  isLoading = false;

  setLoadingState(state: boolean) {
    this.isLoading = state;
  }
}
