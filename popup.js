document.addEventListener("DOMContentLoaded", () => {
  const copyButton = document.getElementById("copyButton");
  const loginButton = document.getElementById("loginButton");
  const tokenInput = document.getElementById("tokenInput");
  const toggleLogin = document.getElementById("toggleLogin");
  const loginContainer = document.getElementById("loginContainer");
  const status = document.getElementById("status");

  toggleLogin.addEventListener("click", () => {
    const isHidden = loginContainer.style.display === "none";
    loginContainer.style.display = isHidden ? "flex" : "none";
    toggleLogin.textContent = isHidden ? "Hide login form" : "Log in with a token instead";
  });

  tokenInput.addEventListener("input", () => {
    loginButton.disabled = !tokenInput.value.trim();
  });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab.url.includes("discord.com")) {
      showStatus("Open Discord to use TokenSnap!", "#ED4245", 3000);
      return;
    }

    chrome.tabs.sendMessage(activeTab.id, { action: "getToken" }, (response) => {
      if (chrome.runtime.lastError || !response || !response.token) {
        showStatus("No token found! Are you logged in?", "#ED4245", 3000);
        console.log("TokenSnap: No token found in localStorage", chrome.runtime.lastError?.message);
        return;
      }
      copyButton.disabled = false;
      const token = response.token;

      copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(token).then(() => {
          showStatus("Token copied!", "#43B581", 2000);
        }).catch((err) => {
          showStatus("Copy failed!", "#ED4245", 2000);
          console.error("TokenSnap: Failed to copy token:", err);
        });
      });
    });

    loginButton.addEventListener("click", () => {
      const inputToken = tokenInput.value.trim();
      if (!inputToken) {
        showStatus("Please enter a token!", "#ED4245", 3000);
        return;
      }
      console.log("TokenSnap: Attempting to set token:", inputToken);
      chrome.tabs.sendMessage(activeTab.id, { action: "setToken", token: inputToken }, (response) => {
        if (chrome.runtime.lastError || !response || !response.success) {
          showStatus("Login failed! Invalid token or error.", "#ED4245", 3000);
          console.error("TokenSnap: Failed to set token:", chrome.runtime.lastError?.message || "No response");
          return;
        }
        console.log("TokenSnap: Token set successfully, reloading page");
        showStatus("Logging in...", "#43B581", 2000);
        setTimeout(() => {
          chrome.tabs.reload(activeTab.id, {}, () => {
            if (chrome.runtime.lastError) {
              showStatus("Page reload failed!", "#ED4245", 3000);
              console.error("TokenSnap: Failed to reload page:", chrome.runtime.lastError.message);
            }
          });
        }, 100);
      });
    });
  });

  function showStatus(message, color, duration) {
    status.textContent = message;
    status.style.color = color;
    status.classList.add("show");
    setTimeout(() => {
      status.classList.remove("show");
      setTimeout(() => {
        status.textContent = "";
      }, 300);
    }, duration);
  }
});