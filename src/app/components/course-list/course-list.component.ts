import { Component } from '@angular/core';
import { Course } from '../../Models/Course';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { CourseSchedule_ } from '../../Models/CourseSchedule';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
  providers: [ApiService, HttpClient]
})
export class CourseListComponent {
  courses: Course[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.apiService.getAllCourses()
      .subscribe({
        next: (response) => {
          //console.log(students);
          this.courses = response;
        },
        error: (response) => {
          console.log(response);
        }
      });



  }
}
