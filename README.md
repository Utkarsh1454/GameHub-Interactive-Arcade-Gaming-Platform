# 🎮 GameHub Platform

Welcome to GameHub, a premium, high-performance web arcade designed for zero-latency gameplay, advanced Minimax AI opponents, and fully integrated global leaderboards. Built entirely with Vanilla JavaScript, HTML5 Canvas, and modern CSS3.

![GameHub Dashboard Overview](images/hero.png)

## 🚀 Features

- **Blazing Fast Zero-Latency Input**: Play at a native 60 FPS using highly optimized HTML5 canvas rendering loops.
- **Glassmorphic UI Engine**: Gorgeous neon-draped styling utilizing dynamic CSS properties like `backdrop-filter`, CSS Grid/Flexbox layouts, and custom keyframe animations.
- **Seamless Local Authentication**: Full login, registration, and session storage system utilizing `localStorage` and custom animated Toast UI Notifications (No annoying native browser alerts).
- **Global Automatic Leaderboards**: Earn points and watch your name populate on the unified Hall of Fame completely synchronously and seamlessly in the background.

## 🕹️ The Library
- **Neon Chess**: Full chess.js logic integration with a custom Minimax Alpha-Beta pruning AI engine. Play Against a friend, or challenge the machine dynamically!
- **Spacewave**: A gorgeous space-combat retro survival shooter.
- **Neon Tetris**: The classic block-puzzler reborn in ultra-violet grids.
- **Neon Snake**: Navigate the cyber-grid and consume the glowing food.
- **Neon Flappy**: A high-difficulty classic reaction tester.

## 📂 Architecture

A clean, highly modular branching architecture was utilized:
```
/Pro Game/
├── index.html       (Main Landing Page)
├── html/            (Authentication & Game Views)
├── css/             (Design System & Stylesheets)
├── js/              (Global Logic & tetris loops)
├── images/          (UI Assests)
└── *.py             (Internal Python Builder scripts)
```

## 🛠️ Getting Started

1. Clone or download the repository.
2. Launch a local web server (e.g., VS Code **Live Server** extension) executing the parent directory containing `/Pro Game/`.
3. Open `index.html` in your browser.
4. *Admin Portal Test*: Use `admin / admin123` on the Admin Login portal to access the Leaderboard wipe controls.

## 📜 Technical Scripts
Included inside the root are advanced internal deployment Python scripts:
- `execute_refactor.py`: A massive regex search-and-replace pipeline that systematically reorganizes the flat file structure into the branched `/html`, `/css`, `/js` hierarchy without breaking any component strings.
- `update_html.py`: Automatically injects global components across the codebase simultaneously.
