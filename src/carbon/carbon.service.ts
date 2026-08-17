import { Inject, Injectable } from '@nestjs/common';
import { EmissionsService } from '../emissions/emissions.service';
import type { CarbonAnalysisResult } from '../emissions/interfaces/activity-emission.interface';
import { ACTIVITY_PARSER } from '../parsing/interfaces/activity-parser.interface';
import type { ActivityParser } from '../parsing/interfaces/activity-parser.interface';

@Injectable()
export class CarbonService {
  constructor(
    @Inject(ACTIVITY_PARSER)
    private readonly activityParser: ActivityParser,
    private readonly emissionsService: EmissionsService,
  ) {}

  analyzeDescription(description: string): CarbonAnalysisResult {
    const activities = this.activityParser.parse(description);
    return this.emissionsService.calculateEmissions(description, activities);
  }
}
