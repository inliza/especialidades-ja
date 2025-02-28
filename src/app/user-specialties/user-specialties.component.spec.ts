import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSpecialtiesComponent } from './user-specialties.component';

describe('UserSpecialtiesComponent', () => {
  let component: UserSpecialtiesComponent;
  let fixture: ComponentFixture<UserSpecialtiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSpecialtiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSpecialtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
