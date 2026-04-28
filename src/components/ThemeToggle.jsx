function ThemeToggle({ theme, setTheme }) {
    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-3 py-1 bg-gray-700 rounded"
        >
            {theme === "dark" ? "Light" : "Dark"}
        </button>
    )
}

export default ThemeToggle
