import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { authGuard } from './guards/auth.guard';
import { StudentRegistrationComponent } from './components/student-registration/student-registration.component';
import { CourseRegistrationComponent } from './components/course-registration/course-registration.component';
import { StudentEnrollmentComponent } from './components/student-enrollment/student-enrollment.component';
import { StudentCourseDetailsComponent } from './components/student-course-details/student-course-details.component';
import { CourseScheduleComponent } from './components/course-schedule/course-schedule.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { loginGuard } from './guards/login.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent , canActivate: [loginGuard] },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'student-registration', component: StudentRegistrationComponent },
  { path: 'course-registration', component: CourseRegistrationComponent },
  { path: 'student-enrollment', component: StudentEnrollmentComponent },
  {
    path: 'student-enrollment/enroll/:id',
    component: StudentCourseDetailsComponent,
  },
  { path: 'course-schedule', component: CourseScheduleComponent },
  { path: 'student', component: StudentsListComponent },
  { path: 'course', component: CourseListComponent },

  { path: '', component: HomeComponent, pathMatch: "full", canActivate: [loginGuard] },

  { path: '**', component:PageNotFoundComponent }

];
