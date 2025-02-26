// Override visibility APIs to keep videos playing
Object.defineProperty(Document.prototype, 'hidden', { 
    get: () => false
  });
  
  Object.defineProperty(Document.prototype, 'visibilityState', { 
    get: () => 'visible'
  });
  
  // Prevent visibility change detection
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (type === 'visibilitychange') return;
    return originalAddEventListener.call(this, type, listener, options);
  };
  
  const originalDispatchEvent = EventTarget.prototype.dispatchEvent;
  EventTarget.prototype.dispatchEvent = function(event) {
    if (event.type === 'visibilitychange') return true;
    return originalDispatchEvent.call(this, event);
  };
  