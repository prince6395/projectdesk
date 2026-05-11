import { j as jsxRuntimeExports, S as SubmissionStatus } from "./index-arAf0Iae.js";
const statusConfig = {
  [SubmissionStatus.submitted]: {
    label: "Submitted",
    className: "status-badge status-submitted"
  },
  [SubmissionStatus.in_progress]: {
    label: "In Progress",
    className: "status-badge status-progress"
  },
  [SubmissionStatus.ready_for_pickup]: {
    label: "Ready for Pickup",
    className: "status-badge status-ready"
  },
  [SubmissionStatus.completed]: {
    label: "Completed",
    className: "status-badge status-completed"
  }
};
function StatusBadge({ status, className = "" }) {
  const config = statusConfig[status] ?? {
    label: status,
    className: "status-badge status-submitted"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `${config.className} ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-current opacity-80" }),
    config.label
  ] });
}
export {
  StatusBadge as S
};
