import { source } from '@/lib/source';
import { DocsLayoutClient } from './client';

export default async function Layout(props: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const tree = source.getPageTree(locale);

  return (
    <DocsLayoutClient tree={tree}>
      {props.children}
    </DocsLayoutClient>
  );
}