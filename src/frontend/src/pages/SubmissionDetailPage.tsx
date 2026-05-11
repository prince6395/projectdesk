import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCharges, useMySubmission } from "@/hooks/useSubmissions";
import type { StatusEntry } from "@/types";
import { ProjectType, SubmissionStatus } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  IndianRupee,
  Layers,
  PackageCheck,
  User,
} from "lucide-react";

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  [ProjectType.tenth_twelfth_handwritten]: "10th / 12th — Handwritten",
  [ProjectType.graduation_pdf_only]: "Graduation — PDF Conversion",
  [ProjectType.graduation_pdf_binding]: "Graduation — PDF + Binding",
};

const PROJECT_TYPE_ICONS: Record<ProjectType, typeof FileText> = {
  [ProjectType.tenth_twelfth_handwritten]: FileText,
  [ProjectType.graduation_pdf_only]: BookOpen,
  [ProjectType.graduation_pdf_binding]: Layers,
};

const STATUS_TIMELINE = [
  { status: SubmissionStatus.submitted, label: "Submitted", icon: Circle },
  { status: SubmissionStatus.in_progress, label: "In Progress", icon: Clock },
  {
    status: SubmissionStatus.ready_for_pickup,
    label: "Ready for Pickup",
    icon: PackageCheck,
  },
  {
    status: SubmissionStatus.completed,
    label: "Completed",
    icon: CheckCircle2,
  },
];

const STATUS_ORDER_MAP: Record<SubmissionStatus, number> = {
  [SubmissionStatus.submitted]: 0,
  [SubmissionStatus.in_progress]: 1,
  [SubmissionStatus.ready_for_pickup]: 2,
  [SubmissionStatus.completed]: 3,
};

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatRupees(amount: bigint): string {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

interface InfoRowProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function InfoRow({ label, value, icon }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground mt-0.5 break-words">
          {value}
        </p>
      </div>
    </div>
  );
}

function TimelineStep({
  step,
  currentStatusIdx,
  historyEntry,
  isLast,
}: {
  step: { status: SubmissionStatus; label: string; icon: typeof Circle };
  currentStatusIdx: number;
  historyEntry?: StatusEntry;
  isLast: boolean;
}) {
  const stepIdx = STATUS_ORDER_MAP[step.status];
  const isDone = stepIdx < currentStatusIdx;
  const isCurrent = stepIdx === currentStatusIdx;
  const isFuture = stepIdx > currentStatusIdx;
  const Icon = step.icon;

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-smooth ${
            isDone
              ? "bg-primary/20 border-primary"
              : isCurrent
                ? "bg-primary border-primary shadow-lg shadow-primary/30"
                : "bg-muted border-border"
          }`}
        >
          <Icon
            className={`w-4 h-4 ${
              isDone
                ? "text-primary"
                : isCurrent
                  ? "text-primary-foreground"
                  : "text-muted-foreground"
            }`}
          />
        </div>
        {!isLast && (
          <div
            className={`w-0.5 flex-1 mt-1 ${
              isDone ? "bg-primary/40" : "bg-border"
            }`}
            style={{ minHeight: "28px" }}
          />
        )}
      </div>
      <div className="pb-6 min-w-0">
        <p
          className={`text-sm font-semibold ${
            isFuture ? "text-muted-foreground" : "text-foreground"
          }`}
        >
          {step.label}
        </p>
        {historyEntry ? (
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatDateTime(historyEntry.timestamp)}
          </p>
        ) : isFuture ? (
          <p className="text-xs text-muted-foreground/50 mt-0.5">Pending</p>
        ) : null}
      </div>
    </div>
  );
}

export default function SubmissionDetailPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const submissionId = BigInt(id ?? "0");
  const { data: submission, isLoading } = useMySubmission(submissionId);
  const { data: charges } = useCharges();

  const charge = charges?.find(
    (c) => c.projectType === submission?.projectType,
  );
  const currentStatusIdx = submission
    ? STATUS_ORDER_MAP[submission.currentStatus]
    : 0;

  const historyMap = new Map<SubmissionStatus, StatusEntry>();
  for (const entry of submission?.statusHistory ?? []) {
    historyMap.set(entry.status, entry);
  }

  if (isLoading) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-5"
        data-ocid="detail.loading_state"
      >
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (!submission) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center"
        data-ocid="detail.error_state"
      >
        <p className="text-muted-foreground">Submission not found.</p>
        <Button asChild variant="ghost" className="mt-4">
          <Link to="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  const TypeIcon = PROJECT_TYPE_ICONS[submission.projectType];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
      {/* Back */}
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="-ml-2 text-muted-foreground hover:text-foreground"
        data-ocid="detail.back_button"
      >
        <Link to="/dashboard">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Dashboard
        </Link>
      </Button>

      {/* Header Card */}
      <Card className="bg-card border-border" data-ocid="detail.header_card">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <TypeIcon className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h1 className="font-display text-xl font-bold text-foreground">
                  {submission.studentName}
                </h1>
                <StatusBadge status={submission.currentStatus} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {PROJECT_TYPE_LABELS[submission.projectType]}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Submitted on {formatDate(submission.submittedAt)}
              </p>
            </div>
          </div>

          {charge && (
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <IndianRupee className="w-4 h-4" />
                Service Charge
              </div>
              <p className="font-display font-bold text-lg text-primary">
                {formatRupees(charge.amount)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Academic Info */}
      <Card className="bg-card border-border" data-ocid="detail.academic_card">
        <CardContent className="p-5 sm:p-6">
          <h2 className="font-display font-semibold text-base text-foreground mb-2">
            Academic Details
          </h2>
          <InfoRow
            label="Class / Course"
            value={submission.classCourse}
            icon={<BookOpen className="w-4 h-4 text-muted-foreground" />}
          />
          <InfoRow
            label="Roll Number"
            value={submission.rollNumber}
            icon={<FileText className="w-4 h-4 text-muted-foreground" />}
          />
          <InfoRow
            label="Enrollment Number"
            value={submission.enrollmentNumber}
            icon={<FileText className="w-4 h-4 text-muted-foreground" />}
          />
          <InfoRow
            label="Teacher Name"
            value={submission.teacherName}
            icon={<User className="w-4 h-4 text-muted-foreground" />}
          />
          <InfoRow
            label="Principal Name"
            value={submission.principalName}
            icon={<User className="w-4 h-4 text-muted-foreground" />}
          />
        </CardContent>
      </Card>

      {/* Admin Notes */}
      {submission.adminNotes && (
        <Card
          className="bg-primary/5 border-primary/20"
          data-ocid="detail.admin_notes_card"
        >
          <CardContent className="p-5">
            <h2 className="font-display font-semibold text-sm text-primary mb-1.5">
              Note from Team
            </h2>
            <p className="text-sm text-foreground">{submission.adminNotes}</p>
          </CardContent>
        </Card>
      )}

      {/* Status Timeline */}
      <Card className="bg-card border-border" data-ocid="detail.timeline_card">
        <CardContent className="p-5 sm:p-6">
          <h2 className="font-display font-semibold text-base text-foreground mb-5">
            Status Timeline
          </h2>
          <div>
            {STATUS_TIMELINE.map((step, idx) => (
              <TimelineStep
                key={step.status}
                step={step}
                currentStatusIdx={currentStatusIdx}
                historyEntry={historyMap.get(step.status)}
                isLast={idx === STATUS_TIMELINE.length - 1}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
