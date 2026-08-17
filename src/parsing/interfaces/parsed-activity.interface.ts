export type ActivityType = 'transport' | 'food';

export interface ParsedActivity {
  type: ActivityType;
  category: string;
  description: string;
  quantity: number;
  unit: string;
}
