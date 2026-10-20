/**
 * Document-level pre-paint initialization scripts. Every root layout includes
 * them exactly once — there are two roots: the entry redirect shell and the
 * [locale] document.
 */

/** Applies the stored/system theme before first paint to avoid a theme flash. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('omaima-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`;

/**
 * Activates scroll-reveal hiding. Content is visible by default in the raw HTML
 * so pages without JavaScript (and crawlers) never lose content; this flag
 * flips the hiding on only once scripts are actually running.
 */
export const revealInitScript = `document.documentElement.dataset.revealActive='true';`;
