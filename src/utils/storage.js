export const saveTodos = (todos) => localStorage.setItem("todos_pro", JSON.stringify(todos));
export const loadTodos = () => JSON.parse(localStorage.getItem("todos_pro") || "[]");
