const RATIO_DIFF = 0.9;
const SUBTRACTION_DIFF = 5;

function getDeltaX(e) {
  const wheelDeltaX = e.nativeEvent.wheelDeltaX || e.wheelDeltaX;
  const deltaX = e.nativeEvent.deltaX || e.deltaX;
  // Inverted axis: the wheelDeltaX is the same as deltaX, then, it is required to invert it
  return wheelDeltaX === deltaX
    ? -wheelDeltaX :
    deltaX;
}

function getDeltaY(e) {
  return e.nativeEvent.wheelDeltaY
    || e.nativeEvent.deltaY
    || e.wheelDeltaY
    || e.deltaY;
}

/**
 * Event handler that cancels the swipe navigation on a scrollable container.
 * Usage:
 * const handler = cancelSwipeNavigation.bind(scrollableElementHere);
 * Having the handler, it is just required to attach as event listener to the
 * event "mousewheel" or onWheel (for react elements).
 * @param e {Event} - represents the event arguments passed down by the event
 */
function cancelSwipeNavigation(e) {
  const scrollableElement = this;
  const deltaX = getDeltaX(e);
  const deltaY = getDeltaY(e);
  const isInitialPosition = document.body.scrollLeft === 0 && scrollableElement.scrollLeft === 0;
  const isInvalidDiff = Math.abs(deltaX / deltaY) >= RATIO_DIFF
    || Math.abs(Math.abs(deltaY) + deltaX) < SUBTRACTION_DIFF;
  const isInvalid = isInitialPosition && deltaX <= 0 && isInvalidDiff;
  if (isInvalid) {
    e.preventDefault();
    return false;
  }
  return true;
}

export default cancelSwipeNavigation;
