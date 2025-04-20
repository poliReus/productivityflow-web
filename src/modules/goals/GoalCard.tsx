import React from 'react';
import { Goal } from '../../services/models/Goal';

interface GoalCardProps {
  goal: Goal;
  onToggleComplete: (goalId: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onToggleComplete }) => {
  const today = new Date().toISOString().split('T')[0];
  const completed = goal.completions[today] ?? false;

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '12px',
        marginBottom: '8px',
        borderRadius: '8px',
        backgroundColor: completed ? '#d4edda' : '#f8d7da',
      }}
    >
      <h4>{goal.title}</h4>
      <p>Frequenza: {goal.frequency}</p>
      <button onClick={() => onToggleComplete(goal.id)}>
        {completed ? '✔️ Completato' : '❌ Non ancora'}
      </button>
    </div>
  );
};

export default GoalCard;
