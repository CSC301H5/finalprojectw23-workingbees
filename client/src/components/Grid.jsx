import React from 'react';

function VerticalGrid({ items }) {
  return (
    <div className="vertical-grid">
      {items.map((item, index) => (
        <div key={index} className="vertical-grid-item">
          {item}
        </div>
      ))}
    </div>
  );
}
export default VerticalGrid