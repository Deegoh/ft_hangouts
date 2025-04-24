const adjustColor = (hexColor: string, magnitude: number) => {
  hexColor = hexColor.replace('#', '');
  if (hexColor.length === 6) {
    const decColor = parseInt(hexColor, 16);
    let r = (decColor >> 16) + magnitude;
    r = Math.min(Math.max(r, 0), 255);
    let g = ((decColor & 0x0000ff) + magnitude);
    g = Math.min(Math.max(g, 0), 255);
    let b = ((decColor >> 8) & 0x00ff) + magnitude;
    b = Math.min(Math.max(b, 0), 255);
    return `#${(g | (b << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
  }
  return hexColor;
}

export { adjustColor };