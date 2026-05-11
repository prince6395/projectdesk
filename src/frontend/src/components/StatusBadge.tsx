import { SubmissionStatus } from "@/types";

interface StatusBadgeProps {
  status: SubmissionStatus;
  className?: string;
}

const statusConfig: Record<
  SubmissionStatus,
  { label: string; className: string }
> = {
  [SubmissionStatus.submitted]: {
    label: "Submitted",
    className: "status-badge status-submitted",
  },
  [SubmissionStatus.in_progress]: {
    label: "In Progress",
    className: "status-badge status-progress",
  },
  [SubmissionStatus.ready_for_pickup]: {
    label: "Ready for Pickup",
    className: "status-badge status-ready",
  },
  [SubmissionStatus.completed]: {
    label: "Completed",
    className: "status-badge status-completed",
  },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status] ?? {
    label: status,
    className: "status-badge status-submitted",
  };

  return (
    <span className={`${config.className} ${className}`}>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {config.label}
    </span>
  );
}
