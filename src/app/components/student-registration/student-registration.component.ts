import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from '../../Models/Student';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.css',
})
export class StudentRegistrationComponent {
  studentRegisterRequest: Student = {
    studentId: ' ',
    firstname: ' ',
    lastname: ' ',
    birthday: new Date(),
    gender: ' ',
    email: ' ',
    phone: ' ',
    addressline1: ' ',
    addressline2: ' ',
    addressline3: ' ',
  };

  registerStudent() {
    console.log(this.studentRegisterRequest);
  }
}
