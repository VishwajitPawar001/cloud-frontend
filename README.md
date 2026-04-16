# 🌐 CloudDrive Frontend

A modern cloud storage web application frontend built using **Next.js**.
This application allows users to upload, manage, and share files seamlessly.

---

## 🚀 Features

* 🔐 User Authentication (Login / Signup)
* 📂 Folder Management
* 📤 File Upload (Cloud Storage)
* 🗑️ Trash System (Restore / Delete Permanently)
* 📥 File Download (Forced Download)
* 🔗 Public File Sharing (Share Link)
* 👥 Internal File Sharing (Email-based)
* 🔍 Search Files
* 📱 Responsive UI

---

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **HTTP Client:** Axios
* **State Management:** React Hooks
* **Deployment:** Vercel

---

## 📁 Folder Structure

```
frontend/
│── app/
│   ├── dashboard/
│   ├── login/
│   ├── signup/
│   ├── share/
│
│── components/
│   ├── layout/
│   ├── files/
│   ├── upload/
│
│── services/
│   ├── api.js
│   ├── files.js
│   ├── auth.js
│
│── public/
│── styles/
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone <your-frontend-repo-url>
cd frontend
```

### 2️⃣ Install Dependencies

```
npm install
```

### 3️⃣ Environment Variables

Create `.env.local`

```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

---

### 4️⃣ Run Development Server

```
npm run dev
```

App runs on:

```
http://localhost:3000
```

---

## 🔗 API Integration

Frontend connects to backend APIs like:

```
/api/auth/login
/api/auth/signup
/api/files
/api/files/upload
/api/files/trash
/api/files/share
/api/files/public/:token
```

---

## 📸 Key Pages

* Dashboard (Files & Folders)
* Folder View
* Trash Page
* Shared Files Page
* Public Share Page
* Login / Signup

---

## 🚀 Deployment

Deployed on **Vercel**

Steps:

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

---

## 📌 Future Improvements

* Drag & Drop Upload
* File Rename
* File Preview (PDF, Video)
* Storage Usage Graph
* Dark Mode

---

## 👨‍💻 Author

**Vishwajit Pawar**

---

## 📄 License

This project is for educational purposes.
