import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useAuth";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BookOpen,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  PlusCircle,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    authRequired: true,
  },
  {
    label: "Submit Project",
    href: "/submit",
    icon: PlusCircle,
    authRequired: true,
  },
];

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, isInitializing, isLoggingIn, login, logout } =
    useAuth();
  const { data: isAdmin } = useIsAdmin();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleLinks = NAV_LINKS.filter(
    (l) => !l.authRequired || isAuthenticated,
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              data-ocid="nav.logo_link"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center transition-smooth group-hover:bg-primary/30">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                Project<span className="text-primary">Desk</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {visibleLinks.map((link) => {
                const isActive = location.pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                      isActive
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                    data-ocid={`nav.${link.label.toLowerCase().replace(/ /g, "_")}_link`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    location.pathname === "/admin"
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                  data-ocid="nav.admin_link"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Admin
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 ml-0.5"
                  >
                    Admin
                  </Badge>
                </Link>
              )}
            </nav>

            {/* Auth button desktop */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-muted-foreground hover:text-foreground"
                  data-ocid="nav.logout_button"
                >
                  <LogOut className="w-4 h-4 mr-1.5" />
                  Sign Out
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={login}
                  disabled={isInitializing || isLoggingIn}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  data-ocid="nav.login_button"
                >
                  <LogIn className="w-4 h-4 mr-1.5" />
                  {isInitializing
                    ? "Loading..."
                    : isLoggingIn
                      ? "Signing in..."
                      : "Sign In"}
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              data-ocid="nav.mobile_menu_button"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card animate-slide-up">
            <div className="px-4 py-3 flex flex-col gap-1">
              {visibleLinks.map((link) => {
                const isActive = location.pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-smooth ${
                      isActive
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                    data-ocid={`nav.mobile_${link.label.toLowerCase().replace(/ /g, "_")}_link`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth"
                  data-ocid="nav.mobile_admin_link"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Admin Panel
                </Link>
              )}
              <Separator className="my-2" />
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth w-full text-left"
                  data-ocid="nav.mobile_logout_button"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    login();
                    setMobileOpen(false);
                  }}
                  disabled={isInitializing || isLoggingIn}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium bg-primary/15 text-primary hover:bg-primary/25 transition-smooth w-full text-left disabled:opacity-50"
                  data-ocid="nav.mobile_login_button"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In with Internet Identity
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
                <BookOpen className="w-3 h-3 text-primary" />
              </div>
              <span className="font-display font-semibold text-sm text-foreground">
                ProjectDesk
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
            <div className="text-xs text-muted-foreground">
              School &amp; College Projects Made Easy
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
