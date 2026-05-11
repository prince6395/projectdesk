import { createActor } from "@/backend";
import { UserRole } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
  } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogin = () => {
    if (!isAuthenticated) {
      login();
    }
  };

  const handleLogout = () => {
    if (isAuthenticated) {
      clear();
      queryClient.clear();
    }
  };

  const principalStr = identity?.getPrincipal().toString();

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    principalStr,
    login: handleLogin,
    logout: handleLogout,
  };
}

export function useCallerRole() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();

  return useQuery<UserRole>({
    queryKey: ["callerRole"],
    queryFn: async () => {
      if (!actor) return UserRole.guest;
      return actor.getCallerUserRole() as Promise<UserRole>;
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: 60_000,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();

  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: 60_000,
  });
}
