import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function StatsChart({ todos }) {
    const completed = todos.filter(t => t.completed).length;
    const pending = todos.length - completed;

    const data = [
        { name: 'Completed', value: completed, color: '#10b981' }, // Emerald-500
        { name: 'Pending', value: pending, color: '#6366f1' },    // Indigo-500
    ];

    if (todos.length === 0) return null;

    return (
        <div className="h-40 w-full flex items-center justify-center bg-white/5 dark:bg-slate-800/50 rounded-2xl p-4 mb-6 border border-slate-200 dark:border-slate-700/50">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        innerRadius={30}
                        outerRadius={50}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '10px', border: 'none' }} />
                </PieChart>
            </ResponsiveContainer>

            <div className="ml-4 text-center">
                <p className="text-sm font-medium text-slate-500">
                    Total Progress
                </p>

                <p className="text-2xl font-bold">
                    {Math.round((completed / todos.length) * 100)}%
                </p>

                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    {completed} / {todos.length} tasks
                </p>
            </div>
        </div>
    );
}
