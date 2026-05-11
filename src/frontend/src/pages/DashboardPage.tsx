import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMySubmissions } from "@/hooks/useSubmissions";
import type { SubmissionPublic } from "@/types";
import { ProjectType, SubmissionStatus } from "@/types";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  FileText,
  Layers,
  PlusCircle,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  [ProjectType.tenth_twelfth_handwritten]: "10th / 12th — Handwritten",
  [ProjectType.graduation_pdf_only]: "Graduation — PDF Conversion",
  [ProjectType.graduation_pdf_binding]: "Graduation — PDF + Binding",
};

const PROJECT_TYPE_ICONS: Record<ProjectType, typeof FileText> = {
  [ProjectType.tenth_twelfth_handwritten]: FileText,
  [ProjectType.graduation_pdf_only]: FileText,
  [ProjectType.graduation_pdf_binding]: Layers,
};

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function SubmissionCard({ submission }: { submission: SubmissionPublic }) {
  const Icon = PROJECT_TYPE_ICONS[submission.projectType];
  return (
    <Link
      to="/submissions/$id"
      params={{ id: submission.id.toString() }}
      data-ocid={`dashboard.submission_card.${submission.id.toString()}`}
      className="block group"
    >
      <Card className="bg-card border-border transition-smooth hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mt-0.5">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-display font-semibold text-foreground truncate">
                  {submission.studentName}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5 truncate">
                  {PROJECT_TYPE_LABELS[submission.projectType]}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{formatDate(submission.submittedAt)}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <StatusBadge status={submission.currentStatus} />
              <span className="inline-flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-smooth">
                View <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-48" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

const STATUS_ORDER = [
  SubmissionStatus.submitted,
  SubmissionStatus.in_progress,
  SubmissionStatus.ready_for_pickup,
  SubmissionStatus.completed,
];

function getStatusScore(status: SubmissionStatus): number {
  return STATUS_ORDER.indexOf(status);
}

export default function DashboardPage() {
  const { data: submissions, isLoading } = useMySubmissions();
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { submitted?: string };
  const toastShown = useRef(false);

  useEffect(() => {
    if (search.submitted === "true" && !toastShown.current) {
      toastShown.current = true;
      toast.success("Project submitted successfully!", {
        description: "We'll start working on it soon. Check back for updates.",
        duration: 5000,
      });
      navigate({ to: "/dashboard", replace: true });
    }
  }, [search.submitted, navigate]);

  const sorted = [...(submissions ?? [])].sort(
    (a, b) =>
      getStatusScore(a.currentStatus) - getStatusScore(b.currentStatus) ||
      Number(b.submittedAt - a.submittedAt),
  );

  const activeCount = (submissions ?? []).filter(
    (s) => s.currentStatus !== SubmissionStatus.completed,
  ).length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            My Submissions
          </h1>
          {!isLoading && submissions && submissions.length > 0 && (
            <p className="text-muted-foreground mt-1 text-sm">
              {activeCount > 0
                ? `${activeCount} active project${activeCount !== 1 ? "s" : ""} in progress`
                : "All projects completed"}
            </p>
          )}
        </div>
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 self-start sm:self-auto"
          data-ocid="dashboard.new_submission_button"
        >
          <Link to="/submit">
            <PlusCircle className="w-4 h-4" />
            New Submission
          </Link>
        </Button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-3" data-ocid="dashboard.loading_state">
          {[1, 2, 3].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 text-center"
          data-ocid="dashboard.empty_state"
        >
          <div className="w-16 h-16 rounded-2xl bg-muted/60 border border-border flex items-center justify-center mb-5">
            <ClipboardList className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            No submissions yet
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs mb-6">
            Submit your first school or college project and we'll handle the
            rest — handwritten files, PDF conversion, or binding.
          </p>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            data-ocid="dashboard.empty_submit_button"
          >
            <Link to="/submit">
              <PlusCircle className="w-4 h-4" />
              Submit Your First Project
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3" data-ocid="dashboard.submissions_list">
          {sorted.map((submission, idx) => (
            <SubmissionCard
              key={`${submission.id.toString()}-${idx}`}
              submission={submission}
            />
          ))}
        </div>
      )}
    </div>
  );
}
