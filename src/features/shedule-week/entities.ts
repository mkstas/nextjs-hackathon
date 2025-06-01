export interface Inputs {
  title: string;
  startTime: string;
  endTime: string;
}

export interface Task {
  id: number;
  dayId: number;
  title: string;
  startTime: string;
  endTime: string;
  isDone: boolean;
  delayNum?: number;
}
