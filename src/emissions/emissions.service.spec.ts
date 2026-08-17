import { EmissionsService } from './emissions.service';

describe('EmissionsService', () => {
  let service: EmissionsService;

  beforeEach(() => {
    service = new EmissionsService();
  });

  it('should calculate transport emissions based on distance and factor', () => {
    const result = service.calculateEmissions('Viajé 20km en bus', [
      {
        type: 'transport',
        category: 'bus',
        description: '20km en bus',
        quantity: 20,
        unit: 'km',
      },
    ]);

    expect(result.activities[0].co2Kg).toBe(1.78);
    expect(result.totalCo2Kg).toBe(1.78);
  });

  it('should calculate food emissions per meal', () => {
    const result = service.calculateEmissions('Comí carne', [
      {
        type: 'food',
        category: 'beef',
        description: 'Comí carne',
        quantity: 1,
        unit: 'meal',
      },
    ]);

    expect(result.activities[0].co2Kg).toBe(6.61);
    expect(result.totalCo2Kg).toBe(6.61);
  });

  it('should sum emissions from multiple activities', () => {
    const result = service.calculateEmissions(
      'Hoy comí carne y viajé 20km en bus',
      [
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
      ],
    );

    expect(result.totalCo2Kg).toBe(8.39);
    expect(result.description).toBe('Hoy comí carne y viajé 20km en bus');
  });

  it('should return zero emissions for walking', () => {
    const result = service.calculateEmissions('Caminé al trabajo', [
      {
        type: 'transport',
        category: 'walking',
        description: 'Caminé al trabajo',
        quantity: 1,
        unit: 'km',
      },
    ]);

    expect(result.totalCo2Kg).toBe(0);
  });
});
