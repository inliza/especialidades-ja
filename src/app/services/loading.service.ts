// loading.service.ts
import { Injectable } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private loadingComponent: LoadingComponent) {}

  show() {
    this.loadingComponent.setLoadingState(true);
  }

  hide() {
    this.loadingComponent.setLoadingState(false);
  }
}
