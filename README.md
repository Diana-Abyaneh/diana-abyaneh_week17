### 📇 Contact App (API Version)

A React contact management application built using modern React architecture.  
This version uses **JSON Server** as a mock REST API to persist and manage contacts.

---

### 🚀 Features

✅ Add, edit, and delete contacts  
✅ Bulk delete selected contacts  
✅ Search contacts by name or email  
✅ Modal confirmations for delete/edit  
✅ Form validation (`yup` + `react-hook-form`)  
✅ Global state management using React Context  
✅ Realistic HTTP requests using `axios` and `JSON Server`

---

### 🧱 Tech Stack

- React  
- Context API  
- Axios  
- JSON Server (local REST API)  
- Yup (validation)  
- React Hook Form (form management)

---

### 🛠️ Setup Instructions

#### 1. Clone the project

```bash
git clone https://github.com/Diana-Abyaneh/diana-abyaneh_week17.git
cd diana-abyaneh_week17
```

Install dependencies

```bash

npm install
```

Start the JSON Server
```bash

npx json-server --watch db.json --port 3001
```

Make sure db.json file exists at the root and contains:

```json
{
  "contacts": []
}
```

Run the React app

```bash

npm run dev
```

---

### 🧠 Architecture Comparison

| Feature         | API Version (JSON Server)        | LocalStorage Version         |
|-----------------|----------------------------------|------------------------------|
| Persistence     | Mock REST API via axios          | localStorage                 |
| Realism         | Simulates real-world backend     | Pure frontend for testing    |
| Deployability   | Needs API to be running          | Can deploy anywhere easily   |
| Data Sync       | Cross-tab / multi-user           | Local to browser only        |

---

### 🧩 Folder Highlights
```bash
/
├── db.json            # Mock database file for JSON Server
├── package.json       # Project metadata and dependencies
├── vite.config.js     # Vite config
└── /src
    ├── /components    # UI components (Form, List, Modal, etc.)
    ├── /context       # Global state and API logic for contacts
    ├── /utils         # Custom hooks and helpers (notifications, form logic)
    ├── App.jsx        # Root component
    └── main.jsx       # Entry point for rendering app
  ```

---

### 🌐 Notes
You can use this project as a foundation to later connect to a real backend (Node.js, Firebase, Supabase, etc.)

--- 

### ✒️ Author
Diana Abyaneh
