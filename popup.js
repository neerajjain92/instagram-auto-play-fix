// Load the saved state
chrome.storage.sync.get(['enabled'], function(result) {
    document.getElementById('toggleSwitch').checked = result.enabled !== false;
  });
  
  // Save state changes
  document.getElementById('toggleSwitch').addEventListener('change', function(e) {
    const enabled = e.target.checked;
    chrome.storage.sync.set({ enabled });
    
    // Send message to content script
    chrome.tabs.query({url: "*://*.instagram.com/*"}, function(tabs) {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, { enabled });
      });
    });
  });
  