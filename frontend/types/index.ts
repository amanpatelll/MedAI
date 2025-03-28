import mongoose, { Schema } from "mongoose";
import { DefaultSession } from "next-auth";

export enum UserRole {
  PATIENT = "patient",
  ANDROLOGIST = "andrologist",
  CARDIOLOGIST = "cardiologist",
  DERMATOLOGIST = "dermatologist",
  GASTROENTEROLOGIST = "gastroenterologist",
  PULMONOLOGIST = "pulmonologist",
  NEPHROLOGIST = "nephrologist",
  HEPATOLOGIST = "hepatologist",
  RHEUMATOLOGIST = "rheumatologist",
  ENDOCRINOLOGIST = "endocrinologist",
  NEUROLOGIST = "neurologist",
  OPHTHALMOLOGIST = "ophthalmologist",
  OTOLARYNGOLOGIST = "otolaryngologist",
  UROLOGIST = "urologist",
  GENERAL_PRACTITIONER = "general_practitioner",
  PEDIATRICIAN = "pediatrician",
}

declare module "next-auth" {
  interface User {
    role: UserRole; // Changed from role?: UserRole to make it consistent
  }

  interface Session {
    user: {
      _id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    role: UserRole;
  }
}

export interface User {
  _id: string
  displayName: string;
  email: string;
  pfpUrl: string;
  role: UserRole;
  maxQueries: number;
  patientQueries: Array<Query>;
  refreshToken?: string;

}

export interface Query {
  _id?: string;
  patientId: string;
  clinicianId?: string;
  label?: string;
  query: string;
  response: string;
  aiResponse?: any;
  responseStatus: "waiting" | "ready" | "approved" | "error";
  approved: boolean;
  date: string;
}

export interface Notification {
  _id: string;
  userId: string;
  message: string;
}


export const UserSchema : Schema = new mongoose.Schema({
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  pfpUrl: { type: String, required: true },
  role: { type: String, required: true, default: UserRole.PATIENT },
  maxQueries: { type: Number, required: true },
  patientQueries: { type: Array, required: true },
  refreshToken: { type: String },
})

export const NotificationSchema : Schema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
});

export const QuerySchema: Schema = new mongoose.Schema({
  patientId: { type: String, required: true },
  clinicianId: { type: String },
  label: { type: String },
  query: { type: String, required: true },
  response: { type: String, required: true },
  aiResponse: { type: Object },
  responseStatus: { type: String, required: true, default: "waiting" },
  approved: { type: Boolean, required: true, default: false },
  date: { type: String, required: true },
});

