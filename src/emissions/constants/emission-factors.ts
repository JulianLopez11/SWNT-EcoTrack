export const TRANSPORT_EMISSION_FACTORS_KG_PER_KM: Record<string, number> = {
  car: 0.21,
  bus: 0.089,
  metro: 0.041,
  train: 0.041,
  motorcycle: 0.113,
  bicycle: 0,
  walking: 0,
  plane: 0.255,
  taxi: 0.21,
};

export const FOOD_EMISSION_FACTORS_KG_PER_MEAL: Record<string, number> = {
  beef: 6.61,
  chicken: 1.57,
  fish: 1.5,
  vegetarian: 0.75,
  vegan: 0.5,
};

export const DEFAULT_TRANSPORT_MODE = 'car';
export const DEFAULT_FOOD_TYPE = 'beef';
export const DEFAULT_TRANSPORT_DISTANCE_KM = 1;
export const DEFAULT_FOOD_QUANTITY_MEALS = 1;
