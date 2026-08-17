import { ParsedActivity } from '../interfaces/parsed-activity.interface';
import { splitDescriptionSegments } from '../utils/segment-splitter';

interface FoodType {
  category: string;
  keywords: string[];
}

const FOOD_TYPES: FoodType[] = [
  { category: 'beef', keywords: ['carne de res', 'carne', 'res', 'ternera', 'bistec', 'hamburguesa'] },
  { category: 'chicken', keywords: ['pollo', 'ave'] },
  { category: 'fish', keywords: ['pescado', 'atun', 'atún', 'salmon', 'salmón', 'mariscos'] },
  { category: 'vegetarian', keywords: ['vegetariano', 'vegetariana', 'verduras', 'ensalada'] },
  { category: 'vegan', keywords: ['vegano', 'vegana', 'plant based', 'a base de plantas'] },
];

const FOOD_VERBS =
  /\b(com[ií]|almorc[eé]|desayun[eé]|cen[eé]|tom[eé]|comiendo|almorzando|desayunando|cene|almorce|desayune)\b/i;

function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function detectFoodType(text: string): string | null {
  const normalized = normalizeText(text);

  for (const food of FOOD_TYPES) {
    const sortedKeywords = [...food.keywords].sort((a, b) => b.length - a.length);

    if (sortedKeywords.some((keyword) => normalized.includes(normalizeText(keyword)))) {
      return food.category;
    }
  }

  return null;
}

function extractFoodFromSegment(segment: string): ParsedActivity | null {
  const trimmed = segment.trim();
  if (!trimmed) {
    return null;
  }

  const category = detectFoodType(trimmed);
  const hasFoodContext = category !== null || FOOD_VERBS.test(trimmed);

  if (!hasFoodContext) {
    return null;
  }

  return {
    type: 'food',
    category: category ?? 'beef',
    description: trimmed,
    quantity: 1,
    unit: 'meal',
  };
}

export function parseFoodActivities(description: string): ParsedActivity[] {
  const segments = splitDescriptionSegments(description);
  const activities: ParsedActivity[] = [];

  for (const segment of segments) {
    const activity = extractFoodFromSegment(segment);
    if (activity) {
      activities.push(activity);
    }
  }

  if (activities.length === 0) {
    const fullTextActivity = extractFoodFromSegment(description);
    if (fullTextActivity) {
      activities.push(fullTextActivity);
    }
  }

  return activities;
}
