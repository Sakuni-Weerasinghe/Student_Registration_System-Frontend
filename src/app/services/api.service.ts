import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../Models/Student';
import { Observable } from 'rxjs';
import { Course } from '../Models/Course';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7270/api/';

  constructor(private http: HttpClient) {}

  registerStudent(registerStudentRequest: Student): Observable<Student> {
    return this.http.post<Student>(
      this.baseUrl + 'Student/register-student',
      registerStudentRequest
    );
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl + 'Student');
  }

  addCourse(courseRegisterRequest: Course): Observable<Course> {
    return this.http.post<Course>(
      this.baseUrl + 'Course/add-course',
      courseRegisterRequest
    );
  }
}
