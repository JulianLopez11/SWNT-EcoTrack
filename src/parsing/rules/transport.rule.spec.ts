import { parseTransportActivities } from './transport.rule';

describe('parseTransportActivities', () => {
  it('should detect bus travel with distance in km', () => {
    const activities = parseTransportActivities('Hoy viajé 20km en bus');

    expect(activities).toHaveLength(1);
    expect(activities[0]).toMatchObject({
      type: 'transport',
      category: 'bus',
      quantity: 20,
      unit: 'km',
    });
  });

  it('should detect car travel with decimal distance', () => {
    const activities = parseTransportActivities('Fui en carro 12,5 km');

    expect(activities).toHaveLength(1);
    expect(activities[0]).toMatchObject({
      type: 'transport',
      category: 'car',
      quantity: 12.5,
      unit: 'km',
    });
  });

  it('should detect multiple transport activities separated by "y"', () => {
    const activities = parseTransportActivities(
      'Viajé 10km en bus y fui en carro 5 km',
    );

    expect(activities).toHaveLength(2);
    expect(activities[0].category).toBe('bus');
    expect(activities[1].category).toBe('car');
  });

  it('should default to 1 km when mode is present without distance', () => {
    const activities = parseTransportActivities('Utilicé transporte público');

    expect(activities).toHaveLength(1);
    expect(activities[0]).toMatchObject({
      category: 'bus',
      quantity: 1,
    });
  });

  it('should return empty array when no transport is detected', () => {
    const activities = parseTransportActivities('Hoy comí ensalada');

    expect(activities).toHaveLength(0);
  });

  it('should detect walking without distance', () => {
    const activities = parseTransportActivities('Caminé al trabajo');

    expect(activities).toHaveLength(1);
    expect(activities[0]).toMatchObject({
      category: 'walking',
      quantity: 1,
    });
  });
});
