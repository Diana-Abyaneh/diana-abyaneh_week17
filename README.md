### 📇 Contact App (LocalStorage Version)

A React-based contact management application that uses the browser's LocalStorage for data persistence. This version is fully frontend-only and doesn't require any backend or API setup.

---

### 🚀 Feature

✅ Add, edit, and delete contacts
✅ Bulk delete selected contacts
✅ Search contacts by name or email
✅ Modal confirmations for delete/edit
✅ Form validation
✅ Global state management using React Context
✅ Offline-first experience with browser-based LocalStorage

---

### 🧱 Tech Stack

React

Context API

LocalStorage (Browser)

---

### 🛠️ Setup Instructions
Clone the project:

```bash
git clone https://github.com/Diana-Abyaneh/diana-abyaneh_week16.git
cd diana-abyaneh_week16
```
Install dependencies:

```bash
npm install
```
Run the app:

```bash
npm run dev
```
No backend setup is needed — everything runs in your browser.
---

### 🧠 Architecture Comparison
Feature	API Version (JSON Server)	LocalStorage Version
Persistence	Mock REST API via axios	LocalStorage
Realism	Simulates real-world backend	Pure frontend
Deployability	Requires backend to be running	Easy to deploy anywhere
Data Sync	Cross-tab / multi-user capable	Local to the current browser

---

### 🧩 Folder Highlights
```bash

/src
  /context         => Manages all contact-related logic
  /components      => UI components (Form, List, Modal)
  App.js           => Displays and manages main UI using context
```
---

### 🔗 Live Demo
🚀 [Try it Here!](https://diana-abyaneh-week16-api.vercel.app/)

---

### 🌐 Notes
This version is ideal for learning and frontend-focused development. You can later migrate it to use real backend services like Node.js, Firebase, Supabase, etc.

---

### ✒️ Author
Diana Abyaneh
