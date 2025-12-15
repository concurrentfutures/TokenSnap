chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getToken") {
    try {
      const token = localStorage.getItem("token");
      console.log("TokenSnap: Retrieved token from localStorage:", token);
      sendResponse({ token: token ? token.replace(/"/g, "") : null });
    } catch (err) {
      console.error("TokenSnap: Error retrieving token:", err);
      sendResponse({ token: null });
    }
  } else if (request.action === "setToken") {
    try {
      const cleanedToken = request.token.replace(/"/g, "").trim();
      console.log("TokenSnap: Setting token in localStorage:", cleanedToken);
      localStorage.setItem("token", cleanedToken);
      // Verify token was set
      const storedToken = localStorage.getItem("token");
      if (storedToken === cleanedToken) {
        console.log("TokenSnap: Token successfully set in localStorage");
        sendResponse({ success: true });
      } else {
        console.error("TokenSnap: Token set verification failed, stored:", storedToken);
        sendResponse({ success: false });
      }
    } catch (err) {
      console.error("TokenSnap: Failed to set token in localStorage:", err);
      sendResponse({ success: false });
    }
  }
  return true; 
});