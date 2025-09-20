import React, { useEffect, useState } from 'react';
import LiveFeed from './LiveFeed';

function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/logs/recent')
      .then(r => r.json())
      .then(setLogs)
      .catch(console.error);

    // WebSocket for live updates
    const ws = new WebSocket('ws://localhost:8000/ws');
    ws.onopen = () => console.log('ws open');
    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg.type === 'new_log') {
          setLogs(prev => [msg, ...prev].slice(0, 100));
        }
      } catch(e){
        // might be text
      }
    };
    return () => ws.close();
  }, []);

  return (
    <div style={{display: 'flex'}}>
      <div style={{flex:3}}>
        <h2>Recent Logs</h2>
        <ul>
          {logs.map((l, i) => (
            <li key={i}><b>{l.source}</b> {l.event_type} {l.ip} — {l.message}</li>
          ))}
        </ul>
      </div>
      <div style={{flex:1, paddingLeft: 20}}>
        <h2>Live Feed</h2>
        <LiveFeed />
      </div>
    </div>
  );
}

export default Dashboard;