import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDeleteDialogComponent } from './student-delete-dialog.component';

describe('StudentDeleteDialogComponent', () => {
  let component: StudentDeleteDialogComponent;
  let fixture: ComponentFixture<StudentDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDeleteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
