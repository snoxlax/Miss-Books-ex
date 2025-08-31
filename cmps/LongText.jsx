import React from 'react';

const { useState } = React;
export default function LongText({ text, maxLength = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  if (text.length <= maxLength) return <p>{text}</p>;
  else {
    return (
      <p>
        {isExpanded ? text : text.slice(0, maxLength)}
        <a onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? ' Show Less' : '...Show More'}
        </a>
      </p>
    );
  }
}
