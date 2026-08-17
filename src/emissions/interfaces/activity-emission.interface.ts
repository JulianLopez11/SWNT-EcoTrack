import { ParsedActivity } from '../../parsing/interfaces/parsed-activity.interface';

export interface ActivityEmission extends ParsedActivity {
  co2Kg: number;
}

export interface CarbonAnalysisResult {
  description: string;
  activities: ActivityEmission[];
  totalCo2Kg: number;
}
