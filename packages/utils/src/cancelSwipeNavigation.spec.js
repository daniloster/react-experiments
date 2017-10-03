import React, {
  Component
} from 'react';
import '../src/EventHandler';
import { mount } from 'enzyme';
import {
  cancelSwipeNavigation,
  getDeltaY
} from '../src';

describe('cancelSwipeNavigation', () => {
  let element, returnValue;

  class Scrollable extends Component {
    componentDidMount() {
      this.refs.scrollableContainer.on = Element.prototype.on;
      this.refs.scrollableContainer.off = Element.prototype.off;
      this.handleWheel = cancelSwipeNavigation.bind(this.refs.scrollableContainer);
    }

    onWheel = ((e) => {
      e.$preventDefault = e.preventDefault;
      e.preventDefault = function () {
        returnValue = false;
        e.$preventDefault();
      };
      this.handleWheel(e);
    }).bind(this)

    render() {
      return (
        <div
          onWheel={this.onWheel}
          ref="scrollableContainer"
          style={{ width: '400px', height: '200px', overflow: 'scroll' }}
        >
          <div style={{ display: 'inline', width: '200px', height: '400px' }}>
            BLA
        </div>
          <div style={{ display: 'inline', width: '200px', height: '400px' }}>
            BLA
        </div>
          <div style={{ display: 'inline', width: '200px', height: '400px' }}>
            BLA
        </div>
          <div style={{ display: 'inline', width: '200px', height: '400px' }}>
            BLA
        </div>
          <div style={{ display: 'inline', width: '200px', height: '400px' }}>
            BLA
        </div>
        </div>
      );
    }
  }

  function mountScrollable() {
    element = mount(<Scrollable />);
  }

  function mountScrollableAtLeft0() {
    mountScrollable();
    element.instance().refs.scrollableContainer.scrollLeft = 0;
    document.body.scrollLeft = 0;
  }

  describe('cancelSwipeNavigation should cancel swipe navigation for bigger horizontal scrolling', () => {
    const eventData = {
      deltaX: -300,
      deltaY: 2
    };
    before(() => returnValue = true);

    it('Given a scrollable element at scrollLeft = 0', mountScrollableAtLeft0);
    it('When the element is scrolled horizontally', () => element.simulate('wheel', {
      ...eventData
    }));
    it('Expect the returnValue is false', () => expect(returnValue).to.be.equal(false));
  });

  describe('cancelSwipeNavigation should cancel swipe navigation for inverted axis', () => {
    const eventData = {
      deltaX: 300,
      // When we have inverted axis: wheelDeltaX === deltaX
      wheelDeltaX: 300,
      deltaY: 2
    };
    before(() => returnValue = true);

    it('Given a scrollable element at scrollLeft = 0', mountScrollableAtLeft0);
    it('When the element is scrolled horizontally', () => element.simulate('wheel', {
      ...eventData
    }));
    it('Expect the returnValue is false', () => expect(returnValue).to.be.equal(false));
  });

  describe('cancelSwipeNavigation should not cancel swipe navigation for bigger vertical scrolling', () => {
    const eventData = {
      deltaX: -2,
      deltaY: -8
    };
    before(() => returnValue = true);

    it('Given a scrollable element at scrollLeft = 0', mountScrollableAtLeft0);
    it('When the element is scrolled horizontally', () => element.simulate('wheel', {
      ...eventData
    }));
    it('Expect the returnValue is true', () => expect(returnValue).to.be.equal(true));
  });
});
