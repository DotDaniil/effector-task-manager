export type Task = { id: number, label: string, description: string, done: boolean };
export type Store = Task[];

export type InputFields = { label: string, description: string, done: boolean }