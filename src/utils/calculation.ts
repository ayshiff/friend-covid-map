export const metersToPixelsAtMaxZoom = (meters: any, latitude: any) =>
  meters / 0.075 / Math.cos((latitude * Math.PI) / 180);

export const generateRandomId = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);
