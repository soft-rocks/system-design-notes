'use client';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import type * as PageTree from 'fumadocs-core/page-tree';

export function DocsLayoutClient({
  tree,
  children,
}: {
  tree: PageTree.Root;
  children: React.ReactNode;
}) {
  return (
    <DocsLayout tree={tree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
