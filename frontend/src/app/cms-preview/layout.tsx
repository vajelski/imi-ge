import type { ReactNode } from 'react';

export default function CmsPreviewLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ka">
      <body>{children}</body>
    </html>
  );
}
