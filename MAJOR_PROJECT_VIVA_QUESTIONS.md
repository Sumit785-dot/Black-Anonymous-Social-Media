# 🎓 Major Project Viva: Ultimate Question Bank
**Project Name:** Anonymous Social Media & Chat Platform
**Tech Stack:** Django REST Framework (Backend), React.js (Frontend), PostgreSQL (Database), Cloudflare Tunnel (Secure Exposure)

---

## 🚀 1. Project Overview & Architecture (Basic)

**Q1: Apne Project ke baare mein batao (Abstract)?**
**Ans:** Sir, ye ek **Privacy-Focused Social Media Application** hai. Isme users posts create kar sakte hain, ek dusre ko follow kar sakte hain aur securely chat kar sakte hain. Iska main USP (Unique Selling Point) **"Privacy & Anonymity"** hai. Humne backend level par aise security measures lagaye hain ki user ka IP address aur location server par store hi nahi hota. Even admin bhi user ko trace nahi kar sakta.

**Q2: Iska Architecture kya hai?**
**Ans:** Ye ek **Decoupled Architecture** (Headless) follow karta hai:
*   **Frontend:** React.js (Single Page Application - SPA) jo fast aur responsive hai.
*   **Backend:** Django REST Framework (API Server) jo logic aur database handle karta hai.
*   **Communication:** Frontend aur Backend **JSON APIs** ke through baat karte hain.

**Q3: Django aur React hi kyu choose kiya?**
**Ans:**
*   **Django:** Security (Built-in protection against SQL Injection, XSS) aur rapid development ke liye best hai.
*   **React:** User experience smooth banane ke liye (page reload nahi hota) aur component-based structure ke liye.

---

## 🛡️ 2. Security & Privacy (Advanced - Your USP)

**Q4: Tumne kaha "Anonymous" hai, kaise prove karoge?**
**Ans:** Sir, humne 3 layers ki security lagayi hai:
1.  **Middleware Level:** Maine ek custom `AnonymizerMiddleware` likha hai jo request aate hi `REMOTE_ADDR` (IP) aur Cloudflare ke headers ko `0.0.0.0` se replace kar deta hai. Server logs mein kabhi real IP save nahi hota.
2.  **Database Level:** User table mein humne IP ya Location ka koi column hi nahi rakha hai.
3.  **Network Level:** Hum **Cloudflare Tunnel** use kar rahe hain, jisse hamara server direct internet par expose nahi hota (Port Forwarding ki zarurat nahi), toh hackers server IP par DDoS attack nahi kar sakte.

### 🕵️‍♂️ Deep Dive: IP Anonymity (Critical Questions)

**Q5: Tum keh rahe ho IP store nahi ho raha, technically ye kaise possible hai?**
**Ans:** Sir, normally Django har request ke saath `request.META['REMOTE_ADDR']` mein user ka IP receive karta hai. Maine ek custom **Middleware** (`AnonymizerMiddleware`) lagaya hai jo view function call hone se PEHLE hi execute hota hai. Ye middleware `REMOTE_ADDR` aur Cloudflare ke headers (`CF-Connecting-IP`) ko intercept karke unhe `0.0.0.0` (Null IP) se replace kar deta hai. Isliye jab data view ya database tak pahunchta hai, IP exist hi nahi karta.

**Q6: Database mein IP kyu nahi save kiya? Security reason ya Space saving?**
**Ans:** Ye ek conscious **Privacy Design Decision** hai. Space saving issue nahi hai (IP string chhota hota hai). Reason ye hai ki agar kal ko database hack ho jaye ya leak ho jaye, toh attackers users ki physical location trace na kar sakein. Humara goal "Data Minimization" hai - sirf wahi data rakho jo app chalane ke liye zaruri hai (Username, Password), tracking data nahi.

**Q7: Kya Cloudflare Tunnel IP chupane mein madad karta hai?**
**Ans:** Haan, bilkul.
1.  **Server IP Protection:** Tunnel ki wajah se humara server internet par direct expose nahi hai. Hacker ko humara IP nahi dikhta, Cloudflare ka IP dikhta hai.
2.  **User IP Handling:** Cloudflare user ka IP leke aata hai, lekin humara Middleware usse application layer par delete kar deta hai.

**Q8: Agar Admin panel se check karein toh kya dikhega?**
**Ans:** Admin panel bhi Django views aur models use karta hai. Kyunki middleware ne pehle hi IP `0.0.0.0` kar diya hai, toh Admin panel logs mein bhi `0.0.0.0` hi dikhega. Admin chah kar bhi user ko track nahi kar sakta.

**Q9: Kya ye 100% Foolproof hai?**
**Ans:** Backend side se HAAN. Lekin network layer par, Cloudflare (jo traffic carry kar raha hai) ke paas logs ho sakte hain. Isliye hum users ko **VPN** ya **Tor** use karne ki salah dete hain agar wo "State-Level Anonymity" chahte hain. Humara system "Application Level Anonymity" provide karta hai.

**Q10: CORS aur CSRF kya hai? Tumne kaise handle kiya?**
**Ans:**
*   **CORS (Cross-Origin Resource Sharing):** Kyunki React (Port 3000) aur Django (Port 8000) alag ports par hain, browser security block kar deti hai. Humne `django-cors-headers` use karke allow kiya hai.
*   **CSRF:** Hum JWT (JSON Web Tokens) use kar rahe hain authentication ke liye, jo stateless hai, isliye CSRF attacks ka risk kam hota hai session-based auth ke mukable.

---

## 🐍 3. Backend (Django & Python)

**Q7: DRF (Django REST Framework) kya hai?**
**Ans:** Ye Django ka ek toolkit hai jo Web APIs banane mein madad karta hai. Ye hamare database models ko JSON format mein convert (Serialize) karta hai taaki React use samajh sake.

**Q8: Serializer kya hota hai?**
**Ans:** Serializer ek translator ki tarah hai. Ye Python Objects (Database data) ko JSON mein badalta hai (Response ke liye) aur JSON ko wapas Python Objects mein (Request save karne ke liye).

**Q9: Authentication kaise kaam kar rahi hai? (JWT)**
**Ans:** Hum **JWT (JSON Web Token)** use kar rahe hain via `SimpleJWT` library.
*   Jab user login karta hai, server usse 2 tokens deta hai: **Access Token** (short life) aur **Refresh Token** (long life).
*   Har request ke header mein Access Token bheja jata hai user ko pehchanne ke liye.

**Q10: `settings.py` mein `ALLOWED_HOSTS` ka kya kaam hai?**
**Ans:** Ye security feature hai. Ye batata hai ki hamara Django server kin domains se request accept karega. Humne Cloudflare Tunnel use kiya hai isliye humne wahan configuration ki hai.

---

## ⚛️ 4. Frontend (React.js)

**Q11: React mein `State` aur `Props` mein kya farq hai?**
**Ans:**
*   **State:** Component ka apna private data (jaise input field ki value). Jab state change hoti hai, component re-render hota hai.
*   **Props:** Data jo parent component se child component mein pass kiya jata hai (read-only).

**Q12: `useEffect` hook kyu use kiya?**
**Ans:** Side-effects handle karne ke liye. Jaise jab page load ho toh API se data fetch karna. Humne iska use profile load karne aur chats refresh karne ke liye kiya hai.

**Q13: Axios kya hai? Fetch kyu nahi use kiya?**
**Ans:** Axios ek library hai HTTP requests ke liye. Ye `fetch` se behtar hai kyunki ye automatically JSON parse kar leta hai aur error handling (400/500 errors) easy hoti hai.

---

## 🗄️ 5. Database (PostgreSQL)

**Q14: PostgreSQL kyu? SQLite kyu nahi?**
**Ans:**
*   SQLite development ke liye theek hai lekin production aur concurrency (ek saath kai users) ke liye slow hai.
*   PostgreSQL robust hai, complex queries fast handle karta hai, aur production-grade reliability deta hai.

**Q15: `OneToOne`, `ForeignKey`, aur `ManyToMany` mein kya farq hai?**
**Ans:**
*   **ForeignKey:** Ek user ke multiple posts ho sakte hain (User -> Posts).
*   **ManyToMany:** Ek user kai logo ko follow kar sakta hai aur kai log use follow kar sakte hain (Followers system).
*   **OneToOne:** User aur uski Profile (agar alag table hoti).

---

## ☁️ 6. Deployment (Cloudflare Tunnel)

**Q16: Tumhara project live kaise hai bina domain kharide?**
**Ans:** Maine **Cloudflare Tunnel** (`cloudflared`) use kiya hai. Ye mere local computer (localhost) se Cloudflare ke network tak ek secure tunnel banata hai. Cloudflare mujhe ek temporary public URL deta hai jo duniya bhar mein accessible hai. Ye safe hai kyunki mujhe router par ports open nahi karne padte.

---

## 🔮 7. Future Scope

**Q17: Is project mein aur kya improve kar sakte ho?**
**Ans:**
1.  **WebSockets:** Abhi chat polling (bar-bar request) se chal rahi hai. Future mein `Django Channels` use karke real-time chat bana sakte hain.
2.  **End-to-End Encryption:** Chat messages ko database mein encrypt karke save kar sakte hain taaki admin bhi na padh sake.
3.  **Media Compression:** Images upload karte waqt compress karna taaki load fast ho.

---

### 🔥 Pro Tips for Viva:
*   **Confident raho:** Agar koi answer nahi aata, toh ghumaane ki jagah bolo "Sir, I focused more on [Topic X], I will read about this."
*   **Code dikhao:** Jab wo puche "Ye kaise kiya?", toh seedha code khol ke dikhao (especially `middleware.py` aur `models.py`). Teachers ko code dekh kar khushi hoti hai.
*   **Flow samjhao:** Login -> Token mila -> API call hui -> Data aaya -> React ne dikhaya.
