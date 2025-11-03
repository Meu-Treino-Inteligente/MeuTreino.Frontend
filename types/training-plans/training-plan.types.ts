import { ErrorResponse } from "../payments/common.types";

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  notes?: string;
}

export interface DayPlan {
  muscleGroups: string[];
  exercises: Exercise[];
  totalDurationMinutes: number;
}

export interface WeeklyPlan {
  monday: DayPlan;
  tuesday: DayPlan;
  wednesday: DayPlan;
  thursday: DayPlan;
  friday: DayPlan;
  saturday: DayPlan;
  sunday: DayPlan;
}

export interface ProgressionPlan {
  week1to2: string;
  week3to4: string;
  week5to6: string;
  week7to8: string;
}

export interface CreateTrainingPlanRequest {
  userId: number;
}

export interface TrainingPlan {
  weeklyPlan: WeeklyPlan;
  generalGuidelines: string[];
  nutritionTips: string[];
  progressionPlan: ProgressionPlan;
}

export type CreateTrainingPlanResponse = TrainingPlan;
export type CreateTrainingPlanErrorResponse = ErrorResponse;
