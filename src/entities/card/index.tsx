import { FC, PropsWithChildren } from 'react';
import { cn } from '@/shared/common/cn';

interface Props extends PropsWithChildren {
  className?: string;
}

export const Card: FC<Props> = ({ children, className }) => {
  return <div className={cn('rounded-xl bg-white p-4', className)}>{children}</div>;
};
