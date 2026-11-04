#!/usr/bin/env node
const url = process.argv[2];
const intervalSec = parseInt(process.argv[3], 10) || 5;
if (!url || url === "-h" || url === "--help") {
  console.log("Usage: health-ping <url> [intervalSec]");
  console.log("Example: health-ping https://google.com 3");
  process.exit(url ? 0 : 1);
}
async function ping() {
  const start = Date.now();
  const timeStr = new Date().toLocaleTimeString();
  try {
    const res = await fetch(url);
    const ms = Date.now() - start;
    const col = res.ok ? "\x1b[32m" : "\x1b[31m";
    console.log(`[${timeStr}] ${col}${res.status} ${res.statusText}\x1b[0m - ${ms}ms`);
  } catch (e) {
    console.log(`[${timeStr}] \x1b[31mFAIL\x1b[0m: ${e.message}`);
  }
}
console.log(`Pinging ${url} every ${intervalSec}s (Ctrl+C to stop)...\n`);
ping();
setInterval(ping, intervalSec * 1000);
