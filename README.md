### 📇 Contact App (API Version)
A React contact management application built using modern React architecture. This version uses JSON Server as a mock REST API to persist and manage contacts.

---

### 🚀 Features
✅ Add, edit, and delete contacts

✅ Bulk delete selected contacts

✅ Search contacts by name or email

✅ Modal confirmations for delete/edit

✅ Form validation

✅ Global state management using React Context

✅ Realistic HTTP requests using axios and JSON Server


---

### 🧱 Tech Stack

React

Context API

Axios

JSON Server (local API)


---

### 🛠️ Setup Instructions

Clone the project

```bash
git clone https://github.com/Diana-Abyaneh/diana-abyaneh_week16.git
cd diana-abyaneh_week16.git
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
/src
  /context         => Handles all contact-related logic and HTTP requests
  /components      => UI components (Form, List, Modal)
  App.js           => Uses context to display and manage UI

  ```

---

### 🔗 Live Demo
🚀 [Try it here!](https://diana-abyaneh-week16-api.vercel.app/)

---

### 🌐 Notes
You can use this project as a foundation to later connect to a real backend (Node.js, Firebase, Supabase, etc.)

--- 

### ✒️ Author
Diana Abyaneh
