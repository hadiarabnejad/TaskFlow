import { CheckCircle, CircleDashed, ListFilter } from "lucide-react";
import { motion } from "framer-motion";

export default function FilterBar({ filter, setFilter, theme }) {
    const btnBase =
        "px-4 py-2 rounded-xl font-medium transition-all border active:scale-[0.97]";

    const commonLight = "bg-white/70 border-slate-200 text-slate-700 hover:bg-white";
    const commonDark = "bg-slate-900/40 border-white/10 text-slate-300 hover:bg-slate-900/60";

    const activeLight = "bg-indigo-600 text-white border-indigo-600 shadow";
    const activeDark = "bg-indigo-500 text-white border-indigo-500 shadow";

    const isDark = theme === "dark";

    const styles = {
        all: filter === "all" ? (isDark ? activeDark : activeLight) : isDark ? commonDark : commonLight,
        active: filter === "active" ? (isDark ? activeDark : activeLight) : isDark ? commonDark : commonLight,
        completed:
            filter === "completed"
                ? (isDark ? activeDark : activeLight)
                : isDark
                    ? commonDark
                    : commonLight,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={[
                "flex items-center gap-3 p-3 rounded-2xl mb-6",
                isDark
                    ? "bg-slate-900/50 border border-white/10"
                    : "bg-white/70 border border-slate-200",
            ].join(" ")}
        >
            <ListFilter size={18} className={isDark ? "text-slate-300" : "text-slate-600"} />

            <button onClick={() => setFilter("all")} className={`${btnBase} ${styles.all} cursor-pointer`}>
                All
            </button>

            <button onClick={() => setFilter("active")} className={`${btnBase} ${styles.active} cursor-pointer`}>
                <CircleDashed size={16} className="inline-block mr-1" />
                Active
            </button>

            <button
                onClick={() => setFilter("completed")}
                className={`${btnBase} ${styles.completed} cursor-pointer`}
            >
                <CheckCircle size={16} className="inline-block mr-1" />
                Completed
            </button>
        </motion.div>
    );
}
