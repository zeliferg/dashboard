import React from 'react';
import Sidenav from './Sidenav';

function App() {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'red' }}>
      <Sidenav />
      <div style={{ flex: 1, padding: '32px', backgroundColor: '#f5f5f5' }}>
        <h1 style={{ color: '#212121', marginBottom: '16px' }}>Welcome to Dashboard</h1>
        <p style={{ color: '#616161' }}>
          Select items from the navigation menu on the left to explore the interface.
          Try expanding the collapsible items and toggling the collapse button in the header.
        </p>
      </div>
    </div>
  );
}

export default App;
