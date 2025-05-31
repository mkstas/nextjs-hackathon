import type { PropsWithChildren } from 'react';
import { Onest } from 'next/font/google';
import '@/shared/common/styles.css';

const onest = Onest({
  subsets: ['cyrillic-ext', 'latin-ext'],
});

export default function IndexLayout({ children }: PropsWithChildren) {
  return (
    <html lang='ru' className={onest.className}>
      <body>{children}</body>
    </html>
  );
}
