import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Skeleton } from "@/components/ui/skeleton";
import LandingPage from "@/pages/LandingPage";
import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";

const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const SubmitPage = lazy(() => import("@/pages/SubmitPage"));
const SubmissionDetailPage = lazy(() => import("@/pages/SubmissionDetailPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

function PageFallback() {
  return (
    <div className="flex flex-col gap-4 p-8 max-w-3xl mx-auto">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageFallback />}>
        <DashboardPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const submitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/submit",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageFallback />}>
        <SubmitPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const submissionDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/submissions/$id",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageFallback />}>
        <SubmissionDetailPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <ProtectedRoute requireAdmin>
      <Suspense fallback={<PageFallback />}>
        <AdminPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  submitRoute,
  submissionDetailRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </InternetIdentityProvider>
    </QueryClientProvider>
  );
}
