import { type Student, type InsertStudent, type Attendance, type InsertAttendance, type ClassName } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getStudent(id: string): Promise<Student | undefined>;
  getStudentsByClass(className: ClassName): Promise<Student[]>;
  createStudent(student: InsertStudent): Promise<Student>;
  getAttendance(date: string, prayer: string, className: string): Promise<Attendance[]>;
  markAttendance(attendance: InsertAttendance): Promise<Attendance>;
  getStudentAttendance(studentId: string): Promise<Attendance[]>;
}

export class MemStorage implements IStorage {
  private students: Map<string, Student>;
  private attendance: Map<string, Attendance>;

  constructor() {
    this.students = new Map();
    this.attendance = new Map();
    this.seedData();
  }

  private seedData() {
    const classes = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"];
    const names = [
      "Ahmed Hassan", "Fatima Ali", "Omar Khan", "Aisha Rahman", "Yusuf Ibrahim",
      "Zaynab Malik", "Muhammad Farid", "Maryam Aziz", "Abdullah Syed", "Khadija Noor",
      "Hassan Ahmed", "Amina Said", "Ibrahim Tariq", "Safiya Iqbal", "Bilal Hussain"
    ];

    classes.forEach(className => {
      for (let i = 0; i < 15; i++) {
        const id = randomUUID();
        const student: Student = {
          id,
          name: names[i] || `Student ${i + 1}`,
          className,
        };
        this.students.set(id, student);
      }
    });
  }

  async getStudent(id: string): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async getStudentsByClass(className: ClassName): Promise<Student[]> {
    return Array.from(this.students.values()).filter(
      (student) => student.className === className,
    );
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = randomUUID();
    const student: Student = { ...insertStudent, id };
    this.students.set(id, student);
    return student;
  }

  async getAttendance(date: string, prayer: string, className: string): Promise<Attendance[]> {
    return Array.from(this.attendance.values()).filter(
      (att) => att.date === date && att.prayer === prayer && att.className === className,
    );
  }

  async markAttendance(insertAttendance: InsertAttendance): Promise<Attendance> {
    const id = randomUUID();
    const attendance: Attendance = {
      ...insertAttendance,
      id,
      timestamp: new Date(),
    };
    this.attendance.set(id, attendance);
    return attendance;
  }

  async getStudentAttendance(studentId: string): Promise<Attendance[]> {
    return Array.from(this.attendance.values()).filter(
      (att) => att.studentId === studentId,
    );
  }
}

export const storage = new MemStorage();
