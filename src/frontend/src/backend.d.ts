import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export type Timestamp = bigint;
export interface SubmitRequest {
    studentName: string;
    projectType: ProjectType;
    classCourse: string;
    teacherName: string;
    rollNumber: string;
    principalName: string;
    enrollmentNumber: string;
}
export interface StatusEntry {
    status: SubmissionStatus;
    timestamp: Timestamp;
}
export interface SubmissionPublic {
    id: SubmissionId;
    studentName: string;
    projectType: ProjectType;
    classCourse: string;
    studentPrincipal: UserId;
    submittedAt: Timestamp;
    statusHistory: Array<StatusEntry>;
    teacherName: string;
    rollNumber: string;
    principalName: string;
    adminNotes: string;
    currentStatus: SubmissionStatus;
    enrollmentNumber: string;
}
export interface Charge {
    projectType: ProjectType;
    description: string;
    amount: bigint;
}
export type SubmissionId = bigint;
export enum ProjectType {
    graduation_pdf_binding = "graduation_pdf_binding",
    graduation_pdf_only = "graduation_pdf_only",
    tenth_twelfth_handwritten = "tenth_twelfth_handwritten"
}
export enum SubmissionStatus {
    submitted = "submitted",
    in_progress = "in_progress",
    completed = "completed",
    ready_for_pickup = "ready_for_pickup"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllSubmissions(): Promise<Array<SubmissionPublic>>;
    getCallerUserRole(): Promise<UserRole>;
    getCharges(): Promise<Array<Charge>>;
    getMySubmission(id: SubmissionId): Promise<SubmissionPublic | null>;
    getMySubmissions(): Promise<Array<SubmissionPublic>>;
    isCallerAdmin(): Promise<boolean>;
    submitProject(req: SubmitRequest): Promise<SubmissionId>;
    updateAdminNotes(id: SubmissionId, notes: string): Promise<void>;
    updateSubmissionStatus(id: SubmissionId, newStatus: SubmissionStatus): Promise<void>;
}
