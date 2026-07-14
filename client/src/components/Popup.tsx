import type { ReactNode } from "react";
import Button from "./Button";

interface PopupProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Popup({ open, onClose, children }: PopupProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-neutral-900">
        <div className="px-4 pt-5 pb-4 sm:p-6">
          {children}
        </div>

        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <Button type="button" onClick={onClose} className="w-full sm:w-auto px-3 py-2">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
