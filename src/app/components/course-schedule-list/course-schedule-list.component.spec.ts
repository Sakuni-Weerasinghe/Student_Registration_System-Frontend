import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseScheduleListComponent } from './course-schedule-list.component';

describe('CourseScheduleListComponent', () => {
  let component: CourseScheduleListComponent;
  let fixture: ComponentFixture<CourseScheduleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseScheduleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
