import { AppBridge } from '@rob-long/app-bridge';
import './angular-app';
import './react-directive';

// Initialize the shared state
const initialState = {
  text: 'Initial text',
  items: [1, 2, 3],
};

import React from 'react';
import { createRoot } from 'react-dom/client';
import { InviteController } from '@mavrck-inc/react-modules';
import '@mavrck-inc/react-modules/dist/style.css';

const reactRoot = document.getElementById('react-root');
console.log('reactRoot', reactRoot);
if (reactRoot) {
  const root = createRoot(reactRoot);
  root.render(
    <>
      <InviteController />
    </>,
  );
}
