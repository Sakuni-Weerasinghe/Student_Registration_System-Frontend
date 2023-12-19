import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../Models/Student';
import { Observable } from 'rxjs';
import { Course } from '../Models/Course';
import { CourseSchedule } from '../Models/CourseSchedule';
import { StudentCourses } from '../Models/StudentCourse';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7270/api/';

  constructor(private http: HttpClient) { }

  login(loginObj: any) {
    return this.http.post<any>(this.baseUrl + "Admin/authenticate", loginObj);
  }

  registerStudent(registerStudentRequest: Student): Observable<Student> {
    return this.http.post<Student>(
      this.baseUrl + 'Student/register-student',
      registerStudentRequest
    );
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl + 'Student');
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(this.baseUrl + 'Student/' + id);
  }

  addCourse(courseRegisterRequest: Course): Observable<Course> {
    return this.http.post<Course>(
      this.baseUrl + 'Course/add-course',
      courseRegisterRequest
    );
  }

  addCourseSchedule(courseScheduleRequest: CourseSchedule): Observable<CourseSchedule> {
    return this.http.post<CourseSchedule>(
      this.baseUrl + 'CourseSchedule/add-course-schedule',
      courseScheduleRequest
    );
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl + 'Course');
  }

  addStudentCourses(studentCourseRequest: StudentCourses): Observable<StudentCourses> {
    return this.http.post<StudentCourses>(
      this.baseUrl + 'StudentCourses/add-student-courses',
      studentCourseRequest
    );
  }
}
