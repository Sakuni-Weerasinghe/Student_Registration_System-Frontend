import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseStudentListDialogComponent } from './course-student-list-dialog.component';

describe('CourseStudentListDialogComponent', () => {
  let component: CourseStudentListDialogComponent;
  let fixture: ComponentFixture<CourseStudentListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseStudentListDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseStudentListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
