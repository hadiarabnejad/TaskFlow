import { motion } from "framer-motion";
import { Trash2, XCircle } from "lucide-react";

export default function DeleteModal({ confirm, cancel }) {
  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center 
        bg-black/40 backdrop-blur-sm
      "
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="
          w-[90%] max-w-sm rounded-2xl border p-6 text-center
          bg-white shadow-lg border-slate-200
          dark:bg-slate-900/70 dark:border-white/10
        "
      >
        {/* Title */}
        <p className="mb-6 text-lg font-semibold text-slate-800 dark:text-slate-200">
          Delete this task?
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">

          {/* Delete Button */}
          <button
            onClick={confirm}
            className="
              flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold
              bg-red-600 hover:bg-red-700 text-white
              shadow-md shadow-red-500/30 transition active:scale-[0.97]
            "
          >
            <Trash2 size={18} />
            Delete
          </button>

          {/* Cancel Button */}
          <button
            onClick={cancel}
            className="
              flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold
              bg-slate-200 hover:bg-slate-300 text-slate-800
              dark:bg-slate-700 dark:hover:bg-slate-600
              dark:text-slate-100 transition active:scale-[0.97]
            "
          >
            <XCircle size={18} />
            Cancel
          </button>

        </div>
      </motion.div>
    </div>
  );
}
