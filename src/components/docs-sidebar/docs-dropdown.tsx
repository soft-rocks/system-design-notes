'use client';
import { ChevronDown, FileText } from 'lucide-react';
import { useState } from 'react';
import Link from 'fumadocs-core/link';
import { usePathname } from 'fumadocs-core/framework';
import { cn } from '../../lib/cn';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const docsSections = [
  {
    slug: '01-delivery-framework',
    title: 'Delivery Framework',
    description: 'Introduction to delivery framework',
  },
  {
    slug: '02-basic-concept',
    title: 'Basic Concept',
    description: 'Fundamental concepts',
  },
  {
    slug: '03-questions',
    title: 'Questions',
    description: 'Common questions',
  },
  {
    slug: '04-references',
    title: 'References',
    description: 'Reference materials',
  },
];

export function DocsDropdown() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const locale = pathname.split('/')[1] ?? 'enus';

  const currentSection = docsSections.find((section) =>
    pathname.includes(`/${section.slug}`),
  );
  const selected = currentSection ?? docsSections[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          'flex items-center gap-2 rounded-lg p-2 text-start text-sm w-full hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors',
        )}
      >
        <FileText className="size-4 shrink-0" />
        <span className="flex-1 font-medium truncate">{selected.title}</span>
        <ChevronDown
          className={cn(
            'size-4 shrink-0 transition-transform',
            open && 'rotate-180',
          )}
        />
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-1 p-1 w-[260px]">
        {docsSections.map((section) => {
          const isActive = section.slug === currentSection?.slug;
          return (
            <Link
              key={section.slug}
              href={`/${locale}/docs/${section.slug}`}
              onClick={() => setOpen(false)}
              className={cn(
                'flex flex-col gap-0.5 rounded-lg p-2 hover:bg-fd-accent hover:text-fd-accent-foreground',
                isActive && 'bg-fd-accent text-fd-accent-foreground',
              )}
            >
              <span className="text-sm font-medium">{section.title}</span>
              <span className="text-xs text-fd-muted-foreground">
                {section.description}
              </span>
            </Link>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}