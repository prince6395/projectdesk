import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useAllSubmissions,
  useUpdateAdminNotes,
  useUpdateStatus,
} from "@/hooks/useSubmissions";
import type { SubmissionId, SubmissionPublic } from "@/types";
import { ProjectType, SubmissionStatus } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Layers,
  Loader2,
  PackageCheck,
  Save,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

type FilterStatus = "all" | SubmissionStatus;

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  [ProjectType.tenth_twelfth_handwritten]: "10th / 12th Handwritten",
  [ProjectType.graduation_pdf_only]: "Graduation — PDF Only",
  [ProjectType.graduation_pdf_binding]: "Graduation — PDF + Binding",
};

const STATUS_NEXT_ACTION: Record<
  SubmissionStatus,
  { label: string; next: SubmissionStatus; icon: React.ReactNode } | null
> = {
  [SubmissionStatus.submitted]: {
    label: "Mark In Progress",
    next: SubmissionStatus.in_progress,
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  [SubmissionStatus.in_progress]: {
    label: "Mark Ready for Pickup",
    next: SubmissionStatus.ready_for_pickup,
    icon: <PackageCheck className="w-3.5 h-3.5" />,
  },
  [SubmissionStatus.ready_for_pickup]: {
    label: "Mark Completed",
    next: SubmissionStatus.completed,
    icon: <CheckCircle className="w-3.5 h-3.5" />,
  },
  [SubmissionStatus.completed]: null,
};

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTimestampFull(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface DetailPanelProps {
  submission: SubmissionPublic;
  onClose: () => void;
}

function DetailPanel({ submission, onClose }: DetailPanelProps) {
  const [notes, setNotes] = useState(submission.adminNotes);
  const [isSaving, setIsSaving] = useState(false);
  const updateNotes = useUpdateAdminNotes();

  const handleSaveNotes = async () => {
    setIsSaving(true);
    try {
      await updateNotes.mutateAsync({ id: submission.id, notes });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      data-ocid="admin.detail_panel"
      className="border-t border-border bg-card/50 px-6 py-5 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic Info */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Academic Information
          </h3>
          <dl className="space-y-2">
            {[
              ["Student Name", submission.studentName],
              ["Roll Number", submission.rollNumber],
              ["Enrollment No.", submission.enrollmentNumber],
              ["Class / Course", submission.classCourse],
              ["Teacher Name", submission.teacherName],
              ["Principal Name", submission.principalName],
              ["Project Type", PROJECT_TYPE_LABELS[submission.projectType]],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-2 text-sm">
                <dt className="text-muted-foreground min-w-[130px] shrink-0">
                  {label}:
                </dt>
                <dd className="text-foreground font-medium break-words min-w-0">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Status Timeline */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Status History
          </h3>
          <ol className="relative border-l border-border ml-2 space-y-3">
            {submission.statusHistory.map((entry, i) => (
              <li
                key={`${entry.status}-${entry.timestamp.toString()}`}
                className="pl-4 relative"
              >
                <span
                  className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-background ${
                    i === submission.statusHistory.length - 1
                      ? "bg-primary"
                      : "bg-muted-foreground"
                  }`}
                />
                <div className="flex flex-col">
                  <StatusBadge status={entry.status} className="self-start" />
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {formatTimestampFull(entry.timestamp)}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Admin Notes */}
      <div className="mt-5 pt-5 border-t border-border">
        <label
          htmlFor={`notes-${submission.id.toString()}`}
          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
        >
          Admin Notes
        </label>
        <Textarea
          id={`notes-${submission.id.toString()}`}
          data-ocid="admin.notes_textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add internal notes about this submission…"
          className="min-h-[80px] bg-background text-sm resize-y"
          rows={3}
        />
        <div className="flex justify-between items-center mt-2">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Collapse ↑
          </button>
          <Button
            type="button"
            size="sm"
            data-ocid="admin.notes_save_button"
            onClick={handleSaveNotes}
            disabled={isSaving || notes === submission.adminNotes}
            className="gap-1.5"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            Save Notes
          </Button>
        </div>
      </div>
    </div>
  );
}

interface SubmissionRowProps {
  submission: SubmissionPublic;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function SubmissionRow({
  submission,
  index,
  isExpanded,
  onToggle,
}: SubmissionRowProps) {
  const updateStatus = useUpdateStatus();
  const queryClient = useQueryClient();
  const nextAction = STATUS_NEXT_ACTION[submission.currentStatus];
  const [isPending, setIsPending] = useState(false);

  const handleStatusUpdate = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!nextAction) return;
    setIsPending(true);
    // Optimistic update
    queryClient.setQueryData<SubmissionPublic[]>(
      ["allSubmissions"],
      (old) =>
        old?.map((s) =>
          s.id === submission.id ? { ...s, currentStatus: nextAction.next } : s,
        ) ?? [],
    );
    try {
      await updateStatus.mutateAsync({
        id: submission.id,
        status: nextAction.next,
      });
    } catch {
      // Revert on error
      queryClient.invalidateQueries({ queryKey: ["allSubmissions"] });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <tr
        data-ocid={`admin.submission.item.${index}`}
        className={`border-b border-border transition-colors cursor-pointer hover:bg-muted/30 ${
          isExpanded ? "bg-muted/20" : ""
        }`}
        onClick={onToggle}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onToggle()}
        tabIndex={0}
      >
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground leading-snug">
              {submission.studentName}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Roll: {submission.rollNumber}
          </p>
        </td>
        <td className="px-4 py-3 text-sm text-foreground hidden sm:table-cell">
          {submission.classCourse}
        </td>
        <td className="px-4 py-3 hidden md:table-cell">
          <span className="text-xs text-muted-foreground">
            {PROJECT_TYPE_LABELS[submission.projectType]}
          </span>
        </td>
        <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">
          {formatTimestamp(submission.submittedAt)}
        </td>
        <td className="px-4 py-3">
          <StatusBadge status={submission.currentStatus} />
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            {nextAction && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                data-ocid={`admin.status_action_button.${index}`}
                className="gap-1.5 text-xs whitespace-nowrap"
                onClick={handleStatusUpdate}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  nextAction.icon
                )}
                <span className="hidden sm:inline">{nextAction.label}</span>
              </Button>
            )}
            <button
              type="button"
              aria-label={isExpanded ? "Collapse details" : "Expand details"}
              className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={6} className="p-0">
            <DetailPanel submission={submission} onClose={onToggle} />
          </td>
        </tr>
      )}
    </>
  );
}

const FILTER_OPTIONS: { key: FilterStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: SubmissionStatus.submitted, label: "Submitted" },
  { key: SubmissionStatus.in_progress, label: "In Progress" },
  { key: SubmissionStatus.ready_for_pickup, label: "Ready for Pickup" },
  { key: SubmissionStatus.completed, label: "Completed" },
];

export default function AdminPage() {
  const { data: submissions = [], isLoading } = useAllSubmissions();
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<SubmissionId | null>(null);

  const counts = useMemo(() => {
    const c: Record<FilterStatus, number> = {
      all: submissions.length,
      [SubmissionStatus.submitted]: 0,
      [SubmissionStatus.in_progress]: 0,
      [SubmissionStatus.ready_for_pickup]: 0,
      [SubmissionStatus.completed]: 0,
    };
    for (const s of submissions) {
      c[s.currentStatus] = (c[s.currentStatus] ?? 0) + 1;
    }
    return c;
  }, [submissions]);

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      const matchesStatus =
        activeFilter === "all" || s.currentStatus === activeFilter;
      const matchesSearch =
        search.trim() === "" ||
        s.studentName.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [submissions, activeFilter, search]);

  const toggleExpand = (id: SubmissionId) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="admin.page">
      {/* Page Header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">
                Manage all student submissions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span data-ocid="admin.total_count">
              {submissions.length} total
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Submitted",
              status: SubmissionStatus.submitted,
              icon: <Layers className="w-4 h-4" />,
              color: "text-muted-foreground",
            },
            {
              label: "In Progress",
              status: SubmissionStatus.in_progress,
              icon: <Clock className="w-4 h-4" />,
              color: "text-primary",
            },
            {
              label: "Ready Pickup",
              status: SubmissionStatus.ready_for_pickup,
              icon: <PackageCheck className="w-4 h-4" />,
              color: "[color:oklch(0.75_0.18_145)]",
            },
            {
              label: "Completed",
              status: SubmissionStatus.completed,
              icon: <CheckCircle className="w-4 h-4" />,
              color: "[color:oklch(0.75_0.15_300)]",
            },
          ].map(({ label, status, icon, color }) => (
            <button
              key={status}
              type="button"
              data-ocid={`admin.stat_card.${status}`}
              onClick={() => setActiveFilter(status)}
              className={`bg-card border rounded-xl p-4 text-left transition-smooth hover:border-primary/50 ${
                activeFilter === status
                  ? "border-primary shadow-sm"
                  : "border-border"
              }`}
            >
              <div className={`${color} mb-1`}>{icon}</div>
              <p className="text-2xl font-display font-bold text-foreground">
                {isLoading ? "—" : counts[status]}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </button>
          ))}
        </div>

        {/* Filter + Search Bar */}
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex flex-wrap gap-1.5 flex-1">
            {FILTER_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                data-ocid={`admin.filter.${key}`}
                onClick={() => setActiveFilter(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-smooth ${
                  activeFilter === key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}{" "}
                <span
                  className={`ml-0.5 ${
                    activeFilter === key ? "opacity-80" : "opacity-60"
                  }`}
                >
                  ({isLoading ? "…" : counts[key]})
                </span>
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              type="text"
              data-ocid="admin.search_input"
              placeholder="Search by name or roll no…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 text-sm h-8 bg-background"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {isLoading ? (
            <div data-ocid="admin.loading_state" className="p-6 space-y-3">
              {[1, 2, 3, 4].map((n) => (
                <Skeleton key={n} className="h-12 w-full" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              data-ocid="admin.empty_state"
              className="flex flex-col items-center justify-center py-16 text-center px-6"
            >
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground">
                No submissions found
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {search
                  ? "Try a different name or roll number"
                  : "No submissions match the selected filter"}
              </p>
              {(activeFilter !== "all" || search) && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter("all");
                    setSearch("");
                  }}
                  className="mt-3 text-sm text-primary hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm"
                data-ocid="admin.submissions_table"
              >
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Student
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">
                      Class / Course
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">
                      Project Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">
                      Submitted
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((submission, i) => (
                    <SubmissionRow
                      key={`${submission.id.toString()}-${submission.studentName}`}
                      submission={submission}
                      index={i + 1}
                      isExpanded={expandedId === submission.id}
                      onToggle={() => toggleExpand(submission.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
