export default function rapid7Logging(token) {
  const url = `https://webhook.logentries.com/noformat/logs/${token}`;
  global.onmessage = e =>
    fetch(url, {
      body: e.data,
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
}
