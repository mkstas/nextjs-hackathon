import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PlusIcon } from '@heroicons/react/24/solid';
import { cn } from '@/shared/cn';
import { Inputs } from './entities';

interface Props {
  onSubmit: SubmitHandler<Inputs>;
}

export const CreateTaskForm: FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, formState, setValue, setFocus } = useForm<Inputs>({ mode: 'onSubmit' });

  const onClickSubmit: SubmitHandler<Inputs> = data => {
    onSubmit(data);
    setValue('title', '');
    setValue('startTime', '');
    setValue('endTime', '');
    setFocus('title');
  };

  return (
    <form onSubmit={handleSubmit(onClickSubmit)} className='flex gap-2'>
      <div className='grid flex-1'>
        <input
          {...register('title', {
            required: {
              value: true,
              message: 'Это поле обязательно',
            },
          })}
          className={cn('py-1.2 w-full rounded-full border border-neutral-300 px-4 outline-none focus:ring', {
            'focus:border-accent focus:ring-accent': !formState.errors.title,
            'focus:border-red-400 focus:ring-red-400': !!formState.errors.title,
          })}
        />
      </div>
      <div className='flex items-center gap-1'>
        <div className='grid h-full'>
          <input
            type='time'
            {...register('startTime', {
              required: {
                value: true,
                message: 'Это поле обязательно',
              },
            })}
            className={cn('py-1.2 w-full rounded-full border border-neutral-300 px-4 outline-none focus:ring', {
              'focus:border-accent focus:ring-accent': !formState.errors.startTime,
              'focus:border-red-400 focus:ring-red-400': !!formState.errors.startTime,
            })}
          />
        </div>
        <div>-</div>
        <div className='grid h-full'>
          <input
            type='time'
            {...register('endTime')}
            className={cn('py-1.2 w-full rounded-full border border-neutral-300 px-4 outline-none focus:ring', {
              'focus:border-accent focus:ring-accent': !formState.errors.endTime,
              'focus:border-red-400 focus:ring-red-400': !!formState.errors.endTime,
            })}
          />
        </div>
      </div>
      <button className='bg-accent hover:bg-accent/80 cursor-pointer rounded-full p-2 text-white'>
        <PlusIcon className='size-5' />
      </button>
    </form>
  );
};
