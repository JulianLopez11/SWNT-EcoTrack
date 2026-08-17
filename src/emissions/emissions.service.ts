import { Injectable } from '@nestjs/common';
import {
  FOOD_EMISSION_FACTORS_KG_PER_MEAL,
  TRANSPORT_EMISSION_FACTORS_KG_PER_KM,
} from './constants/emission-factors';
import {
  ActivityEmission,
  CarbonAnalysisResult,
} from './interfaces/activity-emission.interface';
import { ParsedActivity } from '../parsing/interfaces/parsed-activity.interface';

@Injectable()
export class EmissionsService {
  calculateEmissions(
    description: string,
    activities: ParsedActivity[],
  ): CarbonAnalysisResult {
    const activityEmissions = activities.map((activity) =>
      this.calculateActivityEmission(activity),
    );

    const totalCo2Kg = this.round(
      activityEmissions.reduce((total, activity) => total + activity.co2Kg, 0),
    );

    return {
      description,
      activities: activityEmissions,
      totalCo2Kg,
    };
  }

  private calculateActivityEmission(activity: ParsedActivity): ActivityEmission {
    const factor = this.getEmissionFactor(activity);
    const co2Kg = this.round(activity.quantity * factor);

    return {
      ...activity,
      co2Kg,
    };
  }

  private getEmissionFactor(activity: ParsedActivity): number {
    if (activity.type === 'transport') {
      return (
        TRANSPORT_EMISSION_FACTORS_KG_PER_KM[activity.category] ??
        TRANSPORT_EMISSION_FACTORS_KG_PER_KM.car
      );
    }

    return (
      FOOD_EMISSION_FACTORS_KG_PER_MEAL[activity.category] ??
      FOOD_EMISSION_FACTORS_KG_PER_MEAL.beef
    );
  }

  private round(value: number): number {
    return Math.round(value * 1000) / 1000;
  }
}
