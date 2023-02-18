const loadingsQty = (qty) => {
  const loadingArray = [];
  for (let i = 0; i < qty; i += 1) {
    loadingArray.push("");
  }
  return loadingArray;
};

export default loadingsQty;
