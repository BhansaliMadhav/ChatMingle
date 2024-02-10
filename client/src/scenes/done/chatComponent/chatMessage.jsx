import React from 'react';

export const ChatMessage = ({ message }) => {
  return (
    <div sx={{ paddingY: '2', paddingLeft: '2', paddingRight: '5' }}>
      <div sx={{ padding: '2', backgroundColor: 'green.700', color: 'white', borderRadius: 'lg' }}>
        {message}
      </div>
    </div>
  );
};
