import { RuleBasedParsingService } from './parsing.service';

describe('RuleBasedParsingService', () => {
  let service: RuleBasedParsingService;

  beforeEach(() => {
    service = new RuleBasedParsingService();
  });

  it('should parse combined transport and food description', () => {
    const activities = service.parse('Hoy comí carne y viajé 20km en bus');

    expect(activities).toHaveLength(2);
    expect(activities.some((activity) => activity.type === 'food')).toBe(true);
    expect(activities.some((activity) => activity.type === 'transport')).toBe(
      true,
    );
  });

  it('should return empty array for unrecognized description', () => {
    const activities = service.parse('Hoy fue un día tranquilo');

    expect(activities).toHaveLength(0);
  });
});
