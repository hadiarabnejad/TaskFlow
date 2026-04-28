function SearchBar({ search, setSearch }) {

    return (

        <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full p-3 mb-4 rounded bg-slate-800"
        />

    )
}

export default SearchBar
