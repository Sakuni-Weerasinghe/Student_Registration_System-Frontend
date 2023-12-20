import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Student } from '../../Models/Student';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css',
  providers: [ApiService, HttpClient]
})
export class StudentsListComponent {
  students: Student[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

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
