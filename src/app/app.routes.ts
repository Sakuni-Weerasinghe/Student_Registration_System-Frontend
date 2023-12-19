import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { authGuard } from './guards/auth.guard';
import { StudentRegistrationComponent } from './components/student-registration/student-registration.component';
import { CourseRegistrationComponent } from './components/course-registration/course-registration.component';
import { StudentEnrollmentComponent } from './components/student-enrollment/student-enrollment.component';
import { StudentCourseDetailsComponent } from './components/student-course-details/student-course-details.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path:'dashboard',component:AdminDashboardComponent,canActivate:[authGuard]},
    {path:'student-registration',component:StudentRegistrationComponent},
    {path:'course-registration',component:CourseRegistrationComponent},
    {path:'student-enrollment',component:StudentEnrollmentComponent},
    {path:'student-enrollment/enroll/:id',component: StudentCourseDetailsComponent}
];
