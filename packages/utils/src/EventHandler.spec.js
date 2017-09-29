import {
  setTarget,
  setCurrentTarget
} from '../src/EventHandler';

Event.prototype.preventDefault = function () {
  this.returnValue = false;
};
Event.prototype.stopPropagation = function () {
  this.cancelBubble = true;
};

let div;
let count;
const handlers = {};

function removeHandler(type) {
  div.off(type, handlers[type]);
  delete handlers[type];
}

function addHandler(type, handler) {
  handlers[type] = handler;
  div.on(type, handler);
}

function addClickHandler() {
  addHandler('click', () => {
    count++;
  });
}

function addClickListener() {
  addHandler('click', {
    handleEvent: () => {
      count++;
    }
  });
}

function addMouseoverHandler() {
  addHandler('mouseover', () => {
    count = -1000;
  });
}

function removeMouseoverHandler() {
  removeHandler('mouseover');
}

function clickOnDiv() {
  const eventClick = document.createEvent('MouseEvents');
  eventClick.initEvent('click', true, true);
  div.dispatchEvent(eventClick);
}

function assertCountValue(value) {
  return () => {
    expect(count).to.equal(value);
  };
}

function removeDiv() {
  document.body.removeChild(div);
}

function createDivForWebkit() {
  count = 0;
  div = document.createElement('div');
  div.on = window.Element.prototype.on;
  div.off = window.Element.prototype.off;
  document.body.appendChild(div);
}

function createDivForInternetExplorer() {
  count = 0;
  div = document.createElement('div');
  div.on = window.Element.prototype.on;
  div.off = window.Element.prototype.off;
  div.$addEventListener = div.addEventListener;
  div.$removeEventListener = div.removeEventListener;
  div.attachEvent = (type, arg) => {
    div.$addEventListener(type.slice(2), arg);
  };
  div.detachEvent = (type, arg) => {
    div.$removeEventListener(type.slice(2), arg);
  };
  div.addEventListener = null;
  div.removeEventListener = null;
  document.body.appendChild(div);
}

describe('document', () => {
  describe('document methods', () => {
    it('Then should have on method defined', () => {
      expect(document.on).to.not.be.undefined;
    });
    it('And off method defined', () => {
      expect(document.off).to.not.be.undefined;
    });
  });
});

describe('Event', () => {
  let event;
  function buildEvent() {
    event = new Event();
  }

  describe('setTarget should assign value', () => {
    let obj;
    it('Given assignable object', () => obj = {});
    it('When set target to true', () => setTarget(obj, true));
    it('Then the target value should be true',() => {
      expect(obj.target).to.be.true;
    });
  });

  describe('setCurrentTarget should assign value', () => {
    let obj;
    it('Given assignable object', () => obj = Object.freeze({}));
    it('When set current target to true', () => setCurrentTarget(obj, true));
    it('Then the target value should be true',() => {
      expect(obj.currentTarget).to.be.undefined;
    });
  });

  describe('preventDefault should set the returnValue to false', () => {
    it('Given an event has been created', buildEvent);
    it('When preventDefault is performed', () => event.preventDefault());
    it('Then returnValue should be false',() => {
      expect(event.returnValue).to.be.false;
    });
  });

  describe('stopPropagation should set the cancelBubble to true', () => {
    it('Given an event has been created', buildEvent);
    it('When stopPropagation is performed', () => event.stopPropagation());
    it('Then cancelBubble should be true',() => {
      expect(event.cancelBubble).to.be.true;
    });
  });

});

describe(`Element testing event handlers for attachEvent present - for Internet Explorer`, () => {

  describe('Element click event should increment count on Internet Explorer', () => {
    it('Given a div element has been created with click handler for Internet Explorer', () => {
      createDivForInternetExplorer();
      addClickHandler();
    });
    it('When div is clicked', clickOnDiv);
    it('Then count should have value 1', assertCountValue(1));

    after(removeDiv);
  });

  describe('Element click handler listener should increment count on Internet Explorer', () => {
    it('Given a div element has been created with click listener for Internet Explorer', () => {
      createDivForInternetExplorer();
      addClickListener();
    });
    it('When div is clicked', clickOnDiv);
    it('Then count should have value 1', assertCountValue(1));

    after(removeDiv);
  });

  describe('Element active handlers should remain after removing on specific handler on Internet Explorer', () => {
    it('Given a div element has been created with click and mouseover handlers for Internet Explorer', () => {
      createDivForInternetExplorer();
      addMouseoverHandler();
      addClickHandler();
    });
    it('When div is clicked', clickOnDiv);
    it('And mouseover handler is removed', removeMouseoverHandler);
    it('And div is clicked again', clickOnDiv);
    it('Then count should have value 2', assertCountValue(2));

    after(removeDiv);
  });
});

describe(`Element testing event handlers for addEventListener present`, () => {
  describe('Element click event should increment count on a Webkit Browser', () => {
    it('Given a div element has been created with click handler for a Webkit Browser', () => {
      createDivForWebkit();
      addClickHandler();
    });
    it('When div is clicked', clickOnDiv);
    it('Then count should have value 1', assertCountValue(1));

    after(removeDiv);
  });

  describe('Element click handler listener should increment count on a Webkit Browser', () => {
    it('Given a div element has been created with click listener for a Webkit Browser', () => {
      createDivForWebkit();
      addClickListener();
    });
    it('When div is clicked', clickOnDiv);
    it('Then count should have value 1', assertCountValue(1));

    after(removeDiv);
  });

  describe('Element active handlers should remain after removing on specific handler on a Webkit Browser', () => {
    it('Given a div element has been created with click and mouseover handlers for a Webkit Browser', () => {
      createDivForWebkit();
      addMouseoverHandler();
      addClickHandler();
    });
    it('When div is clicked', clickOnDiv);
    it('And mouseover handler is removed', removeMouseoverHandler);
    it('And div is clicked again', clickOnDiv);
    it('Then count should have value 2', assertCountValue(2));

    after(removeDiv);
  });
});
