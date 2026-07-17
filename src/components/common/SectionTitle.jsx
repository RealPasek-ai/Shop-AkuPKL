/**
 * SectionTitle — header seksi konsisten dengan eyebrow + judul besar.
 */
export default function SectionTitle({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && <span className="eyebrow text-smoke">{eyebrow}</span>}
      <h2 className="heading-display text-4xl sm:text-5xl">{title}</h2>
      {description && <p className="max-w-lg text-sm text-smoke">{description}</p>}
    </div>
  );
}
