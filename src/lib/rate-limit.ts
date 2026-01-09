/**
 * Simple in-memory rate limiter for MVP/development
 * 
 * ⚠️ IMPORTANT LIMITATIONS:
 * - In serverless environments (Vercel, Netlify, etc.), each function instance
 *   has its own memory space, so rate limits are NOT shared across instances
 * - This means a user could potentially bypass limits by triggering different instances
 * - This is suitable for MVP/low-traffic scenarios as a basic spam deterrent
 * 
 * 🔧 RECOMMENDED FOR PRODUCTION:
 * - Use Redis (Upstash, Vercel KV, or self-hosted) for shared state
 * - Use edge middleware with distributed rate limiting
 * - Consider services like Arcjet, Upstash Rate Limit, or Vercel Rate Limiting
 * 
 * @see https://upstash.com/docs/redis/features/ratelimiting
 * @see https://vercel.com/docs/storage/vercel-kv/kv-reference#rate-limiting
 */

// In-memory store: IP address -> array of request timestamps (in milliseconds)
const requestStore = new Map<string, number[]>();

// Cleanup interval: remove stale IPs every 2 minutes
const CLEANUP_INTERVAL_MS = 2 * 60 * 1000;
let lastCleanup = Date.now();

/**
 * Rate limiter based on IP address and rolling time window
 * 
 * @param ip - Client IP address
 * @param limitPerMinute - Maximum number of requests allowed per 60 seconds
 * @returns Object with `ok` (true if allowed) and optional `retryAfterSeconds`
 * 
 * @example
 * const result = rateLimit('192.168.1.1', 3);
 * if (!result.ok) {
 *   console.log(`Rate limited. Retry after ${result.retryAfterSeconds} seconds`);
 * }
 */
export function rateLimit(
  ip: string,
  limitPerMinute: number
): { ok: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const windowMs = 60 * 1000; // 60 seconds in milliseconds

  // Periodic cleanup of old IPs to prevent memory leaks
  if (now - lastCleanup > CLEANUP_INTERVAL_MS) {
    cleanupOldEntries(now, windowMs);
    lastCleanup = now;
  }

  // Get existing timestamps for this IP, or initialize empty array
  const timestamps = requestStore.get(ip) || [];

  // Filter out timestamps older than 60 seconds (rolling window)
  const recentTimestamps = timestamps.filter(
    (timestamp) => now - timestamp < windowMs
  );

  // Check if rate limit exceeded
  if (recentTimestamps.length >= limitPerMinute) {
    // Calculate when the oldest request in the window will expire
    const oldestTimestamp = recentTimestamps[0];
    const retryAfterSeconds = Math.ceil((oldestTimestamp + windowMs - now) / 1000);

    return {
      ok: false,
      retryAfterSeconds: Math.max(retryAfterSeconds, 1), // At least 1 second
    };
  }

  // Add current timestamp and update store
  recentTimestamps.push(now);
  requestStore.set(ip, recentTimestamps);

  return { ok: true };
}

/**
 * Cleanup old entries from the request store to prevent memory leaks
 * Removes IPs that have no requests within the time window
 * 
 * @param now - Current timestamp in milliseconds
 * @param windowMs - Time window in milliseconds
 */
function cleanupOldEntries(now: number, windowMs: number): void {
  for (const [ip, timestamps] of requestStore.entries()) {
    // Filter timestamps within the window
    const recentTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < windowMs
    );

    if (recentTimestamps.length === 0) {
      // No recent requests, remove this IP from store
      requestStore.delete(ip);
    } else {
      // Update with filtered timestamps
      requestStore.set(ip, recentTimestamps);
    }
  }
}

/**
 * Get current rate limit stats (useful for debugging/monitoring)
 * 
 * @param ip - Client IP address
 * @returns Number of requests in current window and when window resets
 */
export function getRateLimitStats(ip: string): {
  requestCount: number;
  windowResetsInSeconds: number;
} {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const timestamps = requestStore.get(ip) || [];
  
  const recentTimestamps = timestamps.filter(
    (timestamp) => now - timestamp < windowMs
  );

  const oldestTimestamp = recentTimestamps[0];
  const windowResetsInSeconds = oldestTimestamp
    ? Math.ceil((oldestTimestamp + windowMs - now) / 1000)
    : 0;

  return {
    requestCount: recentTimestamps.length,
    windowResetsInSeconds: Math.max(windowResetsInSeconds, 0),
  };
}

/**
 * Reset rate limit for a specific IP (useful for testing)
 * 
 * @param ip - Client IP address to reset
 */
export function resetRateLimit(ip: string): void {
  requestStore.delete(ip);
}

/**
 * Clear all rate limit data (useful for testing)
 */
export function clearAllRateLimits(): void {
  requestStore.clear();
  lastCleanup = Date.now();
}
