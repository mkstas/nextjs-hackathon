'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { Task } from '@/features/shedule-week/entities';

export const ScheduleCard: FC = () => {
  const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  const [tasks, setTasks] = useState<Task[]>();

  useEffect(() => {
    const storedTasks: Task[] = JSON.parse(localStorage.getItem('tasks')!);
    if (storedTasks) {
      setTasks(storedTasks.filter(tasks => tasks.day === new Date().getDay() && !tasks.isDone));
    }
  }, []);

  return (
    <Link href='/schedule' className='col-span-2 h-40'>
      <div className='h-full rounded-2xl bg-white p-4'>
        <p className='text-xl font-semibold'>Расписание дня</p>
        <p>{week[new Date().getDay() - 1]}</p>
        {!!tasks?.length ? (
          <ul className='mt-4'>
            {tasks.map(
              (task, index) =>
                index !== 2 && (
                  <li key={index} className='flex'>
                    <p className='flex-1'>{task.title}</p>
                    <div className='flex gap-1'>
                      <p>{task.startTime}</p>
                      {!!task.endTime && (
                        <>
                          <span>-</span>
                          <p>{task.endTime}</p>
                        </>
                      )}
                    </div>
                  </li>
                ),
            )}
          </ul>
        ) : (
          <p>Расписание не заполнено</p>
        )}
      </div>
    </Link>
  );
};
