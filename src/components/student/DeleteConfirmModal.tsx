import React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  studentName: string;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  studentName,
  loading,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#21152B]/60 px-4 py-6 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        className="w-full max-w-md rounded-2xl border border-[#E9E2D9] bg-[#FFFDF9] p-6 shadow-2xl sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <AlertTriangle size={25} />
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            aria-label="Close confirmation modal"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-[#6F6678] transition hover:bg-[#F7F4EF] hover:text-[#21152B] disabled:cursor-not-allowed"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <h2
          id="delete-modal-title"
          className="mt-5 text-xl font-bold text-[#21152B]"
        >
          Delete Student?
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#6F6678]">
          Are you sure you want to delete{" "}
          <span className="font-bold text-[#21152B]">{studentName}</span>? This
          action cannot be undone.
        </p>

        {/* Modal Actions */}
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-[#E9E2D9] px-5 py-3 text-sm font-semibold text-[#21152B] transition hover:bg-[#F7F4EF] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 size={16} />
            {loading ? "Deleting..." : "Delete Student"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
