import { Module } from '@nestjs/common';
import { EmissionsService } from './emissions.service';

@Module({
  providers: [EmissionsService],
  exports: [EmissionsService],
})
export class EmissionsModule {}
