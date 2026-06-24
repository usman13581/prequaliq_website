/**
 * EXPERTISE DETAIL — sub tech stacks
 *
 * Wireframe:
 * ┌─ Technologies & tools ─────────────────────┐
 * │ [Category label]                            │
 * │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
 * │ │ pill │ │ pill │ │ pill │ │ pill │  ...  │
 * │ └──────┘ └──────┘ └──────┘ └──────┘       │
 * │ (repeat per category: Languages, Cloud…)   │
 * └────────────────────────────────────────────┘
 *
 * Responsive:
 * - Mobile: single column of categories, pills wrap
 * - md+: 2-col category grid if many categories
 */
type TechStackCategory = {
  label: string;
  items: string[];
};

type TechStackListProps = {
  title?: string;
  categories: TechStackCategory[];
};

export function TechStackList({ title = "Technologies & tools", categories }: TechStackListProps) {
  return (
    <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-sm">
      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-6">{title}</h3>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        {categories.map((category) => (
          <div key={category.label}>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
              {category.label}
            </p>
            <ul className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="px-3 py-1.5 text-sm rounded-xl bg-surface text-foreground/80 border border-border"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
