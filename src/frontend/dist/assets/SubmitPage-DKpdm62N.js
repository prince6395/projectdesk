import { r as reactExports, j as jsxRuntimeExports, i as Primitive, k as cn, a as useNavigate, l as useCharges, m as useSubmitProject, P as ProjectType, F as FileText, n as BookOpen, h as Layers, e as Card, f as CardContent, B as Button } from "./index-DbZ8Ffsi.js";
import { L as LoaderCircle, I as Input } from "./input-BCA93pwb.js";
import { I as IndianRupee } from "./indian-rupee-Qjx7aTn7.js";
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const INITIAL_FORM = {
  studentName: "",
  rollNumber: "",
  enrollmentNumber: "",
  teacherName: "",
  principalName: "",
  classCourse: ""
};
function getProjectType(mainType, gradSub) {
  if (mainType === "school") return ProjectType.tenth_twelfth_handwritten;
  if (mainType === "graduation" && gradSub === "pdf_only")
    return ProjectType.graduation_pdf_only;
  if (mainType === "graduation" && gradSub === "pdf_binding")
    return ProjectType.graduation_pdf_binding;
  return null;
}
function getChargeForType(charges, type) {
  if (!charges || !type) return void 0;
  return charges.find((c) => c.projectType === type);
}
function formatRupees(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}
function RadioCard({
  selected,
  onSelect,
  title,
  description,
  icon,
  charge,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: onSelect,
      "data-ocid": ocid,
      className: `w-full text-left p-4 rounded-xl border-2 transition-smooth flex items-start gap-3 ${selected ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${selected ? "bg-primary/20" : "bg-muted"}`,
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: `font-display font-semibold text-sm ${selected ? "text-primary" : "text-foreground"}`,
                children: title
              }
            ),
            charge && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3 h-3" }),
              charge
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 break-words", children: description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-4 h-4 rounded-full border-2 flex-shrink-0 mt-1 transition-smooth ${selected ? "border-primary bg-primary" : "border-muted-foreground/40"}`
          }
        )
      ]
    }
  );
}
function FormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: id, className: "text-sm font-medium text-foreground", children: [
      label,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-0.5", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        id,
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder,
        className: `bg-muted/40 border-input focus:border-primary ${error ? "border-destructive" : ""}`,
        "data-ocid": ocid
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", "data-ocid": `${ocid}_error`, children: error })
  ] });
}
function SubmitPage() {
  const navigate = useNavigate();
  const { data: charges } = useCharges();
  const submitProject = useSubmitProject();
  const [form, setForm] = reactExports.useState(INITIAL_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const [mainType, setMainType] = reactExports.useState(
    null
  );
  const [gradSub, setGradSub] = reactExports.useState(null);
  const [typeError, setTypeError] = reactExports.useState("");
  const projectType = getProjectType(mainType, gradSub);
  const selectedCharge = getChargeForType(charges, projectType);
  const schoolCharge = getChargeForType(
    charges,
    ProjectType.tenth_twelfth_handwritten
  );
  const pdfOnlyCharge = getChargeForType(
    charges,
    ProjectType.graduation_pdf_only
  );
  const pdfBindingCharge = getChargeForType(
    charges,
    ProjectType.graduation_pdf_binding
  );
  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: void 0 }));
  }
  function validate() {
    const newErrors = {};
    if (!form.studentName.trim())
      newErrors.studentName = "Full name is required";
    if (!form.rollNumber.trim())
      newErrors.rollNumber = "Roll number is required";
    if (!form.enrollmentNumber.trim())
      newErrors.enrollmentNumber = "Enrollment number is required";
    if (!form.teacherName.trim())
      newErrors.teacherName = "Teacher name is required";
    if (!form.principalName.trim())
      newErrors.principalName = "Principal name is required";
    if (!form.classCourse.trim())
      newErrors.classCourse = "Class / Course is required";
    setErrors(newErrors);
    if (!projectType) {
      setTypeError("Please select a project type");
      return false;
    }
    setTypeError("");
    return Object.keys(newErrors).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate() || !projectType) return;
    submitProject.mutate(
      {
        studentName: form.studentName.trim(),
        rollNumber: form.rollNumber.trim(),
        enrollmentNumber: form.enrollmentNumber.trim(),
        teacherName: form.teacherName.trim(),
        principalName: form.principalName.trim(),
        classCourse: form.classCourse.trim(),
        projectType
      },
      {
        onSuccess: () => {
          navigate({ to: "/dashboard", search: { submitted: "true" } });
        },
        onError: () => {
          setTypeError("Submission failed. Please try again.");
        }
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground", children: "Submit a Project" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1.5 text-sm", children: "Fill in your academic details and we'll take care of the rest." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", noValidate: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground mb-3", children: "Project Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            RadioCard,
            {
              selected: mainType === "school",
              onSelect: () => {
                setMainType("school");
                setGradSub(null);
                setTypeError("");
              },
              title: "10th / 12th — Handwritten Files",
              description: "For Class 10 and 12 students. We organise and present your handwritten project files professionally.",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary" }),
              charge: schoolCharge ? formatRupees(schoolCharge.amount).slice(1) : void 0,
              ocid: "submit.type_school_card"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            RadioCard,
            {
              selected: mainType === "graduation",
              onSelect: () => {
                setMainType("graduation");
                setTypeError("");
              },
              title: "Graduation / Final Year — Typed Project",
              description: "For B.Sc, M.Sc, B.Tech, BBA, MBA and other graduation courses. Choose a service below.",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-primary" }),
              ocid: "submit.type_graduation_card"
            }
          ),
          mainType === "graduation" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-4 border-l-2 border-primary/30 space-y-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RadioCard,
              {
                selected: gradSub === "pdf_only",
                onSelect: () => {
                  setGradSub("pdf_only");
                  setTypeError("");
                },
                title: "PDF Conversion Only",
                description: "We convert your MS Word or other document into a clean, formatted PDF.",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary" }),
                charge: pdfOnlyCharge ? formatRupees(pdfOnlyCharge.amount).slice(1) : void 0,
                ocid: "submit.type_pdf_only_card"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RadioCard,
              {
                selected: gradSub === "pdf_binding",
                onSelect: () => {
                  setGradSub("pdf_binding");
                  setTypeError("");
                },
                title: "PDF Conversion + Binding",
                description: "PDF conversion plus professional spiral or hard binding for your final submission.",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-5 h-5 text-primary" }),
                charge: pdfBindingCharge ? formatRupees(pdfBindingCharge.amount).slice(1) : void 0,
                ocid: "submit.type_pdf_binding_card"
              }
            )
          ] })
        ] }),
        typeError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive mt-2",
            "data-ocid": "submit.type_error",
            children: typeError
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground mb-3", children: "Academic Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card/60 border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              id: "studentName",
              label: "Full Name",
              value: form.studentName,
              onChange: (v) => setField("studentName", v),
              placeholder: "e.g. Priya Sharma",
              error: errors.studentName,
              ocid: "submit.student_name_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              id: "classCourse",
              label: "Class / Course",
              value: form.classCourse,
              onChange: (v) => setField("classCourse", v),
              placeholder: "e.g. B.Sc 3rd Year / Class 12",
              error: errors.classCourse,
              ocid: "submit.class_course_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              id: "rollNumber",
              label: "Roll Number",
              value: form.rollNumber,
              onChange: (v) => setField("rollNumber", v),
              placeholder: "e.g. 2301045",
              error: errors.rollNumber,
              ocid: "submit.roll_number_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              id: "enrollmentNumber",
              label: "Enrollment Number",
              value: form.enrollmentNumber,
              onChange: (v) => setField("enrollmentNumber", v),
              placeholder: "e.g. EN2023001",
              error: errors.enrollmentNumber,
              ocid: "submit.enrollment_number_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              id: "teacherName",
              label: "Teacher Name",
              value: form.teacherName,
              onChange: (v) => setField("teacherName", v),
              placeholder: "e.g. Dr. Ramesh Kumar",
              error: errors.teacherName,
              ocid: "submit.teacher_name_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              id: "principalName",
              label: "Principal Name",
              value: form.principalName,
              onChange: (v) => setField("principalName", v),
              placeholder: "e.g. Mr. Anil Verma",
              error: errors.principalName,
              ocid: "submit.principal_name_input"
            }
          )
        ] }) })
      ] }),
      selectedCharge && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Total Charge" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: selectedCharge.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-primary", children: formatRupees(selectedCharge.amount) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: submitProject.isPending,
          className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold gap-2",
          "data-ocid": "submit.submit_button",
          children: submitProject.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
            "Submitting..."
          ] }) : "Submit Project"
        }
      )
    ] })
  ] });
}
export {
  SubmitPage as default
};
