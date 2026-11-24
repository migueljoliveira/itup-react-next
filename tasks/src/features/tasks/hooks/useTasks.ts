import { useLocalStorage } from "@/hooks/useLocalStorage";
import { generateId } from "@/lib/generateId";
import { Task } from "@/types/task";

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  function addTask(title: string) {
    const newTask: Task = {
      id: generateId(),
      title,
      completed: false,
      createdAt: new Date(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function toggleTask(id: string) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return { tasks, addTask, toggleTask };
}
