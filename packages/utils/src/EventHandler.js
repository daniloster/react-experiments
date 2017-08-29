const alias = {
  DOMContentLoaded: 'onreadystatechange',
  get: type => alias[type] || `on${type}`,
};
function attachHandler(self, type, handler) {
  if (self.addEventListener) {
    self.addEventListener(type, handler);
  } else {
    const finalType = alias.get(type);
    self.attachEvent(finalType, handler);
  }
}
function detachHandler(self, type, handler) {
  if (self.removeEventListener) {
    self.removeEventListener(type, handler);
  } else {
    const finalType = alias.get(type);
    self.detachEvent(finalType, handler);
  }
}

const eventListeners = [];

function setTarget(e, value) {
  try {
    e.target = value;
  } catch (ex) {
      // Surrounding exception
  }
}

function setCurrentTarget(e, value) {
  try {
    e.currentTarget = value;
  } catch (ex) {
      // Surrounding exception
  }
}

function addEventListener(type, listener /* , useCapture (will be ignored) */) {
  const self = this;
  const wrapper = (e) => {
    setTarget(e, e.srcElement);
    setCurrentTarget(e, self);
    if (typeof listener.handleEvent !== 'undefined') {
      listener.handleEvent(e);
    } else {
      listener.call(self, e);
    }
  };
  attachHandler(self, type, wrapper);
  eventListeners.push({ object: this, type, listener, wrapper });
}

function removeEventListener(type, listener /* , useCapture (will be ignored) */) {
  let counter = 0;
  while (counter < eventListeners.length) {
    const eventListener = eventListeners[counter];
    if (eventListener.object === this
      && eventListener.type === type
      && eventListener.listener === listener) {
      detachHandler(this, type, eventListener.wrapper);
      eventListeners.splice(counter, 1);
      break;
    }
    counter += 1;
  }
}

window.Element.prototype.on = addEventListener;
window.Element.prototype.off = removeEventListener;

window.HTMLDocument.prototype.on = addEventListener;
window.HTMLDocument.prototype.off = removeEventListener;

window.on = addEventListener;
window.off = removeEventListener;

window.document.on = addEventListener;
window.document.off = removeEventListener;

export { setTarget };
export { setCurrentTarget };
