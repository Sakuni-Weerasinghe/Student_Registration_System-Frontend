import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../Models/Student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7270/api/Student';

  constructor(private http: HttpClient) {}

  registerStudent(registerStudentRequest: Student): Observable<Student> {
    return this.http.post<Student>(
      this.baseUrl + '/register-student',
      registerStudentRequest
    );
  }
}
