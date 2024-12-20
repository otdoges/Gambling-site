export const ROWS = 16;
export const COLS = 17;
export const MULTIPLIERS = [110, 41, 10, 5, 3, 1.5, 1, 0.5, 0.3, 0.5, 1, 1.5, 3, 5, 10, 41, 110];

export const getMultiplierColor = (multiplier: number): string => {
  if (multiplier >= 50) return '#FF4444';  // Red
  if (multiplier >= 10) return '#FF8800';  // Orange
  if (multiplier >= 3) return '#FFAA00';   // Light Orange
  if (multiplier >= 1) return '#FFCC00';   // Yellow
  return '#FFDD00';                        // Light Yellow
};

export const getMultiplierGradient = (multiplier: number): string => {
  const baseColor = getMultiplierColor(multiplier);
  return `linear-gradient(180deg, ${baseColor} 0%, ${adjustColor(baseColor, -20)} 100%)`;
};

function adjustColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}