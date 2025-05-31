import { ScheduleCard } from '@/widgets/schedule-card';

export default function Index() {
  return (
    <section className='grid grid-cols-2 gap-2 md:grid-cols-4'>
      <ScheduleCard />
      {Array(9)
        .fill(0)
        .map((_, index) => (
          <div key={index} className='flex h-40 items-center justify-center rounded-xl bg-white p-4'>
            <p className='text-center text-slate-400'>Здесь мог бы быть ваш виджет. 🫃</p>
          </div>
        ))}
    </section>
  );
}
