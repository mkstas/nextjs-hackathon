'use client';

import { FC, useEffect, useState, MouseEvent } from 'react';
import Link from 'next/link';
import { Task } from '@/features/shedule-week/entities';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import { cn } from '@/shared/cn';

export const ScheduleCard: FC = () => {
  const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  const [tasks, setTasks] = useState<Task[]>();
  const [filteredTasks, setFilteredTasks] = useState<Task[]>();
  const [totalTasks, setTotalTasks] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);

  const handleKeyPress = (e: globalThis.KeyboardEvent) => {
    if (e.ctrlKey && e.altKey && e.key === 'd') {
      e.preventDefault();
      setIsRecommendationOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleRecommendation = (action: 'accept' | 'decline' | 'go') => {
    if (action === 'accept') {
      // Here would be logic to apply average completion time
      console.log('Applying average completion time');
    } else if (action === 'go') {
      window.location.href = '/schedule';
    }
    setIsRecommendationOpen(false);
  };

  const getRussianDay = () => {
    return (new Date().getDay() + 6) % 7;
  };

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

    // Update both tasks and filteredTasks
    const currentDayTasks = updatedTasks.filter(tasks => tasks.dayId === getRussianDay() && !tasks.isDone);
    setTasks(currentDayTasks);
    setTotalTasks(updatedTasks.length);

    const currentTime = [new Date().getHours(), new Date().getMinutes()];
    const newFilteredTasks = currentDayTasks.filter(task => {
      const taskTime = task.startTime.split(':');
      const taskHour = Number(taskTime[0]);
      const taskMinute = Number(taskTime[1]);

      // Task is in the future
      if (taskHour > currentTime[0] || (taskHour === currentTime[0] && taskMinute > currentTime[1])) {
        return false;
      }

      return true;
    });

    setFilteredTasks(newFilteredTasks);
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
      // Get all tasks for the current day for progress bar
      const allDayTasks = storedTasks.filter(tasks => tasks.dayId === getRussianDay());
      // Get only incomplete tasks for the task list
      const incompleteTasks = allDayTasks.filter(task => !task.isDone);

      setTasks(incompleteTasks);
      setTotalTasks(allDayTasks.length);

      const currentTime = [new Date().getHours(), new Date().getMinutes()];
      setFilteredTasks(
        incompleteTasks?.filter(task => {
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

  const calculateProgress = () => {
    const storedTasks: Task[] = JSON.parse(localStorage.getItem('tasks')!);
    if (!storedTasks) return 0;

    // Get all tasks for the current day
    const allDayTasks = storedTasks.filter(task => task.dayId === getRussianDay());
    if (!allDayTasks.length) return 0;

    const completedCount = allDayTasks.filter(task => task.isDone).length;
    return (completedCount / allDayTasks.length) * 100;
  };

  const isTaskInProgress = (task: Task) => {
    const currentTime = new Date();
    const [startHour, startMinute] = task.startTime.split(':').map(Number);
    const startTime = startHour * 60 + startMinute;
    const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    if (task.endTime) {
      const [endHour, endMinute] = task.endTime.split(':').map(Number);
      const endTime = endHour * 60 + endMinute;
      return currentTimeInMinutes >= startTime && currentTimeInMinutes <= endTime;
    }
    return currentTimeInMinutes >= startTime;
  };

  return (
    <Link href='/schedule' className='group col-span-2 h-40'>
      <div className='flex h-full flex-col rounded-2xl bg-white p-4 transition-all duration-200 hover:shadow-md'>
        <div className='flex items-start justify-between'>
          <div>
            <p className='text-xl font-semibold transition-colors'>Расписание дня</p>
            <p className='mt-0.5 text-sm text-slate-500'>{week[getRussianDay()]}</p>
          </div>
          {!!filteredTasks?.length && (
            <div className='relative'>
              <button
                onClick={onClickBell}
                className='cursor-pointer rounded-full p-2 transition-colors hover:bg-slate-50'
              >
                <BellAlertIcon className='text-accent size-6' />
                <span className='absolute right-1 bottom-1 flex h-4 w-4 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs leading-none text-white'>
                  {filteredTasks?.length}
                </span>
              </button>
              {isMenuOpen && (
                <div className='animate-in fade-in slide-in-from-top-2 absolute top-full right-0 mt-2 w-64 rounded-lg border border-slate-100 bg-white p-2 shadow-lg duration-200'>
                  <ul className='space-y-1'>
                    {filteredTasks.map((task, index) => (
                      <li
                        key={index}
                        className='cursor-pointer rounded-md p-2 break-all transition-colors hover:bg-slate-50'
                        onClick={e => handleTaskClick(e, task)}
                      >
                        <div className='flex items-center gap-2'>
                          <span className='bg-accent h-2 w-2 flex-shrink-0 rounded-full' />
                          <div className='min-w-0 flex-1'>
                            <p className='truncate text-sm font-medium'>{task.title}</p>
                            <p className='text-xs text-slate-500'>{task.startTime}</p>
                          </div>
                        </div>
                        {selectedTask?.id === task.id && (
                          <div className='animate-in fade-in slide-in-from-left-2 absolute top-0 left-full ml-2 w-48 rounded-lg border border-slate-100 bg-white p-2 shadow-lg duration-200'>
                            <div className='space-y-2'>
                              <div className='grid grid-cols-2 gap-1'>
                                <button
                                  onClick={e => handleDelay(e, 5)}
                                  className='bg-accent hover:bg-accent/80 w-full cursor-pointer rounded px-2 py-1 text-xs text-white transition-colors'
                                >
                                  5м
                                </button>
                                <button
                                  onClick={e => handleDelay(e, 15)}
                                  className='bg-accent hover:bg-accent/80 w-full cursor-pointer rounded px-2 py-1 text-xs text-white transition-colors'
                                >
                                  15м
                                </button>
                                <button
                                  onClick={e => handleDelay(e, 30)}
                                  className='bg-accent hover:bg-accent/80 w-full cursor-pointer rounded px-2 py-1 text-xs text-white transition-colors'
                                >
                                  30м
                                </button>
                                <button
                                  onClick={e => handleDelay(e, 60)}
                                  className='bg-accent hover:bg-accent/80 w-full cursor-pointer rounded px-2 py-1 text-xs text-white transition-colors'
                                >
                                  1ч
                                </button>
                              </div>
                              <button
                                onClick={handleGoTo}
                                className='w-full cursor-pointer rounded bg-slate-100 px-2 py-1 text-xs transition-colors hover:bg-slate-200'
                              >
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
        {!!tasks?.length ? (
          <div className='mt-3 flex-1'>
            <div className='mb-2 flex items-center justify-between text-xs text-slate-500'>
              <span>Задачи на сегодня</span>
              <span className='font-medium'>{totalTasks} задач</span>
            </div>
            <div className='h-1.5 w-full overflow-hidden rounded-full bg-slate-100'>
              <div
                className='bg-accent h-full rounded-full transition-all duration-500 ease-out'
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
            <ul className='mt-3 space-y-2'>
              {tasks.map(
                (task, index) =>
                  index !== 2 && (
                    <li key={index} className='group/item flex items-center gap-2'>
                      <div className='min-w-0 flex-1'>
                        <p
                          className={cn('group-hover/item:text-accent truncate text-sm transition-colors', {
                            'text-slate-500 line-through': task.isDone,
                            'text-accent': !task.isDone && isTaskInProgress(task),
                          })}
                        >
                          {task.title}
                        </p>
                        <div className='flex items-center gap-1 text-xs text-slate-500'>
                          <span>{task.startTime}</span>
                          {!!task.endTime && (
                            <>
                              <span>-</span>
                              <span>{task.endTime}</span>
                            </>
                          )}
                        </div>
                      </div>
                      {!task.isDone && (
                        <div className='flex-shrink-0'>
                          <span
                            className={cn('h-2 w-2 rounded-full transition-transform group-hover/item:scale-125', {
                              'bg-accent': isTaskInProgress(task),
                              'bg-slate-300': !isTaskInProgress(task),
                            })}
                          />
                        </div>
                      )}
                    </li>
                  ),
              )}
            </ul>
          </div>
        ) : (
          <div className='mt-auto flex flex-1 items-center justify-center'>
            <div className='text-center'>
              <p className='text-slate-500'>Расписание не заполнено</p>
              <p className='mt-1 text-xs text-slate-400'>Добавьте задачи в расписание</p>
            </div>
          </div>
        )}
      </div>
      {isRecommendationOpen && (
        <div className='animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 duration-200'>
          <div className='animate-in zoom-in w-96 rounded-lg bg-white p-6 shadow-lg duration-200'>
            <h3 className='mb-4 text-lg font-semibold'>Рекомендация по расписанию</h3>
            <p className='mb-6 text-slate-600'>
              Мы заметили, что вы часто откладываете задачи. Хотите применить среднее время выполнения?
            </p>
            <div className='flex flex-col gap-2'>
              <button
                onClick={() => handleRecommendation('accept')}
                className='bg-accent hover:bg-accent/80 w-full rounded px-4 py-2 text-white transition-colors'
              >
                Согласен
              </button>
              <button
                onClick={() => handleRecommendation('decline')}
                className='w-full rounded bg-slate-100 px-4 py-2 transition-colors hover:bg-slate-200'
              >
                Нет
              </button>
              <button
                onClick={() => handleRecommendation('go')}
                className='w-full rounded bg-slate-100 px-4 py-2 transition-colors hover:bg-slate-200'
              >
                Перейти
              </button>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};
