export interface CourseSchedule {
    courseScheduleId: number;
    courseCode: string;
    date: string;
    time: string;
    venue: string;
}

export interface CourseSchedule_ {
    courseScheduleId: number;
    courseId: number;
    date: string;
    time: string;
    venue: string;
    courses: {};
}