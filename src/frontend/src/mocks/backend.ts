import type { backendInterface, SubmissionPublic, Charge } from "../backend";
import { ProjectType, SubmissionStatus, UserRole } from "../backend";

const sampleSubmissions: SubmissionPublic[] = [
  {
    id: BigInt(1),
    studentName: "Priya Sharma",
    projectType: ProjectType.graduation_pdf_binding,
    classCourse: "B.Sc Computer Science (Final Year)",
    studentPrincipal: { toString: () => "aaaaa-bbbbb" } as any,
    submittedAt: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    statusHistory: [
      { status: SubmissionStatus.submitted, timestamp: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000) * BigInt(1_000_000) },
      { status: SubmissionStatus.in_progress, timestamp: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000) * BigInt(1_000_000) },
    ],
    teacherName: "Dr. Anita Gupta",
    rollNumber: "BSC2021042",
    principalName: "Prof. Ramesh Kumar",
    adminNotes: "PDF conversion in progress, estimated completion in 2 days.",
    currentStatus: SubmissionStatus.in_progress,
    enrollmentNumber: "EN2021BSC042",
  },
  {
    id: BigInt(2),
    studentName: "Rahul Verma",
    projectType: ProjectType.tenth_twelfth_handwritten,
    classCourse: "Class 10th",
    studentPrincipal: { toString: () => "ccccc-ddddd" } as any,
    submittedAt: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    statusHistory: [
      { status: SubmissionStatus.submitted, timestamp: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000) * BigInt(1_000_000) },
      { status: SubmissionStatus.in_progress, timestamp: BigInt(Date.now() - 6 * 24 * 60 * 60 * 1000) * BigInt(1_000_000) },
      { status: SubmissionStatus.ready_for_pickup, timestamp: BigInt(Date.now() - 1 * 24 * 60 * 60 * 1000) * BigInt(1_000_000) },
    ],
    teacherName: "Mrs. Sunita Singh",
    rollNumber: "10A-2024-028",
    principalName: "Mr. Vijay Pathak",
    adminNotes: "Project ready. Please collect from our office.",
    currentStatus: SubmissionStatus.ready_for_pickup,
    enrollmentNumber: "SCH2024010028",
  },
  {
    id: BigInt(3),
    studentName: "Sneha Patel",
    projectType: ProjectType.graduation_pdf_only,
    classCourse: "MBA (Final Year)",
    studentPrincipal: { toString: () => "eeeee-fffff" } as any,
    submittedAt: BigInt(Date.now() - 14 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    statusHistory: [
      { status: SubmissionStatus.submitted, timestamp: BigInt(Date.now() - 14 * 24 * 60 * 60 * 1000) * BigInt(1_000_000) },
      { status: SubmissionStatus.in_progress, timestamp: BigInt(Date.now() - 13 * 24 * 60 * 60 * 1000) * BigInt(1_000_000) },
      { status: SubmissionStatus.ready_for_pickup, timestamp: BigInt(Date.now() - 10 * 24 * 60 * 60 * 1000) * BigInt(1_000_000) },
      { status: SubmissionStatus.completed, timestamp: BigInt(Date.now() - 8 * 24 * 60 * 60 * 1000) * BigInt(1_000_000) },
    ],
    teacherName: "Dr. Meena Joshi",
    rollNumber: "MBA2022031",
    principalName: "Dr. Sanjay Tiwari",
    adminNotes: "Completed and delivered.",
    currentStatus: SubmissionStatus.completed,
    enrollmentNumber: "EN2022MBA031",
  },
];

const sampleCharges: Charge[] = [
  {
    projectType: ProjectType.tenth_twelfth_handwritten,
    description: "Handwritten project file preparation and binding for 10th/12th students",
    amount: BigInt(350),
  },
  {
    projectType: ProjectType.graduation_pdf_only,
    description: "PDF preparation from MS Word/document for graduation students",
    amount: BigInt(500),
  },
  {
    projectType: ProjectType.graduation_pdf_binding,
    description: "PDF preparation + binding for graduation students",
    amount: BigInt(750),
  },
];

export const mockBackend: backendInterface = {
  assignCallerUserRole: async (_user, _role) => undefined,
  _initializeAccessControl: async () => undefined,
  getAllSubmissions: async () => sampleSubmissions,
  getCallerUserRole: async () => UserRole.user,
  getCharges: async () => sampleCharges,
  getMySubmission: async (id) => sampleSubmissions.find((s) => s.id === id) ?? null,
  getMySubmissions: async () => [sampleSubmissions[0], sampleSubmissions[1]],
  isCallerAdmin: async () => false,
  submitProject: async (_req) => BigInt(4),
  updateAdminNotes: async (_id, _notes) => undefined,
  updateSubmissionStatus: async (_id, _status) => undefined,
};
