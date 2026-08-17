import { Module } from '@nestjs/common';
import { EmissionsModule } from '../emissions/emissions.module';
import { ParsingModule } from '../parsing/parsing.module';
import { CarbonController } from './carbon.controller';
import { CarbonService } from './carbon.service';

@Module({
  imports: [ParsingModule, EmissionsModule],
  controllers: [CarbonController],
  providers: [CarbonService],
})
export class CarbonModule {}
