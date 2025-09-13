const { useState, useEffect } = React;
import { eventBusService } from '../services/event-bus.service.js';

export default function UserMsg() {
  const [msg, setMsg] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let visibleTimeout;
    let msgTimeout;

    eventBusService.on('show-user-msg', (msg) => {
      clearTimeout(visibleTimeout);
      clearTimeout(msgTimeout);

      setMsg(msg);
      setIsVisible(true);

      visibleTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 2200);

      msgTimeout = setTimeout(() => {
        setMsg(null);
      }, 2500);
    });

    return () => {
      clearTimeout(visibleTimeout);
      clearTimeout(msgTimeout);
    };
  }, []);

  if (!msg) return null;

  return (
    <section
      className={`user-msg ${isVisible ? 'shown' : 'hidden'} ${msg.type}`}
    >
      {msg.txt}
    </section>
  );
}
