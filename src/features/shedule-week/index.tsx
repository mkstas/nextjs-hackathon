'use client';

import { FC, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { CheckIcon, ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/solid';
import { cn } from '@/shared/cn';
import { CreateTaskForm } from './create-task-form';
import { Inputs, Task } from './entities';
import Link from 'next/link';

export const ScheduleWeek: FC = () => {
  const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  const [currentDay, setCurrentDay] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>();
  const [currentTasks, setCurrentTasks] = useState<Task[]>();

  const createTask: SubmitHandler<Inputs> = data => {
    const newTask = { day: currentDay, isDone: false, ...data };
    const storedTasks: Task[] = JSON.parse(localStorage.getItem('tasks')!);

    if (!storedTasks?.length) {
      localStorage.setItem('tasks', JSON.stringify([newTask]));
      setCurrentTasks([newTask]);
    } else {
      localStorage.setItem('tasks', JSON.stringify([...storedTasks, newTask]));
      setCurrentTasks([...storedTasks, newTask]);
    }
  };

  useEffect(() => {
    setCurrentDay(new Date().getDay());
    if (!!JSON.parse(localStorage.getItem('tasks')!)) {
      setTasks(JSON.parse(localStorage.getItem('tasks')!) as Task[]);
    }
  }, []);

  useEffect(() => {
    setCurrentTasks(tasks?.filter(task => task.day === currentDay));
  }, [currentDay, tasks]);

  return (
    <div className='grid grid-cols-[1fr_3fr] items-start gap-2'>
      <ul className='space-y-1 rounded-2xl bg-white p-4'>
        {week.map((day, index) => (
          <li key={index}>
            <button
              className={cn('w-full cursor-pointer rounded-full px-4 py-1.25 text-start', {
                'hover:bg-slate-100': currentDay !== index + 1,
                'bg-accent text-white': currentDay === index + 1,
              })}
              onClick={() => setCurrentDay(index + 1)}
            >
              {day}
            </button>
          </li>
        ))}
      </ul>
      <div className='space-y-4 rounded-2xl bg-white p-4'>
        <div className='flex items-center gap-2'>
          <Link href='/' className='-ml-2 rounded-full p-2 hover:bg-slate-100'>
            <ChevronLeftIcon className='text-accent size-6' />
          </Link>
          <h1 className='text-lg font-semibold'>Расписание</h1>
        </div>
        <CreateTaskForm onSubmit={createTask} />
        <div>
          {!currentTasks?.length ? (
            <p className='mt-8 mb-4 text-center'>Расписание не составлено</p>
          ) : (
            <ul className='space-y-2'>
              {currentTasks?.map((task, index) => (
                <li key={index} className='flex items-center gap-2'>
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
                  <button className='bg-accent hover:bg-accent/80 cursor-pointer rounded-full p-2'>
                    <CheckIcon className='size-4 text-white' />
                  </button>
                  <button className='cursor-pointer rounded-full bg-red-500 p-2 hover:bg-red-600'>
                    <TrashIcon className='size-4 text-white' />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
