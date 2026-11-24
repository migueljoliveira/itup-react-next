import type { Task, TaskInput } from "@/types";

// Keep the in-memory data across development hot reloads; it resets on server restart.
const globalForTasks: typeof globalThis & { tasks?: Task[] } = globalThis;
const tasks: Task[] = (globalForTasks.tasks ??= [
  {
    id: "1",
    title: "Prepare the sprint demo",
    description: "Slides and a short live demo of the dashboard",
    priority: "HIGH",
    completed: false,
    attachment: null,
    createdAt: new Date("2026-11-10T09:00:00"),
  },
  {
    id: "2",
    title: "Review pull requests",
    description: "",
    priority: "MEDIUM",
    completed: true,
    attachment: null,
    createdAt: new Date("2026-11-11T14:30:00"),
  },
]);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const db = {
  async findAll(): Promise<Task[]> {
    await delay(300);
    return [...tasks].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },
  async findById(id: string): Promise<Task | undefined> {
    await delay(100);
    return tasks.find((task) => task.id === id);
  },
  async create(data: TaskInput): Promise<Task> {
    await delay(300);
    const task: Task = {
      id: crypto.randomUUID(),
      ...data,
      completed: false,
      attachment: null,
      createdAt: new Date(),
    };
    tasks.push(task);
    return task;
  },
  async update(id: string, data: Partial<Omit<Task, "id" | "createdAt">>): Promise<Task | undefined> {
    await delay(300);
    const task = tasks.find((t) => t.id === id);
    if (task) Object.assign(task, data);
    return task;
  },
  async delete(id: string): Promise<boolean> {
    await delay(300);
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },
};
