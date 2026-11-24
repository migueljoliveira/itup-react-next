interface ModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  action: () => void;
}

export default function Modal({ title, children, isOpen, action }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div role="dialog" aria-modal="true">
      <div>
        <h2>{title}</h2>
        <button type="button" aria-label="Close" onClick={action}>
          ×
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}
