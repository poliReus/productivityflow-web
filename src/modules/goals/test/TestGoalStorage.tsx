import React, { useState, useEffect } from 'react';
import { Goal } from '../../../services/models/Goal';
import { storageService } from '../../../services/storage/LocalStorageService';

const TestGoalStorage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [title, setTitle] = useState('');

  const loadGoals = async () => {
    const storedGoals = await storageService.getAll<Goal>('goals');
    setGoals(storedGoals);
  };

  const addGoal = async () => {
    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      title,
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completions: {},
    };

    await storageService.put('goals', newGoal);
    setTitle('');
    loadGoals();
  };

  const deleteGoal = async (id: string) => {
    await storageService.delete('goals', id);
    loadGoals();
  };

  useEffect(() => {
    loadGoals();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Test Goal Storage</h2>
      <input
        type="text"
        placeholder="Goal title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addGoal} style={{ marginLeft: '8px' }}>
        Add Goal
      </button>

      <ul style={{ marginTop: '1rem' }}>
        {goals.map((goal) => (
          <li key={goal.id}>
            {goal.title} ({goal.frequency}){' '}
            <button onClick={() => deleteGoal(goal.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestGoalStorage;
