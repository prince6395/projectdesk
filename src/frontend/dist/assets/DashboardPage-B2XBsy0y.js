import { c as createLucideIcon, u as useMySubmissions, a as useNavigate, b as useSearch, r as reactExports, d as ue, S as SubmissionStatus, j as jsxRuntimeExports, B as Button, L as Link, C as CirclePlus, e as Card, f as CardContent, g as Skeleton, h as Layers, F as FileText, A as ArrowRight, P as ProjectType } from "./index-arAf0Iae.js";
import { S as StatusBadge } from "./StatusBadge-C7S2jIdr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode);
const PROJECT_TYPE_LABELS = {
  [ProjectType.tenth_twelfth_handwritten]: "10th / 12th — Handwritten",
  [ProjectType.graduation_pdf_only]: "Graduation — PDF Conversion",
  [ProjectType.graduation_pdf_binding]: "Graduation — PDF + Binding"
};
const PROJECT_TYPE_ICONS = {
  [ProjectType.tenth_twelfth_handwritten]: FileText,
  [ProjectType.graduation_pdf_only]: FileText,
  [ProjectType.graduation_pdf_binding]: Layers
};
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function SubmissionCard({ submission }) {
  const Icon = PROJECT_TYPE_ICONS[submission.projectType];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/submissions/$id",
      params: { id: submission.id.toString() },
      "data-ocid": `dashboard.submission_card.${submission.id.toString()}`,
      className: "block group",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border transition-smooth hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4 sm:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground truncate", children: submission.studentName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5 truncate", children: PROJECT_TYPE_LABELS[submission.projectType] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3.5 h-3.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(submission.submittedAt) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: submission.currentStatus }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-smooth", children: [
            "View ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
          ] })
        ] })
      ] }) }) })
    }
  );
}
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4 sm:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-lg flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-48" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-28" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24 rounded-full" })
  ] }) }) });
}
const STATUS_ORDER = [
  SubmissionStatus.submitted,
  SubmissionStatus.in_progress,
  SubmissionStatus.ready_for_pickup,
  SubmissionStatus.completed
];
function getStatusScore(status) {
  return STATUS_ORDER.indexOf(status);
}
function DashboardPage() {
  const { data: submissions, isLoading } = useMySubmissions();
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const toastShown = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (search.submitted === "true" && !toastShown.current) {
      toastShown.current = true;
      ue.success("Project submitted successfully!", {
        description: "We'll start working on it soon. Check back for updates.",
        duration: 5e3
      });
      navigate({ to: "/dashboard", replace: true });
    }
  }, [search.submitted, navigate]);
  const sorted = [...submissions ?? []].sort(
    (a, b) => getStatusScore(a.currentStatus) - getStatusScore(b.currentStatus) || Number(b.submittedAt - a.submittedAt)
  );
  const activeCount = (submissions ?? []).filter(
    (s) => s.currentStatus !== SubmissionStatus.completed
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground", children: "My Submissions" }),
        !isLoading && submissions && submissions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: activeCount > 0 ? `${activeCount} active project${activeCount !== 1 ? "s" : ""} in progress` : "All projects completed" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2 self-start sm:self-auto",
          "data-ocid": "dashboard.new_submission_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/submit", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" }),
            "New Submission"
          ] })
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "dashboard.loading_state", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, n)) }) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 text-center",
        "data-ocid": "dashboard.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted/60 border border-border flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "No submissions yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mb-6", children: "Submit your first school or college project and we'll handle the rest — handwritten files, PDF conversion, or binding." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2",
              "data-ocid": "dashboard.empty_submit_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/submit", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" }),
                "Submit Your First Project"
              ] })
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "dashboard.submissions_list", children: sorted.map((submission, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      SubmissionCard,
      {
        submission
      },
      `${submission.id.toString()}-${idx}`
    )) })
  ] });
}
export {
  DashboardPage as default
};
