"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { MarbleCountry } from "@/lib/marble-api";

type CountrySelectProps = {
  label: string;
  requiredLabel: string;
  placeholder: string;
  currencyLabel: (currency: string) => string;
  loadError: string;
  disabled?: boolean;
  inputClass: string;
  value: string;
  onChange: (code: string) => void;
};

export function CountrySelect({
  label,
  requiredLabel,
  placeholder,
  currencyLabel,
  loadError,
  disabled = false,
  inputClass,
  value,
  onChange,
}: CountrySelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [countries, setCountries] = useState<MarbleCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadCountries() {
      setLoading(true);
      setLoadFailed(false);

      try {
        const response = await fetch("/api/enterprise-hub/countries");
        const data = (await response.json()) as { countries?: MarbleCountry[] };
        if (!response.ok || !Array.isArray(data.countries) || data.countries.length === 0) {
          throw new Error("Countries unavailable");
        }
        if (!cancelled) {
          setCountries(data.countries);
        }
      } catch {
        if (!cancelled) {
          setCountries([]);
          setLoadFailed(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadCountries();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return countries;
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(term) || country.code.toLowerCase().includes(term),
    );
  }, [countries, query]);

  const selected = countries.find((country) => country.code === value) ?? null;

  function selectCountry(country: MarbleCountry) {
    onChange(country.code);
    setQuery(country.name);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative">
      <label htmlFor={listId} className="block text-sm font-medium text-foreground mb-2">
        {label} <span className="text-accent">{requiredLabel}</span>
      </label>

      <input type="hidden" name="country" value={value} required={countries.length > 0} />

      <div className="relative">
        <input
          id={listId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={`${listId}-listbox`}
          aria-autocomplete="list"
          autoComplete="country-name"
          disabled={disabled || loading || loadFailed}
          value={query}
          placeholder={placeholder}
          className={`${inputClass} pr-10`}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            onChange("");
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
            }
          }}
        />
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
      </div>

      {loadFailed && (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {loadError}
        </p>
      )}

      {selected && (
        <p className="mt-2 text-sm text-muted">{currencyLabel(selected.currency)}</p>
      )}

      {open && !loadFailed && filtered.length > 0 && (
        <ul
          id={`${listId}-listbox`}
          role="listbox"
          className="absolute z-20 mt-2 max-h-56 w-full overflow-auto rounded-xl border border-border bg-card py-1 shadow-lg"
        >
          {filtered.map((country) => (
            <li key={country.code} role="option" aria-selected={country.code === value}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm hover:bg-surface"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectCountry(country)}
              >
                <span className="text-foreground">{country.name}</span>
                <span className="text-xs text-muted">{country.currency}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
