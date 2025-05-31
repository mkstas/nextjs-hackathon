import { ScheduleCard } from '@/widgets/schedule-card';

export default function Index() {
  return (
    <section className='grid grid-cols-4 gap-2'>
      <ScheduleCard />
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index} className='flex h-40 items-center justify-center rounded-xl bg-white p-4'>
            <p>Пример виджета</p>
          </div>
        ))}
    </section>
  );
}
