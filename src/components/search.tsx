'use client';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { create } from '@orama/orama';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { useRouter } from 'fumadocs-core/framework';

function initOrama() {
  return create({
    schema: { _: 'string' },
    language: 'english',
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SearchResults({ items }: { items: any[] | null }) {
  const router = useRouter();
  if (!items?.length) return null;

  return (
    <div role="listbox" aria-label="Search results" className="flex flex-col p-2 gap-1">
      {items.map((item, i) => (
        <button
          key={i}
          role="option"
          aria-selected="false"
          onClick={() => router.push(String(item.url))}
          className="flex flex-col items-start p-3 rounded-lg text-start hover:bg-[--border] transition-colors"
        >
          <span className="text-sm font-medium">{String(item.title ?? '')}</span>
          {item.description ? (
            <span className="text-xs text-[--muted] line-clamp-1">{String(item.description)}</span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

export default function DefaultSearchDialog(props: SharedProps) {
  const { locale } = useI18n();
  const { search, setSearch, query } = useDocsSearch({
    type: 'static',
    initOrama,
    locale,
  });

  return (
    <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchResults items={query.data != null && query.data !== 'empty' ? query.data : null} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
