import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const students = pgTable("students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  className: text("class_name").notNull(),
});

export const attendance = pgTable("attendance", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull(),
  studentName: text("student_name").notNull(),
  className: text("class_name").notNull(),
  prayer: text("prayer").notNull(),
  date: text("date").notNull(),
  status: text("status").notNull(),
  reason: text("reason"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
});

export const insertAttendanceSchema = createInsertSchema(attendance).omit({
  id: true,
  timestamp: true,
});

export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Student = typeof students.$inferSelect;
export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;
export type Attendance = typeof attendance.$inferSelect;

export const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
export type Prayer = typeof prayers[number];

export const classes = [
  "Grade 1",
  "Grade 2", 
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
] as const;
export type ClassName = typeof classes[number];
