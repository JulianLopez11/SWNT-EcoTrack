import { Test, TestingModule } from '@nestjs/testing';
import { CarbonService } from './carbon.service';
import { EmissionsService } from '../emissions/emissions.service';
import {
  ACTIVITY_PARSER,
  ActivityParser,
} from '../parsing/interfaces/activity-parser.interface';

describe('CarbonService', () => {
  let service: CarbonService;
  let activityParser: jest.Mocked<ActivityParser>;

  beforeEach(async () => {
    activityParser = {
      parse: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarbonService,
        EmissionsService,
        {
          provide: ACTIVITY_PARSER,
          useValue: activityParser,
        },
      ],
    }).compile();

    service = module.get<CarbonService>(CarbonService);
  });

  it('should orchestrate parsing and emission calculation', () => {
    activityParser.parse.mockReturnValue([
      {
        type: 'food',
        category: 'beef',
        description: 'Comí carne',
        quantity: 1,
        unit: 'meal',
      },
      {
        type: 'transport',
        category: 'bus',
        description: '20km en bus',
        quantity: 20,
        unit: 'km',
      },
    ]);

    const result = service.analyzeDescription(
      'Hoy comí carne y viajé 20km en bus',
    );

    expect(activityParser.parse).toHaveBeenCalledWith(
      'Hoy comí carne y viajé 20km en bus',
    );
    expect(result.activities).toHaveLength(2);
    expect(result.totalCo2Kg).toBe(8.39);
  });

  it('should return zero total when no activities are detected', () => {
    activityParser.parse.mockReturnValue([]);

    const result = service.analyzeDescription('Día tranquilo');

    expect(result.activities).toHaveLength(0);
    expect(result.totalCo2Kg).toBe(0);
  });
});
