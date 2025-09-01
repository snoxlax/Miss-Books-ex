const { useState } = React;
export default function LongText({ children, maxLength = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  if (children.length <= maxLength) return <p>{children}</p>;
  else {
    return (
      <p>
        {isExpanded ? children : children.slice(0, maxLength) + '... '}
        <a
          className="blue-text"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? ' Less' : 'More'}
        </a>
      </p>
    );
  }
}
