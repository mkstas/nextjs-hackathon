import type { PropsWithChildren } from 'react';
import { Onest } from 'next/font/google';
import '@/shared/styles.css';

const onest = Onest({
  subsets: ['cyrillic-ext', 'latin-ext'],
});

export default function IndexLayout({ children }: PropsWithChildren) {
  return (
    <html lang='ru' className={onest.className}>
      <body className='bg-slate-100'>
        <main className='mx-auto max-w-5xl p-5'>{children}</main>
      </body>
    </html>
  );
}
