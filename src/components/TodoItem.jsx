import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { Trash2, Edit3, CheckCircle2, Circle, GripVertical, Calendar, Tag } from 'lucide-react';

export default function TodoItem({ todo, toggleTodo, askDelete, onEdit }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: todo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    const priorityColors = {
        High: 'text-red-500 bg-red-500/10',
        Medium: 'text-amber-500 bg-amber-500/10',
        Low: 'text-emerald-500 bg-emerald-500/10',
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group flex items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all"
        >
            <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600">
                <GripVertical size={18} />
            </button>

            <button onClick={() => toggleTodo(todo.id)} className="transition-transform active:scale-90">
                {todo.completed ? (
                    <CheckCircle2 className="text-emerald-500" size={24} />
                ) : (
                    <Circle className="text-slate-300 dark:text-slate-600" size={24} />
                )}
            </button>

            <div className="flex-1 min-w-0">
                <h3 className={`font-medium truncate ${todo.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
                    {todo.text}
                </h3>
                <div className="flex flex-wrap gap-2 mt-1 text-xs">
                    <span className={`px-2 py-0.5 rounded-full font-bold ${priorityColors[todo.priority]}`}>
                        {todo.priority}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                        <Tag size={12} /> {todo.category}
                    </span>
                    {todo.due && (
                        <span className="flex items-center gap-1 text-slate-500">
                            <Calendar size={12} /> {todo.due}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit(todo)} className="p-2 hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-500 rounded-lg">
                    <Edit3 size={18} />
                </button>
                <button onClick={() => askDelete(todo.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 rounded-lg">
                    <Trash2 size={18} />
                </button>
            </div>
        </motion.div>
    );
}
