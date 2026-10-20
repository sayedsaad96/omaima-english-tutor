import type { PathKey, ServiceKey } from '@/content/types';
import type { QuizResultBand } from './quiz';

/**
 * Allow-listed ids that may travel to the booking page through a URL.
 * Anything outside these lists is silently ignored — a wrong value can never
 * break the page or smuggle content into the WhatsApp message.
 */
export const SERVICE_IDS: readonly ServiceKey[] = ['private', 'conversation', 'school', 'exam'];
export const PATH_IDS: readonly PathKey[] = ['start', 'progress', 'intensive'];
export const QUIZ_BAND_IDS: readonly QuizResultBand[] = [
  'foundations',
  'elementary',
  'preIntermediate',
  'intermediatePlus',
];

export interface BookingContext {
  service: ServiceKey | null;
  path: PathKey | null;
  quizBand: QuizResultBand | null;
}

export const EMPTY_BOOKING_CONTEXT: BookingContext = {
  service: null,
  path: null,
  quizBand: null,
};

/**
 * Service → suggested booking goal. Personal data (name/phone/quiz score)
 * never travels this way; service and path are product identifiers, and the
 * quiz band is only an indicative placing the learner can change.
 */
export const SERVICE_GOAL_SUGGESTION: Record<ServiceKey, 'generalEnglish' | 'conversation' | 'schoolSupport' | 'examPreparation'> = {
  private: 'generalEnglish',
  school: 'schoolSupport',
  exam: 'examPreparation',
  conversation: 'conversation',
};

function pick<T extends string>(value: string | null, allowed: readonly T[]): T | null {
  return value !== null && allowed.includes(value as T) ? (value as T) : null;
}

/**
 * Parses booking context from a URL. Reads only allow-listed query keys
 * (service, path) and the `#quizBand=` fragment. Unknown/absent values are
 * ignored, so a direct visit or a hand-typed link always renders the plain
 * form. The quiz band lives in the fragment on purpose: it never reaches an
 * HTTP request, referrer or server logs — only this browser and history.
 */
export function parseBookingContext(search: string, hash: string): BookingContext {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const hashParams = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash);
  return {
    service: pick(params.get('service'), SERVICE_IDS),
    path: pick(params.get('path'), PATH_IDS),
    quizBand: pick(hashParams.get('quizBand'), QUIZ_BAND_IDS),
  };
}

/** Reads the live location outside React render (tests / one-off consumers). */
export function readBookingContext(): BookingContext {
  if (typeof window === 'undefined') return EMPTY_BOOKING_CONTEXT;
  return parseBookingContext(window.location.search, window.location.hash);
}

/* ------------------------------------------------------------------ */
/* Live URL snapshot plumbing (consumed via useSyncExternalStore).      */
/* ------------------------------------------------------------------ */

let cacheKey = '\u0000';
let cache: BookingContext = EMPTY_BOOKING_CONTEXT;
const listeners = new Set<() => void>();
let historyWrapped = false;

function invalidate() {
  cacheKey = '\u0000';
  for (const notify of listeners) notify();
}

/**
 * Defers listener notification out of React's commit phase. Next.js
 * rewrites history from inside a useInsertionEffect (HistoryUpdater), and
 * scheduling updates synchronously during that phase is forbidden by React
 * ("useInsertionEffect must not schedule updates"). A macrotask lands the
 * notification after the commit is done; snapshot reads are unaffected
 * because getSnapshot always re-derives from the current URL.
 */
let notifyScheduled = false;

function scheduleInvalidate() {
  if (notifyScheduled) return;
  notifyScheduled = true;
  setTimeout(() => {
    notifyScheduled = false;
    invalidate();
  }, 0);
}

/**
 * Stable snapshot of the live URL context. Cached per (search|hash) so the
 * same object identity is returned while the URL is unchanged, as required
 * by useSyncExternalStore's getSnapshot.
 */
export function getBookingContextSnapshot(): BookingContext {
  if (typeof window === 'undefined') return EMPTY_BOOKING_CONTEXT;
  const key = `${window.location.search}|${window.location.hash}`;
  if (key !== cacheKey) {
    cacheKey = key;
    cache = parseBookingContext(window.location.search, window.location.hash);
  }
  return cache;
}

/**
 * Subscribes to context changes: popstate plus wrapped history methods, so
 * both full navigations and client navigations (pushState/replaceState)
 * notify consumers. The wrapper only adds notification; it delegates to the
 * original history method first.
 */
export function subscribeBookingContext(notify: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }
  listeners.add(notify);
  if (!historyWrapped) {
    historyWrapped = true;
    for (const method of ['pushState', 'replaceState'] as const) {
      const original = window.history[method].bind(window.history);
      window.history[method] = ((...args: unknown[]) => {
        // pushState(data: any, unused: string, url?: string | URL | null)
        // — delegate verbatim, then notify.
        original.apply(window.history, [
          args[0],
          args[1] as string,
          (args[2] ?? null) as string | URL | null,
        ]);
        scheduleInvalidate();
      }) as typeof window.history[typeof method];
    }
    window.addEventListener('popstate', scheduleInvalidate);
  }
  return () => {
    listeners.delete(notify);
  };
}

/**
 * Serializes only the allow-listed ids for URL round-trips (e.g. keeping
 * context across a locale switch). Unknown/extra parameters are dropped.
 */
export function serializeBookingContext(context: BookingContext): string {
  const params = new URLSearchParams();
  if (context.service) params.set('service', context.service);
  if (context.path) params.set('path', context.path);
  const search = params.toString();
  const hash = context.quizBand ? `#quizBand=${context.quizBand}` : '';
  return `${search ? `?${search}` : ''}${hash}`;
}

/** True when at least one allow-listed id is present (drives the banner). */
export function hasBookingContext(context: BookingContext): boolean {
  return !!(context.service || context.path || context.quizBand);
}
