export interface Course {
  courseId: number;
  courseName: string;
  courseCode: string;
  credits: number;
  description: string;
  lecturer: string;
  registerDate: Date;
  selected: boolean;
}
