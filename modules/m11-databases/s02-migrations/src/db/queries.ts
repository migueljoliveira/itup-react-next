import "server-only";
import { DrizzleQueryError, asc, desc, eq, not } from "drizzle-orm";
import { db } from "./index";
import { tasks, users, type NewTask } from "./schema";

export function listUsers() {
  return db.select().from(users).orderBy(asc(users.name));
}

export function listTasks() {
  return db
    .select({
      id: tasks.id,
      title: tasks.title,
      done: tasks.done,
      owner: users.name,
    })
    .from(tasks)
    .innerJoin(users, eq(tasks.userId, users.id))
    .orderBy(desc(tasks.id));
}

function isUniqueViolation(error: unknown) {
  if (!(error instanceof DrizzleQueryError)) return false;
  const cause = error.cause;
  return typeof cause === "object" && cause !== null && "code" in cause && cause.code === "23505";
}

export async function createUser(name: string, email: string) {
  try {
    const [user] = await db.insert(users).values({ name, email }).returning();
    return { ok: true as const, user };
  } catch (error) {
    if (isUniqueViolation(error)) {
      return { ok: false as const, error: "That email is taken" };
    }
    throw error;
  }
}

export async function createTask(task: NewTask) {
  const [created] = await db.insert(tasks).values(task).returning();
  return created;
}

export async function toggleTask(id: number) {
  await db.update(tasks).set({ done: not(tasks.done) }).where(eq(tasks.id, id));
}

export async function deleteTask(id: number) {
  await db.delete(tasks).where(eq(tasks.id, id));
}
