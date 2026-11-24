import type { ActionState, Task } from "@/types";
import styles from "../tasks.module.css";

type TaskFieldsProps = {
  task?: Task;
  state: ActionState;
};

export default function TaskFields({ task, state }: TaskFieldsProps) {
  const values = state.values ?? task;
  const errors = state.errors;

  return (
    <>
      <label className={styles.field}>
        Title
        <input name="title" defaultValue={values?.title} aria-invalid={!!errors?.title} />
        {errors?.title && <span className={styles.error} role="alert">{errors.title[0]}</span>}
      </label>
      <label className={styles.field}>
        Description
        <textarea name="description" rows={3} defaultValue={values?.description} aria-invalid={!!errors?.description} />
        {errors?.description && <span className={styles.error} role="alert">{errors.description[0]}</span>}
      </label>
      <label className={styles.field}>
        Priority
        <select
          key={values?.priority ?? "MEDIUM"}
          name="priority"
          defaultValue={values?.priority ?? "MEDIUM"}
          aria-invalid={!!errors?.priority}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        {errors?.priority && <span className={styles.error} role="alert">{errors.priority[0]}</span>}
      </label>
    </>
  );
}
