const clients = [
  "Salesforce",
  "Oracle",
  "NetSuite",
  "Ruby on Rails",
  "APEX",
  "Fusion Apps",
  "CRM Platform",
  "ERP Suite",
];

export function TrustedBy() {
  const doubled = [...clients, ...clients];

  return (
    <section className="py-12 border-y border-border bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-light">
          Platforms &amp; technologies we specialise in
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-card to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-card to-transparent z-10" />
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="mx-8 text-lg font-semibold text-muted-light/50 hover:text-muted transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
