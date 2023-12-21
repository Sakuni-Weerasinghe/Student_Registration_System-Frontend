import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-course-schedule-list',
  standalone: true,
  imports: [],
  templateUrl: './course-schedule-list.component.html',
  styleUrl: './course-schedule-list.component.css'
})
export class CourseScheduleListComponent {
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.route.paramMap.subscribe({
    //   next: (params) => {
    //     const idString = params.get('id');
    //     if (idString) {
    //       const id = +idString;
    //       this.apiService.getCourseSchedule.subscribe({
    //         next: (response) => {
    //           this.studentDetails = response;
    //         },
    //       });
    //     }
    //   },
    // });

  }

}
