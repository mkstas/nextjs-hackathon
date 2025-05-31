import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  day: number;
}

interface Inputs {
  task: string;
  time: string;
}

export const CreateTaskForm: FC<Props> = ({ day }) => {
  const { register, handleSubmit, formState } = useForm<Inputs>({ mode: 'onSubmit' });

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log({ day, ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-[5fr_1fr_auto] gap-2'>
      <div className='grid'>
        <input
          {...register('task')}
          className='w-full rounded-full border px-4 py-1.25 outline-none focus:border-blue-600 focus:ring focus:ring-blue-600'
        />
        {formState.errors.task && <p>{formState.errors.task.message}</p>}
      </div>
      <div className='grid'>
        <input
          {...register('time')}
          className='w-full rounded-full border px-4 py-1.25 outline-none focus:border-blue-600 focus:ring focus:ring-blue-600'
        />
        {formState.errors.task && <p>{formState.errors.task.message}</p>}
      </div>
      <button className='cursor-pointer rounded-full bg-blue-600 p-2'>
        <PlusCircleIcon className='size-5 text-white' />
      </button>
    </form>
  );
};
