import { ParsedActivity } from './parsed-activity.interface';

export interface ActivityParser {
  parse(description: string): ParsedActivity[];
}

export const ACTIVITY_PARSER = Symbol('ACTIVITY_PARSER');
