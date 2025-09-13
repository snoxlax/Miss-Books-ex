const { useState } = React;
export default function LongText({ children, maxLength = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  if (children.length <= maxLength) return <p>{parseDescription(children)}</p>;
  else {
    return (
      <p>
        {isExpanded
          ? parseDescription(children)
          : parseDescription(children.slice(0, maxLength) + '... ')}
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

function parseDescription(description) {
  const withLineBreaks = description.replace(/<br\s*\/?>/gi, '\n');

  const parts = withLineBreaks.split(/(<\/?[^>]+>)/g);

  return parts.map((part, i) => {
    if (/^<b>$/i.test(part)) return <strong key={i}></strong>;
    if (/^<\/b>$/i.test(part)) return null;
    if (/^<i>$/i.test(part)) return <em key={i}></em>;
    if (/^<\/i>$/i.test(part)) return null;
    if (part === '\n') return <br key={i} />;

    return part;
  });
}
