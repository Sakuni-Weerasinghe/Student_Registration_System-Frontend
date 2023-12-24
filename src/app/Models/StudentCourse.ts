export interface StudentCourses {
    studentId: number;
    courseId: number;
    enrollmentDate: Date;
}

export interface StudentCourses_ {
    studentId: number;
    courseId: number;
    enrollmentDate: Date;
    student: {
        studentId: number;
        studentRegistrationNumber: string;
        firstName: string;
        lastName: string;
        birthday: Date;
        gender: string;
        email: string;
        phone: string;
        addressLine1: string;
        addressLine2: string;
        addressLine3: string;
    };
    courses: {
        courseId: number;
        courseName: string;
        courseCode: string;
        credits: number;
        lecturer: string;
        registerDate: Date;
        selected: boolean;
    };
}