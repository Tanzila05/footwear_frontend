# SoleX — Premium Footwear Shop Landing Page

SoleX is a state-of-the-art, dark-themed premium footwear landing page built as a high-performance web experience. The website features an aesthetic color scheme, responsive typography, glassmorphism cards, interactive particles, smooth 60fps scroll transitions, and realistic 3D micro-animations.

---

## ⚡ Tech Stack

* **Backend**: Python Flask (serves the template assets and coordinates endpoints).
* **Frontend**: HTML5, CSS3 (variables, transitions, animations), ES6 JavaScript.
* **Layout Grid**: Bootstrap 5 (responsive flex grids and helper classes).
* **Motion Graphics**: 
  * GSAP 3.12 (GreenSock Animation Platform) for preloader timelines, hero reveals, and custom coordinate tracking.
  * AOS (Animate On Scroll) for clean viewport entrance wipes.
* **Icons & Fonts**: Google Fonts (Poppins), Font Awesome 6.

---

## 🎨 Creative Aesthetics

* **Curated Palette**:
  * Primary Brand: `#ff6b00` (Neon Premium Orange)
  * Secondary Contrast: `#111111` (Obsidian Grey)
  * Background: `#0d0d0d` (Pure Dark Carbon)
  * Accents: `#ffd166` (Metallic Gold)
* **Custom Cursor Follower**: Dual-layer mouse cursor with custom lag interpolation (lerping) and expand animations over interactive click targets.
* **3D Sneaker Interactivity**: Real-time mouse coordinate calculations translate featured card dimensions into relative 3D rotations, tilting product images.
* **Background Particle Canvas**: High-performance HTML5 Canvas animation loop in the newsletter section rendering floating neon-dust particles at 60 FPS.
* **Infinite Brand Loop**: Clean horizontal marquee layout scrolling inline vector logos seamlessly.
* **Interactive Statistics**: Auto-increment counters counting client bases and satisfaction ratios upon scroll interception.

---

## 📁 Directory Structure

```text
c:\footwear/
│
├── app.py                  # Main Flask app server
├── requirements.txt         # Required python libraries
├── README.md               # Project documentation
│
├── templates/
│   └── index.html          # Core responsive HTML template
│
└── static/
    ├── css/
    │   ├── style.css       # Core layout structure, colors, elements
    │   └── animation.css   # Keyframe behaviors, drifts, float transitions
    │
    ├── js/
    │   ├── main.js         # Follower, stats counts, ripple clicks, slider
    │   └── animation.js    # GSAP preloader entry, 3D tilts, scroll parallax
    │
    └── images/
        ├── hero-shoe.png   # Main floating sneaker image
        ├── shoe1.png       # Card shoe 1
        ├── shoe2.png       # Card shoe 2
        ├── shoe3.png       # Card shoe 3
        ├── shoe4.png       # Card shoe 4
        └── banner.jpg      # Background parallax banner
```

---

## 🚀 Setup & Launch

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run Server**:
   ```bash
   python app.py
   ```

3. **Browse Landing Page**:
   Open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your web browser.
