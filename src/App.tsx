import React from 'react';
import { useAppBridge } from '@rob-long/app-bridge';

const App: React.FC = () => {
  const [state, updateState] = useAppBridge<{ text: string; items: number[] }>(
    'sharedState',
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (state) {
      updateState({ ...state, text: event.target.value });
    }
  };

  const handleItemChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (state) {
      const newItems = [...state.items];
      newItems[index] = parseInt(event.target.value, 10);
      updateState({ ...state, items: newItems });
    }
  };

  if (!state) return null;

  return (
    <div>
      <p>Shared Text: {state.text}</p>
      <input type="text" value={state.text} onChange={handleChange} />
      <div>
        Items:
        {state.items?.map((item, index) => (
          <div key={index}>
            Item {index + 1}:{' '}
            <input
              type="number"
              value={item || undefined}
              onChange={(e) => handleItemChange(index, e)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
