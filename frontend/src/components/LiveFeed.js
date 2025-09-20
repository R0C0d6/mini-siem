import React, { useEffect, useState } from 'react';

function LiveFeed(){
  const [feed, setFeed] = useState([]);
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');
    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        setFeed(prev => [msg, ...prev].slice(0, 50));
      } catch(e){ }
    };
    return () => ws.close();
  }, []);
  return (
    <div style={{maxHeight: 400, overflow: 'auto'}}>
      {feed.map((f, i) => (
        <div key={i} style={{borderBottom: '1px solid #ddd', padding: 6}}>
          <small>{f.timestamp}</small>
          <div><b>{f.source}</b> {f.event_type} {f.ip}</div>
          <div>{f.message}</div>
        </div>
      ))}
    </div>
  );
}

export default LiveFeed;
