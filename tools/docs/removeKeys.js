module.exports = function (map, excludeKeys) {
  return Object.keys(map).reduce((currentMap, key) => {
    const newMap = currentMap;
    if (excludeKeys.indexOf(key) === -1) {
      newMap[key] = map[key];
    }

    return newMap;
  }, {});
};
