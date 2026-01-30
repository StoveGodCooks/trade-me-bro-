# SUBSTRATUM | The Truth Beneath

An immersive, pixel-art web experience built for mystery, exploration, and modular storytelling.  
This project is designed to run on Neocities and is structured for clean scalability, dialog-driven interaction, and investigative depth.

---

## 🌐 Live Site  
**https://substratum.neocities.org**

---

## 📁 Project Structure

/
├── index.html                              # Entry point — loads the landing screen
├── homescreen.html                  # Optional alternate entry or debug screen
├── tavern.html                          # Main interactive scene
├── tavern_debug.html       # Debug/testing variant of tavern scene
├── substratum-landing.jpg    # Background image for landing
├── tavern-scene.png                # Background image for tavern
├── Dialog/                 # Contains all dialog JSON files
├── investigation/          # Contains investigative case files (.txt)

Code

---

## 🧠 Design Philosophy

- **Modular World Engine** — Each scene is self-contained and loads its own dialog and assets.
- **Pixel-Perfect UI** — SVG hotspots and overlays are aligned precisely with artwork.
- **Accessible Navigation** — Keyboard and screen reader support via `role="button"` and `aria-label`.
- **Lore-Driven Structure** — Dialog and investigation folders reflect narrative depth and branching logic.

---

## 🔧 Development Notes

- All fetch paths are **root-relative** (e.g., `/Dialog/intro.json`) to match Neocities deployment.
- No `NEO/` folder is used on the live site — GitHub structure is flattened to match.
- Codex and Copilot are used for code review, debugging, and prompt-based development.
- Dialog files follow a strict JSON format for compatibility with the SUBSTRATUM loader.

---

## 🚀 Getting Started

To run locally:
1. Clone the repo
2. Open `index.html` in a browser
3. Ensure all assets are in the root folder (no subfolder nesting unless mirrored)

To deploy:
- Upload files directly to Neocities root
- Maintain folder structure for `Dialog/` and `investigation/`

---

## 🛠 Tools Used

- HTML5 / CSS3 / JavaScript
- SVG for interactive overlays
- GitHub for version control
- Neocities for hosting
- Codex + Copilot for AI-assisted development

---

## 📜 License

This project is private and not licensed for redistribution.  
All assets, code, and narrative content are © StoveGod

