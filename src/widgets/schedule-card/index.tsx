'use client';

import { FC, useEffect, useState, MouseEvent } from 'react';
import Link from 'next/link';
import { Task } from '@/features/shedule-week/entities';
import { BellAlertIcon } from '@heroicons/react/24/solid';

export const ScheduleCard: FC = () => {
  const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  const [tasks, setTasks] = useState<Task[]>();
  const [filteredTasks, setFilteredTasks] = useState<Task[]>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const onClickBell = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    setSelectedTask(null);
  };

  const handleTaskClick = (e: MouseEvent<HTMLLIElement>, task: Task) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedTask(task);
  };

  const handleDelay = (e: MouseEvent<HTMLButtonElement>, minutes: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedTask) return;

    const storedTasks: Task[] = JSON.parse(localStorage.getItem('tasks')!);
    const updatedTasks = storedTasks.map(task => {
      if (task.id === selectedTask.id) {
        const now = new Date();
        const [startHours, startMins] = task.startTime.split(':').map(Number);
        const startDate = new Date(now);
        startDate.setHours(startHours, startMins + minutes);
        const newStartTime = `${String(startDate.getHours()).padStart(2, '0')}:${String(startDate.getMinutes()).padStart(2, '0')}`;

        if (task.endTime) {
          const [endHours, endMins] = task.endTime.split(':').map(Number);
          const endDate = new Date(now);
          endDate.setHours(endHours, endMins + minutes);
          const newEndTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
          return { ...task, startTime: newStartTime, endTime: newEndTime };
        }

        return { ...task, startTime: newStartTime };
      }
      return task;
    });

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks.filter(tasks => tasks.dayId === new Date().getDay() && !tasks.isDone));
    setSelectedTask(null);
  };

  const handleGoTo = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedTask) return;
    window.location.href = `/schedule?day=${selectedTask.dayId}`;
  };

  useEffect(() => {
    const storedTasks: Task[] = JSON.parse(localStorage.getItem('tasks')!);
    if (storedTasks) {
      setTasks(storedTasks.filter(tasks => tasks.dayId === new Date().getDay() && !tasks.isDone));
      const currentTime = [new Date().getHours(), new Date().getMinutes()];
      setFilteredTasks(
        storedTasks?.filter(task => {
          console.log(task.dayId, new Date().getDay());
          if (task.isDone || task.dayId !== new Date().getDay()) return;

          const taskTime = task.startTime.split(':');

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
            <div className='relative'>
              <button onClick={onClickBell} className='cursor-pointer p-2'>
                <BellAlertIcon className='text-accent size-6' />
                <span className='absolute right-1 bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs leading-none text-white'>
                  {filteredTasks?.length}
                </span>
              </button>
              {isMenuOpen && (
                <div className='absolute right-0 top-full mt-2 w-48 rounded-lg bg-white p-2 shadow-lg'>
                  <ul>
                    {filteredTasks.map((task, index) => (
                      <li key={index} className='p-2 hover:bg-slate-100 break-all' onClick={(e) => handleTaskClick(e, task)}>
                        {task.title} - {task.startTime}
                        {selectedTask?.id === task.id && (
                          <div className='absolute left-full top-0 ml-2 w-48 rounded-lg bg-white p-2 shadow-lg'>
                            <div className='space-y-2'>
                              <div className='flex gap-1'>
                                <button onClick={(e) => handleDelay(e, 5)} className='rounded bg-accent w-full cursor-pointer px-2 py-1 text-xs text-white hover:bg-accent/80'>
                                  5м
                                </button>
                                <button onClick={(e) => handleDelay(e, 15)} className='rounded bg-accent w-full cursor-pointer px-2 py-1 text-xs text-white hover:bg-accent/80'>
                                  15м
                                </button>
                                <button onClick={(e) => handleDelay(e, 30)} className='rounded bg-accent w-full cursor-pointer px-2 py-1 text-xs text-white hover:bg-accent/80'>
                                  30м
                                </button>
                                <button onClick={(e) => handleDelay(e, 60)} className='rounded bg-accent w-full cursor-pointer px-2 py-1 text-xs text-white hover:bg-accent/80'>
                                  1ч
                                </button>
                              </div>
                              <button onClick={handleGoTo} className='w-full rounded bg-slate-100 px-2 py-1 text-xs hover:bg-slate-200 cursor-pointer'>
                                Перейти
                              </button>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
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
