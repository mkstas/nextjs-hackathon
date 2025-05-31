'use client';

import { FC, useEffect, useState, MouseEvent } from 'react';
import Link from 'next/link';
import { Task } from '@/features/shedule-week/entities';
import { BellAlertIcon } from '@heroicons/react/24/solid';

export const ScheduleCard: FC = () => {
  const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  const [tasks, setTasks] = useState<Task[]>();
  const [filteredTasks, setFilteredTasks] = useState<Task[]>();

  const onClickBell = (e: MouseEvent<HTMLButtonElement>) => {};

  useEffect(() => {
    const storedTasks: Task[] = JSON.parse(localStorage.getItem('tasks')!);
    if (storedTasks) {
      setTasks(storedTasks.filter(tasks => tasks.dayId === new Date().getDay() && !tasks.isDone));
      const currentTime = [new Date().getHours(), new Date().getMinutes()];
      setFilteredTasks(
        storedTasks?.filter(task => {
          const taskTime =
            task.dayId === new Date().getDay() && !task.isDone && task.endTime
              ? task.endTime.split(':')
              : task.startTime.split(':');

          if (Number(taskTime[0]) < currentTime[0]) {
            return task;
          }

          if (Number(taskTime[1]) < currentTime[1]) {
            return task;
          }
        }),
      );
    }
  }, []);

  return (
    <Link href='/schedule' className='col-span-2 h-40'>
      <div className='h-full rounded-2xl bg-white p-4'>
        <div className='flex justify-between'>
          <p className='text-xl font-semibold'>Расписание дня</p>
          {!!filteredTasks?.length && (
            <button onClick={onClickBell} className='relative cursor-pointer p-2'>
              <BellAlertIcon className='text-accent size-6' />
              <span className='absolute right-1 bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs leading-none text-white'>
                {filteredTasks?.length}
              </span>
            </button>
          )}
        </div>
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
