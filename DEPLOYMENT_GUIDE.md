# 🚀 Deployment Guide: From Localhost to Cloud (Free)

Agar aap apne project ko **24/7 Live** karna chahte hain (bina apna laptop on rakhe), toh aapko ise **Cloud** par deploy karna hoga.

Hum **Render (Backend + Database)** aur **Vercel (Frontend)** use karenge kyunki ye **FREE** hain.

---

## 🛠️ Step 1: Prepare Backend (Django)

Maine aapke project mein zaruri files (`Procfile`, `runtime.txt`, `requirements.txt`) add kar di hain.

1.  **GitHub par Upload karein:**
    *   Apne pure project code ko GitHub par push karein.
    *   Make sure `social_backend` aur `social_frontend` folders wahan hon.

## ☁️ Step 2: Deploy Backend (Render.com)

1.  **Account Banayein:** [Render.com](https://render.com) par signup karein.
2.  **New Web Service:** Dashboard mein "New +" -> "Web Service" click karein.
3.  **Connect GitHub:** Apni repository select karein.
4.  **Settings:**
    *   **Name:** `social-backend` (kuch bhi unique)
    *   **Root Directory:** `social_backend` (Important!)
    *   **Environment:** `Python 3`
    *   **Build Command:** `pip install -r requirements.txt`
    *   **Start Command:** `gunicorn config.wsgi:application`
5.  **Environment Variables (Advanced):**
    *   `SECRET_KEY`: (Koi bhi random strong string)
    *   `DEBUG`: `False`
    *   `ALLOWED_HOSTS`: `*`
6.  **Database (PostgreSQL):**
    *   Render dashboard mein "New +" -> "PostgreSQL" click karein.
    *   Create hone ke baad, uska **Internal Database URL** copy karein.
    *   Wapas Web Service ki settings mein jayein aur `DATABASE_URL` naam ka variable banayein aur wo URL paste kar dein.
7.  **Deploy:** "Create Web Service" click karein. Kuch minutes mein aapko ek link milega (e.g., `https://social-backend.onrender.com`).

## ⚛️ Step 3: Deploy Frontend (Vercel)

1.  **Account Banayein:** [Vercel.com](https://vercel.com) par signup karein.
2.  **New Project:** "Add New..." -> "Project".
3.  **Import Git:** Apni repository select karein.
4.  **Settings:**
    *   **Framework Preset:** `Create React App`
    *   **Root Directory:** `social_frontend` (Edit par click karke select karein).
5.  **Environment Variables:**
    *   `REACT_APP_API_URL`: Yahan Step 2 mein mila hua Backend URL dalein (e.g., `https://social-backend.onrender.com/api`).
6.  **Deploy:** "Deploy" click karein.

---

## 🌍 Result

*   **Frontend Link:** `https://your-project.vercel.app` (Ye link teacher ko dein).
*   **Backend Link:** `https://social-backend.onrender.com` (Ye internal use ke liye hai).

---

## ⚠️ Important Note for Privacy

Jab aap Cloud (Render/Vercel) use karte hain, toh **Server Logs unke paas hote hain**.
*   Agar aapko **100% Privacy** chahiye (jaisa humne discuss kiya), toh **Cloudflare Tunnel (Self-Hosting)** wala method hi best hai.
*   Cloud Deployment sirf **Convenience** (24/7 uptime) ke liye hai.
