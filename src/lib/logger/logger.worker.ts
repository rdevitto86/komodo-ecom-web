const config = {
  splunk: { limit: 10, interval: 5000, url: '/api/logging/splunk' },
  otel: { limit: 10, interval: 5000, url: '/api/logging/otel' },
  clickstream: { limit: 10, interval: 5000, url: '/api/logging/clickstream' }
}
const buffers = {
  splunk: [] as any[],
  otel: [] as any[],
  clickstream: [] as any[]
}

// TODO - rehydrate logs from localStorage

self.onmessage = async ({ data: { type, payload } }) => {
  try {
    const { provider, data } = payload as { provider: ProviderType, data: any } || {};
    const hasProvider = provider in buffers;

    switch (type) {
      case 'LOG':
        if (!hasProvider) throw new Error('Invalid provider type');
        buffers[provider].push(data);
        if (buffers[provider].length >= config[provider].limit) await flush(provider);
        break;
      case 'FLUSH':
        if (!hasProvider) throw new Error('Invalid provider type');
        await flush(provider);
        break;
      case 'STOP':
        if (payload.data === true) {
          await Promise.all(
            Object.keys(buffers).map(
              async (provider) => await flush(provider as ProviderType)
            )
          );
        };
        self.postMessage({ type: 'LOGS_LOST', payload: buffers });
        setTimeout(() => self.close(), 100);
        break;
      case 'MARCO':
        self.postMessage({ type: 'POLO' });
        break;
      default:
        console.warn('Unknown worker directive:', type);
    }
  } catch (err) {
    self.postMessage({ type: 'ERROR', payload: err });
  }
};

async function flush(provider: ProviderType) {
  if (buffers[provider].length === 0) return;
  const out = [...buffers[provider]];
  buffers[provider] = [];

  try {
    const res = await fetch(config[provider].url, {
      method: 'POST',
      body: JSON.stringify(out),
      keepalive: true
    });

    if (!res.ok) throw new Error(`Failed to send logs | ${res.status} - ${res.statusText}`);
  
    self.postMessage({ type: 'REMAINING', data: { type: provider, count: buffers[provider].length } });
  } catch (err) {
    buffers[provider] = [...out, ...buffers[provider]];
    self.postMessage({ type: 'ERROR', payload: err });
  }
}

setInterval(() => flush('splunk'), config.splunk.interval);
setInterval(() => flush('otel'), config.otel.interval);
setInterval(() => flush('clickstream'), config.clickstream.interval);
