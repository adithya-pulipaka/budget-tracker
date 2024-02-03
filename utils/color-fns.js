export function getColorList(numOfColors) {
  let colors = [];
  for (let i = 0; i < numOfColors; i++) {
    const color = Math.random().toString(16).slice(-6);
    colors.push("#" + color);
  }
  return colors;
}
