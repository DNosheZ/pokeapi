"use client";
export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-xl shadow-xl w-full sm:w-[540px] mx-2 p-6">
        {children}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="text-[var(--white)] bg-[var(--grey-1)] hover:bg-[var(--grey-1)] active:bg-[var(--grey-3)]
                       focus:ring-4 focus:ring-[color:var(--grey-2)]/40
                       font-medium rounded-lg text-sm px-4 py-2 shadow-[0_2px_4px_0_var(--grey-3)]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
