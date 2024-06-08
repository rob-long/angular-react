import React, { useEffect, useState } from 'react';
import subjectManager from './AppBridge';

const App = ({ data }) => {
  const [sharedState, setSharedState] = useState(data);

  useEffect(() => {
    console.log('Received data:', data);
    const sharedStateSubject = subjectManager.getSubject('sharedState');

    const subscription = sharedStateSubject.subscribe((newState) => {
      if (newState !== null) {
        setSharedState(newState);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [data]);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    const newState = { ...sharedState, text: newText };
    setSharedState(newState);
    subjectManager.updateSubject('sharedState', newState);
  };

  const handleItemChange = (index, event) => {
    const newValue = parseInt(event.target.value, 10);
    const newItems = [...sharedState.items];
    newItems[index] = newValue;
    const newState = { ...sharedState, items: newItems };
    setSharedState(newState);
    subjectManager.updateSubject('sharedState', newState);
  };

  console.log('here', sharedState);

  return (
    <div>
      <p>hi</p>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <input
        type="text"
        value={sharedState.text}
        onChange={handleTextChange}
      />
      <div>
        Items:
        {sharedState.items?.map((item, index) => (
          <div key={index}>
            Item {index + 1}: <input
              type="number"
              value={item}
              onChange={(e) => handleItemChange(index, e)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
