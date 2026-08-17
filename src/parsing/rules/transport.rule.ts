import { ParsedActivity } from '../interfaces/parsed-activity.interface';
import { splitDescriptionSegments } from '../utils/segment-splitter';

interface TransportMode {
  category: string;
  keywords: string[];
}

const TRANSPORT_MODES: TransportMode[] = [
  { category: 'bus', keywords: ['bus', 'autobus', 'autobús', 'transporte publico', 'transporte público'] },
  { category: 'metro', keywords: ['metro', 'subte', 'subterraneo', 'subterráneo'] },
  { category: 'train', keywords: ['tren', 'ferrocarril'] },
  { category: 'car', keywords: ['carro', 'auto', 'coche', 'automovil', 'automóvil'] },
  { category: 'taxi', keywords: ['taxi', 'uber', 'cabify', 'didi'] },
  { category: 'motorcycle', keywords: ['moto', 'motocicleta', 'motociclo'] },
  { category: 'plane', keywords: ['avion', 'avión', 'vuelo'] },
  { category: 'bicycle', keywords: ['bicicleta', 'bici', 'ciclismo'] },
  { category: 'walking', keywords: ['camine', 'caminé', 'caminando', 'a pie', 'pie'] },
];

const TRANSPORT_VERBS =
  /\b(viaj[eé]|viajando|fui|fui en|tom[eé]|us[eé]|utilic[eé]|utilice|me mov[ií]|me movi|conduje|manej[eé]|maneje|recorr[ií]|recorri)\b/i;

const DISTANCE_PATTERN =
  /(\d+(?:[.,]\d+)?)\s*(?:km|kil[oó]metros?|kilometros?)/gi;

function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function detectTransportMode(text: string): string | null {
  const normalized = normalizeText(text);

  for (const mode of TRANSPORT_MODES) {
    if (mode.keywords.some((keyword) => normalized.includes(normalizeText(keyword)))) {
      return mode.category;
    }
  }

  return null;
}

function parseDistance(value: string): number {
  return parseFloat(value.replace(',', '.'));
}

function buildTransportActivity(
  category: string,
  quantity: number,
  originalText: string,
): ParsedActivity {
  return {
    type: 'transport',
    category,
    description: originalText.trim(),
    quantity,
    unit: 'km',
  };
}

function extractTransportFromSegment(segment: string): ParsedActivity | null {
  const trimmed = segment.trim();
  if (!trimmed) {
    return null;
  }

  const category = detectTransportMode(trimmed);
  const hasTransportContext = category !== null || TRANSPORT_VERBS.test(trimmed);

  if (!hasTransportContext) {
    return null;
  }

  const distanceMatches = [...trimmed.matchAll(DISTANCE_PATTERN)];

  if (distanceMatches.length > 0) {
    const match = distanceMatches[0];
    const quantity = parseDistance(match[1]);

    return buildTransportActivity(
      category ?? 'car',
      quantity,
      match[0],
    );
  }

  if (category) {
    return buildTransportActivity(category, 1, trimmed);
  }

  return null;
}

export function parseTransportActivities(description: string): ParsedActivity[] {
  const segments = splitDescriptionSegments(description);
  const activities: ParsedActivity[] = [];

  for (const segment of segments) {
    const activity = extractTransportFromSegment(segment);
    if (activity) {
      activities.push(activity);
    }
  }

  if (activities.length === 0) {
    const fullTextActivity = extractTransportFromSegment(description);
    if (fullTextActivity) {
      activities.push(fullTextActivity);
    }
  }

  return activities;
}
