import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSpecialtiesModalComponent } from './user-specialties-modal.component';

describe('UserSpecialtiesModalComponent', () => {
  let component: UserSpecialtiesModalComponent;
  let fixture: ComponentFixture<UserSpecialtiesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSpecialtiesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSpecialtiesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
