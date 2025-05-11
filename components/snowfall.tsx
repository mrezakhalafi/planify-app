'use client';

import Snowfall from 'react-snowfall';

export default function SnowfallClient() {
  return (
    <Snowfall
      color="#ff8096"
      snowflakeCount={25}
      style={{
        zIndex: 50,
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
    />
  );
}
