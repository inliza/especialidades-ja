import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementSpecialtiesComponent } from './management-specialties.component';

describe('ManagementSpecialtiesComponent', () => {
  let component: ManagementSpecialtiesComponent;
  let fixture: ComponentFixture<ManagementSpecialtiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementSpecialtiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementSpecialtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
