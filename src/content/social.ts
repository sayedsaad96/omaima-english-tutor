/**
 * Social-proof seam for V1.
 *
 * Until real testimonials are supplied with permission, this list stays empty
 * and the site renders "What Students Can Expect" instead. Add entries here
 * (with Omaima's approval) to switch the section to real testimonials without
 * changing layout architecture.
 */
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  context: string;
}

export const testimonials: Testimonial[] = [];
