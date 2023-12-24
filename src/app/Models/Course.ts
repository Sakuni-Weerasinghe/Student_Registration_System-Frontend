import { CourseSchedule_ } from "./CourseSchedule";

export interface Course {
  courseId: number;
  courseName: string;
  courseCode: string;
  credits: number;
  lecturer: string;
  registerDate: Date;
  selected: boolean;
  courseSchedules: CourseSchedule_[];
}
