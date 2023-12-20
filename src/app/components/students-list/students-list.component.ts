import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Student } from '../../Models/Student';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css',
  providers: [ApiService]
})
export class StudentsListComponent {
  students: Student[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.apiService.getAllStudents()
      .subscribe({
        next: (response) => {
          //console.log(students);
          this.students = response;
        },
        error: (error) => {
        }
      });
  }

}
