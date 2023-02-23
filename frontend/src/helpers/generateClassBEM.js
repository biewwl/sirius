const generateClassName = (primaryClass) => {
  return (element, variation, otherClass) => {
    const formattedOtherClass = otherClass ? ` ${otherClass}` : "";
    return `${primaryClass}__${element}${
      variation ?? ""
    }${formattedOtherClass}`;
  };
};

export default generateClassName;
