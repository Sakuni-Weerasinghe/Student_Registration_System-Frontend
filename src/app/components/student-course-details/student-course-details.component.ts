import { Component } from '@angular/core';

@Component({
  selector: 'app-student-course-details',
  standalone: true,
  imports: [],
  templateUrl: './student-course-details.component.html',
  styleUrl: './student-course-details.component.css'
})
export class StudentCourseDetailsComponent {
  studentDetails: Student = {
    studentId: 0,
    firstName: " ",
    lastName: " ",
    birthday: new Date(),
    gender: " ",
    email: " ",
    phones: " ",
    addressLine1: " ",
    addressLine2: " ",
    addressLine3: " "
  };

  constructor( 
    private route: ActivatedRoute,
    private studentService: ApiServiceService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.paramMap.subscribe({
      next:(params) => {
        const idString = params.get("id");
        if(idString){
          const id = +idString;
          this.studentService.getStudent(id)
          .subscribe({
            next: (response) => {
              this.studentDetails = response;
            }
          })
        }
      }
    })
  }
}
