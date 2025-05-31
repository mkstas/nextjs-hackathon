import { FC } from 'react';
import Link from 'next/link';

export const ScheduleCard: FC = () => {
  return (
    <Link href='/schedule' className='col-span-2 h-32'>
      <div className='h-full rounded-xl bg-white p-4'></div>
    </Link>
  );
};
