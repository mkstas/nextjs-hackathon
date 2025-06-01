'use client';

import { FC, useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export const SuggestionNotification: FC = () => {
  const [visibleNotifications, setVisibleNotifications] = useState<{
    kettle: boolean;
    vacuum: boolean;
  }>({
    kettle: false,
    vacuum: false,
  });

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'g') {
      e.preventDefault();
      setVisibleNotifications(prev => ({ ...prev, kettle: true }));
    } else if (e.key.toLowerCase() === 'g') {
      e.preventDefault();
      setVisibleNotifications(prev => ({ ...prev, vacuum: true }));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  if (!visibleNotifications.kettle && !visibleNotifications.vacuum) return null;

  return (
    <div className='animate-in fade-in slide-in-from-top-2 fixed top-0 left-0 z-50 flex w-full flex-col items-center justify-center gap-3 p-4 duration-200'>
      {visibleNotifications.kettle && (
        <div className='animate-in fade-in slide-in-from-top-2 w-full max-w-3xl rounded-xl border border-slate-100 bg-white p-5 shadow-lg duration-200'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex-1'>
              <h3 className='text-lg font-semibold text-slate-900'>Рекомендация по чайнику</h3>
              <p className='mt-1 text-slate-600'>
                Вы переносили запуск чайника несколько раз. Давайте перенесем включение на 10:00
              </p>
            </div>
            <button
              onClick={() => setVisibleNotifications(prev => ({ ...prev, kettle: false }))}
              className='flex-shrink-0 rounded-full p-1 transition-colors hover:bg-slate-100'
            >
              <XMarkIcon className='size-5 text-slate-400' />
            </button>
          </div>
          <div className='mt-4 flex items-center gap-3'>
            <button
              className='bg-accent hover:bg-accent/90 cursor-pointer rounded-full px-6 py-2 font-medium text-white transition-colors'
              onClick={() => setVisibleNotifications(prev => ({ ...prev, kettle: false }))}
            >
              Принять
            </button>
            <button
              className='cursor-pointer rounded-full bg-slate-100 px-6 py-2 font-medium text-slate-600 transition-colors hover:bg-slate-200'
              onClick={() => setVisibleNotifications(prev => ({ ...prev, kettle: false }))}
            >
              Отклонить
            </button>
          </div>
        </div>
      )}
      {visibleNotifications.vacuum && (
        <div className='animate-in fade-in slide-in-from-top-2 w-full max-w-3xl rounded-xl border border-slate-100 bg-white p-5 shadow-lg duration-200'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex-1'>
              <h3 className='text-lg font-semibold text-slate-900'>Рекомендация по пылесосу</h3>
              <p className='mt-1 text-slate-600'>
                Вы выключали пылесос несколько раз в 12:00. Давайте назначим это время по умолчанию
              </p>
            </div>
            <button
              onClick={() => setVisibleNotifications(prev => ({ ...prev, vacuum: false }))}
              className='flex-shrink-0 rounded-full p-1 transition-colors hover:bg-slate-100'
            >
              <XMarkIcon className='size-5 text-slate-400' />
            </button>
          </div>
          <div className='mt-4 flex items-center gap-3'>
            <button
              className='bg-accent hover:bg-accent/90 cursor-pointer rounded-full px-6 py-2 font-medium text-white transition-colors'
              onClick={() => setVisibleNotifications(prev => ({ ...prev, vacuum: false }))}
            >
              Принять
            </button>
            <button
              className='cursor-pointer rounded-full bg-slate-100 px-6 py-2 font-medium text-slate-600 transition-colors hover:bg-slate-200'
              onClick={() => setVisibleNotifications(prev => ({ ...prev, vacuum: false }))}
            >
              Отклонить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
