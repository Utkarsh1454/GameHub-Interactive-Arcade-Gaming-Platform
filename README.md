# 🎮 GameHub — High-Performance Web Arcade Platform  

![GameHub Dashboard Overview](images/hero.png)

**GameHub** is a high-performance, browser-native arcade platform engineered for **low-latency gameplay**, **modular architecture**, and **AI-driven game mechanics**. Built entirely with **Vanilla JavaScript, HTML5 Canvas, and modern CSS3**, it delivers a seamless, app-like experience without external dependencies.

---

## ⚡ Core Highlights  

- 🚀 **60 FPS Rendering Pipeline**  
  Optimized game loops using `requestAnimationFrame` for smooth, tear-free rendering and ultra-responsive input handling.

- 🧠 **AI-Powered Gameplay (Minimax Engine)**  
  Custom-built **Minimax with Alpha-Beta Pruning** for intelligent opponent decision-making in strategy games like Chess.

- 🎨 **Glassmorphic UI System**  
  Advanced UI design using:
  - `backdrop-filter`
  - CSS Grid & Flexbox layouts  
  - Custom keyframe animations  
  - Neon gradient styling  

- 🔐 **Client-Side Authentication Engine**  
  Lightweight auth system using:
  - `localStorage` session persistence  
  - Custom validation flows  
  - Animated toast-based notifications  

- 🏆 **Dynamic Leaderboard System**  
  Real-time score tracking with persistent storage and automatic UI updates.

---

## 🕹️ Game Engine Library  

- ♟️ **Neon Chess**  
  - Integrated `chess.js` logic  
  - Custom Minimax AI engine  
  - PvP + PvAI modes  

- 🚀 **Spacewave**  
  - Real-time survival shooter  
  - Object spawning & collision detection  

- 🧱 **Neon Tetris**  
  - Matrix-based grid system  
  - Rotation & collision algorithms  

- 🐍 **Neon Snake**  
  - Dynamic path tracking  
  - Difficulty scaling  

- 🐦 **Neon Flappy**  
  - Physics-based movement  
  - Precision timing mechanics  

---

## 🏗️ System Architecture  

A **modular and scalable directory structure**:

```
GameHub/
├── index.html        # Entry point
├── html/             # Auth flows & game views
├── css/              # Global styles & UI system
├── js/               # Core logic & engines
├── images/           # Assets
└── scripts/          # Python automation tools
```

### 🔧 Design Philosophy
- Separation of concerns (UI / logic / assets)  
- Reusable components via global injection  
- Scalable game modules  

---

## 🛠️ Setup & Execution  

```bash
# Clone the repository
git clone https://github.com/Utkarsh1454/GameHub-Interactive-Arcade-Gaming-Platform.git

# Navigate into project
cd GameHub-Interactive-Arcade-Gaming-Platform
```

### ▶️ Run Locally
- Use **VS Code Live Server** (recommended)  
- OR open `index.html` directly  

### 🔑 Admin Access
```
Username: admin  
Password: admin123
```

---

## ⚙️ Internal Tooling & Automation  

- 🧩 **update_html.py**  
  - Bulk injects global CSS & JS  
  - Ensures consistency across all HTML files  

- 🔄 **execute_refactor.py**  
  - Regex-driven refactoring tool  
  - Converts flat structure into modular architecture  

---

## 🔮 Future Roadmap  

- 🌐 Multiplayer (WebSockets)  
- ☁️ Cloud leaderboard sync  
- 🎵 Audio engine  
- 🧠 Advanced AI difficulty  
- 📊 Player analytics dashboard  

---

## 👨‍💻 Author  

**Utkarsh Pandey**  
🔗 https://github.com/Utkarsh1454  

---

## ⭐ Support  

If you like this project, give it a ⭐!
