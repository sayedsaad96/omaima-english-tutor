interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  body?: string;
  align?: 'start' | 'center';
  id?: string;
}

export function SectionHeading({ eyebrow, title, body, align = 'start', id }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-start items-start';
  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      <p>
        <span className="eyebrow-pill">{eyebrow}</span>
      </p>
      <h2 id={id} className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
        {title}
      </h2>
      {body ? (
        <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          {body}
        </p>
      ) : null}
    </div>
  );
}
