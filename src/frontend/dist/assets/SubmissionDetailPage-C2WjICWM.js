import { c as createLucideIcon, o as useParams, p as useMySubmission, l as useCharges, j as jsxRuntimeExports, g as Skeleton, B as Button, L as Link, h as Layers, n as BookOpen, F as FileText, e as Card, f as CardContent, S as SubmissionStatus, q as Clock, s as CircleCheck, P as ProjectType } from "./index-DbZ8Ffsi.js";
import { S as StatusBadge } from "./StatusBadge-DQA1yAWm.js";
import { I as IndianRupee } from "./indian-rupee-Qjx7aTn7.js";
import { P as PackageCheck } from "./package-check-Dkn5U5Pb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
const PROJECT_TYPE_LABELS = {
  [ProjectType.tenth_twelfth_handwritten]: "10th / 12th — Handwritten",
  [ProjectType.graduation_pdf_only]: "Graduation — PDF Conversion",
  [ProjectType.graduation_pdf_binding]: "Graduation — PDF + Binding"
};
const PROJECT_TYPE_ICONS = {
  [ProjectType.tenth_twelfth_handwritten]: FileText,
  [ProjectType.graduation_pdf_only]: BookOpen,
  [ProjectType.graduation_pdf_binding]: Layers
};
const STATUS_TIMELINE = [
  { status: SubmissionStatus.submitted, label: "Submitted", icon: Circle },
  { status: SubmissionStatus.in_progress, label: "In Progress", icon: Clock },
  {
    status: SubmissionStatus.ready_for_pickup,
    label: "Ready for Pickup",
    icon: PackageCheck
  },
  {
    status: SubmissionStatus.completed,
    label: "Completed",
    icon: CircleCheck
  }
];
const STATUS_ORDER_MAP = {
  [SubmissionStatus.submitted]: 0,
  [SubmissionStatus.in_progress]: 1,
  [SubmissionStatus.ready_for_pickup]: 2,
  [SubmissionStatus.completed]: 3
};
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function formatDateTime(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function formatRupees(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}
function InfoRow({ label, value, icon }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 py-3 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mt-0.5 break-words", children: value })
    ] })
  ] });
}
function TimelineStep({
  step,
  currentStatusIdx,
  historyEntry,
  isLast
}) {
  const stepIdx = STATUS_ORDER_MAP[step.status];
  const isDone = stepIdx < currentStatusIdx;
  const isCurrent = stepIdx === currentStatusIdx;
  const isFuture = stepIdx > currentStatusIdx;
  const Icon = step.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-smooth ${isDone ? "bg-primary/20 border-primary" : isCurrent ? "bg-primary border-primary shadow-lg shadow-primary/30" : "bg-muted border-border"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Icon,
            {
              className: `w-4 h-4 ${isDone ? "text-primary" : isCurrent ? "text-primary-foreground" : "text-muted-foreground"}`
            }
          )
        }
      ),
      !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-0.5 flex-1 mt-1 ${isDone ? "bg-primary/40" : "bg-border"}`,
          style: { minHeight: "28px" }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-6 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: `text-sm font-semibold ${isFuture ? "text-muted-foreground" : "text-foreground"}`,
          children: step.label
        }
      ),
      historyEntry ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatDateTime(historyEntry.timestamp) }) : isFuture ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/50 mt-0.5", children: "Pending" }) : null
    ] })
  ] });
}
function SubmissionDetailPage() {
  const { id } = useParams({ strict: false });
  const submissionId = BigInt(id ?? "0");
  const { data: submission, isLoading } = useMySubmission(submissionId);
  const { data: charges } = useCharges();
  const charge = charges == null ? void 0 : charges.find(
    (c) => c.projectType === (submission == null ? void 0 : submission.projectType)
  );
  const currentStatusIdx = submission ? STATUS_ORDER_MAP[submission.currentStatus] : 0;
  const historyMap = /* @__PURE__ */ new Map();
  for (const entry of (submission == null ? void 0 : submission.statusHistory) ?? []) {
    historyMap.set(entry.status, entry);
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-5",
        "data-ocid": "detail.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-xl" })
        ]
      }
    );
  }
  if (!submission) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center",
        "data-ocid": "detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Submission not found." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-1.5" }),
            " Back to Dashboard"
          ] }) })
        ]
      }
    );
  }
  const TypeIcon = PROJECT_TYPE_ICONS[submission.projectType];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        asChild: true,
        variant: "ghost",
        size: "sm",
        className: "-ml-2 text-muted-foreground hover:text-foreground",
        "data-ocid": "detail.back_button",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-1.5" }),
          " Back to Dashboard"
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", "data-ocid": "detail.header_card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 sm:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypeIcon, { className: "w-6 h-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: submission.studentName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: submission.currentStatus })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: PROJECT_TYPE_LABELS[submission.projectType] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "Submitted on ",
            formatDate(submission.submittedAt)
          ] })
        ] })
      ] }),
      charge && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-border flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-4 h-4" }),
          "Service Charge"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-primary", children: formatRupees(charge.amount) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", "data-ocid": "detail.academic_card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 sm:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground mb-2", children: "Academic Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoRow,
        {
          label: "Class / Course",
          value: submission.classCourse,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-muted-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoRow,
        {
          label: "Roll Number",
          value: submission.rollNumber,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-muted-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoRow,
        {
          label: "Enrollment Number",
          value: submission.enrollmentNumber,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-muted-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoRow,
        {
          label: "Teacher Name",
          value: submission.teacherName,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-muted-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoRow,
        {
          label: "Principal Name",
          value: submission.principalName,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-muted-foreground" })
        }
      )
    ] }) }),
    submission.adminNotes && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "bg-primary/5 border-primary/20",
        "data-ocid": "detail.admin_notes_card",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-primary mb-1.5", children: "Note from Team" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: submission.adminNotes })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", "data-ocid": "detail.timeline_card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 sm:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground mb-5", children: "Status Timeline" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: STATUS_TIMELINE.map((step, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        TimelineStep,
        {
          step,
          currentStatusIdx,
          historyEntry: historyMap.get(step.status),
          isLast: idx === STATUS_TIMELINE.length - 1
        },
        step.status
      )) })
    ] }) })
  ] });
}
export {
  SubmissionDetailPage as default
};
