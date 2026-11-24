export type Priority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  attachment: string | null;
  createdAt: Date;
}

export interface TaskInput {
  title: string;
  description: string;
  priority: Priority;
}

export interface ActionState {
  success?: boolean;
  message?: string;
  errors?: {
    title?: string[];
    description?: string[];
    priority?: string[];
  };
  values?: Partial<Record<keyof TaskInput, string>>;
}
