import { Test, TestingModule } from '@nestjs/testing';
import { CarbonController } from './carbon.controller';
import { CarbonService } from './carbon.service';

describe('CarbonController', () => {
  let controller: CarbonController;
  let carbonService: jest.Mocked<CarbonService>;

  beforeEach(async () => {
    carbonService = {
      analyzeDescription: jest.fn(),
    } as unknown as jest.Mocked<CarbonService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarbonController],
      providers: [
        {
          provide: CarbonService,
          useValue: carbonService,
        },
      ],
    }).compile();

    controller = module.get<CarbonController>(CarbonController);
  });

  it('should delegate analysis to CarbonService', () => {
    const expectedResult = {
      description: 'Hoy comí carne y viajé 20km en bus',
      activities: [],
      totalCo2Kg: 8.39,
    };

    carbonService.analyzeDescription.mockReturnValue(expectedResult);

    const result = controller.analyze({
      description: 'Hoy comí carne y viajé 20km en bus',
    });

    expect(carbonService.analyzeDescription).toHaveBeenCalledWith(
      'Hoy comí carne y viajé 20km en bus',
    );
    expect(result).toEqual(expectedResult);
  });
});
