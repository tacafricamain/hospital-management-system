


# 🧠 `copilot.md`

## 🚀 React Hospital Management System — Developer & Copilot Guide

This document guides **GitHub Copilot** and you through building a **React-based Hospital Management System Dashboard** like the attached design.

---

## 🧩 Project Overview

### 🎯 Goal

A hospital management web app with:

* Dashboard (KPIs, charts, appointments, patients)
* Sidebar navigation
* Patient management (CRUD)
* Appointment management
* Billing & transactions
* Settings and user profile

### 💡 Features to include

* Login authentication (admin/doctor/staff)
* Responsive dashboard UI
* Recharts or ApexCharts for data visualization
* Reusable card, table, and list components
* API integration (Node/Express, or connect to an existing PHP backend)
* Light mode (as per design)
* Local storage/session handling
* Routing (React Router)
* Form validation (React Hook Form / Yup)
* State management (Zustand or Redux Toolkit)

---

## 🛠️ Tech Stack

| Layer         | Tools                                   |
| ------------- | --------------------------------------- |
| Framework     | React 18+ with Vite or CRA              |
| Language      | TypeScript (recommended) or JavaScript  |
| Routing       | React Router DOM v6                     |
| Charts        | ApexCharts or Recharts                  |
| Styling       | Tailwind CSS (recommended)              |
| UI Components | shadcn/ui or custom Tailwind components |
| Icons         | Lucide-react or Material Icons          |
| State         | Zustand or Redux Toolkit                |
| HTTP Client   | Axios                                   |
| Forms         | React Hook Form + Yup                   |
| Auth          | JWT / Firebase / Supabase (your choice) |
| Linting       | ESLint + Prettier                       |
| Build         | Vite (fast)                             |

---

## 📁 Folder Structure

```bash
hospital-management/
├── src/
│   ├── assets/             # images, logos, icons
│   ├── components/         # reusable UI components
│   │   ├── Sidebar/
│   │   ├── Navbar/
│   │   ├── Card/
│   │   ├── Chart/
│   │   ├── AppointmentList/
│   │   └── Table/
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── Patients/
│   │   ├── Appointments/
│   │   ├── Billing/
│   │   ├── Transactions/
│   │   └── Settings/
│   ├── context/
│   │   └── AppContext.tsx
│   ├── hooks/
│   ├── services/
│   │   ├── api.ts          # axios instance
│   │   ├── patientService.ts
│   │   └── appointmentService.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── routes/
│   │   └── index.tsx
│   └── styles/
│       └── globals.css
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## ⚙️ Project Setup Commands

```bash
# 1. Create project
npm create vite@latest hospital-management -- --template react-ts
cd hospital-management

# 2. Install dependencies
npm install react-router-dom axios apexcharts react-apexcharts tailwindcss lucide-react @radix-ui/react-icons zustand react-hook-form yup @hookform/resolvers

# 3. Setup Tailwind
npx tailwindcss init -p
```

Add this to `tailwind.config.js`:

```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
theme: { extend: {} },
plugins: [],
```

---

## 🧭 Routing Setup

### Example (src/routes/index.tsx)

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Patients from "../pages/Patients";
import Appointments from "../pages/Appointments";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 🧱 Core UI Components (Copilot Prompts)

Below are **optimized prompts** for GitHub Copilot to generate each part cleanly and consistently.

---

### 🧭 Sidebar Component

**File:** `src/components/Sidebar/Sidebar.tsx`

**Copilot Prompt:**

> Build a modern sidebar using Tailwind CSS. Include icons and links: Dashboard, Patients, Messages, Appointments, Billing, Transactions, Settings, Chat & Support, Help Center. Add a small logo on top and a profile section at the bottom.

---

### 🌤️ Navbar Component

**File:** `src/components/Navbar/Navbar.tsx`

**Prompt:**

> Create a responsive top navbar with a greeting message “Good Morning, Dr. Robert!” on the left, and action buttons “Export” and “+ Create new” on the right. Use Tailwind for styling.

---

### 📊 KPI Cards Component

**File:** `src/components/Card/KpiCard.tsx`

**Prompt:**

> Create a reusable KPI Card component with title, value, and percentage change indicator. Example props: title, value, change, icon, color. Display them in a grid layout responsive across devices.

---

### 📈 Chart Component

**File:** `src/components/Chart/OverviewChart.tsx`

**Prompt:**

> Build a line chart using ApexCharts showing Hospitalized vs Outpatients data over six months. Include legends and tooltips. Style to match light dashboard theme.

---

### 👩‍⚕️ Appointment List Component

**File:** `src/components/AppointmentList/AppointmentList.tsx`

**Prompt:**

> Create a list displaying recent appointments with patient avatars, names, tests, and appointment times (e.g. “Tomorrow 10:30”). Make it scrollable and neatly spaced using Tailwind.

---

### 📋 Patient Table Component

**File:** `src/components/Table/PatientTable.tsx`

**Prompt:**

> Build a responsive table for patient list showing name, gender, date of birth, age, department, and patient ID. Include a search input and filter dropdown (All status). Make the header sticky.

---

### 🧮 Dashboard Page

**File:** `src/pages/Dashboard/Dashboard.tsx`

**Prompt:**

> Create a Dashboard page layout combining KPI Cards, OverviewChart, AppointmentList, and PatientTable. Follow a grid structure similar to the uploaded image: KPI row (4 cards), chart (2/3 width), appointment list (1/3 width), and patient table below.

---

## 🌍 State Management

Use Zustand for global app state.

**Example:** `src/context/AppContext.tsx`

```tsx
import { create } from "zustand";

interface AppState {
  patients: any[];
  setPatients: (data: any[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  patients: [],
  setPatients: (data) => set({ patients: data }),
}));
```

---

## 🌐 API Service Layer

**File:** `src/services/api.ts`

```tsx
import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api-endpoint.com/api",
});

export default api;
```

**Prompt for Copilot:**

> Create service functions to fetch patients, appointments, and dashboard stats using Axios. Include async functions getPatients(), getAppointments(), getDashboardStats() with proper error handling.

---

## 🧪 Testing (Optional)

Use Vitest or Jest for testing React components.
Prompt:

> Generate a Jest test for the KPI card ensuring it renders the title and value props correctly.

---

## 🧰 VS Code + Copilot Best Practices

**Extensions**

* GitHub Copilot & Copilot Chat
* Tailwind CSS IntelliSense
* ESLint & Prettier
* React Developer Tools

**Settings (`.vscode/settings.json`):**

```json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "files.autoSave": "onWindowChange",
  "emmet.includeLanguages": { "javascript": "javascriptreact" },
  "editor.quickSuggestions": { "strings": true }
}
```

---

## 💬 Copilot Prompting Guide

| Area                   | Example Prompt for Copilot                                                            |
| ---------------------- | ------------------------------------------------------------------------------------- |
| **Page Scaffolding**   | “Create a Dashboard page with sidebar, navbar, cards, chart, and table components.”   |
| **Form Handling**      | “Generate a patient registration form with validation using React Hook Form and Yup.” |
| **API Integration**    | “Connect Axios service to fetch patient data and display in the table component.”     |
| **Reusable Component** | “Create a reusable card component with icon, value, and small percentage indicator.”  |
| **Responsive Design**  | “Make the dashboard layout responsive using Tailwind grid and flex utilities.”        |

> 💡 **Tip:** Type `// Copilot:` before your intent in comments. It increases Copilot accuracy.

---

## 📱 Responsive Behavior Plan

| Device  | Behavior                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------- |
| Desktop | Sidebar always visible, full layout as shown                                                            |
| Tablet  | Sidebar collapses to icons only                                                                         |
| Mobile  | Navbar merges with sidebar (hamburger menu), cards stack vertically, patient table scrolls horizontally |

---

## 🧩 Future Enhancements

* Authentication & Role-based access
* Export/Import patient data (Excel/PDF)
* Real-time updates via WebSocket
* Dark mode toggle
* Notifications center
* Multi-language support

---

## ✅ Milestone Development Plan

| Stage | Deliverable                                              |
| ----- | -------------------------------------------------------- |
| 1     | Initialize project, install dependencies, Tailwind setup |
| 2     | Build Sidebar, Navbar, Layout                            |
| 3     | Create KPI Cards, Chart, Appointment List, Patient Table |
| 4     | Implement Dashboard page composition                     |
| 5     | Integrate API calls & state management                   |
| 6     | Add CRUD for Patients & Appointments                     |
| 7     | Authentication + Role control                            |
| 8     | Testing, performance, deployment                         |

---

## 🧠 Helpful Copilot Prompts Collection

Paste any of these into your files for faster generation:

```tsx
// Copilot: Create a responsive sidebar navigation with icons and text using Tailwind.
// Copilot: Build a KPI Card with dynamic props for title, value, and percentage.
// Copilot: Make an ApexCharts line chart showing Hospitalized vs Outpatients.
// Copilot: Build a reusable appointment list component with scroll and time badges.
// Copilot: Combine all components into a Dashboard page grid.
// Copilot: Fetch data from API and pass to dashboard components using Zustand store.
```

---

## 🌐 Deployment Tips

* Use Vercel or Netlify for front-end hosting.
* Connect to backend API via environment variable `VITE_API_URL`.
* Enable HTTPS and add `.env` file for secrets.

---

