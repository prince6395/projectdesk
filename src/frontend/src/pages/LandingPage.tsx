import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useCharges } from "@/hooks/useSubmissions";
import { ProjectType } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  Layers,
  LogIn,
  School,
  Star,
} from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: School,
    title: "10th & 12th Projects",
    description:
      "Handwritten project files professionally prepared with neat handwriting, diagrams, and proper binding.",
    badge: "Handwritten",
  },
  {
    icon: GraduationCap,
    title: "Graduation Typed Projects",
    description:
      "Typed projects for B.Sc, M.Sc, B.Tech, BBA, MBA — PDF creation from MS Word or any format.",
    badge: "Typed",
  },
  {
    icon: Layers,
    title: "Professional Binding",
    description:
      "Hard binding, soft binding, and spiral binding options available for final year projects.",
    badge: "Binding",
  },
  {
    icon: Clock,
    title: "Track Your Status",
    description:
      "Log in to check real-time status — from submission to ready for pickup — all in one place.",
    badge: "Tracking",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Submit Your Details",
    desc: "Fill in your academic info, pick your project type, and submit the form online.",
  },
  {
    step: "02",
    title: "We Create Your Project",
    desc: "Our team professionally prepares your handwritten or typed project as requested.",
  },
  {
    step: "03",
    title: "Track Progress",
    desc: "Log in anytime to check your project status — submitted, in progress, or ready.",
  },
  {
    step: "04",
    title: "Pick Up Your Project",
    desc: "Once ready, collect your finished project. Binding options available on request.",
  },
];

function ProjectTypeLabel(type: ProjectType): string {
  switch (type) {
    case ProjectType.tenth_twelfth_handwritten:
      return "10th / 12th Handwritten";
    case ProjectType.graduation_pdf_only:
      return "Graduation PDF Only";
    case ProjectType.graduation_pdf_binding:
      return "Graduation PDF + Binding";
  }
}

export default function LandingPage() {
  const { isAuthenticated, isInitializing, isLoggingIn, login } = useAuth();
  const { data: charges, isLoading: chargesLoading } = useCharges();
  const navigate = useNavigate();

  const handleCTA = () => {
    if (isAuthenticated) {
      navigate({ to: "/submit" });
    } else {
      login();
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background"
      >
        {/* Subtle background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.75 0.15 190) 1px, transparent 1px), linear-gradient(90deg, oklch(0.75 0.15 190) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow blob */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide"
            >
              <Star className="w-3 h-3 mr-1.5 text-primary" />
              School &amp; College Project Service
            </Badge>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Your Projects, <span className="text-primary">Done Right.</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Professional handwritten &amp; typed projects for Class 10, 12, and
            all graduation courses. Submit your details, we'll handle the rest —
            from PDF creation to binding.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              size="lg"
              onClick={handleCTA}
              disabled={isInitializing || isLoggingIn}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base font-semibold shadow-elevated transition-smooth"
              data-ocid="hero.submit_button"
            >
              {isAuthenticated ? (
                <>
                  Submit Your Project
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  {isInitializing ? "Loading..." : "Sign In to Get Started"}
                </>
              )}
            </Button>
            {isAuthenticated && (
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: "/dashboard" })}
                className="border-border text-foreground hover:bg-muted/60 px-8 py-3 text-base"
                data-ocid="hero.dashboard_button"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                My Dashboard
              </Button>
            )}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-12 flex flex-wrap gap-6 justify-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            {[
              "10th & 12th",
              "B.Sc / M.Sc",
              "B.Tech / BBA / MBA",
              "PDF + Binding",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/30 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              What We Offer
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Complete project solutions tailored to every academic level and
              requirement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <Card className="bg-card border-border h-full hover:border-primary/40 transition-smooth shadow-card">
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h3 className="font-display font-semibold text-sm text-foreground leading-snug">
                            {f.title}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5 py-0 shrink-0"
                          >
                            {f.badge}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {f.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-background py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Simple 4-step process from submission to pickup.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center">
                  <span className="font-display text-xs font-bold text-primary">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-sm text-foreground">
                  {s.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-muted/30 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Transparent Pricing
            </h2>
            <p className="text-muted-foreground">
              No hidden charges. Know the cost upfront before submitting.
            </p>
          </motion.div>

          {chargesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[1, 2, 3].map((n) => (
                <Skeleton key={n} className="h-40 rounded-xl" />
              ))}
            </div>
          ) : charges && charges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {charges.map((charge, i) => (
                <motion.div
                  key={charge.projectType}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Card className="bg-card border-border hover:border-primary/40 transition-smooth shadow-card">
                    <CardContent className="p-6 flex flex-col gap-3">
                      <div className="flex items-start gap-2">
                        <FileText className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <h3 className="font-display font-semibold text-sm text-foreground leading-snug">
                          {ProjectTypeLabel(charge.projectType)}
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {charge.description}
                      </p>
                      <div className="mt-auto pt-2 border-t border-border">
                        <span className="font-display text-2xl font-bold text-primary">
                          ₹{Number(charge.amount).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {
                  type: "10th / 12th Handwritten",
                  desc: "Neatly handwritten project files with diagrams and cover page.",
                  price: "Contact us",
                },
                {
                  type: "Graduation PDF Only",
                  desc: "Typed project PDF from Word or any format, formatted professionally.",
                  price: "Contact us",
                },
                {
                  type: "Graduation PDF + Binding",
                  desc: "Full typed project with hard or soft binding for final year submission.",
                  price: "Contact us",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.type}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Card className="bg-card border-border shadow-card">
                    <CardContent className="p-6 flex flex-col gap-3">
                      <div className="flex items-start gap-2">
                        <FileText className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <h3 className="font-display font-semibold text-sm text-foreground leading-snug">
                          {item.type}
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                      <div className="mt-auto pt-2 border-t border-border">
                        <span className="font-display text-xl font-bold text-muted-foreground">
                          {item.price}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-background py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Ready to submit your project?
            </h2>
            <p className="text-muted-foreground mb-8">
              Sign in with Internet Identity — it's free, secure, and takes only
              a few seconds.
            </p>
            <Button
              size="lg"
              onClick={handleCTA}
              disabled={isInitializing || isLoggingIn}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-3 text-base font-semibold shadow-elevated transition-smooth"
              data-ocid="cta.submit_button"
            >
              {isAuthenticated ? (
                <>
                  Go to Submit Form
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  {isInitializing ? "Loading..." : "Sign In to Continue"}
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
