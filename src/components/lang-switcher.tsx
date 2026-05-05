'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const locales = [
  { code: 'enus', label: 'EN' },
  { code: 'zhtw', label: '繁' },
];

export function LangSwitcher() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = (params.locale as string) ?? 'enus';
  const currentLabel = locales.find((l) => l.code === currentLocale)?.label ?? 'EN';

  const switchLocale = (newLocale: string) => {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1 text-xs rounded-md hover:bg-accent"
      >
        <span>{currentLabel}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-28 rounded-md border bg-background shadow-lg z-50">
          {locales.map((locale) => (
            <button
              key={locale.code}
              onClick={() => switchLocale(locale.code)}
              className={`w-full px-3 py-2 text-sm text-left hover:bg-accent first:rounded-t-md last:rounded-b-md ${
                currentLocale === locale.code ? 'font-medium bg-accent' : ''
              }`}
            >
              {locale.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}