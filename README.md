# Sohel Khan Portfolio — MERN Stack + Admin Panel

Full-stack portfolio website built with React.js, Node.js, Express, MongoDB, and Tailwind CSS.

## 🗂️ Project Structure
```
portfolio/
├── client/          ← React + Vite + Tailwind (Frontend)
└── server/          ← Express + MongoDB (Backend)
```

## ⚡ Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

---

### 1. Setup Server
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and secrets
npm run dev
```

### 2. Seed Admin User (First time only)
```
POST http://localhost:5000/api/auth/seed
```
Or visit: `http://localhost:5000/api/auth/seed` in browser (GET won't work, use Postman/Thunder Client)

### 3. Setup Client
```bash
cd client
npm install
npm run dev
```

---

## 🌐 URLs
| URL | Description |
|-----|-------------|
| `http://localhost:5173/` | Portfolio Website |
| `http://localhost:5173/admin/login` | Admin Login |
| `http://localhost:5173/admin/dashboard` | Admin Dashboard |
| `http://localhost:5000/api/...` | Backend API |

---

## 🔐 Default Admin Credentials
```
Email:    sohel@admin.com
Password: Admin@123
```
> ⚠️ Change these in `.env` before deploying!

---

## ✨ Features

### Portfolio (Public)
- ✅ Animated Hero with TypeWriter effect
- ✅ Dark/Light mode toggle
- ✅ Projects section (from DB)
- ✅ Certifications section (from DB)
- ✅ Skills with progress bars + category filter
- ✅ Contact form (saves to DB)
- ✅ Responsive navbar + footer
- ✅ Smooth scroll animations (Framer Motion)

### Admin Panel
- ✅ Secure JWT login
- ✅ Dashboard with stats
- ✅ Add/Edit/Delete Projects
- ✅ Add/Edit/Delete Certifications
- ✅ Add/Edit/Delete Skills with proficiency
- ✅ View contact messages, mark as read
- ✅ Mobile-friendly sidebar

---

## 🚀 Deployment

### Deploy Server (Railway / Render)
1. Push `server/` to GitHub
2. Add env variables in platform dashboard
3. Start command: `node index.js`

### Deploy Client (Netlify / Vercel)
1. Push `client/` to GitHub
2. Build command: `npm run build`
3. Publish dir: `dist`
4. Add env var: `VITE_API_URL=https://your-server.com`

> Update `vite.config.js` proxy for production to use the env var.

---

## 🛠 Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcryptjs
- **UI Libraries**: react-icons, react-hot-toast, react-type-animation
