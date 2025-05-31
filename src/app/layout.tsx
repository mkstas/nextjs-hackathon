import type { PropsWithChildren } from 'react';
import { Onest } from 'next/font/google';
import '@/shared/common/styles.css';

const onest = Onest({
  subsets: ['cyrillic-ext', 'latin-ext'],
});

export default function IndexLayout({ children }: PropsWithChildren) {
  return (
    <html lang='ru' className={onest.className}>
      <body className='bg-neutral-100'>
        <main className='relative mx-auto max-w-4xl p-5'>{children}</main>
      </body>
    </html>
  );
}
