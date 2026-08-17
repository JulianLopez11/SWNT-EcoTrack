import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CarbonService } from './carbon.service';
import { AnalyzeCarbonDto } from './dto/analyze-carbon.dto';
import type { CarbonAnalysisResult } from '../emissions/interfaces/activity-emission.interface';

@Controller('carbon')
export class CarbonController {
  constructor(private readonly carbonService: CarbonService) {}

  @Post('analyze')
  @HttpCode(HttpStatus.OK)
  analyze(@Body() dto: AnalyzeCarbonDto): CarbonAnalysisResult {
    return this.carbonService.analyzeDescription(dto.description);
  }
}
