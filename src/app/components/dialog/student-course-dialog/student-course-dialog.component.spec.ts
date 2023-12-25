import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseDialogComponent } from './student-course-dialog.component';

describe('StudentCourseDialogComponent', () => {
  let component: StudentCourseDialogComponent;
  let fixture: ComponentFixture<StudentCourseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCourseDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentCourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
