import { Component } from '@angular/core';
import { Course } from '../../Models/Course';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
  providers: [ApiService]
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
