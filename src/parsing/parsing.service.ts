import { Injectable } from '@nestjs/common';
import { ActivityParser } from './interfaces/activity-parser.interface';
import { ParsedActivity } from './interfaces/parsed-activity.interface';
import { parseFoodActivities } from './rules/food.rule';
import { parseTransportActivities } from './rules/transport.rule';

@Injectable()
export class RuleBasedParsingService implements ActivityParser {
  parse(description: string): ParsedActivity[] {
    const transportActivities = parseTransportActivities(description);
    const foodActivities = parseFoodActivities(description);

    return [...transportActivities, ...foodActivities];
  }
}
