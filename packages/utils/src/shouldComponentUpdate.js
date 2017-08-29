function shouldComponentUpdate(keys, currentProps, nextProps) {
  return keys.some(key => currentProps[key] !== nextProps[key]);
}

export default shouldComponentUpdate;
