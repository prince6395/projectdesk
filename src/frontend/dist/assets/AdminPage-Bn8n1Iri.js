import { c as createLucideIcon, j as jsxRuntimeExports, k as cn, t as useAllSubmissions, r as reactExports, S as SubmissionStatus, v as ShieldCheck, h as Layers, q as Clock, g as Skeleton, w as useUpdateStatus, x as useQueryClient, B as Button, P as ProjectType, y as useUpdateAdminNotes } from "./index-arAf0Iae.js";
import { S as StatusBadge } from "./StatusBadge-C7S2jIdr.js";
import { I as Input, L as LoaderCircle } from "./input-BBG-6TfQ.js";
import { P as PackageCheck } from "./package-check-BAdwP0rK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const PROJECT_TYPE_LABELS = {
  [ProjectType.tenth_twelfth_handwritten]: "10th / 12th Handwritten",
  [ProjectType.graduation_pdf_only]: "Graduation — PDF Only",
  [ProjectType.graduation_pdf_binding]: "Graduation — PDF + Binding"
};
const STATUS_NEXT_ACTION = {
  [SubmissionStatus.submitted]: {
    label: "Mark In Progress",
    next: SubmissionStatus.in_progress,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" })
  },
  [SubmissionStatus.in_progress]: {
    label: "Mark Ready for Pickup",
    next: SubmissionStatus.ready_for_pickup,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCheck, { className: "w-3.5 h-3.5" })
  },
  [SubmissionStatus.ready_for_pickup]: {
    label: "Mark Completed",
    next: SubmissionStatus.completed,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" })
  },
  [SubmissionStatus.completed]: null
};
function formatTimestamp(ts) {
  const ms = Number(ts / 1000000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function formatTimestampFull(ts) {
  const ms = Number(ts / 1000000n);
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function DetailPanel({ submission, onClose }) {
  const [notes, setNotes] = reactExports.useState(submission.adminNotes);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const updateNotes = useUpdateAdminNotes();
  const handleSaveNotes = async () => {
    setIsSaving(true);
    try {
      await updateNotes.mutateAsync({ id: submission.id, notes });
    } finally {
      setIsSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "admin.detail_panel",
      className: "border-t border-border bg-card/50 px-6 py-5 animate-in fade-in slide-in-from-top-2 duration-200",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3", children: "Academic Information" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "space-y-2", children: [
              ["Student Name", submission.studentName],
              ["Roll Number", submission.rollNumber],
              ["Enrollment No.", submission.enrollmentNumber],
              ["Class / Course", submission.classCourse],
              ["Teacher Name", submission.teacherName],
              ["Principal Name", submission.principalName],
              ["Project Type", PROJECT_TYPE_LABELS[submission.projectType]]
            ].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("dt", { className: "text-muted-foreground min-w-[130px] shrink-0", children: [
                label,
                ":"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground font-medium break-words min-w-0", children: value })
            ] }, label)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3", children: "Status History" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "relative border-l border-border ml-2 space-y-3", children: submission.statusHistory.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "pl-4 relative",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-background ${i === submission.statusHistory.length - 1 ? "bg-primary" : "bg-muted-foreground"}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: entry.status, className: "self-start" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mt-0.5", children: formatTimestampFull(entry.timestamp) })
                  ] })
                ]
              },
              `${entry.status}-${entry.timestamp.toString()}`
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-5 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: `notes-${submission.id.toString()}`,
              className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2",
              children: "Admin Notes"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: `notes-${submission.id.toString()}`,
              "data-ocid": "admin.notes_textarea",
              value: notes,
              onChange: (e) => setNotes(e.target.value),
              placeholder: "Add internal notes about this submission…",
              className: "min-h-[80px] bg-background text-sm resize-y",
              rows: 3
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
                children: "Collapse ↑"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                "data-ocid": "admin.notes_save_button",
                onClick: handleSaveNotes,
                disabled: isSaving || notes === submission.adminNotes,
                className: "gap-1.5",
                children: [
                  isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
                  "Save Notes"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function SubmissionRow({
  submission,
  index,
  isExpanded,
  onToggle
}) {
  const updateStatus = useUpdateStatus();
  const queryClient = useQueryClient();
  const nextAction = STATUS_NEXT_ACTION[submission.currentStatus];
  const [isPending, setIsPending] = reactExports.useState(false);
  const handleStatusUpdate = async (e) => {
    e.stopPropagation();
    if (!nextAction) return;
    setIsPending(true);
    queryClient.setQueryData(
      ["allSubmissions"],
      (old) => (old == null ? void 0 : old.map(
        (s) => s.id === submission.id ? { ...s, currentStatus: nextAction.next } : s
      )) ?? []
    );
    try {
      await updateStatus.mutateAsync({
        id: submission.id,
        status: nextAction.next
      });
    } catch {
      queryClient.invalidateQueries({ queryKey: ["allSubmissions"] });
    } finally {
      setIsPending(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        "data-ocid": `admin.submission.item.${index}`,
        className: `border-b border-border transition-colors cursor-pointer hover:bg-muted/30 ${isExpanded ? "bg-muted/20" : ""}`,
        onClick: onToggle,
        onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && onToggle(),
        tabIndex: 0,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground leading-snug", children: submission.studentName }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "Roll: ",
              submission.rollNumber
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-foreground hidden sm:table-cell", children: submission.classCourse }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: PROJECT_TYPE_LABELS[submission.projectType] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell", children: formatTimestamp(submission.submittedAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: submission.currentStatus }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            nextAction && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                "data-ocid": `admin.status_action_button.${index}`,
                className: "gap-1.5 text-xs whitespace-nowrap",
                onClick: handleStatusUpdate,
                disabled: isPending,
                children: [
                  isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : nextAction.icon,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: nextAction.label })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "aria-label": isExpanded ? "Collapse details" : "Expand details",
                className: "p-1 rounded text-muted-foreground hover:text-foreground transition-colors",
                onClick: (e) => {
                  e.stopPropagation();
                  onToggle();
                },
                children: isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" })
              }
            )
          ] }) })
        ]
      }
    ),
    isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DetailPanel, { submission, onClose: onToggle }) }) })
  ] });
}
const FILTER_OPTIONS = [
  { key: "all", label: "All" },
  { key: SubmissionStatus.submitted, label: "Submitted" },
  { key: SubmissionStatus.in_progress, label: "In Progress" },
  { key: SubmissionStatus.ready_for_pickup, label: "Ready for Pickup" },
  { key: SubmissionStatus.completed, label: "Completed" }
];
function AdminPage() {
  const { data: submissions = [], isLoading } = useAllSubmissions();
  const [activeFilter, setActiveFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const counts = reactExports.useMemo(() => {
    const c = {
      all: submissions.length,
      [SubmissionStatus.submitted]: 0,
      [SubmissionStatus.in_progress]: 0,
      [SubmissionStatus.ready_for_pickup]: 0,
      [SubmissionStatus.completed]: 0
    };
    for (const s of submissions) {
      c[s.currentStatus] = (c[s.currentStatus] ?? 0) + 1;
    }
    return c;
  }, [submissions]);
  const filtered = reactExports.useMemo(() => {
    return submissions.filter((s) => {
      const matchesStatus = activeFilter === "all" || s.currentStatus === activeFilter;
      const matchesSearch = search.trim() === "" || s.studentName.toLowerCase().includes(search.toLowerCase()) || s.rollNumber.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [submissions, activeFilter, search]);
  const toggleExpand = (id) => {
    setExpandedId((prev) => prev === id ? null : id);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "admin.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "Admin Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Manage all student submissions" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { "data-ocid": "admin.total_count", children: [
          submissions.length,
          " total"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
        {
          label: "Submitted",
          status: SubmissionStatus.submitted,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4" }),
          color: "text-muted-foreground"
        },
        {
          label: "In Progress",
          status: SubmissionStatus.in_progress,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
          color: "text-primary"
        },
        {
          label: "Ready Pickup",
          status: SubmissionStatus.ready_for_pickup,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCheck, { className: "w-4 h-4" }),
          color: "[color:oklch(0.75_0.18_145)]"
        },
        {
          label: "Completed",
          status: SubmissionStatus.completed,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
          color: "[color:oklch(0.75_0.15_300)]"
        }
      ].map(({ label, status, icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": `admin.stat_card.${status}`,
          onClick: () => setActiveFilter(status),
          className: `bg-card border rounded-xl p-4 text-left transition-smooth hover:border-primary/50 ${activeFilter === status ? "border-primary shadow-sm" : "border-border"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${color} mb-1`, children: icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: isLoading ? "—" : counts[status] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: label })
          ]
        },
        status
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 flex-1", children: FILTER_OPTIONS.map(({ key, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": `admin.filter.${key}`,
            onClick: () => setActiveFilter(key),
            className: `px-3 py-1.5 rounded-full text-xs font-medium transition-smooth ${activeFilter === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`,
            children: [
              label,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `ml-0.5 ${activeFilter === key ? "opacity-80" : "opacity-60"}`,
                  children: [
                    "(",
                    isLoading ? "…" : counts[key],
                    ")"
                  ]
                }
              )
            ]
          },
          key
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-56", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "text",
              "data-ocid": "admin.search_input",
              placeholder: "Search by name or roll no…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-8 text-sm h-8 bg-background"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "admin.loading_state", className: "p-6 space-y-3", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, n)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "admin.empty_state",
          className: "flex flex-col items-center justify-center py-16 text-center px-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-6 h-6 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No submissions found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: search ? "Try a different name or roll number" : "No submissions match the selected filter" }),
            (activeFilter !== "all" || search) && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setActiveFilter("all");
                  setSearch("");
                },
                className: "mt-3 text-sm text-primary hover:underline",
                children: "Clear filters"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "table",
        {
          className: "w-full text-sm",
          "data-ocid": "admin.submissions_table",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Student" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell", children: "Class / Course" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell", children: "Project Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell", children: "Submitted" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((submission, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              SubmissionRow,
              {
                submission,
                index: i + 1,
                isExpanded: expandedId === submission.id,
                onToggle: () => toggleExpand(submission.id)
              },
              `${submission.id.toString()}-${submission.studentName}`
            )) })
          ]
        }
      ) }) })
    ] })
  ] });
}
export {
  AdminPage as default
};
