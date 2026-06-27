"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ProjectModal } from "@/components/project/ProjectModal";

type ProjectModalContextValue = {
  openProjectModal: () => void;
  closeProjectModal: () => void;
};

const ProjectModalContext = createContext<ProjectModalContextValue | null>(null);

export function ProjectModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openProjectModal = useCallback(() => setOpen(true), []);
  const closeProjectModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openProjectModal, closeProjectModal }),
    [openProjectModal, closeProjectModal],
  );

  return (
    <ProjectModalContext.Provider value={value}>
      {children}
      <ProjectModal open={open} onClose={closeProjectModal} />
    </ProjectModalContext.Provider>
  );
}

export function useProjectModal() {
  const ctx = useContext(ProjectModalContext);
  if (!ctx) {
    throw new Error("useProjectModal must be used within ProjectModalProvider");
  }
  return ctx;
}
