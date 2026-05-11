import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCharges, useSubmitProject } from "@/hooks/useSubmissions";
import type { Charge } from "@/types";
import { ProjectType } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, FileText, IndianRupee, Layers, Loader2 } from "lucide-react";
import { useState } from "react";

type GradSubType = "pdf_only" | "pdf_binding";

interface FormState {
  studentName: string;
  rollNumber: string;
  enrollmentNumber: string;
  teacherName: string;
  principalName: string;
  classCourse: string;
}

const INITIAL_FORM: FormState = {
  studentName: "",
  rollNumber: "",
  enrollmentNumber: "",
  teacherName: "",
  principalName: "",
  classCourse: "",
};

function getProjectType(
  mainType: "school" | "graduation" | null,
  gradSub: GradSubType | null,
): ProjectType | null {
  if (mainType === "school") return ProjectType.tenth_twelfth_handwritten;
  if (mainType === "graduation" && gradSub === "pdf_only")
    return ProjectType.graduation_pdf_only;
  if (mainType === "graduation" && gradSub === "pdf_binding")
    return ProjectType.graduation_pdf_binding;
  return null;
}

function getChargeForType(
  charges: Charge[] | undefined,
  type: ProjectType | null,
): Charge | undefined {
  if (!charges || !type) return undefined;
  return charges.find((c) => c.projectType === type);
}

function formatRupees(amount: bigint): string {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

interface RadioCardProps {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
  charge?: string;
  ocid: string;
}

function RadioCard({
  selected,
  onSelect,
  title,
  description,
  icon,
  charge,
  ocid,
}: RadioCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      data-ocid={ocid}
      className={`w-full text-left p-4 rounded-xl border-2 transition-smooth flex items-start gap-3 ${
        selected
          ? "border-primary bg-primary/10"
          : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
          selected ? "bg-primary/20" : "bg-muted"
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p
            className={`font-display font-semibold text-sm ${
              selected ? "text-primary" : "text-foreground"
            }`}
          >
            {title}
          </p>
          {charge && (
            <span className="flex items-center gap-0.5 text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              <IndianRupee className="w-3 h-3" />
              {charge}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 break-words">
          {description}
        </p>
      </div>
      <div
        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-1 transition-smooth ${
          selected ? "border-primary bg-primary" : "border-muted-foreground/40"
        }`}
      />
    </button>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
  ocid: string;
}

function FormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  ocid,
}: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        <span className="text-destructive ml-0.5">*</span>
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`bg-muted/40 border-input focus:border-primary ${
          error ? "border-destructive" : ""
        }`}
        data-ocid={ocid}
      />
      {error && (
        <p className="text-xs text-destructive" data-ocid={`${ocid}_error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function SubmitPage() {
  const navigate = useNavigate();
  const { data: charges } = useCharges();
  const submitProject = useSubmitProject();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [mainType, setMainType] = useState<"school" | "graduation" | null>(
    null,
  );
  const [gradSub, setGradSub] = useState<GradSubType | null>(null);
  const [typeError, setTypeError] = useState("");

  const projectType = getProjectType(mainType, gradSub);
  const selectedCharge = getChargeForType(charges, projectType);

  const schoolCharge = getChargeForType(
    charges,
    ProjectType.tenth_twelfth_handwritten,
  );
  const pdfOnlyCharge = getChargeForType(
    charges,
    ProjectType.graduation_pdf_only,
  );
  const pdfBindingCharge = getChargeForType(
    charges,
    ProjectType.graduation_pdf_binding,
  );

  function setField(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const newErrors: Partial<FormState> = {};
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

  async function handleSubmit(e: React.FormEvent) {
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
        projectType,
      },
      {
        onSuccess: () => {
          navigate({ to: "/dashboard", search: { submitted: "true" } });
        },
        onError: () => {
          setTypeError("Submission failed. Please try again.");
        },
      },
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
          Submit a Project
        </h1>
        <p className="text-muted-foreground mt-1.5 text-sm">
          Fill in your academic details and we'll take care of the rest.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        {/* Project Type */}
        <section>
          <h2 className="font-display font-semibold text-base text-foreground mb-3">
            Project Type
          </h2>
          <div className="space-y-3">
            <RadioCard
              selected={mainType === "school"}
              onSelect={() => {
                setMainType("school");
                setGradSub(null);
                setTypeError("");
              }}
              title="10th / 12th — Handwritten Files"
              description="For Class 10 and 12 students. We organise and present your handwritten project files professionally."
              icon={<FileText className="w-5 h-5 text-primary" />}
              charge={
                schoolCharge
                  ? formatRupees(schoolCharge.amount).slice(1)
                  : undefined
              }
              ocid="submit.type_school_card"
            />
            <RadioCard
              selected={mainType === "graduation"}
              onSelect={() => {
                setMainType("graduation");
                setTypeError("");
              }}
              title="Graduation / Final Year — Typed Project"
              description="For B.Sc, M.Sc, B.Tech, BBA, MBA and other graduation courses. Choose a service below."
              icon={<BookOpen className="w-5 h-5 text-primary" />}
              ocid="submit.type_graduation_card"
            />

            {mainType === "graduation" && (
              <div className="pl-4 border-l-2 border-primary/30 space-y-2 mt-1">
                <RadioCard
                  selected={gradSub === "pdf_only"}
                  onSelect={() => {
                    setGradSub("pdf_only");
                    setTypeError("");
                  }}
                  title="PDF Conversion Only"
                  description="We convert your MS Word or other document into a clean, formatted PDF."
                  icon={<FileText className="w-5 h-5 text-primary" />}
                  charge={
                    pdfOnlyCharge
                      ? formatRupees(pdfOnlyCharge.amount).slice(1)
                      : undefined
                  }
                  ocid="submit.type_pdf_only_card"
                />
                <RadioCard
                  selected={gradSub === "pdf_binding"}
                  onSelect={() => {
                    setGradSub("pdf_binding");
                    setTypeError("");
                  }}
                  title="PDF Conversion + Binding"
                  description="PDF conversion plus professional spiral or hard binding for your final submission."
                  icon={<Layers className="w-5 h-5 text-primary" />}
                  charge={
                    pdfBindingCharge
                      ? formatRupees(pdfBindingCharge.amount).slice(1)
                      : undefined
                  }
                  ocid="submit.type_pdf_binding_card"
                />
              </div>
            )}
          </div>
          {typeError && (
            <p
              className="text-xs text-destructive mt-2"
              data-ocid="submit.type_error"
            >
              {typeError}
            </p>
          )}
        </section>

        {/* Academic Info */}
        <section>
          <h2 className="font-display font-semibold text-base text-foreground mb-3">
            Academic Information
          </h2>
          <Card className="bg-card/60 border-border">
            <CardContent className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                id="studentName"
                label="Full Name"
                value={form.studentName}
                onChange={(v) => setField("studentName", v)}
                placeholder="e.g. Priya Sharma"
                error={errors.studentName}
                ocid="submit.student_name_input"
              />
              <FormField
                id="classCourse"
                label="Class / Course"
                value={form.classCourse}
                onChange={(v) => setField("classCourse", v)}
                placeholder="e.g. B.Sc 3rd Year / Class 12"
                error={errors.classCourse}
                ocid="submit.class_course_input"
              />
              <FormField
                id="rollNumber"
                label="Roll Number"
                value={form.rollNumber}
                onChange={(v) => setField("rollNumber", v)}
                placeholder="e.g. 2301045"
                error={errors.rollNumber}
                ocid="submit.roll_number_input"
              />
              <FormField
                id="enrollmentNumber"
                label="Enrollment Number"
                value={form.enrollmentNumber}
                onChange={(v) => setField("enrollmentNumber", v)}
                placeholder="e.g. EN2023001"
                error={errors.enrollmentNumber}
                ocid="submit.enrollment_number_input"
              />
              <FormField
                id="teacherName"
                label="Teacher Name"
                value={form.teacherName}
                onChange={(v) => setField("teacherName", v)}
                placeholder="e.g. Dr. Ramesh Kumar"
                error={errors.teacherName}
                ocid="submit.teacher_name_input"
              />
              <FormField
                id="principalName"
                label="Principal Name"
                value={form.principalName}
                onChange={(v) => setField("principalName", v)}
                placeholder="e.g. Mr. Anil Verma"
                error={errors.principalName}
                ocid="submit.principal_name_input"
              />
            </CardContent>
          </Card>
        </section>

        {/* Charge Summary */}
        {selectedCharge && (
          <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div>
              <p className="text-sm font-medium text-foreground">
                Total Charge
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {selectedCharge.description}
              </p>
            </div>
            <p className="font-display text-2xl font-bold text-primary">
              {formatRupees(selectedCharge.amount)}
            </p>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={submitProject.isPending}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold gap-2"
          data-ocid="submit.submit_button"
        >
          {submitProject.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Project"
          )}
        </Button>
      </form>
    </div>
  );
}
