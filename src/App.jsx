import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import FilterBar from "./components/FilterBar";


import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { AnimatePresence } from "framer-motion";
import { DndContext as Dnd } from "@dnd-kit/core"; // harmless if you removed; ignore if TS complains

import { Sun, Moon, Search, Command } from "lucide-react";

import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import StatsChart from "./components/StatsChart";
import DeleteModal from "./components/DeleteModal";

import { saveTodos, loadTodos } from "./utils/storage";

export default function App() {
  const [todos, setTodos] = useState(loadTodos());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // optional if you later add Filters component
  const [deleteId, setDeleteId] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });


  // ---- DnD sensors (keyboard + pointer) ----
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // ---- Persist ----
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // ---- Apply theme to root via class ----
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);


  // ---- Keyboard shortcuts ----
  useEffect(() => {
    const handleKeys = (e) => {
      // Cmd/Ctrl + K focuses search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }

      // Escape closes edit (and modal can be extended similarly)
      if (e.key === "Escape") {
        setEditingTodo(null);
      }
    };

    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, []);

  // ---- Add / Edit ----
  const handleAddOrEdit = (data) => {
    if (!data) return;

    if (data.id) {
      setTodos((prev) => prev.map((t) => (t.id === data.id ? { ...t, ...data } : t)));
      return;
    }

    setTodos((prev) => [
      { ...data, id: uuid(), completed: false },
      ...prev,
    ]);
  };

  // ---- Drag end reorder ----
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return items;
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // ---- Filtering (search + active/completed) ----
  const normalizedSearch = search.trim().toLowerCase();

  const visibleTodos = todos
    .filter((t) => {
      if (!normalizedSearch) return true;
      return t.text.toLowerCase().includes(normalizedSearch);
    })
    .filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    });

  // ---- Theme toggle button icon ----
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <div
      className={
        theme === "dark"
          ? "dark min-h-screen text-slate-100 bg-[#070A12] selection:bg-indigo-500/30 selection:text-indigo-50"
          : "min-h-screen text-slate-900 bg-gradient-to-b from-slate-50 via-white to-slate-100 selection:bg-indigo-500/20 selection:text-slate-900"
      }
    >
      {/* Soft background glow */}
      <div aria-hidden="true"
        className={
          theme === "dark"
            ? "pointer-events-none fixed inset-0 -z-10 opacity-90 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.22),transparent_60%),radial-gradient(40%_40%_at_20%_20%,rgba(16,185,129,0.14),transparent_55%)]"
            : "pointer-events-none fixed inset-0 -z-10 opacity-100 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(79,70,229,0.10),transparent_60%),radial-gradient(40%_40%_at_10%_20%,rgba(16,185,129,0.08),transparent_55%)]"
        } />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <header className="flex items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              TaskFlow
            </h1>
            <p className="mt-1 text-sm sm:text-base text-slate-400 dark:text-slate-400 flex items-center gap-2">
              <Command className="opacity-80" size={16} />
              Press <span className="font-semibold">Ctrl/⌘ K</span> to search
            </p>
          </div>

          <button
            type="button"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            className={[
              "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3",
              "border transition-all shadow-sm active:scale-[0.98] cursor-pointer",
              theme === "dark"
                ? "bg-slate-900/60 border-white/10 hover:border-indigo-300/30 hover:bg-slate-900/70"
                : "bg-white/70 border-slate-200 hover:border-indigo-200 hover:bg-white",
            ].join(" ")}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            <ThemeIcon className={theme === "dark" ? "text-amber-400" : "text-indigo-600"} size={20} />
            <span className="hidden sm:inline text-sm font-semibold">
              {theme === "dark" ? "Light" : "Dark"}
            </span>
          </button>
        </header>

        {/* Main Card */}
        <main
          className={[
            "rounded-3xl border p-5 sm:p-7",
            "shadow-sm ",
            theme === "dark"
              ? "bg-slate-800 border-white/50"
              : "bg-white/80 border-slate-200/70",
          ].join(" ")}
        >
          {/* Search Input */}
          <div className="relative mb-5">
            <Search
              size={18}
              className={
                theme === "dark"
                  ? "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  : "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              }
            />

            <input
              id="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className={[
                "w-full rounded-2xl px-12 py-3",
                "outline-none border transition",
                theme === "dark"
                  ? "bg-slate-900/50 border-white/10 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-400/30"
                  : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-400/20",
              ].join(" ")}
            />
          </div>

          {/* Progress Chart */}
          <StatsChart todos={todos} />

          {/* Add / Edit Form */}
          <TodoForm onSubmit={handleAddOrEdit} editingTodo={editingTodo} cancelEdit={() => setEditingTodo(null)} />

          {/* Filter Bar */}
          <FilterBar filter={filter} setFilter={setFilter} theme={theme} />

          {/* Drag & Drop List */}
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={visibleTodos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
              <div
                className={[
                  "space-y-3 overflow-y-auto pr-1",
                  "scroll-smooth",
                  // max height so dragging works AND card stays elegant
                  "max-h-[320px] sm:max-h-[380px]",
                  theme === "dark"
                    ? "scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900/20"
                    : "scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100"
                ].join(" ")}
              >
                <AnimatePresence mode="popLayout">
                  {visibleTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      toggleTodo={(id) =>
                        setTodos((prev) =>
                          prev.map((t) =>
                            t.id === id ? { ...t, completed: !t.completed } : t
                          )
                        )
                      }
                      askDelete={setDeleteId}
                      onEdit={setEditingTodo}
                    />
                  ))}
                </AnimatePresence>

                {visibleTodos.length === 0 && (
                  <div
                    className={[
                      "rounded-2xl border p-6 text-center",
                      theme === "dark"
                        ? "bg-slate-900/40 border-white/10 text-slate-300"
                        : "bg-slate-50 border-slate-200 text-slate-600",
                    ].join(" ")}
                  >
                    <p className="font-semibold">
                      No tasks found
                    </p>
                    <p className="text-sm mt-1 opacity-80">
                      Try changing your search or add a new task above.
                    </p>
                  </div>
                )}
              </div>
            </SortableContext>
          </DndContext>

          {/* Delete confirm modal */}
          {deleteId && (
            <DeleteModal
              confirm={() => {
                setTodos((prev) => prev.filter((t) => t.id !== deleteId));
                setDeleteId(null);
              }}
              cancel={() => setDeleteId(null)}
            />
          )}
        </main>

        {/* Footer hint */}
        <footer className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p className="mb-3">
            <span className="font-medium text-slate-600 dark:text-slate-300">Tip:</span>{' '}
            Use the <span className="font-semibold">grip</span> icon to drag tasks •
            <span className="font-semibold"> Edit</span> from the pencil •
            <span className="font-semibold"> Delete</span> shows confirmation
          </p>

          <p className="pt-2 text-[12px] text-slate-400 dark:text-slate-500">
            Designed by{' '}
            <span className="font-semibold tracking-wide text-slate-600 dark:text-slate-300">
              WISECODES
            </span>
          </p>
        </footer>
      </div>
      
    </div>
  );
}
