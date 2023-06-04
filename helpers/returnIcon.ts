import { data } from "../utils/data";

export const returnIcon = (condition: string) => {
  const icon = condition?.toLowerCase().includes("cloudy")
    ? data.icons.cloudy
    : condition?.toLowerCase().includes("sunny")
    ? data.icons.sunny
    : condition?.toLowerCase().includes("rain")
    ? data.icons.rainy
    : data.icons.thunderstorm;

  return icon;
};
