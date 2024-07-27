import React from 'react';

function StringToDomComponent({ htmlString }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
}

export default StringToDomComponent;
