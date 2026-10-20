import { User, Chats as MessagesSquare, Backpack, Target } from '@phosphor-icons/react/dist/ssr';
import type { AudienceKey, ServiceKey } from '@/content/types';

/**
 * Presentation metadata for the four services plus their display order and
 * audience relevance. Shared between the home services section and the
 * conversion-context work (C01) so anchors/keys stay in one place.
 */
export const serviceMeta: Record<
  ServiceKey,
  { icon: typeof User; accent: string; iconWrap: string; anchor: string }
> = {
  private: {
    icon: User,
    accent: 'bg-[var(--primary-soft)]',
    iconWrap: 'bg-[var(--primary)] text-white',
    anchor: 'private-lessons',
  },
  conversation: {
    icon: MessagesSquare,
    accent: 'bg-[var(--accent-soft)]',
    iconWrap: 'bg-[var(--accent)] text-white',
    anchor: 'conversation',
  },
  school: {
    icon: Backpack,
    accent: 'bg-[var(--mint)]',
    iconWrap: 'bg-[var(--success)] text-white',
    anchor: 'school-support',
  },
  exam: {
    icon: Target,
    accent: 'bg-[var(--primary-soft)]',
    iconWrap: 'bg-[var(--ink)] text-white',
    anchor: 'exam-prep',
  },
};

export const SERVICE_ORDER: ServiceKey[] = ['private', 'conversation', 'school', 'exam'];

/** Which services are most relevant to a selected audience (emphasis only). */
export const AUDIENCE_RELEVANCE: Record<AudienceKey, ServiceKey[]> = {
  kids: ['private', 'school'],
  teens: ['school', 'exam', 'private'],
  adults: ['conversation', 'private', 'exam'],
  child: ['school', 'private'],
};
