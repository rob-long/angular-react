// src/App.jsx
import React, { useEffect, useState } from 'react';

const App = ({ data, initialSharedText }) => {
  const [sharedText, setSharedText] = useState(initialSharedText);

  useEffect(() => {
    console.log('Received data:', data);
  }, [data]);

  useEffect(() => {
    const subscription = window.sharedTextSubject.subscribe((newText) => {
      setSharedText(newText);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleChange = (event) => {
    setSharedText(event.target.value);
    window.sharedTextSubject.next(event.target.value);
  };

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <input
        type="text"
        value={sharedText}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
