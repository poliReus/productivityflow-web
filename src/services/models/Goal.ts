export type GoalFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Goal {
  id: string;
  title: string;
  description?: string;
  frequency: GoalFrequency;
  createdAt: string;
  updatedAt: string;
  completions: Record<string, boolean>; // e.g., { "2025-04-18": true }
}
