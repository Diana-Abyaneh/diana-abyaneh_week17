### 📇 Contact App (Local Storage Version)
A React contact management application built using modern React architecture. This version stores data entirely in the browser using **localStorage** without any need for backend or server setup.

---

### 🚀 Features
✅ Add, edit, and delete contacts  
✅ Bulk delete selected contacts  
✅ Search contacts by name or email  
✅ Modal confirmations for delete/edit  
✅ Form validation  
✅ Global state management using React Context  
✅ Data persists across page refreshes using `localStorage`  

---

### 🧱 Tech Stack

React  
Context API  
localStorage  

---

### 🛠️ Setup Instructions

Clone the project:

```bash
git clone https://github.com/Diana-Abyaneh/diana-abyaneh_week17.git
cd diana-abyaneh_week17
```

Install dependencies

```bash

npm install
```

Run the React app

```bash

npm run dev
```

No server or API setup needed — all data is stored in your browser using localStorage.

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
/src
  /components       => UI components (Form, List, Modal, etc.)
  /context          => Global state and data logic (contacts)
  /utils            => Helpers (e.g. form logic, toast system)
  App.jsx           => Main app component
  main.jsx          => Entry point for ReactDOM
  ```
---

### 🌐 Notes
You can use this project as a foundation to later connect to a real backend (Node.js, Firebase, Supabase, etc.)

--- 

### ✒️ Author
Diana Abyaneh
