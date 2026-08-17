import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AnalyzeCarbonDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description: string;
}
