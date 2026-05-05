import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import { LangSwitcher } from '@/components/lang-switcher';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
      children: <LangSwitcher />,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
