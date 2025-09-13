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
  // Replace <br> and <br/> with line breaks
  const withLineBreaks = description.replace(/<br\s*\/?>/gi, '\n');

  // Split into text + tags
  const parts = withLineBreaks.split(/(<\/?[^>]+>)/g);

  return parts.map((part, i) => {
    if (/^<b>$/i.test(part)) return <strong key={i}></strong>; // <b>
    if (/^<\/b>$/i.test(part)) return null; // </b>
    if (/^<i>$/i.test(part)) return <em key={i}></em>; // <i>
    if (/^<\/i>$/i.test(part)) return null; // </i>
    if (part === '\n') return <br key={i} />; // line breaks

    return part; // plain text
  });
}
