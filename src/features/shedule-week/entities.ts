export interface Inputs {
  title: string;
  startTime: string;
  endTime: string;
}

export interface Task {
  id: number;
  day: number;
  title: string;
  startTime: string;
  endTime?: string;
  isDone: boolean;
  times?: number[];
}
