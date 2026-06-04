export const BrandColors = {
  primary: "#8dc63f",
  primaryDark: "#6aad28",
  dark: "#1a1a2e",
  orange: "#FF8C00",
  white: "#ffffff",
  orangeMoney: "#FF6600",
  mvola: "#C8A800",
  mvolaText: "#1a6600",
  airtel: "#CC0000",
};

export const LightColors = {
  background: "#f4f4f4",
  card: "#ffffff",
  text: "#333333",
  textSecondary: "#666666",
  border: "#f0f0f0",
  icon: "#8dc63f",
  chevron: "#cccccc",
  ...BrandColors,
};

export const DarkColors = {
  background: "#121212",
  card: "#1e1e1e",
  text: "#ffffff",
  textSecondary: "#aaaaaa",
  border: "#2c2c2c",
  icon: "#8dc63f",
  chevron: "#555555",
  ...BrandColors,
};

export const Colors = {
  light: LightColors,
  dark: DarkColors,
};

export default Colors;
