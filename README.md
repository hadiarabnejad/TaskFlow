# 📝 TaskFlow Todo Dashboard

A modern, responsive Todo application built with **React + Vite**, featuring:

- ✅ Clean, minimal UI
- 🌙 Light / Dark mode
- 📊 Productivity stats with charts
- 🧲 Drag & drop task reordering
- 🏷 Priority, category & due dates
- 📁 Persistent storage in the browser (localStorage)

---

## ✨ Features

- **Add / Edit / Delete tasks**
  - Inline editing
  - Cancel editing button
- **Task metadata**
  - Priority: Low / Medium / High
  - Category: General, Work, Personal, Shopping (customizable)
  - Due date selection
- **Task states**
  - Mark tasks as completed / active
  - Filter and visually distinguish them
- **Drag & Drop reordering**
  - Reorder tasks via drag-and-drop for better organization
- **Stats & Charts**
  - Pie chart of completed vs remaining tasks
  - Visual overview of priority distribution (or similar metrics)
  - Legend and tooltip support
- **Dark Mode**
  - Dark-mode-aware form and layout
  - Tuned colors for better readability and contrast
- **Local Persistence**
  - Tasks and settings are stored in `localStorage`
  - Data is preserved across page reloads

---

## 🛠 Tech Stack

- **Frontend**
  - [React](https://react.dev/)
  - [Vite](https://vitejs.dev/)
  - [TypeScript or JavaScript] (depending on your setup)
- **Styling**
  - [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- **Charts**
  - [Recharts](https://recharts.org/en-US/) for interactive PieCharts and stats
- **Icons**
  - [Lucide React](https://www.npmjs.com/package/lucide-react) (e.g. `Plus`, `Save`, `X` icons)
- **State & Utils**
  - React hooks (`useState`, `useEffect`) and custom hooks (if used)
  - Browser `localStorage` for persistence
- **Drag & Drop** (if used)
  - e.g. [`@hello-pangea/dnd`](https://www.npmjs.com/package/@hello-pangea/dnd) or `react-beautiful-dnd`

> If your dependency list is different, update this section accordingly.

---

## 📦 Installation

Clone the repository and install dependencies:
```bash
git clone https://github.com/hadiarabnejad/TaskFlow
cd TaskFlow

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

## See Online
https://wisecodestaskflow.netlify.app/
