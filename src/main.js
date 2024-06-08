import './angular-app';
import './react-directive';
import './AppBridge';

// Initialize the shared state
const initialState = {
  text: 'Initial text',
  items: [1, 2, 3]
};


import React from 'react';
import { createRoot } from 'react-dom/client';
import { InviteController } from '@mavrck-inc/react-modules';


const reactRoot = document.getElementById('react-root');
console.log('reactRoot', reactRoot);
if (reactRoot) {
  const root = createRoot(reactRoot);
  root.render(
    <>
    <h3>Hello</h3>
    <InviteController />
    </>
  );
}
