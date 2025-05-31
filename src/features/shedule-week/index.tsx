'use client';

import { FC, useEffect, useState } from 'react';
import { cn } from '@/shared/common/cn';
import { CreateTaskForm } from './create-task-form';

export const ScheduleWeek: FC = () => {
  const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  const [currentDay, setCurrentDay] = useState<number>(0);

  useEffect(() => {
    const date = new Date();
    setCurrentDay(date.getDay());
  }, []);

  return (
    <div className='grid grid-cols-[1fr_3fr] items-start gap-2'>
      <div className='space-y-2 rounded-xl bg-white p-4'>
        <p className='text-lg font-semibold'>Дни недели</p>
        <ul className='grid gap-y-1'>
          {week.map((day, index) => (
            <button
              key={index}
              className={cn('cursor-pointer rounded-full px-4 py-2 text-start', {
                'hover:bg-neutral-100': currentDay !== index + 1,
                'bg-blue-600 text-white': currentDay === index + 1,
              })}
              onClick={() => setCurrentDay(index + 1)}
            >
              {day}
            </button>
          ))}
        </ul>
      </div>
      <div className='space-y-2 rounded-xl bg-white p-4'>
        <p className='text-lg font-semibold'>Задачи</p>
        <CreateTaskForm day={currentDay} />
      </div>
    </div>
  );
};
