import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategorySpecialtyComponent } from './create-category-specialty.component';

describe('CreateCategorySpecialtyComponent', () => {
  let component: CreateCategorySpecialtyComponent;
  let fixture: ComponentFixture<CreateCategorySpecialtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCategorySpecialtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCategorySpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
