"use client";

import Layout from "@/components/Layout";
import TimerDemo from "@/components/TimerDemo";
import ContactForm from "@/components/ContactForm";
import { TaskCard, TaskForm, useTasks } from "@/features/tasks";

export default function Home() {
  const { tasks, addTask, toggleTask } = useTasks();

  return (
    <Layout>
      <TimerDemo />
      <TaskForm onAddTask={addTask} />
      <div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggle={toggleTask} />
        ))}
      </div>
      <ContactForm />
    </Layout>
  );
}
