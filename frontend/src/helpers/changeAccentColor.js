const changeAccentColor = (newColor) => {
  document.documentElement.style.setProperty("--accent", `${newColor}`);
  document.documentElement.style.setProperty("--accent-light", `${newColor}21`);
};

export default changeAccentColor;
