import { createActor } from "@/backend";
import type {
  Charge,
  SubmissionId,
  SubmissionPublic,
  SubmitRequest,
} from "@/types";
import { SubmissionStatus } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useMySubmissions() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();

  return useQuery<SubmissionPublic[]>({
    queryKey: ["mySubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMySubmissions();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

export function useMySubmission(id: SubmissionId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();

  return useQuery<SubmissionPublic | null>({
    queryKey: ["mySubmission", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getMySubmission(id);
    },
    enabled: !!actor && !isFetching && isAuthenticated && id !== undefined,
  });
}

export function useAllSubmissions() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();

  return useQuery<SubmissionPublic[]>({
    queryKey: ["allSubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSubmissions();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

export function useSubmitProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<SubmissionId, Error, SubmitRequest>({
    mutationFn: async (req: SubmitRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitProject(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mySubmissions"] });
    },
  });
}

export function useUpdateStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { id: SubmissionId; status: SubmissionStatus }
  >({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSubmissionStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allSubmissions"] });
      queryClient.invalidateQueries({ queryKey: ["mySubmissions"] });
    },
  });
}

export function useUpdateAdminNotes() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: SubmissionId; notes: string }>({
    mutationFn: async ({ id, notes }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateAdminNotes(id, notes);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allSubmissions"] });
    },
  });
}

export function useCharges() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Charge[]>({
    queryKey: ["charges"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCharges();
    },
    enabled: !!actor && !isFetching,
    staleTime: 300_000,
  });
}

export { SubmissionStatus };
