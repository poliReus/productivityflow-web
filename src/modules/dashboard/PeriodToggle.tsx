import React from 'react';
import { GoalFrequency } from '../../services/models/Goal';

interface PeriodToggleProps {
  selected: GoalFrequency;
  onChange: (value: GoalFrequency) => void;
}

const periods: GoalFrequency[] = ['daily', 'weekly', 'monthly', 'yearly'];

const PeriodToggle: React.FC<PeriodToggleProps> = ({ selected, onChange }) => {
  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
      {periods.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: selected === p ? '2px solid #007bff' : '1px solid #ccc',
            backgroundColor: selected === p ? '#e7f1ff' : '#fff',
          }}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default PeriodToggle;
