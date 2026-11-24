interface ButtonProps {
  title: string;
  action: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  title,
  action,
  disabled = false,
  type = "button",
}: ButtonProps) {
  return (
    <button type={type} onClick={action} disabled={disabled}>
      {title}
    </button>
  );
}
