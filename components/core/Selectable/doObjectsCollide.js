const getBoundsForNode = (node) => {
  const rect = node.getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft,
    offsetWidth: node.offsetWidth,
    offsetHeight: node.offsetHeight,
  };
};

const coordsCollide = (aTop, aLeft, bTop, bLeft, aWidth, aHeight, bWidth, bHeight, tolerance) => {
  return !(
    // 'a' bottom doesn't touch 'b' top
    (
      aTop + aHeight - tolerance < bTop ||
      // 'a' top doesn't touch 'b' bottom
      aTop + tolerance > bTop + bHeight ||
      // 'a' right doesn't touch 'b' left
      aLeft + aWidth - tolerance < bLeft ||
      // 'a' left doesn't touch 'b' right
      aLeft + tolerance > bLeft + bWidth
    )
  );
};

export default (a, b, tolerance = 0) => {
  const aObj = a instanceof HTMLElement ? getBoundsForNode(a) : a;
  const bObj = b instanceof HTMLElement ? getBoundsForNode(b) : b;

  return coordsCollide(
    aObj.top,
    aObj.left,
    bObj.top,
    bObj.left,
    aObj.offsetWidth,
    aObj.offsetHeight,
    bObj.offsetWidth,
    bObj.offsetHeight,
    tolerance
  );
};
