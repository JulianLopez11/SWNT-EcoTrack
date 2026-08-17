import { parseFoodActivities } from './food.rule';

describe('parseFoodActivities', () => {
  it('should detect beef consumption', () => {
    const activities = parseFoodActivities('Hoy comí carne');

    expect(activities).toHaveLength(1);
    expect(activities[0]).toMatchObject({
      type: 'food',
      category: 'beef',
      quantity: 1,
      unit: 'meal',
    });
  });

  it('should detect chicken from lunch description', () => {
    const activities = parseFoodActivities('Almorcé pollo');

    expect(activities).toHaveLength(1);
    expect(activities[0].category).toBe('chicken');
  });

  it('should detect vegetarian meal', () => {
    const activities = parseFoodActivities('Cené ensalada vegetariana');

    expect(activities).toHaveLength(1);
    expect(activities[0].category).toBe('vegetarian');
  });

  it('should detect multiple food activities separated by comma', () => {
    const activities = parseFoodActivities('Desayuné pollo, cené pescado');

    expect(activities).toHaveLength(2);
    expect(activities[0].category).toBe('chicken');
    expect(activities[1].category).toBe('fish');
  });

  it('should return empty array when no food is detected', () => {
    const activities = parseFoodActivities('Viajé 20km en bus');

    expect(activities).toHaveLength(0);
  });

  it('should prioritize longer food keywords like "carne de res"', () => {
    const activities = parseFoodActivities('Comí carne de res');

    expect(activities[0].category).toBe('beef');
  });
});
