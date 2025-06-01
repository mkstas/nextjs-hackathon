import { ScheduleCard } from '@/widgets/schedule-card';
import { SuggestionNotification } from '@/widgets/suggestion-notification';
import { CloudIcon, SunIcon, BoltIcon, HomeIcon, DevicePhoneMobileIcon, WifiIcon } from '@heroicons/react/24/solid';

const widgets = [
  {
    title: 'Погода',
    icon: <SunIcon className='size-8 text-yellow-500' />,
    content: (
      <div className='text-center'>
        <p className='text-2xl font-semibold'>23°C</p>
        <p className='text-sm text-slate-500'>Солнечно</p>
        <p className='mt-2 text-xs text-slate-400'>Влажность: 45%</p>
      </div>
    ),
  },
  {
    title: 'Умный дом',
    icon: <HomeIcon className='text-accent size-8' />,
    content: (
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>Температура</span>
          <span className='text-sm font-medium'>22°C</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>Освещение</span>
          <span className='text-sm font-medium'>75%</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>Влажность</span>
          <span className='text-sm font-medium'>50%</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Энергия',
    icon: <BoltIcon className='size-8 text-yellow-500' />,
    content: (
      <div className='text-center'>
        <p className='text-2xl font-semibold'>2.4 кВт</p>
        <p className='text-sm text-slate-500'>Текущее потребление</p>
        <p className='mt-2 text-xs text-slate-400'>-15% к прошлому месяцу</p>
      </div>
    ),
  },
  {
    title: 'Устройства',
    icon: <DevicePhoneMobileIcon className='size-8 text-blue-500' />,
    content: (
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>Онлайн</span>
          <span className='text-sm font-medium text-green-500'>12</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>Оффлайн</span>
          <span className='text-sm font-medium text-red-500'>2</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Интернет',
    icon: <WifiIcon className='size-8 text-blue-500' />,
    content: (
      <div className='text-center'>
        <p className='text-xl font-semibold'>150 Мбит/с</p>
        <p className='text-sm text-slate-500'>Скорость загрузки</p>
        <p className='mt-2 text-xs text-slate-400'>Пинг: 15 мс</p>
      </div>
    ),
  },
  {
    title: 'Прогноз',
    icon: <CloudIcon className='size-8 text-slate-500' />,
    content: (
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>Завтра</span>
          <span className='text-sm font-medium'>25°C</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>Послезавтра</span>
          <span className='text-sm font-medium'>22°C</span>
        </div>
      </div>
    ),
  },
];

export default function Index() {
  return (
    <section className='grid grid-cols-2 gap-2 md:grid-cols-4'>
      <ScheduleCard />
      {widgets.map((widget, index) => (
        <div key={index} className='flex flex-col rounded-xl bg-white p-4'>
          <div className='mb-2 flex items-center gap-2'>
            {widget.icon}
            <h3 className='font-semibold'>{widget.title}</h3>
          </div>
          {widget.content}
        </div>
      ))}
      <SuggestionNotification />
    </section>
  );
}
