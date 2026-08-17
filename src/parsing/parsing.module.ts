import { Module } from '@nestjs/common';
import { ACTIVITY_PARSER } from './interfaces/activity-parser.interface';
import { RuleBasedParsingService } from './parsing.service';

@Module({
  providers: [
    RuleBasedParsingService,
    {
      provide: ACTIVITY_PARSER,
      useExisting: RuleBasedParsingService,
    },
  ],
  exports: [ACTIVITY_PARSER],
})
export class ParsingModule {}
