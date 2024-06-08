import React from 'react';

const App = ({ data }) => {
  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
    </div>
  );
};

export default App;