let buffer: any[] = [];
const LIMIT = 10;

self.onmessage = ({ data: { type, payload } }) => {
  switch (type) {
    case 'LOG':
      buffer.push(payload);
      if (buffer.length >= LIMIT) flush();
      break;
    case 'FLUSH':
      flush();
      break;
    case 'STOP':
      if (payload === true) flush();
      self.postMessage({ type: 'LOGS_LOST', payload: buffer.length });
      self.close();
      break;
    case 'MARCO':
      self.postMessage({ type: 'POLO' });
      break;
    default:
      console.warn('Unknown worker message type:', type);
  }
};

async function flush() {
  if (buffer.length === 0) return;
  const out = [...buffer];
  buffer = [];

  try {
    const res = await fetch('/api/logs', {
      method: 'POST',
      body: JSON.stringify(out),
      keepalive: true
    });
    if (!res.ok) throw new Error(`Failed to send logs | ${res.status} - ${res.statusText}`);

    self.postMessage({ type: 'REMAINING', count: buffer.length });
  } catch (err) {
    buffer = [...out, ...buffer];
    self.postMessage({ type: 'ERROR', payload: err });
  }
}

setInterval(flush, 5000);
