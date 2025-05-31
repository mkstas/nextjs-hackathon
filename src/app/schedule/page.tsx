import { ScheduleWeek } from '@/features/shedule-week';

export default function Schedule() {
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold text-neutral-800'>Расписание</h1>
      <ScheduleWeek />
    </div>
  );
}
