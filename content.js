let enabled = true;

// Check initial state
chrome.storage.sync.get(['enabled'], function(result) {
  enabled = result.enabled !== false;
  if (enabled) {
    injectScript();
  }
});

// Listen for toggle changes
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.enabled !== undefined) {
    enabled = request.enabled;
    if (enabled) {
      injectScript();
    } else {
      // Reload the page to disable the feature
      window.location.reload();
    }
  }
});

function injectScript() {
  if (!enabled) return;
  
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('inject.js');
  script.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);
}
