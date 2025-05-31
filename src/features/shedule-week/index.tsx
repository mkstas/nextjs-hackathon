'use client';

import { FC, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { CheckIcon, ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/solid';
import { cn } from '@/shared/cn';
import { CreateTaskForm } from './create-task-form';
import { Inputs, Task } from './entities';

export const ScheduleWeek: FC = () => {
  const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  const [currentDay, setCurrentDay] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>();

  const isTaskExpired = (task: Task) => {
    if (task.isDone) return false;
    const currentTime = [new Date().getHours(), new Date().getMinutes()];
    const taskTime = task.startTime.split(':').map(Number);
    
    if (taskTime[0] < currentTime[0]) return true;
    if (taskTime[0] === currentTime[0] && taskTime[1] < currentTime[1]) return true;
    return false;
  };

  const createTask: SubmitHandler<Inputs> = data => {
    const newTask: Task = { id: Date.now(), dayId: currentDay, isDone: false, ...data };
    const storedTasks: Task[] = JSON.parse(localStorage.getItem('tasks')!);

    if (!storedTasks?.length) {
      localStorage.setItem('tasks', JSON.stringify([newTask]));
      setTasks([newTask]);
    } else {
      localStorage.setItem('tasks', JSON.stringify([...storedTasks, newTask]));
      setTasks([...storedTasks, newTask]);
    }
  };

  const completeTask = (id: number) => {
    const updatedTasks = tasks?.map(task => (task.id === id ? { ...task, isDone: true } : task));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks?.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  useEffect(() => {
    setCurrentDay(new Date().getDay());
    const storedData: Task[] = JSON.parse(localStorage.getItem('tasks')!);
    if (storedData) {
      setTasks(storedData);
    }
  }, []);

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
          {!tasks?.filter(task => task.dayId === currentDay).length ? (
            <p className='mt-8 mb-4 text-center'>Расписание не составлено</p>
          ) : (
            <ul className='space-y-2'>
              {tasks?.map(
                (task, index) =>
                  task.dayId === currentDay && (
                    <li
                      key={index}
                      className={cn('flex items-center gap-2', { 
                        'text-slate-500 line-through': task.isDone,
                        'text-red-500': !task.isDone && isTaskExpired(task)
                      })}
                    >
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
                      {!task.isDone && (
                        <button
                          onClick={() => completeTask(task.id)}
                          className='bg-accent hover:bg-accent/80 cursor-pointer rounded-full p-2'
                        >
                          <CheckIcon className='size-4 text-white' />
                        </button>
                      )}
                      <button
                        onClick={() => deleteTask(task.id)}
                        className='cursor-pointer rounded-full bg-red-500 p-2 hover:bg-red-600'
                      >
                        <TrashIcon className='size-4 text-white' />
                      </button>
                    </li>
                  ),
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
