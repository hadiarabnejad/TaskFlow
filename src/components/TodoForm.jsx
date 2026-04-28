import { useState, useEffect } from "react";
import { Plus, Save, X } from "lucide-react";

export default function TodoForm({ onSubmit, editingTodo, cancelEdit }) {
    const [text, setText] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [category, setCategory] = useState("General");
    const [due, setDue] = useState("");

    useEffect(() => {
        if (editingTodo) {
            setText(editingTodo.text ?? "");
            setPriority(editingTodo.priority ?? "Medium");
            setCategory(editingTodo.category ?? "General");
            setDue(editingTodo.due ?? "");
        } else {
            setText("");
            setPriority("Medium");
            setCategory("General");
            setDue("");
        }
    }, [editingTodo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        onSubmit({
            text,
            priority,
            category,
            due,
            id: editingTodo?.id,
        });

        setText("");
        setPriority("Medium");
        setCategory("General");
        setDue("");

        if (editingTodo) cancelEdit();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="
      mb-8 rounded-2xl border p-5 sm:p-6 backdrop-blur
      bg-white shadow-sm border-slate-200
      dark:bg-slate-900/60 dark:border-white/10
    "
        >
            {/* Task Input */}
            <div className="flex gap-2 mb-4">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={
                        editingTodo
                            ? "Update task..."
                            : "What needs to be done? (Press Enter)"
                    }
                    className="
          flex-1 rounded-xl px-3 py-2 text-base font-medium outline-none transition
          bg-white text-slate-800 placeholder:text-slate-400
          border border-slate-200
          focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400
          dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500
          dark:border-white/10
        "
                    autoFocus
                />

                {editingTodo && (
                    <button
                        type="button"
                        onClick={cancelEdit}
                        className="
            p-2 rounded-xl transition
            text-slate-500 hover:text-slate-700
            dark:text-slate-400 dark:hover:text-slate-200
          "
                        title="Cancel edit"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Options */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">

                    {/* Priority */}
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="
            px-3 py-2 rounded-xl text-sm transition
            bg-white text-slate-700 border border-slate-200
            focus:ring-2 focus:ring-indigo-500/30
            dark:bg-slate-800 dark:text-slate-100 dark:border-white/10
          "
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>

                    {/* Category */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="
            px-3 py-2 rounded-xl text-sm transition
            bg-white text-slate-700 border border-slate-200
            focus:ring-2 focus:ring-indigo-500/30
            dark:bg-slate-800 dark:text-slate-100 dark:border-white/10
          "
                    >
                        <option>General</option>
                        <option>Work</option>
                        <option>Personal</option>
                        <option>Shopping</option>
                    </select>

                    {/* Due Date */}
                    <input
                        type="date"
                        value={due}
                        onChange={(e) => setDue(e.target.value)}
                        className="
            px-3 py-2 rounded-xl text-sm transition
            bg-white text-slate-700 border border-slate-200
            focus:ring-2 focus:ring-indigo-500/30
            dark:bg-slate-800 dark:text-slate-100 dark:border-white/10
          "
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="
          flex items-center gap-2 px-6 py-2 rounded-xl font-semibold
          bg-indigo-600 hover:bg-indigo-700 text-white
          transition-all shadow-md shadow-indigo-500/20 active:scale-[0.97] cursor-pointer
        "
                >
                    {editingTodo ? (
                        <>
                            <Save size={18} />
                            Update
                        </>
                    ) : (
                        <>
                            <Plus size={18} />
                            Add Task
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
