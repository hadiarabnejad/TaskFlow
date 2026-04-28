function TodoFilter({ filter, setFilter }) {
    const base =
        'rounded-xl px-4 py-2 text-sm font-medium transition border border-white/10'

    const active = 'bg-cyan-500 text-white'
    const inactive = 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'

    return (
        <div className="flex gap-2">
            <button
                onClick={() => setFilter('all')}
                className={`${base} ${filter === 'all' ? active : inactive}`}
            >
                All
            </button>
            <button
                onClick={() => setFilter('active')}
                className={`${base} ${filter === 'active' ? active : inactive}`}
            >
                Active
            </button>
            <button
                onClick={() => setFilter('completed')}
                className={`${base} ${filter === 'completed' ? active : inactive}`}
            >
                Completed
            </button>
        </div>
    )
}

export default TodoFilter
