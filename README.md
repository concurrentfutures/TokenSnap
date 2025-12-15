# TokenSnap – Chrome Extension for Discord Token Management

A lightweight, open-source browser extension that lets you **copy your current Discord token** or **log in with a custom token** in two clicks.  
Built for power-users, testers, and developers who need quick token access without digging through DevTools.

---

## ⚡ Features

- **One-click copy** of the active Discord token (from `localStorage`)
- **Manual login** – paste any token and instantly reload the page as that user
- **Dark-mode UI** that matches Discord’s native look
- **Zero permissions** outside `discord.com` domains
- **Fail-safe checks** – warns if you’re not on Discord or if the token is missing/invalid

---

## 🚀 Install from Source

1. Clone or download this repo  
2. Open Chrome/Edge → `chrome://extensions`  
3. Enable **Developer mode** (toggle, top right)  
4. Click **Load unpacked** → select the extension folder  
5. Pin the **TokenSnap** icon to your toolbar

---

## 🎯 Usage

1. Navigate to [https://discord.com](https://discord.com) and log in normally  
2. Click the TokenSnap icon → **Copy Token**  
   *(Token is copied to clipboard and trimmed of surrounding quotes)*  
3. *(Optional)* click **“Log in with a token instead”**, paste a different token, and hit **Log In** – the tab will reload under the new identity

---

## 🔒 Privacy & Security

- **No data leaves your machine** – everything happens locally in the browser  
- The extension only runs on `*://*.discord.com/*` pages  
- Tokens are read/written exclusively to Discord’s own `localStorage` – we don’t store or transmit anything

---

## 🛠️ File Map

| File           | Purpose |
|----------------|---------|
| `manifest.json` | Extension metadata & permissions |
| `content.js`    | Injected into Discord pages to read/write `localStorage.token` |
| `popup.html`    | The UI of the popup |
| `popup.js`      | Popup logic, clipboard access, tab messaging |

---

## ⚠️ Disclaimer

Using someone else’s token without permission violates Discord’s Terms of Service.  
This tool is provided for educational and legitimate testing purposes only – the authors are not responsible for any misuse.

---

## 📄 License

MIT – feel free to fork, improve, and redistribute.
