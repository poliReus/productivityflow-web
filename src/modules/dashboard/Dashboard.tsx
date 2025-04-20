import React, { useEffect, useState } from 'react';
import { Goal, GoalFrequency } from '../../services/models/Goal';
import { storageService } from '../../services/storage/LocalStorageService';
import PeriodToggle from './PeriodToggle';
import GoalCard from '../goals/GoalCard';

const Dashboard: React.FC = () => {
  const [period, setPeriod] = useState<GoalFrequency>('daily');
  const [goals, setGoals] = useState<Goal[]>([]);

  const loadGoals = async () => {
    const allGoals = await storageService.getAll<Goal>('goals');
    setGoals(allGoals.filter((g) => g.frequency === period));
  };

  const toggleGoalCompletion = async (goalId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = goals.map((g) => {
      if (g.id === goalId) {
        const completions = { ...g.completions, [today]: !g.completions[today] };
        return { ...g, completions, updatedAt: new Date().toISOString() };
      }
      return g;
    });

    const goalToUpdate = updated.find((g) => g.id === goalId);
    if (goalToUpdate) {
      await storageService.put('goals', goalToUpdate);
    }

    setGoals(updated);
  };

  useEffect(() => {
    loadGoals();
  }, [period]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Dashboard</h2>
      <PeriodToggle selected={period} onChange={(p: GoalFrequency) => setPeriod(p)} />
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} onToggleComplete={toggleGoalCompletion} />
      ))}
    </div>
  );
};

export default Dashboard;
