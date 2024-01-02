import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../Models/Student';
import { Observable } from 'rxjs';
import { Course } from '../Models/Course';
import { CourseSchedule, CourseSchedule_ } from '../Models/CourseSchedule';
import { StudentCourses, StudentCourses_ } from '../Models/StudentCourse';
import { CommonResponse } from '../Models/CommonResponse';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7270/api/';

  constructor(private http: HttpClient) { }

  login(loginObj: any) {
    return this.http.post<any>(this.baseUrl + "Admin/authenticate", loginObj);
  }

  registerStudent(registerStudentRequest: Student): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(
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

  updateStudent(id: number, updateStudentRequest: Student): Observable<CommonResponse> {
    return this.http.put<CommonResponse>(this.baseUrl + 'Student/update/' + id, updateStudentRequest);
  }

  deleteStudent(id: number): Observable<CommonResponse> {
    return this.http.delete<CommonResponse>(this.baseUrl + 'Student/delete/' + id);
  }



  addCourse(courseRegisterRequest: Course): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(
      this.baseUrl + 'Course/add-course',
      courseRegisterRequest
    );
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl + 'Course');
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(this.baseUrl + 'Course/' + id);
  }

  updateCourses(id: number, updateCourseRequest: Course): Observable<CommonResponse> {
    return this.http.put<CommonResponse>(this.baseUrl + 'Course/update/' + id, updateCourseRequest);
  }

  deleteCourse(id: number): Observable<CommonResponse> {
    return this.http.delete<CommonResponse>(this.baseUrl + 'Course/delete/' + id);
  }



  addCourseSchedule(courseScheduleRequest: CourseSchedule): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(
      this.baseUrl + 'CourseSchedule/add-course-schedule',
      courseScheduleRequest
    );
  }

  getCourseSchedule(id: number): Observable<CourseSchedule_> {
    return this.http.get<CourseSchedule_>(this.baseUrl + 'CourseSchedule/' + id)
  }

  deleteCourseSchedule(id: number): Observable<CommonResponse> {
    return this.http.delete<CommonResponse>(this.baseUrl + 'CourseSchedule/delete/' + id);
  }

  updateCourseSchedule(id: number, updateCourseScheduleRequest: Course): Observable<CommonResponse> {
    return this.http.put<CommonResponse>(this.baseUrl + 'CourseSchedule/update/' + id, updateCourseScheduleRequest);
  }




  addStudentCourses(studentCourseRequest: StudentCourses[]): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(
      this.baseUrl + 'StudentCourses/add-student-courses',
      studentCourseRequest
    );
  }

  getStudentCourses(id: number): Observable<StudentCourses_[]> {
    return this.http.get<StudentCourses_[]>(this.baseUrl + 'StudentCourses/Courses/' + id)
  }

  deleteStudentCourses(studentId: number, courseId: number): Observable<CommonResponse> {
    return this.http.delete<CommonResponse>(this.baseUrl + 'StudentCourses/' + studentId + '/' + courseId);
  }

}
