import type {
  Charge,
  SubmissionId,
  SubmissionPublic,
  SubmitRequest,
} from "@/backend";
export { ProjectType, SubmissionStatus, UserRole } from "@/backend";
export type {
  SubmissionPublic,
  SubmissionId,
  SubmitRequest,
  Charge,
  StatusEntry,
  UserId,
  Timestamp,
} from "@/backend";

export interface NavLink {
  label: string;
  href: string;
}

export interface SubmissionCardProps {
  submission: SubmissionPublic;
  onView?: (id: SubmissionId) => void;
}
