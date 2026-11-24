"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/tasks";
import type { ActionState } from "@/types";

const taskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100, "Title must be 100 characters or less"),
  description: z.string().trim().max(500, "Description must be 500 characters or less"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"], "Choose a priority"),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function parseTask(formData: FormData) {
  const values = {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    priority: String(formData.get("priority") ?? ""),
  };
  return { values, result: taskSchema.safeParse(values) };
}

export async function createTask(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const { values, result } = parseTask(formData);
  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors, values };
  }
  await db.create(result.data);
  revalidatePath("/tasks");
  return { success: true, message: "Task created" };
}

export async function updateTask(taskId: string, _prevState: ActionState, formData: FormData): Promise<ActionState> {
  const { values, result } = parseTask(formData);
  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors, values };
  }
  const task = await db.update(taskId, result.data);
  if (!task) return { message: "Task not found" };

  revalidatePath("/tasks");
  return { success: true, message: "Task updated" };
}

export async function deleteTask(taskId: string): Promise<ActionState> {
  const deleted = await db.delete(taskId);
  if (!deleted) return { message: "Task not found" };

  revalidatePath("/tasks");
  return { success: true };
}

export async function toggleTaskComplete(taskId: string): Promise<ActionState> {
  const task = await db.findById(taskId);
  if (!task) return { message: "Task not found" };

  const updated = await db.update(taskId, { completed: !task.completed });
  if (!updated) return { message: "Task not found" };

  revalidatePath("/tasks");
  return { success: true };
}

export async function uploadTaskAttachment(
  taskId: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const file = formData.get("attachment");
  if (!(file instanceof File) || file.size === 0) {
    return { message: "Choose a file first" };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { message: "The file must be 5 MB or smaller" };
  }

  // This exercise saves only the filename, not the file contents.
  const task = await db.update(taskId, { attachment: file.name });
  if (!task) return { message: "Task not found" };

  revalidatePath("/tasks");
  return { success: true, message: `Attached ${file.name}` };
}
